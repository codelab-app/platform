import Image from 'next/image'
import React from 'react'

const listItem = [
  {
    alt: 'Salesforce Codelab Integration',
    src: '/integrations/salesforce.svg',
  },
  { alt: 'Shopify Codelab Integration', src: '/integrations/shopify.svg' },
  { alt: 'Airtable Codelab Integration', src: '/integrations/airtable.svg' },
  { alt: 'Zapier Codelab Integration', src: '/integrations/zapier.svg' },
  { alt: 'Twilio Codelab Integration', src: '/integrations/twilio.svg' },
  { alt: 'Supabase Codelab Integration', src: '/integrations/supabase.svg' },
  { alt: 'Sendgrid Codelab Integration', src: '/integrations/sendgrid.svg' },
  { alt: 'AWS S3 Codelab Integration', src: '/integrations/aws3.svg' },
  { alt: 'Stripe Codelab Integration', src: '/integrations/stripe.svg' },
  {
    alt: 'Google Sheets Codelab Integration',
    src: '/integrations/googleSheet.svg',
  },
  { alt: 'Hubspot Codelab Integration', src: '/integrations/hubspot.svg' },
  { alt: 'Firebase Codelab Integration', src: '/integrations/firebase.svg' },
]

export const Integrations = () => {
  return (
    <section className="mt-7 sm:mt-14 md:mt-36">
      <p className="mb-4 text-center text-lg font-bold sm:mb-8 sm:text-xl md:mb-8 md:text-2xl lg:text-3xl">
        Integrations
      </p>
      <ul className="mb-8 flex list-none flex-wrap justify-center px-0 sm:px-6">
        {listItem.map(({ alt, src }, index) => (
          <li className="w-36 px-2 py-6 md:w-40 xl:w-48 2xl:w-auto" key={index}>
            <Image alt={alt} height={45} src={src} width={200} />
          </li>
        ))}
      </ul>
    </section>
  )
}
