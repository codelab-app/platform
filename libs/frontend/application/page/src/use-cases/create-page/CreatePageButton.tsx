import CloseOutlined from '@ant-design/icons/CloseOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { Button } from 'antd'
import React from 'react'
import { useUpdatePageForm } from '../update-page/update-page-form.state'
import { useCreatePageForm } from './create-page-form.state'

export const CreatePageButton = () => {
  const createPageForm = useCreatePageForm()
  const updatePageForm = useUpdatePageForm()
  const onClick = () => createPageForm.open()

  const onClose = () => {
    createPageForm.close()
    updatePageForm.close()
  }

  return createPageForm.isOpen || updatePageForm.isOpen ? (
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
