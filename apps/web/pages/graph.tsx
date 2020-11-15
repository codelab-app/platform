import { useActor, useService } from '@xstate/react'
import { Button, Modal, Table } from 'antd'
import React, { useContext } from 'react'
import { collectionToTable } from '@codelab/shared/factory'
import { EventNameApp } from '@codelab/state/app'
import { FormGraph, MachineContext } from '@codelab/ui/component'

const GraphPage = () => {
  const { actors } = useContext(MachineContext)
  const [appState, appSend] = useService(actors.app)
  const [graphState] = useActor(actors.graph)

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
      {/* <ReactJson data={graphState.value} /> */}
      {/* <ReactJson data={collectionToTable(graphState.context.list)} /> */}
      <Button onClick={() => appSend(EventNameApp.START_CREATE)}>
        + Create New
      </Button>
      <Modal title="Basic Modal" {...modalProps}>
        <FormGraph />
      </Modal>
      <Table {...collectionToTable(graphState.context.list)} />
    </>
  )
}

export default GraphPage
