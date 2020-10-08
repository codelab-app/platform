import axios from 'axios'
import { AppProps } from 'next/app'
import React from 'react'
import 'antd/dist/antd.css'
import 'highlight.js/styles/github.css'

axios.defaults.baseURL = `http://localhost:${process.env.NEXT_PUBLIC_API_PORT}/api/V1`
axios.defaults.headers.post['Content-Type'] = 'application/json'

const App: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props

  return <Component {...pageProps} />
}

export default App
