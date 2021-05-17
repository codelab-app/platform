import React from 'react'
import tw from 'twin.macro'
import { NextPageLayout } from '../src/layout/Layout.d'
import { LayoutHome } from '../src/layout/Layout--home'
import { HomeClients } from '../src/pages/home/Home-clients'
import { HomeFeatures } from '../src/pages/home/Home-features'
import { HomeJumbo } from '../src/pages/home/Home-jumbo'

const HomePage: NextPageLayout = () => {
  console.log(tw`text-red-500 m-10`)

  return (
    <>
      <div css={[tw`text-red-500 m-10`]}>Test</div>
      <div tw="text-red-500 m-10">Test</div>
      <HomeJumbo />
      <HomeClients />
      <HomeFeatures />
    </>
  )
}

HomePage.Layout = LayoutHome

export default HomePage
