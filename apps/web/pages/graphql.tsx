import { Button } from 'antd'
import React from 'react'
import {
  NodeType,
  ssrNodes,
  useNodeCreateMutation,
  useNodeDeleteMutation,
} from '@codelab/state/apollo'
import { withApollo } from '@codelab/ui/hoc'

const Item = (node: any) => {
  const [nodeDeleteMutation] = useNodeDeleteMutation({
    variables: {
      id: node.id,
    },
  })

  return (
    <article>
      <p>
        {node.id} <Button onClick={() => nodeDeleteMutation()}>Delete</Button>
      </p>
      <p>{node.type}</p>
    </article>
  )
}

const GraphqlPage: PageNodesComp = (props) => {
  const { data } = props

  const [nodeCreateMutation, { data: mutationResults }] = useNodeCreateMutation(
    {
      variables: {
        type: NodeType.REACT_BUTTON,
      },
    },
  )

  if (!data) {
    return null
  }

  const nodes = data.Node

  return (
    <section>
      <Button onClick={() => nodeCreateMutation()}>Create</Button>
      <>
        {nodes?.map((node: any) => {
          return <Item key={node.id} {...node} />
        })}
      </>
    </section>
  )
}

export default withApollo(ssrNodes.withPage(() => ({}))(GraphqlPage))
