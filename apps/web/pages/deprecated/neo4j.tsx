import { PoweroffOutlined } from '@ant-design/icons'
import { useActor } from '@xstate/react'
import React, { useContext } from 'react'
import { EventNameNode, EventNode } from '@codelab/state/node'
import {
  FormNode,
  MachineContext,
  Modal,
  ModalButton,
} from '@codelab/ui/component'

// const db = new cypher.Connection('bolt://localhost:7687', {
//   username: 'neo4j',
//   password: 'password',
// })

// const node = cypher.node('field', 'Field', {})

// const runQuery = async () => {
//   console.log('runQuery')

//   const fields = await db.create(node).return(['field']).run()

//   console.log(fields)
// }

// const deleteQuery = async () => {
//   console.log('deleteQuery')

//   const fields = await db.match(node).delete('field').return(['field']).run()

//   console.log(fields)
// }

export const Neo4j = () => {
  const { app, actors } = useContext(MachineContext)
  const [stateNode, sendNode] = useActor<EventNode>(actors.node)

  console.log(EventNameNode)

  return (
    <>
      <ModalButton
        actor={actors.modal}
        icon={<PoweroffOutlined />}
        loading
        size="small"
      />
      <Modal actor={actors.modal}>
        <FormNode
          actor={actors.modal}
          handleSubmit={(values: object) => {
            sendNode({
              type: EventNameNode.NODE_CREATE,
              payload: { data: values },
            } as any)
          }}
        />
      </Modal>
      <p>state: {JSON.stringify(stateNode.value)}</p>
      <p>context: {JSON.stringify(stateNode.context)}</p>
    </>
  )
}

export default Neo4j
