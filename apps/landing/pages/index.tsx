import React from 'react'
import { BannerSection, Clients, HomeTemplate } from '../home'
// import { Architecture } from '../home/architecture/Architecture'
import { BestPractices } from '../home/bestPractices/BestPractices'
import { JoinCommunity } from '../home/community/JoinCommunity'
import { DataPipeline } from '../home/dataPipeline/DataPipeline'
import { SeoHead } from '../home/SeoHead'

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
