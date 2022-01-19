import { ListItemDeleteButton } from '@codelab/frontend/view/components'
import { ButtonProps } from 'antd'
import { PropsWithChildren } from 'react'
import { HookFragment } from '../../../graphql'
import { useHookDispatch } from '../../../hooks'

export type RemoveHookFromElementButtonProps = PropsWithChildren<
  ButtonProps & {
    hookId: string
    entity?: HookFragment
  }
>

export const RemoveHookFromElementButton = ({
  hookId,
  children,
  entity,
  icon,
}: RemoveHookFromElementButtonProps) => {
  const { openDeleteModal } = useHookDispatch()
  const onClick = () => openDeleteModal({ deleteIds: [hookId], entity })

  return (
    <ListItemDeleteButton onClick={onClick}>
      {children || icon ? '' : 'Delete'}
    </ListItemDeleteButton>
  )
}
