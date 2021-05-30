import React from 'react'
import { HomeClients } from '../src/pages/home/Home-clients'
import { HomeFeatures } from '../src/pages/home/Home-features'
import { HomeJumbo } from '../src/pages/home/Home-jumbo'
import { NextPageLayout } from '../src/templates/Layout.d'
import { LayoutHome } from '../src/templates/Layout--home'

const HomePage: NextPageLayout = () => {
  return (
    <>
      <HomeJumbo />
      <HomeClients />
      <HomeFeatures />
    </>
  )
}

HomePage.Layout = LayoutHome

export default HomePage
