import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { useAtom } from '../useAtom'

export const CreateAtomButton = () => {
  const { openCreateAtom } = useAtom()

  return (
    <Button
      type="primary"
      size="small"
      icon={<PlusOutlined />}
      onClick={() => openCreateAtom()}
    >
      Add
    </Button>
  )
}
