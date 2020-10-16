import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import axios from 'axios'
import { AppProps } from 'next/app'
import React from 'react'
import { CacheProvider } from 'rest-hooks'
import { NodeService } from '@codelab/core/node'
import { machineApp } from '@codelab/state/app'
import { MachineProvider, NodeServiceProvider } from '@codelab/ui/component'

import 'antd/dist/antd.css'
// import 'highlight.js/styles/github.css'
import 'highlight.js/styles/monokai-sublime.css'

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_ORIGIN}/${process.env.NEXT_PUBLIC_API_PATHNAME}`
axios.defaults.headers.post['Content-Type'] = 'application/json'

const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_API_ORIGIN}/graphql`,
  cache: new InMemoryCache(),
})

// TODO: MachineProvider increases page load speed
const App: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props

  return (
    <ApolloProvider client={client}>
      <CacheProvider>
        <NodeServiceProvider nodeService={new NodeService()}>
          <MachineProvider machine={machineApp}>
            <Component {...pageProps} />
          </MachineProvider>
        </NodeServiceProvider>
      </CacheProvider>
    </ApolloProvider>
  )
}

export default App
