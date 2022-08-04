import dynamic from 'next/dynamic'
import Head from 'next/head'
import React from 'react'
import { Clients, HomeTemplate } from '../home'
import { BestPractices } from '../home/bestPractices/BestPractices'

/**
 * We are using some jQuery components, so SSR can't work because jQuery needs to be loaded first
 */
const DynamicHomeJumbo = dynamic<any>(
  () => import('../home').then((mod) => mod.HomeJumbo),
  { ssr: false },
)

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Codelab</title>
      </Head>
      <DynamicHomeJumbo />
      <Clients />
      <BestPractices />
      {/* <Features /> */}
    </>
  )
}

HomePage.Layout = HomeTemplate

export default HomePage
