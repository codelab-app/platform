// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { SeoHead } from 'apps/landing/home/SeoHead'
import * as React from 'react'
import { HomeTemplate, TutorialsBody, TutorialsHeader } from '../../home'

const TutorialsPage = () => {
  return (
    <>
      <SeoHead
        description="Checkout our different tutorials for building different types of user interfaces. From simple to complex, we've got you covered."
        title="Tutorials"
      />
      <TutorialsHeader />
      <TutorialsBody />
    </>
  )
}

TutorialsPage.Layout = HomeTemplate

export default TutorialsPage
