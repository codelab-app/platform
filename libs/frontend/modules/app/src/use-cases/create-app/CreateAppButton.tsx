import { PlusOutlined } from '@ant-design/icons'
import { Button, ButtonProps } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { PropsWithChildren } from 'react'
import { WithAppService } from '../../store'

type CreateAppButtonProps = PropsWithChildren<WithAppService>

export const CreateAppButton = observer<CreateAppButtonProps>(
  ({ appService, children }) => {
    const icon = !children && <PlusOutlined />
    const onClick = () => appService.createModal.open()

    return (
      <Button icon={icon} onClick={onClick} type="primary">
        {children ?? 'Create App'}
      </Button>
    )
  },
)
