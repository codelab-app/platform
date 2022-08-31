import Head from 'next/head'
import React from 'react'
import { BannerSection, Clients, HomeTemplate } from '../home'
// import { Architecture } from '../home/architecture/Architecture'
import { BestPractices } from '../home/bestPractices/BestPractices'
import { JoinCommunity } from '../home/community/JoinCommunity'

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Codelab</title>
      </Head>
      <BannerSection />
      <Clients />
      {/* <Architecture /> */}
      <BestPractices />
      <JoinCommunity />
    </>
  )
}

HomePage.Layout = HomeTemplate

export default HomePage
