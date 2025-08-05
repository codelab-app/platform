'use client'

import HomeTemplate from '../../src/home/HomeTemplate'
import { PricingBody } from '../../src/home/pricing/PricingBody'
import { PricingHeader } from '../../src/home/pricing/PricingHeader'

const PricingPageClient = () => {
  return (
    <HomeTemplate>
      <PricingHeader />
      <PricingBody />
    </HomeTemplate>
  )
}

export default PricingPageClient
