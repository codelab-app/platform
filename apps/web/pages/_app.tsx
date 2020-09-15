import { AppProps } from 'next/app'
import React from 'react'
import 'antd/dist/antd.css'

const App: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props

  return <Component {...pageProps} />
}

export default App
