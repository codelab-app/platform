'use client'

import { BestPractices } from '../src/home/bestPractices/BestPractices'
import { Clients } from '../src/home/Clients'
import { JoinCommunity } from '../src/home/community/JoinCommunity'
import { DataPipeline } from '../src/home/dataPipeline/DataPipeline'
import { BannerSection } from '../src/home/hero/BannerSection'
import HomeTemplate from '../src/home/HomeTemplate'

const HomePageClient = () => {
  return (
    <HomeTemplate>
      <BannerSection />
      <Clients />
      <BestPractices />
      <DataPipeline />
      <JoinCommunity />
    </HomeTemplate>
  )
}

export default HomePageClient
