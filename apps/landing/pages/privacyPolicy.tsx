import React from 'react'
import { HomeTemplate } from '../src/home'
import { SeoHead } from '../src/home/SeoHead'

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
