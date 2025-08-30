import Image from 'next/image'

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
    <section
      className={`
        mt-7
        sm:mt-14
        md:mt-36
      `}
    >
      <p
        className={`
          mb-8 text-center text-lg font-bold
          sm:mb-10 sm:text-xl
          md:mb-12 md:text-2xl
          lg:text-3xl
        `}
      >
        Integrations
      </p>
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
          {listItem.map(({ alt, src }, index) => (
            <div className="flex items-center justify-center p-4" key={index}>
              <Image
                alt={alt}
                className="h-auto w-full max-w-[120px] opacity-70 transition-opacity hover:opacity-100"
                height={45}
                src={src}
                width={120}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
