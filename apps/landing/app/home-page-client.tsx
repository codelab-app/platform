'use client'

import { BestPractices } from '../src/home/bestPractices/BestPractices'
import { Clients } from '../src/home/Clients'
import { JoinCommunity } from '../src/home/community/JoinCommunity'
import { DataPipeline } from '../src/home/dataPipeline/DataPipeline'
import { HeroSection } from '../src/home/hero/HeroSection'
import HomeTemplate from '../src/home/HomeTemplate'

const HomePageClient = () => {
  return (
    <HomeTemplate>
      <HeroSection />
      <Clients />
      <BestPractices />
      <DataPipeline />
      <JoinCommunity />
    </HomeTemplate>
  )
}

export default HomePageClient
