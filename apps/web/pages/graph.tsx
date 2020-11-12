import { useActor, useService } from '@xstate/react'
import { Button, Modal } from 'antd'
import React, { useContext } from 'react'
import { EventNameApp } from '@codelab/state/app'
import { MachineContext, ReactJson } from '@codelab/ui/component'

const GraphPage = () => {
  const { actors } = useContext(MachineContext)
  const [appState, appSend] = useService(actors.app)
  const [vertexState] = useActor(actors.vertex)

  // const createVertex = () =>
  //   mutate<CreateGraphMutation, CreateGraphMutationVariables>(
  //     getApolloClient(),
  //     {
  //       mutation: CreateGraphDocument,
  //       variables: {
  //         input: {
  //           label: 'My Graph',
  //         },
  //       },
  //       context: {
  //         clientName: 'hasura',
  //       },
  //     },
  //   )

  const modalProps = {
    visible: actors.modal.state.context.visible,
    onOk: () => appSend(EventNameApp.CANCEL),
    onCancel: () => appSend(EventNameApp.CANCEL),
  }

  return (
    <>
      <ReactJson data={vertexState.value} />
      <Button onClick={() => appSend(EventNameApp.START_CREATE)}>
        Show Create Form
      </Button>
      <Modal title="Basic Modal" {...modalProps}>
        <p>Some contents...</p>
      </Modal>
      {/* <Table dataSource={dataSource} columns={columns} />; */}
    </>
  )
}

export default GraphPage
