import axios from 'axios'
import { AppProps } from 'next/app'
import React from 'react'
import { CacheProvider } from 'rest-hooks'
import { machineApp } from '@codelab/state/app'
import { MachineProvider } from '@codelab/ui/component'
import 'antd/dist/antd.css'
// import 'highlight.js/styles/github.css'
import 'highlight.js/styles/monokai-sublime.css'

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_ORIGIN}/${process.env.NEXT_PUBLIC_API_PATHNAME}`
axios.defaults.headers.post['Content-Type'] = 'application/json'

// TODO: MachineProvider increases page load speed
const App: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props

  return (
    <CacheProvider>
      <MachineProvider machine={machineApp}>
        <Component {...pageProps} />
      </MachineProvider>
    </CacheProvider>
  )
}

export default App
