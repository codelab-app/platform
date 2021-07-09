import { EntityType, useCrudModalForm } from '@codelab/frontend/shared'
import { Button, ButtonProps } from 'antd'
import React, { PropsWithChildren } from 'react'

interface Props extends Omit<ButtonProps, 'onClick'> {
  elementId: string
  metadata?: any
}

export const DeleteElementButton = ({
  elementId,
  children,
  metadata,
  ...props
}: PropsWithChildren<Props>) => {
  const { openDeleteModal } = useCrudModalForm(EntityType.Element)

  return (
    <Button
      onClick={() => {
        openDeleteModal([elementId], metadata)
      }}
      {...props}
    >
      {children || (props?.icon ? '' : 'Delete')}
    </Button>
  )
}
