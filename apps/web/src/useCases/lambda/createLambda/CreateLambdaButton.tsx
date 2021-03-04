import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { useRecoilState } from 'recoil'
import { createLambdaState } from './CreateLambdaState'
import { useLayout } from 'apps/web/src/templates/layout-state'

export const CreateLambdaButton = () => {
  const { setPaneVisibility } = useLayout()
  const [createLambda, setCreateLambda] = useRecoilState(createLambdaState)

  return (
    <Button
      type="primary"
      size="small"
      icon={<PlusOutlined />}
      // onClick={() => setPaneVisibility(LayoutPaneVisibility.Detail)}
      onClick={() => setCreateLambda({ visible: true })}
    >
      Add
    </Button>
  )
}
