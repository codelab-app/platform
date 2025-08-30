import type { Metadata } from 'next'

import PricingPageClient from './pricing-page-client'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    "Whether you're trying out our product, or building your next startup, we have you covered with our different plans",
}

const PricingPage = () => {
  return <PricingPageClient />
}

export default PricingPage
