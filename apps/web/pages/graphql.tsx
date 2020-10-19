import { useActor } from '@xstate/react'
import { Button, Form } from 'antd'
import React, { useContext } from 'react'
import {
  NodeCreateDocument,
  NodeType,
  useNodesQuery,
} from '@codelab/state/apollo'
import { NODES } from '@codelab/state/node'
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
  const [state, send] = useActor(actors.ui)
  const [form] = Form.useForm()
  const { nodeService } = useContext(NodeServiceContext)

  return (
    <>
      <ModalButton actor={actors.ui} />
      <Modal actor={actors.ui}>
        <FormNode
          actor={actors.ui}
          form={form}
          handleSubmit={(values: object) => {
            console.log(values)
          }}
        />
      </Modal>
      <Mutation
        gql={NodeCreateDocument}
        variables={{ type: NodeType.ReactButton }}
      >
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
