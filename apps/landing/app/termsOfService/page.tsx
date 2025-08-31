import type { Metadata } from 'next'

import TermsOfServiceClient from './terms-of-service-client'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for Codelab builder',
}

const TermsOfServicePage = () => {
  return <TermsOfServiceClient />
}

export default TermsOfServicePage
