describe('Activity Feed', () => {
  it('renders feed and adds optimistic activity', () => {
    cy.visit('/');
    cy.contains('➕ Add Activity').click();
    cy.get('li.optimistic').should('exist');
    cy.get('li.optimistic .feed-meta').should('contain', '(pending)');
  });

  it('filters by Comments', () => {
    cy.contains('Comments').click();
    cy.get('li.comment').should('exist');
  });
});
