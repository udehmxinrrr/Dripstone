import {NoticeBanner} from './components/NoticeBanner'

export default {
  name: 'offersSection',
  title: 'Offers Section',
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
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small uppercase label above the section title, centered above "This Week\'s Drop" on the homepage.',
      placeholder: 'While stock lasts'
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Main heading of the Offers section (e.g. "This Week\'s Drop"), shown in lime green.',
      placeholder: "This Week's Drop"
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      description: 'Short description line below the title, explaining the offer/drop.',
      placeholder: "Small batches, no restocks. Once these sell out, they're gone for good."
    }
  ]
}