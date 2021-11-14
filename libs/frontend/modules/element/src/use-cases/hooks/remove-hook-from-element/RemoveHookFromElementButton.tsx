import { ListItemDeleteButton } from '@codelab/frontend/view/components'
import { ButtonProps } from 'antd'
import React, { PropsWithChildren } from 'react'
import { useDispatch } from 'react-redux'
import { HookFragment } from '../../../graphql'
import { hookActions } from '../../../store/hookState'

interface Props extends Omit<ButtonProps, 'onClick'> {
  hookId: string
  entity?: HookFragment
}

export const RemoveHookFromElementButton = ({
  hookId,
  children,
  entity,
  ...props
}: PropsWithChildren<Props>) => {
  const dispatch = useDispatch()

  const openDeleteModal = () =>
    dispatch(hookActions.openDeleteModal({ deleteIds: [hookId], entity }))

  return (
    <ListItemDeleteButton onClick={() => openDeleteModal()} {...props}>
      {children || (props?.icon ? '' : 'Delete')}
    </ListItemDeleteButton>
  )
}
