import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import React from 'react'

export const CreateAppButton = () => {
  const createAppButtonProps: ButtonProps = {
    // onClick: () => user.send('LOGIN'),
  }

  return <Button {...createAppButtonProps}>Login</Button>
}
