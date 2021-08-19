import { CodelabPage } from '@codelab/frontend/abstract/props'
import Head from 'next/head'
import React from 'react'
import { HomeClients, HomeFeatures, HomeJumbo, HomeTemplate } from '../src/home'

const HomePage: CodelabPage = () => {
  return (
    <>
      <Head>
        <title>Codelab</title>
      </Head>

      <HomeJumbo />
      <HomeClients />
      <HomeFeatures />
    </>
  )
}

HomePage.Template = HomeTemplate
HomePage.Header = null
HomePage.MetaPane = null
HomePage.MainPane = null
HomePage.SidebarNavigation = null

export default HomePage
