import React from 'react'
import { HomeFeatures } from '../src/home/Home-features'
import { HomeJumbo } from '../src/home/Home-jumbo'
import { withApollo } from '@codelab/frontend'

const HomePage = () => {
  return (
    <>
      <HomeJumbo />
      <HomeFeatures />
    </>
  )
}

export default withApollo(HomePage)
