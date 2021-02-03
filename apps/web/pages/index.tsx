import { NextPage } from 'next'
import * as R from 'ramda'
import React from 'react'
import { HomeClients } from '../src/home/Home-clients'
import { HomeFeatures } from '../src/home/Home-features'
import { HomeJumbo } from '../src/home/Home-jumbo'
import { withApollo, withAuthServerSideProps } from '@codelab/frontend'

const HomePage: NextPage = (props) => {
  return (
    <>
      <HomeJumbo />
      <HomeClients />
      <HomeFeatures />
    </>
  )
}

// Redirect to /apps if the user is logged in
export const getServerSideProps = withAuthServerSideProps((context, user) => {
  if (user) {
    return undefined
    // return {
    //   redirect: {
    //     destination: '/apps',
    //     permanent: false,
    //   },
    // }
  }

  return undefined
})

const IndexPage = R.pipe(withApollo)(HomePage)

export default IndexPage
