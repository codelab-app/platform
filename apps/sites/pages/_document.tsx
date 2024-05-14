import { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

const MyDocument = () => (
  <Html>
    <Head>
      <link href="https://fonts.googleapis.com" rel="preconnect" />
      <link crossOrigin="" href="https://fonts.gstatic.com" rel="preconnect" />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800;900&family=Nunito:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default MyDocument
