import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { WithPageService } from '../../store'

export const CreatePageButton = observer<WithPageService>(({ pageService }) => {
  const onClick = () => pageService.createModal.open()

  return (
    <Button
      icon={<PlusOutlined />}
      onClick={onClick}
      size="small"
      type="primary"
    />
  )
})
