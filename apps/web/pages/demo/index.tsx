import { Tree } from 'antd'
import { Key, useState } from 'react'

const Demo = () => {
  const [expandedKeys, setExpandedKeys] = useState<Array<Key>>([])

  const treeData = [
    {
      title: 'Root',
      key: 'root',
      children: [
        {
          title: 'A',
          key: 'a',
        },
        {
          title: 'B',
          key: 'b',
        },
      ],
    },
  ]

  return (
    <Tree
      expandedKeys={expandedKeys}
      onExpand={(keys) => {
        console.log(keys)
        setExpandedKeys(keys)
      }}
      onSelect={([id]) => {
        //
      }}
      treeData={treeData}
    />
  )
}

export default Demo
