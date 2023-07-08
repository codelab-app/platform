import { DownOutlined } from '@ant-design/icons'
import { faHtml5 } from '@fortawesome/free-brands-svg-icons'
import { faAtom } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { TreeProps } from 'antd'
import { Tree } from 'antd'
import type { DataNode } from 'antd/lib/tree'
import React from 'react'

const treeData: Array<DataNode> = [
  {
    children: [
      {
        children: [
          {
            icon: <FontAwesomeIcon icon={faAtom} size="lg" />,
            key: 'text-0',
            selectable: false,
            title: 'Text',
          },
          {
            icon: <FontAwesomeIcon icon={faAtom} size="lg" />,
            key: 'text-1',
            selectable: false,
            title: 'Text',
          },
        ],
        icon: <FontAwesomeIcon icon={faHtml5} size="lg" />,
        key: 'div',
        selectable: false,
        title: 'div',
      },
      {
        icon: <FontAwesomeIcon icon={faHtml5} size="lg" />,
        key: 'p',
        selectable: false,
        title: 'p',
      },
      {
        icon: <FontAwesomeIcon icon={faAtom} size="lg" />,
        key: 'button',
        selectable: false,
        title: 'Button',
      },
    ],
    icon: (
      <FontAwesomeIcon
        // css={[
        //   css`
        //     path {
        //       ${tw`fill-violet-700`}
        //     }
        //   `,
        // ]}
        icon={faAtom}
        size="lg"
      />
    ),
    key: 'card',
    selectable: false,
    title: 'Card',
  },
]

export const DOMTree = () => {
  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info)
  }

  return (
    <Tree
      className="px-2 py-3"
      defaultExpandAll
      // defaultExpandedKeys={['card', 'div', 'text-0', 'text-1', 'button']}
      // onSelect={onSelect}
      // showLine
      defaultSelectedKeys={['button']}
      showIcon
      switcherIcon={<DownOutlined />}
      treeData={treeData}
    />
  )
}
