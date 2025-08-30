import type { Metadata } from 'next'

import HomePageClient from './home-page-client'

export const metadata: Metadata = {
  title: 'Codelab',
  description: 'Build Using HTML tags Without Template Limitations',
}

const HomePage = () => {
  return <HomePageClient />
}

export default HomePage
