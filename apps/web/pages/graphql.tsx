import { useActor } from '@xstate/react'
import { Button, Form } from 'antd'
import React, { useContext } from 'react'
import { useNodesQuery } from '@codelab/state/apollo'
import { NODES, NODE_CREATE } from '@codelab/state/node'
import {
  FormNode,
  MachineContext,
  Modal,
  ModalButton,
  Mutation,
  NodeServiceContext,
  Query,
} from '@codelab/ui/component'

const Graphql = (props: any) => {
  const { app, actors } = useContext(MachineContext)
  const [state, send] = useActor(actors.modal)
  const [form] = Form.useForm()
  const { nodeService } = useContext(NodeServiceContext)

  return (
    <>
      <ModalButton actor={actors.modal} />
      <Modal actor={actors.modal}>
        <FormNode
          actor={actors.modal}
          form={form}
          handleSubmit={(values: object) => {
            console.log(values)
          }}
        />
      </Modal>
      <Mutation gql={NODE_CREATE} variables={{}}>
        {({ data, action }) => {
          return <Button onClick={() => action()}>Mutate</Button>
        }}
      </Mutation>
      <Query gql={NODES} useQuery={useNodesQuery}>
        {({ data }) => {
          console.log(data)
          // return <FormNode />

          return <h2>Query</h2>
        }}
      </Query>
    </>
  )
}

export default Graphql
