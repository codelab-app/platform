import { PlusOutlined } from '@ant-design/icons'
import { useStore } from '@codelab/frontend/application/shared/store'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const CreateTagButton = observer(() => {
  const { tagService } = useStore()

  return (
    <Button
      icon={<PlusOutlined />}
      onClick={() => tagService.createModal.open()}
      type="primary"
    >
      Create Tag
    </Button>
  )
})
