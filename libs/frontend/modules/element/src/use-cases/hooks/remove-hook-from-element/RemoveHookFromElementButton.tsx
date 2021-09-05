import {
  EntityType,
  ListItemDeleteButton,
  useCrudModalForm,
} from '@codelab/frontend/view/components'
import { ButtonProps } from 'antd'
import React, { PropsWithChildren } from 'react'

interface Props extends Omit<ButtonProps, 'onClick'> {
  hookId: string
  metadata?: any
}

export const RemoveHookFromElementButton = ({
  hookId,
  children,
  metadata,
  ...props
}: PropsWithChildren<Props>) => {
  const { openDeleteModal } = useCrudModalForm(EntityType.Hook)

  return (
    <ListItemDeleteButton
      onClick={() => {
        openDeleteModal([hookId], metadata)
      }}
      {...props}
    >
      {children || (props?.icon ? '' : 'Delete')}
    </ListItemDeleteButton>
  )
}
