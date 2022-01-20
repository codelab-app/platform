import { Button, ButtonProps } from 'antd'
import React, { PropsWithChildren } from 'react'
import { ElementFragment } from '../../../graphql'
import { useElementDispatch } from '../../../hooks'

interface DeleteElementProps {
  elementId: string
  entity?: ElementFragment
}

export const DeleteElementButton = ({
  elementId,
  entity,
}: DeleteElementProps) => {
  const { openDeleteModal } = useElementDispatch()

  return (
    <Button
      danger
      onClick={() => openDeleteModal({ deleteIds: [elementId], entity })}
    >
      Delete
    </Button>
  )
}
