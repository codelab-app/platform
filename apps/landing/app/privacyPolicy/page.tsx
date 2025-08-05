import type { Metadata } from 'next'

import PrivacyPolicyClient from './privacy-policy-client'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy page for Codelab builder',
}

const PrivacyPolicyPage = () => {
  return <PrivacyPolicyClient />
}

export default PrivacyPolicyPage
