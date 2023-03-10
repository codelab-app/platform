import { ImportOutlined } from '@ant-design/icons'
import { useStore } from '@codelab/frontend/presenter/container'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const ExportAtomButton = observer(() => {
  const { atomService } = useStore()

  return (
    <Button
      icon={<ImportOutlined />}
      onClick={() => atomService.export()}
    ></Button>
  )
})
