import Image from 'next/image'
import React from 'react'
import tw from 'twin.macro'

const listItem = [
  {
    src: '/integrations/salesforce.svg',
    alt: 'Salesforce Codelab Integration',
  },
  { src: '/integrations/shopify.svg', alt: 'Shopify Codelab Integration' },
  { src: '/integrations/airtable.svg', alt: 'Airtable Codelab Integration' },
  { src: '/integrations/zapier.svg', alt: 'Zapier Codelab Integration' },
  { src: '/integrations/twilio.svg', alt: 'Twilio Codelab Integration' },
  { src: '/integrations/supabase.svg', alt: 'Supabase Codelab Integration' },
  { src: '/integrations/sendgrid.svg', alt: 'Sendgrid Codelab Integration' },
  { src: '/integrations/aws3.svg', alt: 'AWS S3 Codelab Integration' },
  { src: '/integrations/stripe.svg', alt: 'Stripe Codelab Integration' },
  {
    src: '/integrations/googleSheet.svg',
    alt: 'Google Sheets Codelab Integration',
  },
  { src: '/integrations/hubspot.svg', alt: 'Hubspot Codelab Integration' },
  { src: '/integrations/firebase.svg', alt: 'Firebase Codelab Integration' },
]

export const Integrations = () => {
  return (
    <section css={tw`mt-7 sm:mt-14 md:mt-36`}>
      <p
        css={tw`text-center text-lg sm:text-xl md:text-2xl lg:text-3xl md:mb-8 mb-4 sm:mb-8 font-bold`}
      >
        Integrations
      </p>
      <ul css={tw`list-none flex flex-wrap px-0 sm:px-6  mb-8 justify-center`}>
        {listItem.map(({ alt, src }, index) => (
          <li css={tw`py-6 px-2 w-36 md:w-40 xl:w-48 2xl:w-auto`} key={index}>
            <Image alt={alt} height={45} src={src} width={200} />
          </li>
        ))}
      </ul>
    </section>
  )
}
