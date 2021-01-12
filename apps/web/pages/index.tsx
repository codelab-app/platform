import React from 'react'
import { HomeClients } from '../src/home/Home-clients'
import { HomeFeatures } from '../src/home/Home-features'
import { HomeJumbo } from '../src/home/Home-jumbo'
import { withApollo } from '@codelab/frontend'

const HomePage = () => {
  return (
    <>
      <HomeJumbo />
      <HomeClients />
      <HomeFeatures />
    </>
  )
}

export default withApollo(HomePage)
