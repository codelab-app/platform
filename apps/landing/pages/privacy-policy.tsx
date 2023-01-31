import React from 'react'
import { HomeTemplate } from '../home'
import { SeoHead } from '../home/SeoHead'

const PrivacyPolicy = () => {
  return (
    <>
      <SeoHead
        description="Privacy policy page for Codelab platform"
        title="Privacy Policy"
      />
    </>
  )
}

PrivacyPolicy.Layout = HomeTemplate

export default PrivacyPolicy
