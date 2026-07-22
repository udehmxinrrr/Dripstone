export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    { name: 'storeName', title: 'Store Name', type: 'string' },
    {name: 'marqueeItems', title: 'Marquee Items', type: 'array', of: [{ type: 'string' }]}
  ]
}
