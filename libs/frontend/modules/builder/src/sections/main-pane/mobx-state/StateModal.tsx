import { Modal, Space } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { WithBuilderService } from '../../../store/BuilderService'
import { CopyPathButton } from './CopyPathButton'

export const StateModal = observer<WithBuilderService>(({ builderService }) => {
  if (!builderService.stateModal.node) {
    return null
  }

  const { content, path } = builderService.stateModal.node

  return (
    <Modal
      bodyStyle={{ maxHeight: '400px', overflow: 'auto' }}
      cancelButtonProps={{ hidden: true }}
      closable
      maskClosable
      okButtonProps={{ hidden: true }}
      onCancel={() => builderService.stateModal.close()}
      title={[
        <Space>
          {path}
          <CopyPathButton path={path} />
        </Space>,
      ]}
      visible={builderService.stateModal.isOpen}
    >
      {typeof content === 'object' ? JSON.stringify(content, null, 2) : content}
    </Modal>
  )
})
