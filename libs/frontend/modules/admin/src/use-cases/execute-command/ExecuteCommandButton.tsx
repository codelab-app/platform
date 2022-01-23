import { Button } from 'antd'
import React from 'react'
import { useAdminDispatch } from '../../hooks'

export const ExecuteCommandButton = () => {
  const { openExecuteCommandModal } = useAdminDispatch()

  return <Button onClick={openExecuteCommandModal}>Execute Command</Button>
}
