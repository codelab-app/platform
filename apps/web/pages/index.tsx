import { CodelabPage } from '@codelab/frontend/abstract/types'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import React from 'react'
import { Clients, Features, HomeTemplate } from '../src/home'
import { BestPractices } from '../src/home/BestPractices'

/**
 * We are using some jQuery components, so SSR can't work because jQuery needs to be loaded first
 */
const DynamicHomeJumbo = dynamic<any>(
  () => import('../src/home').then((mod) => mod.HomeJumbo),
  { ssr: false },
)

const HomePage: CodelabPage<any> = () => {
  return (
    <>
      <Head>
        <title>Codelab</title>
      </Head>
      <DynamicHomeJumbo />
      <Clients />
      <BestPractices />
      <Features />
    </>
  )
}

HomePage.Layout = HomeTemplate

export default HomePage
