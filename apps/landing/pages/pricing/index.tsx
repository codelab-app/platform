import Head from 'next/head'
import * as React from 'react'
import { HomeTemplate, PricingBody, PricingHeader } from '../../home'

const PricingPage = () => {
  return (
    <>
      <Head>
        <title>Pricing</title>
      </Head>
      <PricingHeader />
      <PricingBody />
    </>
  )
}

PricingPage.Layout = HomeTemplate

export default PricingPage
