/* eslint-disable @nx/enforce-module-boundaries */
import { SeoHead } from 'apps/landing/home/SeoHead'
import * as React from 'react'
import { HomeTemplate, PricingBody, PricingHeader } from '../../home'

const PricingPage = () => {
  return (
    <>
      <SeoHead
        description="Whether you're trying out our product, or building your next startup, we have you covered with our different plans"
        title="Pricing"
      />
      <PricingHeader />
      <PricingBody />
    </>
  )
}

PricingPage.Layout = HomeTemplate

export default PricingPage
