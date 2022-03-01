import { PlusOutlined } from '@ant-design/icons'
import { ButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AppStore } from '../../store'

export interface CreateAppButtonProps extends ButtonProps {
  apps: AppStore
}

export const CreateAppButton = observer(
  ({ apps, text, ...props }: CreateAppButtonProps) => {
    const icon = !text && <PlusOutlined />
    const onClick = () => apps.createModal.open()

    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Button icon={icon} onClick={onClick} type="primary" {...props}>
        {text ?? 'Create App'}
      </Button>
    )
  },
)
