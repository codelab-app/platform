import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import React from 'react'
import { useAppMachine } from '../../model/store/useAppMachine'

export const CreateAppButton = () => {
  const app = useAppMachine()

  const createAppButtonProps: ButtonProps = {
    onClick: () => app.send('ON_CREATE_APP'),
  }

  return <Button {...createAppButtonProps}>Create App</Button>
}
