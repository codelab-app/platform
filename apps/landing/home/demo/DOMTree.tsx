import { DownOutlined } from '@ant-design/icons'
import { faHtml5 } from '@fortawesome/free-brands-svg-icons'
import { faAtom } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tree, TreeProps } from 'antd'
import { DataNode } from 'antd/lib/tree'
import React from 'react'
import tw from 'twin.macro'

const treeData: Array<DataNode> = [
  {
    title: 'Card',
    key: 'card',
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
    selectable: false,
    children: [
      {
        title: 'div',
        key: 'div',
        icon: <FontAwesomeIcon icon={faHtml5} size="lg" />,
        selectable: false,
        children: [
          {
            title: 'Text',
            key: 'text-0',
            selectable: false,
            icon: <FontAwesomeIcon icon={faAtom} size="lg" />,
          },
          {
            title: 'Text',
            key: 'text-1',
            selectable: false,
            icon: <FontAwesomeIcon icon={faAtom} size="lg" />,
          },
        ],
      },
      {
        title: 'p',
        key: 'p',
        selectable: false,
        icon: <FontAwesomeIcon icon={faHtml5} size="lg" />,
      },
      {
        title: 'Button',
        key: 'button',
        selectable: false,
        icon: <FontAwesomeIcon icon={faAtom} size="lg" />,
      },
    ],
  },
]

export const DOMTree = () => {
  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info)
  }

  return (
    <Tree
      css={tw`py-3 px-2`}
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
