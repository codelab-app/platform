import { Button, Divider, Space } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import { useRecoilState } from 'recoil'
import { AddChildVertexModal } from '../addChildVertex/AddChildVertexModal'
import { addChildVertexState } from '../addChildVertex/AddChildVertexState'
import { DeleteVertexButton } from '../deleteVertex/DeleteVertexButton'
import { MoveVertexTargets } from '../moveVertex/MoveVertexTargets'
import { UpdateVertexForm } from '../updateVertex/UpdateVertexForm'
import { useGetVertexQuery } from '@codelab/generated'

interface GetVertexDetailsProps {
  vertexId: string
}

export const GetVertexDetails = ({ vertexId }: GetVertexDetailsProps) => {
  const { query } = useRouter()
  const [addChildVertex, setAddChildVertex] = useRecoilState(
    addChildVertexState,
  )
  const { data, loading } = useGetVertexQuery({
    variables: {
      input: {
        id: vertexId,
      },
    },
  })

  const vertex = data?.getVertex
  const pageId = `${query.pageId}`

  if (!pageId || !vertex) return null

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
        <DeleteVertexButton vertexId={vertex.id} pageId={pageId} />
      </Space>
      <Divider />
      <h3>Move Vertex</h3>
      <MoveVertexTargets sourceVertex={vertex} pageId={pageId} />
      <Divider />
      <AddChildVertexModal
        pageId={pageId}
        vertex={vertex}
        parentVertexId={vertex.id}
      />
      <UpdateVertexForm vertex={vertex} />
    </section>
  )
}
