import { Button, ButtonProps } from 'antd'
import React, { PropsWithChildren } from 'react'
import { EntityType, useCRUDModalForm } from '@codelab/frontend/shared'

interface Props extends Omit<ButtonProps, 'onClick'> {
  componentElementId: string
}

export const DeleteComponentElementButton = ({
  componentElementId,
  children,
  ...props
}: PropsWithChildren<Props>) => {
  const { openDeleteModal } = useCRUDModalForm(EntityType.ComponentElement)

  return (
    <Button
      onClick={() => {
        openDeleteModal(componentElementId)
      }}
      {...props}
    >
      {children || (props?.icon ? '' : 'Delete')}
    </Button>
  )
}
