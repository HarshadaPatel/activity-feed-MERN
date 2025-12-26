export const createActivity = async ({ tenantId, payload }) => {
  const res = await fetch('http://localhost:3000/activities', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-tenant-id': tenantId,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Create failed');
  return res.json();
};
