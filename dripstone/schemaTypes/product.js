export default {
  name: 'product',
  title: 'Product Cards',
  type: 'document',
  fields: [
    { name: 'productId', title: 'Product ID', type: 'string' },
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'price', title: 'Price', type: 'number' },
    { name: 'desc', title: 'Description', type: 'text' },
    {
      name: 'stockStatus',
      title: 'Stock Status',
      type: 'string',
      options: {
        list: ['in-stock', 'low-stock', 'out-of-stock']
      }
    },
    { name: 'image', title: 'Image', type: 'image' },
    {
      name: 'section',
      title: 'Section',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: ['products', 'offers']
      }
    }
  ]
}