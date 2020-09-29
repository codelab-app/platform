/* eslint-disable no-underscore-dangle */
import { DataNode } from 'antd/lib/tree'
import axios from 'axios'
import React from 'react'
import { ButtonGroup } from '../src/node/ButtonGroup'
import { ModalForm } from '../src/node/ModalForm'
import { NodeTree } from '../src/node/NodeTree'
import { convertNodeTreeToAntTreeDataNode } from '../src/node/utils/convertNodeTreeToAntTreeNode'
import { NodeEntity } from '@codelab/core/node'
import { Node } from '@codelab/shared/interface/node'

axios.defaults.baseURL = 'http://localhost:3333'
axios.defaults.headers.post['Content-Type'] = 'application/json'

const NodePage = () => {
  const [selectedNode, setSelectedNode] = React.useState(null)
  const [rootNode, setRootNode] = React.useState<Node | null>(null)
  const [treeDataNodes, setTreeDataNodes] = React.useState<Array<DataNode>>([])
  const [visibility, setVisibility] = React.useState<boolean>(false)
  const [nodes, setNodes] = React.useState([])

  React.useEffect(() => {
    console.log('get')
    axios
      .get('/api/v1/Node')
      .then((res) => {
        console.log(res.data)

        const nodeData = res.data.map((node) => {
          return { ...node, key: node._id }
        })

        setNodes(nodeData)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  // TODO: specify type of values. It should combine types for all types(React, Tree, Model, etc)
  const addChild = (values) => {
    console.log('addChild', this)
    const newNode = new NodeEntity(values)

    if (rootNode === null) {
      setRootNode(newNode)
      setTreeDataNodes([convertNodeTreeToAntTreeDataNode(newNode)])
    } else {
      rootNode.addChild(newNode)
      setTreeDataNodes([convertNodeTreeToAntTreeDataNode(rootNode)])
    }
  }

  const selectNode = (values) => {
    console.log(values)
  }

  const handleSubmitForm = (formData) => {
    console.log(formData)

    const { type, parent } = formData
    const props = formData.props.reduce((acc, prop) => {
      return { ...acc, [prop.name]: prop.type }
    }, {})

    axios
      .post('/api/v1/Node', {
        type,
        props,
        parent,
      })
      .then((res) => {
        const { data } = res
        const newNodes = [...nodes]

        data.key = data._id
        newNodes.push(res.data)

        setNodes(newNodes)
        setVisibility(false)
      })
      .catch((err) => console.log(err))
  }
  const deleteNode = () => {
    console.log('delete node fired!')
  }

  return (
    <>
      <ButtonGroup setvisibility={setVisibility} handledelete={deleteNode} />
      <ModalForm
        handlesubmit={handleSubmitForm}
        visibility={visibility}
        setvisibility={setVisibility}
        parentnodes={nodes.map((node) => {
          return { label: node._id, value: node._id }
        })}
      />
      <NodeTree />
    </>
  )
}

export default NodePage
