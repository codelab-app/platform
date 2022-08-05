import { DownOutlined, SmileOutlined } from '@ant-design/icons'
import { faAtom } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tree, TreeProps } from 'antd'
import { DataNode } from 'antd/lib/tree'
import React from 'react'

const treeData: Array<DataNode> = [
  {
    title: 'Card',
    key: 'card',
    icon: <SmileOutlined />,
    // icon: (
    //   <FontAwesomeIcon
    //     // css={[
    //     //   css`
    //     //     path {
    //     //       ${tw`fill-violet-700`}
    //     //     }
    //     //   `,
    //     // ]}
    //     icon={faAtom}
    //     size="2x"
    //   />
    // ),
    children: [
      {
        title: 'div',
        key: 'div',
        children: [
          {
            title: 'Text',
            key: 'text-0',
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
                size="2x"
              />
            ),
          },
          {
            title: 'Text',
            key: 'text-1',
          },
        ],
      },
      {
        title: 'p',
        key: 'p',
      },
      {
        title: 'Button',
        key: 'button',
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
      defaultExpandAll
      // defaultExpandedKeys={['card', 'div', 'text-0', 'text-1', 'button']}
      // onSelect={onSelect}
      showLine
      switcherIcon={<DownOutlined />}
      treeData={treeData}
    />
  )
}
