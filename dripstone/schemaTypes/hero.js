import {NoticeBanner} from './components/NoticeBanner'

export default {
  name: 'hero',
  title: 'Hero',
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
      name: 'marqueeItems',
      title: 'Marquee Items',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Scrolling orange banner that runs diagonally across the hero section. Add one message per item — they repeat automatically to fill the scroll.'
    },
    {
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small pill-shaped badge above the main headline, top-left of the hero copy (e.g. "DROP 014 — LIVE NOW").',
      placeholder: 'DROP 014 — LIVE NOW'
    },
    {
      name: 'headlineLine1',
      title: 'Headline Line 1',
      type: 'string',
      description: 'First line of the large hero headline, shown in plain cream color (top line of 3).',
      placeholder: 'NEW'
    },
    {
      name: 'headlineAccent',
      title: 'Headline Accent',
      type: 'string',
      description: 'Second line of the large hero headline, shown in solid tangerine/orange color (middle line of 3).',
      placeholder: 'DROP.'
    },
    {
      name: 'headlineOutline',
      title: 'Headline Outline',
      type: 'string',
      description: 'Third line of the large hero headline, shown as outlined/hollow text (bottom line of 3).',
      placeholder: 'JUST LANDED.'
    },
    {
      name: 'subtext',
      title: 'Subtext',
      type: 'text',
      description: 'Paragraph below the headline, describing the drop/offer.',
      placeholder: '112 pieces. No restocks. Everything you see sells out by Friday — the ones who move first get to keep it.'
    },
    {
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
      description: 'Text on the main lime-green button below the subtext, e.g. "Shop the Drop". Links to the Products section.',
      placeholder: 'Shop the Drop'
    },
    {
      name: 'tag1Label',
      title: 'Tag 1 Label',
      type: 'string',
      description: 'Small uppercase label on the cream-colored price tag floating over the TOP-LEFT of the hero product image.',
      placeholder: 'Best seller'
    },
    {
      name: 'tag1WasPrice',
      title: 'Tag 1 Was Price',
      type: 'string',
      description: 'Struck-through original price on the top-left tag, shown before the current price (e.g. "$129").',
      placeholder: '$129'
    },
    {
      name: 'tag1Price',
      title: 'Tag 1 Price',
      type: 'string',
      description: 'Current/discounted price shown on the top-left tag, right after the struck-through price.',
      placeholder: '$89'
    },
    {
      name: 'heroProductImage',
      title: 'Hero Product Image',
      type: 'image',
      description: 'Real product photo shown in the center stage of the hero section, replacing the placeholder graphic. If left empty, the default illustration displays instead.'
    },
    {
      name: 'tag2Label',
      title: 'Tag 2 Label',
      type: 'string',
      description: 'Small uppercase label on the hot-pink price tag floating over the BOTTOM-RIGHT of the hero product image.',
      placeholder: 'Only 6 left'
    },
    {
      name: 'tag2Price',
      title: 'Tag 2 Price',
      type: 'string',
      description: 'Price shown on the bottom-right pink tag (no struck-through price on this one).',
      placeholder: '$64'
    },
    {
      name: 'stockPillText',
      title: 'Stock Pill Text',
      type: 'string',
      description: 'Small dark pill badge with a pulsing dot, positioned near the top-right of the hero product image (e.g. "214 sold today").',
      placeholder: '214 sold today'
    }
  ]
}