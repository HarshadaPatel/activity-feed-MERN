// middleware/tenant.js
export default function tenantMiddleware(req, res, next) {
  const tenantId = req.header('x-tenant-id');
  if (!tenantId) {
    return res.status(400).json({ error: 'Missing x-tenant-id' });
  }
  req.tenantId = tenantId;
  next();
}
