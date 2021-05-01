import { Button, ButtonProps } from 'antd'
import React, { PropsWithChildren } from 'react'
import { EntityType, useCRUDModalForm } from '@codelab/frontend/shared'

interface Props extends Omit<ButtonProps, 'onClick'> {
  pageElementId: string
}

export const DeletePageElementButton = ({
  pageElementId,
  children,
  ...props
}: PropsWithChildren<Props>) => {
  const { openDeleteModal } = useCRUDModalForm(EntityType.PageElement)

  return (
    <Button
      onClick={() => {
        openDeleteModal(pageElementId)
      }}
      {...props}
    >
      {children || (props?.icon ? '' : 'Delete')}
    </Button>
  )
}
