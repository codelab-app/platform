import { ApolloProvider } from '@apollo/client'
import axios from 'axios'
import { AppProps } from 'next/app'
import React from 'react'
import { CacheProvider } from 'rest-hooks'
import { NodeService as NodeServiceEntity } from '@codelab/core/node'
import { machineApp } from '@codelab/state/app'
import { MachineProvider, NodeServiceProvider } from '@codelab/ui/component'
import { useApollo } from '@codelab/ui/hoc'

import 'antd/dist/antd.css'
// import 'highlight.js/styles/github.css'
import 'highlight.js/styles/monokai-sublime.css'

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_ORIGIN}/${process.env.NEXT_PUBLIC_API_PATHNAME}`
axios.defaults.headers.post['Content-Type'] = 'application/json'

// TODO: MachineProvider increases page load speed
const App: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props

  const apolloClient = useApollo(pageProps.initialApolloState)
  const nodeService = new NodeServiceEntity()
  const machineAppConnected = machineApp.withConfig({
    actions: {
      createNode: (ctx, event) => {
        console.log('create node')
        nodeService.createNode(event.payload, () => {
          console.log('node saved!!!')
        })
      },
      updateNode: (ctx, event) => {
        // nodeService.updateNode(formData)
        console.log('update node')
      },
      deleteNode: (ctx, event) => {
        console.log('delete node')
      },
      // 'getNodes': (ctx, event) => { }
    },
  })

  return (
    <ApolloProvider client={apolloClient}>
      <CacheProvider>
        <NodeServiceProvider nodeService={nodeService}>
          <MachineProvider machine={machineAppConnected}>
            <Component {...pageProps} />
          </MachineProvider>
        </NodeServiceProvider>
      </CacheProvider>
    </ApolloProvider>
  )
}

export default App
