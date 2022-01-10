import { CodelabPage } from '@codelab/frontend/abstract/props'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import React from 'react'
import {
  HomeClients,
  HomeConcept,
  HomeFeatures,
  HomeTemplate,
  HomeTemplateProps,
} from '../src/home'

/**
 * We are using some jQuery components, so SSR can't work because jQuery needs to be loaded first
 */
const DynamicHomeJumbo = dynamic<any>(
  () => import('../src/home').then((mod) => mod.HomeJumbo),
  { ssr: false },
)

const HomePage: CodelabPage<HomeTemplateProps> = () => {
  return (
    <>
      <Head>
        <title>Codelab</title>
      </Head>
      <DynamicHomeJumbo />
      <HomeClients />
      <HomeConcept />
      <HomeFeatures />
    </>
  )
}

HomePage.Template = HomeTemplate

export default HomePage
