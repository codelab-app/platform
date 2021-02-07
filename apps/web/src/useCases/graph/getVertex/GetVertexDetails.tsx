import { Button, Divider, Space } from 'antd'
import React from 'react'
import { useRecoilState } from 'recoil'
import { AddChildVertexModal } from '../addChildVertex/AddChildVertexModal'
import { addChildVertexState } from '../addChildVertex/AddChildVertexState'
import { DeleteVertexButton } from '../deleteVertex/DeleteVertexButton'
import { MoveVertexTargets } from '../moveVertex/MoveVertexTargets'
import { UpdateVertexForm } from '../updateVertex/UpdateVertexForm'
import { PropsWithIds } from '@codelab/frontend'
import { useGetVertexQuery } from '@codelab/generated'

export const GetVertexDetails = ({ vertexId }: PropsWithIds<'vertexId'>) => {
  const [addChildVertex, setAddChildVertex] = useRecoilState(
    addChildVertexState,
  )
  const { data } = useGetVertexQuery({
    variables: {
      input: {
        id: vertexId,
      },
    },
  })

  const vertex = data?.getVertex

  if (!vertex) {
    return null
  }

  return (
    <section>
      <h3>Vertex details</h3>
      <Space>
        <Button
          type="primary"
          onClick={() => setAddChildVertex({ visible: true })}
        >
          Add Child Node
        </Button>
        <DeleteVertexButton vertexId={vertex.id} />
      </Space>
      <Divider />
      <h3>Move Vertex</h3>
      <MoveVertexTargets sourceVertex={vertex} />
      <Divider />
      <AddChildVertexModal vertex={vertex} parentVertexId={vertex.id} />
      <UpdateVertexForm vertex={vertex} key={vertex.id} />
    </section>
  )
}
