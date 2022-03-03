import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { PageStore } from '../../store'

export interface CreatePageButtonProps {
  pages: PageStore
}

export const CreatePageButton = observer<CreatePageButtonProps>(({ pages }) => {
  const onClick = () => {
    pages.createModal.open()
  }

  return (
    <Button
      icon={<PlusOutlined />}
      onClick={onClick}
      size="small"
      type="primary"
    />
  )
})
