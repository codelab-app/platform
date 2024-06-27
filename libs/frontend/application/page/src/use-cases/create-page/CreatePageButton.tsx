import CloseOutlined from '@ant-design/icons/CloseOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { Button } from 'antd'
import React from 'react'

export const CreatePageButton = () => {
  const { pageService } = useStore()
  const onClick = () => pageService.createForm.open()

  const onClose = () => {
    pageService.createForm.close()
    pageService.updateForm.close()
  }

  return pageService.createForm.isOpen || pageService.updateForm.isOpen ? (
    <Button
      icon={<CloseOutlined />}
      onClick={onClose}
      size="small"
      style={{ background: 'red' }}
      type="primary"
    />
  ) : (
    <Button
      icon={<PlusOutlined />}
      onClick={onClick}
      size="small"
      type="primary"
    />
  )
}
