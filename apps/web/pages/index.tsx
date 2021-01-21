import { NextPage } from 'next'
import * as R from 'ramda'
import React from 'react'
import { HomeClients } from '../src/home/Home-clients'
import { HomeFeatures } from '../src/home/Home-features'
import { HomeJumbo } from '../src/home/Home-jumbo'
import { withApollo } from '@codelab/frontend'

const HomePage: NextPage = (props) => {
  return (
    <>
      <HomeJumbo />
      <HomeClients />
      <HomeFeatures />
    </>
  )
}

export default R.pipe(withApollo)(HomePage)
