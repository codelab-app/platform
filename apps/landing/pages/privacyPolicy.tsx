import { HomeTemplate } from '../src/home'
import { SeoHead } from '../src/home/SeoHead'

const PrivacyPolicy = () => {
  return (
    <SeoHead
      description="Privacy policy page for Codelab builder"
      title="Privacy Policy"
    />
  )
}

PrivacyPolicy.Layout = HomeTemplate

export default PrivacyPolicy
