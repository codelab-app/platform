import DemoFormRender from 'apps/web/src/demo/DemoFormRender'
import Head from 'next/head'
import React from 'react'

const DemoFormPage = () => {
  return (
    <>
      <Head>
        <title>Demo Forms | Codelab</title>
      </Head>

      <DemoFormRender />
    </>
  )
}

export default DemoFormPage
