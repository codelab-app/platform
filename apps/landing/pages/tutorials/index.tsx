import Head from 'next/head'
import * as React from 'react'
import { HomeTemplate, TutorialsBody, TutorialsHeader } from '../../home'

const TutorialsPage = () => {
  return (
    <>
      <Head>
        <title>Tutorials</title>
      </Head>
      <TutorialsHeader />
      <TutorialsBody />
    </>
  )
}

TutorialsPage.Layout = HomeTemplate

export default TutorialsPage
