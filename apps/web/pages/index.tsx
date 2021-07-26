import React from 'react'
import { HomeClients } from '../src/sections/home/Home-clients'
import { HomeFeatures } from '../src/sections/home/Home-features'
import { HomeJumbo } from '../src/sections/home/Home-jumbo'
import { HomeTemplate } from '../src/templates/HomeTemplate'
import { NextPageTemplate } from '../src/templates/Layout.d'

const HomePage: NextPageTemplate = () => {
  return (
    <>
      <HomeJumbo />
      <HomeClients />
      <HomeFeatures />
    </>
  )
}

HomePage.Template = HomeTemplate

export default HomePage
