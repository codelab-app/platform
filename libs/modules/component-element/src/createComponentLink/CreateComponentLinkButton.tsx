import { EntityType, useCrudModalForm } from '@codelab/frontend/shared'
import { Button, ButtonProps } from 'antd'
import React, { PropsWithChildren } from 'react'

export const CreateComponentLinkButton = ({
  children,
}: PropsWithChildren<Omit<ButtonProps, 'onClick'>>) => {
  const { openCreateModal } = useCrudModalForm(
    EntityType.LinkedComponentElement,
  )

  return <Button onClick={() => openCreateModal()}>{children}</Button>
}
