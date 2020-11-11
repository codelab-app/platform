import axios from 'axios'
import { AppProps } from 'next/app'
import React from 'react'
import { CacheProvider } from 'rest-hooks'
import { NodeService as NodeServiceEntity } from '@codelab/core/node'
// import { NodeService as ApolloNodeServiceEntity } from '../src/index/nodeService'
import { createMachineApp } from '@codelab/state/app'
import { MachineProvider, NodeServiceProvider } from '@codelab/ui/component'
import 'antd/dist/antd.css'
// import 'highlight.js/styles/github.css'
import 'highlight.js/styles/monokai-sublime.css'
import { getApolloClient } from '@codelab/ui/hoc'

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_ORIGIN}/${process.env.NEXT_PUBLIC_API_PATHNAME}`
axios.defaults.headers.post['Content-Type'] = 'application/json'

// TODO: MachineProvider increases page load speed
const App: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props
  // const apolloClient = useApollo(pageProps.initialApolloState)
  const nodeService = new NodeServiceEntity()

  // const apolloNodeService = new ApolloNodeServiceEntity(getApolloClient())
  const machineApp = createMachineApp(nodeService, getApolloClient())

  return (
    // <ApolloProvider client={apolloClient}>
    <CacheProvider>
      <NodeServiceProvider nodeService={nodeService}>
        <MachineProvider machine={machineApp}>
          <Component {...pageProps} />
        </MachineProvider>
      </NodeServiceProvider>
    </CacheProvider>
    // </ApolloProvider>
  )
}

export default App
