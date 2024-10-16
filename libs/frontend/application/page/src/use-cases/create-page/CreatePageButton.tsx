import CloseOutlined from '@ant-design/icons/CloseOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { Button } from 'antd'

import { useUpdatePageForm } from '../update-page/update-page.state'
import { useCreatePageForm } from './create-page.state'

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
