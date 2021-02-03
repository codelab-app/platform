import { Button, Select } from 'antd'
import React, { useState } from 'react'
import { PropsWithIds } from '@codelab/frontend'
import {
  GetPageGql,
  VertexFragmentsFragment,
  useGetGraphQuery,
  useMoveVertexMutation,
} from '@codelab/generated'

const { Option } = Select

type MoveVertexTargetsProps = {
  sourceVertex: VertexFragmentsFragment
} & PropsWithIds<'pageId'>

/**
 * Get the potential move targets of a current vertex
 */
export const MoveVertexTargets = ({
  sourceVertex,
  pageId,
}: MoveVertexTargetsProps) => {
  const { data, loading } = useGetGraphQuery({
    variables: { input: { id: sourceVertex?.graph?.id } },
  })
  const [parentVertexId, setParentVertexId] = useState<string>('')

  const [moveVertexMutation] = useMoveVertexMutation()

  if (!data?.getGraph || loading) {
    return null
  }

  // Get all vertices of current graph
  // Remove self & parent from list
  const potentialVertexTargets = data.getGraph.vertices.filter(
    (v) => v.id !== sourceVertex.id && v.id !== sourceVertex?.parent?.id,
  )

  const moveVertex = () => {
    moveVertexMutation({
      refetchQueries: [
        {
          query: GetPageGql,
          variables: {
            input: {
              pageId,
            },
          },
        },
      ],
      variables: {
        input: {
          currentVertexId: sourceVertex.id,
          parentVertexId,
        },
      },
    })
  }

  return (
    <>
      <Select
        style={{ width: 120 }}
        onChange={(vertexId: string) => setParentVertexId(vertexId)}
      >
        {potentialVertexTargets.map((v) => {
          return (
            <Option key={v.id} value={v.id}>
              {v.type}
            </Option>
          )
        })}
      </Select>
      <Button type="primary" onClick={() => moveVertex()}>
        Move Vertex
      </Button>
    </>
  )
}
