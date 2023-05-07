import { PlusOutlined } from '@ant-design/icons'
import { useStore } from '@codelab/frontend/presentation/container'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export type CreateComponentButtonProps = React.ComponentProps<typeof Button> & {
  className?: string
}

export const CreateComponentButton = observer<CreateComponentButtonProps>(
  ({ className, title }) => {
    const { componentService } = useStore()

    return (
      <Button
        className={className}
        icon={<PlusOutlined />}
        key={0}
        onClick={() => componentService.createModal.open()}
        type="primary"
      >
        Create
      </Button>
    )
  },
)
