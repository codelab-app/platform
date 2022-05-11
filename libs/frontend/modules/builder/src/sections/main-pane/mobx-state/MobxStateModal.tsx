import { BUILDER_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import {
  IModalService,
  IStateTreeNode,
  StateModalProperties,
} from '@codelab/shared/abstract/core'
import { Modal, Space } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { CopyPathButton } from './CopyPathButton'

type MobxStateModalProps = Pick<
  IModalService<IStateTreeNode, StateModalProperties>,
  'isOpen' | 'close' | 'node'
>

export const MobxStateModal = observer<MobxStateModalProps>(
  ({ isOpen, close, node }) => {
    if (!node) {
      return null
    }

    const { content, path } = node

    return (
      <Modal
        bodyStyle={{ maxHeight: '400px', overflow: 'auto' }}
        cancelButtonProps={{ hidden: true }}
        closable
        maskClosable
        okButtonProps={{ hidden: true }}
        onCancel={() => close()}
        title={[
          <Space>
            {path}
            <CopyPathButton path={path} />
          </Space>,
        ]}
        visible={isOpen}
      >
        {typeof content === 'object'
          ? JSON.stringify(content, null, 2)
          : content}
      </Modal>
    )
  },
)
