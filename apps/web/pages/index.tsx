import { NextPageTemplate } from '@codelab/frontend/abstract/props'
import React from 'react'
import { HomeClients } from '../src/home/Home-clients'
import { HomeFeatures } from '../src/home/Home-features'
import { HomeJumbo } from '../src/home/Home-jumbo'
import { HomeTemplate } from '../src/templates/HomeTemplate'

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
