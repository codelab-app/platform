import { NextPage } from 'next'
import React from 'react'
import { HomeClients } from '../src/pages/home/Home-clients'
import { HomeFeatures } from '../src/pages/home/Home-features'
import { HomeJumbo } from '../src/pages/home/Home-jumbo'
import { withAuthServerSideProps } from '@codelab/frontend'

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

export default HomePage
