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
    <section css={tw`mt-36`}>
      <p css={tw`text-center text-3xl mb-16 font-bold`}>Integrations</p>
      <ul css={tw`list-none flex flex-wrap px-6 justify-center`}>
        {listItem.map((item) => (
          <li css={tw`py-6 px-2`}>
            <Image height={45} src={item.src} width={200} />
          </li>
        ))}
      </ul>
    </section>
  )
}
