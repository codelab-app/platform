import { useMachine } from '@xstate/react'
import axios from 'axios'
import { AppProps } from 'next/app'
import React from 'react'
import { machineApp } from '@codelab/state/app'
import 'antd/dist/antd.css'
import 'highlight.js/styles/github.css'

axios.defaults.baseURL = `http://localhost:${process.env.NEXT_PUBLIC_API_PORT}/api/V1`
axios.defaults.headers.post['Content-Type'] = 'application/json'

const App: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props
  const [stateApp, sendApp, serviceApp] = useMachine(machineApp)

  // const machineModal = stateApp.context.machineModalRef
  // const machineNode = stateApp.context.machineNodeRef
  // const [stateModal, sendModal] = useActor(machineModal)
  // const [stateNode, sendNode] = useActor(machineNode)

  const customPageProps = {
    stateApp,
    sendApp,
    serviceApp,
    // machineModal,
    // machineNode,
    // stateModal,
    // stateNode,
    // sendModal,
    // sendNode,
  }

  return <Component {...pageProps} {...customPageProps} />
}

export default App
