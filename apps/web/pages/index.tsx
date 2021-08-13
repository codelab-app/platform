import { NextPageTemplate } from '@codelab/frontend/abstract/props'
import React from 'react'
import { HomeClients } from '../src/home/HomeClients'
import { HomeFeatures } from '../src/home/HomeFeatures'
import { HomeJumbo } from '../src/home/HomeJumbo'
import { HomeTemplate } from '../src/home/HomeTemplate'

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
