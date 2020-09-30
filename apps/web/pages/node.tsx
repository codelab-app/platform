/* eslint-disable no-underscore-dangle */
import { DataNode } from 'antd/lib/tree'
import axios from 'axios'
import React from 'react'
import { ButtonGroup } from '../src/node/ButtonGroup'
import { ModalForm } from '../src/node/ModalForm'
import { NodeTree } from '../src/node/NodeTree'
import { Table } from '../src/node/Table'
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
    // eslint-disable-next-line no-use-before-define
    fetchNodes()
  }, [])

  const fetchNodes = () => {
    axios
      .get('/api/v1/Node')
      .then((res) => {
        setNodes(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const convertNodes = (inputNodes) => {
    return inputNodes.map((node) => {
      const { props } = node

      const convertedProps = Object.entries(props).map((entry) => ({
        key: entry[0],
        value: entry[1],
      }))

      return { ...node, props: convertedProps, key: node._id }
    })
  }

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

    const props = formData.props.reduce((acc, prop) => {
      return { ...acc, [prop.name]: prop.type }
    }, {})

    axios
      .post('/api/v1/Node', {
        ...formData,
        props,
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

  const data = selectedNode
    ? nodes.filter((node) => {
        return node._id === selectedNode
      })
    : nodes

  return (
    <>
      <ButtonGroup
        setvisibility={setVisibility}
        handledelete={deleteNode}
        clearfilter={() => setSelectedNode(null)}
      />
      <ModalForm
        handlesubmit={handleSubmitForm}
        visibility={visibility}
        setvisibility={setVisibility}
        parentnodes={nodes.map((node) => {
          return { label: node._id, value: node._id }
        })}
      />
      <NodeTree />
      <Table data={convertNodes(data)} selectnode={setSelectedNode} />
    </>
  )
}

export default NodePage
