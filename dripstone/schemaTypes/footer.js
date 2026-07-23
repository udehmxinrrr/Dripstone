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
      placeholder: 'Considered goods, built to last. Leather, steel, and honest materials, sourced with care.'
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
      placeholder: '+254 700 000 000'
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