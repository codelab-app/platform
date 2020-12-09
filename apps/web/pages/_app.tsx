import axios from 'axios'
import { AppProps } from 'next/app'
import React from 'react'
import { createMachineApp } from '@codelab/state/app'
import { MachineProvider } from '@codelab/ui/component'

import 'antd/dist/antd.css'
import 'highlight.js/styles/monokai-sublime.css'

// axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_ORIGIN}/${process.env.NEXT_PUBLIC_API_PATHNAME}`
axios.defaults.headers.post['Content-Type'] = 'application/json'

// TODO: MachineProvider increases page load speed
const App: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props
  // const apolloClient = useApollo(pageProps.initialApolloState)
  // const nodeService = new NodeServiceEntity()
  const machineApp = createMachineApp()

  return (
    // <ApolloProvider client={apolloClient}>
    // <NodeServiceProvider nodeService={nodeService}>
    <MachineProvider machine={machineApp}>
      <Component {...pageProps} />
    </MachineProvider>
    // </NodeServiceProvider>
    // </ApolloProvider>
  )
}

export default App
