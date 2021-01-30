import { Select } from 'antd'
import React from 'react'
import { VertexFragmentsFragment, useGetGraphQuery } from '@codelab/generated'

const { Option } = Select

interface MoveVertexTargetsProps {
  sourceVertex: VertexFragmentsFragment
}

/**
 * Get the potential move targets of a current vertex
 */
export const MoveVertexTargets = ({ sourceVertex }: MoveVertexTargetsProps) => {
  const { data, loading } = useGetGraphQuery({
    variables: { input: { id: sourceVertex.graph.id } },
  })

  if (!data?.getGraph || loading) {
    return null
  }

  // Get all vertices of current graph
  // Remove self & parent from list
  console.log(sourceVertex)
  const potentialVertexTargets = data.getGraph.vertices.filter(
    (v) => v.id !== sourceVertex.id,
  )

  const handleChange = (vertexId: string) => {
    console.log(`selected ${vertexId}`)
  }

  return (
    <Select style={{ width: 120 }} onChange={handleChange}>
      {potentialVertexTargets.map((v) => {
        return <Option value={v.id}>{v.type}</Option>
      })}
    </Select>
  )
}
