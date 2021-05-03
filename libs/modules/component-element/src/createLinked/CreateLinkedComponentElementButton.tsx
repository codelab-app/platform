import { EntityType, useCRUDModalForm } from '@codelab/frontend/shared'
import { Button, ButtonProps } from 'antd'
import React, { PropsWithChildren } from 'react'

export const CreateLinkedComponentElementButton = ({
  children,
}: PropsWithChildren<Omit<ButtonProps, 'onClick'>>) => {
  const { openCreateModal } = useCRUDModalForm(
    EntityType.LinkedComponentElement,
  )

  return <Button onClick={() => openCreateModal()}>{children}</Button>
}
