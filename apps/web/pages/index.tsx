import { CodelabPage } from '@codelab/frontend/abstract/props'
import { useGetMeQuery } from '@codelab/frontend/modules/user'
import Head from 'next/head'
import React from 'react'
import {
  HomeClients,
  HomeFeatures,
  HomeJumbo,
  HomeTemplate,
  HomeTemplateProps,
} from '../src/home'

const HomePage: CodelabPage<HomeTemplateProps> = () => {
  const { data } = useGetMeQuery()

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

export default HomePage
