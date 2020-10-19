import { useActor } from '@xstate/react'
import React, { useContext } from 'react'
import {
  FormNode,
  Layout,
  MachineContext,
  Modal,
  ModalButton,
  NodeFormData,
  Table,
} from '@codelab/ui/component'
import { withSuspense } from '@codelab/ui/hoc'

const isServer = typeof window === 'undefined'

const TableNodeWithSuspense = withSuspense(() => (
  <NodeFormData>
    {(data) => {
      console.log(data)

      return (
        <Table
          data={data}
          // selectnode={() => null}
          // handleedit={() => null}
          // handledelete={() => null}
        />
      )
    }}
  </NodeFormData>
))

// Error: ReactDOMServer does not yet support Suspense.
// https://github.com/coinbase/rest-hooks/issues/172
const Index = (props: any) => {
  const { app, actors } = useContext(MachineContext)
  const [uiState] = useActor(actors.ui)

  // <>{!isServer ? <TableNodeWithSuspense /> : null}</>
  return (
    <>
      <Layout
        actor={actors.ui}
        content={
          <>
            <ModalButton actor={actors.ui} />
            <Modal actor={actors.ui}>
              <FormNode
                actor={actors.ui}
                handleSubmit={(values: object) => {
                  console.log(values)
                }}
              />
            </Modal>
            <p>state: {JSON.stringify(uiState.value)}</p>
            <p>context: {JSON.stringify(uiState.context)}</p>
          </>
        }
        sidebar={<>Side bar</>}
        header={<>Header</>}
        footer={<>Footer</>}
      />
    </>
  )
}

export default Index
