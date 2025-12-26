describe('Activity Feed UI', () => {
  beforeEach(() => {
    // Intercept backend GET request to mock activities
    cy.intercept('GET', 'http://localhost:3000/activities*', (req) => {
      const url = new URL(req.url);
      const cursor = url.searchParams.get('cursor');
      if (!cursor) {
        req.reply({
          statusCode: 200,
          body: {
            items: Array.from({ length: 5 }).map((_, i) => ({
              id: `id-${i}`,
              actorId: 'u1',
              actorName: 'User 1',
              type: i % 2 === 0 ? 'COMMENT_ADDED' : 'STATUS_CHANGED',
              entityId: `E${i}`,
              metadata: {},
              createdAt: new Date(Date.now() - i * 1000).toISOString(),
            })),
            nextCursor: new Date(Date.now() - 5 * 1000).toISOString(),
            hasMore: true,
          },
        });
      } else {
        req.reply({
          statusCode: 200,
          body: { items: [], nextCursor: null, hasMore: false },
        });
      }
    }).as('getActivities');
  });

  it('shows activities on load', () => {
    cy.visit('http://localhost:5173');
    cy.wait('@getActivities');
    cy.get('ul li').should('have.length', 5);
  });

  it('loads more on scroll', () => {
    cy.visit('http://localhost:5173');
    cy.wait('@getActivities');
    cy.window().then(win => win.scrollTo('bottom'));
    cy.get('ul li').should('have.length', 5); // second page empty in mock
  });

  it('optimistic create and rollback on failure', () => {
    cy.intercept('POST', 'http://localhost:3000/activities', { statusCode: 500 }).as('createFail');
    cy.visit('http://localhost:5173');
    cy.contains('Add Activity (Optimistic)').click();
    cy.wait('@createFail');
    cy.get('ul li').should('have.length', 5); // optimistic item rolled back
  });
});
