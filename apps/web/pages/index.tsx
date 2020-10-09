import { Button } from 'antd'
import React from 'react'

const Index = (props: any) => {
  return (
    <>
      <Button onClick={() => props.sendNode('LOAD')}>Load</Button>
      <Button onClick={() => props.sendModal('OPEN')}>On</Button>
      <Button onClick={() => props.sendModal('CLOSE')}>Off</Button>
      <p>App state: {JSON.stringify(props.stateApp.value)}</p>
      <p>Modal state: {JSON.stringify(props.stateModal.value)}</p>
      <p>Node state: {JSON.stringify(props.stateNode.context.nodes)}</p>
    </>
  )
}

export default Index
