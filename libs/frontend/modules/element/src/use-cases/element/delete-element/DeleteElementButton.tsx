import { Button, ButtonProps } from 'antd'
import React, { PropsWithChildren } from 'react'
import { ElementFragment } from '../../../graphql'
import { useElementDispatch } from '../../../hooks'

interface Props extends Omit<ButtonProps, 'onClick'> {
  elementId: string
  entity?: ElementFragment
}

export const DeleteElementButton = ({
  elementId,
  children,
  entity,
  ...props
}: PropsWithChildren<Props>) => {
  const { openDeleteModal } = useElementDispatch()

  return (
    <Button
      onClick={() => openDeleteModal({ deleteIds: [elementId], entity })}
      {...props}
    >
      {children || (props?.icon ? '' : 'Delete')}
    </Button>
  )
}
