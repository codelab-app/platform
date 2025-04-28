import { HomeTemplate, PricingBody, PricingHeader } from '../../src/home'
import { SeoHead } from '../../src/home/SeoHead'

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
