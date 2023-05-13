import { CloseOutlined, PlusOutlined } from '@ant-design/icons'
import { useStore } from '@codelab/frontend/presentation/container'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const CreatePageButton = observer(() => {
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
})
