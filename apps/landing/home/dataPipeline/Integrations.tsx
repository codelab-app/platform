import Image from 'next/image'
import React from 'react'
import tw from 'twin.macro'

const listItem = [
  { src: '/integrations/salesforce.svg' },
  { src: '/integrations/shopify.svg' },
  { src: '/integrations/airtable.svg' },
  { src: '/integrations/zapier.svg' },
  { src: '/integrations/twilio.svg' },
  { src: '/integrations/supabase.svg' },
  { src: '/integrations/sendgrid.svg' },
  { src: '/integrations/aws3.svg' },
  { src: '/integrations/stripe.svg' },
  { src: '/integrations/googleSheet.svg' },
  { src: '/integrations/hubspot.svg' },
  { src: '/integrations/firebase.svg' },
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
        {listItem.map((item, index) => (
          <li css={tw`py-6 px-2 w-36 md:w-40 xl:w-48 2xl:w-auto`} key={index}>
            <Image height={45} src={item.src} width={200} />
          </li>
        ))}
      </ul>
    </section>
  )
}
