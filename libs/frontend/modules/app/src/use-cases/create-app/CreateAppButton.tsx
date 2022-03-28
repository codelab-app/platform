import { PlusOutlined } from '@ant-design/icons'
import { ButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { WithAppService } from '../../store'

export const CreateAppButton = observer<ButtonProps & WithAppService>(
  ({ appService, text }) => {
    const icon = !text && <PlusOutlined />
    const onClick = () => appService.createModal.open()

    return (
      <Button icon={icon} onClick={onClick} type="primary">
        {text ?? 'Create App'}
      </Button>
    )
  },
)
