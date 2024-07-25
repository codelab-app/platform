import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { useStore } from '@codelab/frontend/infra/mobx'
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
