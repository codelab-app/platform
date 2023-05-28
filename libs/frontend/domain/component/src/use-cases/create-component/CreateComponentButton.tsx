import { CloseOutlined, PlusOutlined } from '@ant-design/icons'
import { useStore } from '@codelab/frontend/presentation/container'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export type CreateComponentButtonProps = React.ComponentProps<typeof Button> & {
  className?: string
}

export const CreateComponentButton = observer<CreateComponentButtonProps>(
  ({ className }) => {
    const { componentService } = useStore()

    return componentService.createForm.isOpen ? (
      <Button
        icon={<CloseOutlined data-testid="close-component-form-button" />}
        onClick={() => componentService.createForm.close()}
        style={{ background: 'red', color: 'white' }}
      ></Button>
    ) : (
      <Button
        className={className}
        icon={<PlusOutlined />}
        key={0}
        onClick={() => componentService.createForm.open()}
        type="primary"
      >
        Create
      </Button>
    )
  },
)
