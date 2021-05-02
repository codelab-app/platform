import React from 'react'
import { LayoutHome } from '../src/layout/Layout--home'
import { HomeClients } from '../src/pages/home/Home-clients'
import { HomeFeatures } from '../src/pages/home/Home-features'
import { HomeJumbo } from '../src/pages/home/Home-jumbo'
import { NextPageLayout } from '../src/layout/Layout.d'
import xw from 'xwind'

const HomePage: NextPageLayout = () => {
  return (
    <>
      <div css={xw`text-red-500`}>Test</div>
      <HomeJumbo />
      <HomeClients />
      <HomeFeatures />
    </>
  )
}

HomePage.Layout = LayoutHome

export default HomePage
