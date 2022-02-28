import { IElement } from '@codelab/shared/abstract/core'
import { Button } from 'antd'
import React from 'react'
import { useElementDispatch } from '../../../hooks'

interface DeleteElementProps {
  elementId: string
  entity?: IElement
}

export const DeleteElementButton = ({
  elementId,
  entity,
}: DeleteElementProps) => {
  const { openDeleteModal } = useElementDispatch()
  const onClick = () => openDeleteModal({ deleteIds: [elementId], entity })

  return (
    <Button danger onClick={onClick}>
      Delete
    </Button>
  )
}
