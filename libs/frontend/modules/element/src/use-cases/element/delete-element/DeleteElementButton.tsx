import { Button, ButtonProps } from 'antd'
import React, { PropsWithChildren } from 'react'
import { useDispatch } from 'react-redux'
import { ElementFragment } from '../../../graphql'
import { elementActions } from '../../../store'

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
  const dispatch = useDispatch()

  const openDeleteModal = () =>
    dispatch(elementActions.openDeleteModal({ deleteIds: [elementId], entity }))

  return (
    <Button onClick={() => openDeleteModal()} {...props}>
      {children || (props?.icon ? '' : 'Delete')}
    </Button>
  )
}
