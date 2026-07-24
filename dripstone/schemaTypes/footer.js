import {NoticeBanner} from './components/NoticeBanner'

export default {
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    {
      name: 'notice',
      title: '',
      type: 'string',
      components: { field: NoticeBanner },
      readOnly: true
    },
    {
      name: 'footerDescription',
      title: 'Footer Description',
      type: 'text',
      description: 'Short blurb under the store logo in the footer, describing your brand.',
      placeholder: "Streetwear that doesn't ask permission. Born on the block, built for the culture — every piece is made for movement, made to be seen, made to last. Heavyweight fabrics. Oversized fits. Details that hit different up close."
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string',
      description: 'First line under "Stay in touch" in the footer — your city/location.',
      placeholder: 'Nairobi, Kenya'
    },
    {
      name: 'website',
      title: 'Website / Email',
      type: 'string',
      description: 'Second line under "Stay in touch" — your website URL or contact email.',
      placeholder: 'DripStone.co.ke'
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
      description: 'Third line under "Stay in touch" — your contact phone number.',
      placeholder: '+254 712 345 678'
    },
    {
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
      description: 'Link behind the "IG" icon in the footer social row.'
    },
    {
      name: 'facebookUrl',
      title: 'Facebook URL',
      type: 'url',
      description: 'Link behind the "FB" icon in the footer social row.'
    },
    {
      name: 'twitterUrl',
      title: 'X / Twitter URL',
      type: 'url',
      description: 'Link behind the "X" icon in the footer social row.'
    },
    {
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      description: 'Bottom-left line of the footer, e.g. "© 2026 DripStone. All rights reserved."',
      placeholder: '© 2026 DripStone. All rights reserved.'
    }
  ]
}