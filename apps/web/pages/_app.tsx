import axios from 'axios'
import { AppProps } from 'next/app'
import React from 'react'
import { NodeService as NodeServiceEntity } from '@codelab/core/node'
import { createMachineApp } from '@codelab/state/app'
import { MachineProvider, NodeServiceProvider } from '@codelab/ui/component'
import { getApolloClient } from '@codelab/ui/hoc'

import 'antd/dist/antd.css'
import 'highlight.js/styles/monokai-sublime.css'

// axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_ORIGIN}/${process.env.NEXT_PUBLIC_API_PATHNAME}`
axios.defaults.headers.post['Content-Type'] = 'application/json'

// TODO: MachineProvider increases page load speed
const App: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props
  // const apolloClient = useApollo(pageProps.initialApolloState)
  const nodeService = new NodeServiceEntity()

  const machineApp = createMachineApp(nodeService, getApolloClient())

  return (
    // <ApolloProvider client={apolloClient}>
    <NodeServiceProvider nodeService={nodeService}>
      <MachineProvider machine={machineApp}>
        <Component {...pageProps} />
      </MachineProvider>
    </NodeServiceProvider>
    // </ApolloProvider>
  )
}

export default App
