import React from 'react'
import { BannerSection, Clients, HomeTemplate } from '../src/home'
// import { Architecture } from '../home/architecture/Architecture'
import { BestPractices } from '../src/home/bestPractices/BestPractices'
import { JoinCommunity } from '../src/home/community/JoinCommunity'
import { DataPipeline } from '../src/home/dataPipeline/DataPipeline'
import { SeoHead } from '../src/home/SeoHead'

const HomePage = () => {
  return (
    <>
      <SeoHead
        description="Build Using HTML tags Without Template Limitations"
        title="Codelab"
      />
      <BannerSection />
      <Clients />
      {/* <Architecture /> */}
      <BestPractices />
      <DataPipeline />
      <JoinCommunity />
    </>
  )
}

HomePage.Layout = HomeTemplate

export default HomePage
