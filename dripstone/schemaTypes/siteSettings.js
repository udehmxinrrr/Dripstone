import {NoticeBanner} from './components/NoticeBanner'

export default {
  name: 'siteSettings',
  title: 'Site Settings',
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
      name: 'storeName',
      title: 'Store Name',
      type: 'string',
      description: 'Your store\'s name — shown in the navbar next to the logo mark, and used to build the footer logo automatically.',
      placeholder: 'DripStone'
    },
    {
      name: 'currencyCode',
      title: 'Currency Code',
      type: 'string',
      description: 'Currency used for every price shown across the site — homepage, cart, and checkout.',
      options: {
        list: [
          { title: 'US Dollar (USD)', value: 'USD' },
          { title: 'Euro (EUR)', value: 'EUR' },
          { title: 'British Pound (GBP)', value: 'GBP' },
          { title: 'Japanese Yen (JPY)', value: 'JPY' },
          { title: 'Swiss Franc (CHF)', value: 'CHF' },
          { title: 'Canadian Dollar (CAD)', value: 'CAD' },
          { title: 'Australian Dollar (AUD)', value: 'AUD' },
          { title: 'New Zealand Dollar (NZD)', value: 'NZD' },
          { title: 'Chinese Yuan (CNY)', value: 'CNY' },
          { title: 'Hong Kong Dollar (HKD)', value: 'HKD' },
          { title: 'Singapore Dollar (SGD)', value: 'SGD' },
          { title: 'South Korean Won (KRW)', value: 'KRW' },
          { title: 'Indian Rupee (INR)', value: 'INR' },
          { title: 'Indonesian Rupiah (IDR)', value: 'IDR' },
          { title: 'Malaysian Ringgit (MYR)', value: 'MYR' },
          { title: 'Thai Baht (THB)', value: 'THB' },
          { title: 'Philippine Peso (PHP)', value: 'PHP' },
          { title: 'Vietnamese Dong (VND)', value: 'VND' },
          { title: 'Pakistani Rupee (PKR)', value: 'PKR' },
          { title: 'Bangladeshi Taka (BDT)', value: 'BDT' },
          { title: 'Kenyan Shilling (KES)', value: 'KES' },
          { title: 'Nigerian Naira (NGN)', value: 'NGN' },
          { title: 'South African Rand (ZAR)', value: 'ZAR' },
          { title: 'Ghanaian Cedi (GHS)', value: 'GHS' },
          { title: 'Egyptian Pound (EGP)', value: 'EGP' },
          { title: 'Moroccan Dirham (MAD)', value: 'MAD' },
          { title: 'Ethiopian Birr (ETB)', value: 'ETB' },
          { title: 'Ugandan Shilling (UGX)', value: 'UGX' },
          { title: 'Tanzanian Shilling (TZS)', value: 'TZS' },
          { title: 'Rwandan Franc (RWF)', value: 'RWF' },
          { title: 'UAE Dirham (AED)', value: 'AED' },
          { title: 'Saudi Riyal (SAR)', value: 'SAR' },
          { title: 'Qatari Riyal (QAR)', value: 'QAR' },
          { title: 'Kuwaiti Dinar (KWD)', value: 'KWD' },
          { title: 'Israeli Shekel (ILS)', value: 'ILS' },
          { title: 'Turkish Lira (TRY)', value: 'TRY' },
          { title: 'Russian Ruble (RUB)', value: 'RUB' },
          { title: 'Polish Zloty (PLN)', value: 'PLN' },
          { title: 'Swedish Krona (SEK)', value: 'SEK' },
          { title: 'Norwegian Krone (NOK)', value: 'NOK' },
          { title: 'Danish Krone (DKK)', value: 'DKK' },
          { title: 'Czech Koruna (CZK)', value: 'CZK' },
          { title: 'Hungarian Forint (HUF)', value: 'HUF' },
          { title: 'Romanian Leu (RON)', value: 'RON' },
          { title: 'Ukrainian Hryvnia (UAH)', value: 'UAH' },
          { title: 'Mexican Peso (MXN)', value: 'MXN' },
          { title: 'Brazilian Real (BRL)', value: 'BRL' },
          { title: 'Argentine Peso (ARS)', value: 'ARS' },
          { title: 'Chilean Peso (CLP)', value: 'CLP' },
          { title: 'Colombian Peso (COP)', value: 'COP' },
          { title: 'Peruvian Sol (PEN)', value: 'PEN' }
        ]
      }
    }
  ]
}