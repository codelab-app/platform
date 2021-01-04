import axios from 'axios'
import { AppProps } from 'next/app'
import React from 'react'
import { createMachineApp } from '@codelab/alpha/state/app'
import { MachineProvider } from '@codelab/alpha/ui/component'

import 'antd/dist/antd.css'
import 'highlight.js/styles/monokai-sublime.css'

axios.defaults.headers.post['Content-Type'] = 'application/json'

// TODO: MachineProvider increases page load speed
const App: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props
  // const apolloClient = useApollo(pageProps.initialApolloState)
  const machineApp = createMachineApp()

  return (
    <MachineProvider machine={machineApp}>
      <Component {...pageProps} />
    </MachineProvider>
  )
}

export default App
