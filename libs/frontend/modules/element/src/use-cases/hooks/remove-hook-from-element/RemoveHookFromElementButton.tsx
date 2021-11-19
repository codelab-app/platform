import { ListItemDeleteButton } from '@codelab/frontend/view/components'
import { ButtonProps } from 'antd'
import React, { PropsWithChildren } from 'react'
import { HookFragment } from '../../../graphql'
import { useHookDispatch } from '../../../hooks/useHookDispatch'

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
  const { openDeleteModal } = useHookDispatch()

  return (
    <ListItemDeleteButton
      onClick={() => openDeleteModal({ deleteIds: [hookId], entity })}
      {...props}
    >
      {children || (props?.icon ? '' : 'Delete')}
    </ListItemDeleteButton>
  )
}
