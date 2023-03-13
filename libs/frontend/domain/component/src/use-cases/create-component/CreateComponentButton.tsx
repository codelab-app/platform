import { PlusOutlined } from '@ant-design/icons'
import type { IComponentService } from '@codelab/frontend/abstract/core'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export type CreateComponentButtonProps = React.ComponentProps<typeof Button> & {
  className?: string
  componentService: IComponentService
}

export const CreateComponentButton = observer<CreateComponentButtonProps>(
  ({ className, componentService, title }) => {
    return (
      <Button
        className={className}
        icon={<PlusOutlined />}
        key={0}
        onClick={() => componentService.createModal.open()}
        size="small"
      >
        {title || ''}
      </Button>
    )
  },
)
