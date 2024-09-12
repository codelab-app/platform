import { HomeTemplate } from '../src/home'
import { SeoHead } from '../src/home/SeoHead'

const TermsOfService = () => {
  return (
    <>
      <SeoHead
        description="Terms of service for Codelab builder"
        title="Terms of Service"
      />
    </>
  )
}

TermsOfService.Layout = HomeTemplate

export default TermsOfService
