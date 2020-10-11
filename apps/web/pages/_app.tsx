import axios from 'axios'
import { AppProps } from 'next/app'
import React from 'react'
import { machineApp } from '@codelab/state/app'
import { MachineProvider } from '@codelab/ui/component'
import 'antd/dist/antd.css'
import 'highlight.js/styles/github.css'

axios.defaults.baseURL = `http://localhost:${process.env.NEXT_PUBLIC_API_PORT}/api/V1`
axios.defaults.headers.post['Content-Type'] = 'application/json'

const App: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props

  return (
    <MachineProvider machine={machineApp}>
      <Component {...pageProps} />
    </MachineProvider>
  )
}

export default App
