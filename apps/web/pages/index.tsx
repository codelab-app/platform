import { NextPage } from 'next'
import React from 'react'
import { HomeClients } from '../src/pages/home/Home-clients'
import { HomeFeatures } from '../src/pages/home/Home-features'
import { HomeJumbo } from '../src/pages/home/Home-jumbo'

const HomePage: NextPage = () => {
  return (
    <>
      <HomeJumbo />
      <HomeClients />
      <HomeFeatures />
    </>
  )
}

export default HomePage
