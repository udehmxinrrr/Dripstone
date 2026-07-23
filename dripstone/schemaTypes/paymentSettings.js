export default {
  name: 'paymentSettings',
  title: 'Payment Settings',
  type: 'document',
  fields: [
    { name: 'enableStripe', title: 'Enable Stripe', type: 'boolean', initialValue: false },
    {
      name: 'stripePublishableKey',
      title: 'Stripe Publishable Key',
      type: 'string',
      description: 'Safe to expose publicly — starts with pk_ (never paste your secret key here)'
    },
    { name: 'enablePaypal', title: 'Enable PayPal', type: 'boolean', initialValue: false },
    {
      name: 'paypalClientId',
      title: 'PayPal Client ID',
      type: 'string',
      description: 'Safe to expose publicly — found in your PayPal Developer Dashboard'
    }
  ]
}