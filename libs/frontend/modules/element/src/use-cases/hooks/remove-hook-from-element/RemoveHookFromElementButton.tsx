import { ListItemDeleteButton } from '@codelab/frontend/view/components'
import { IHook } from '@codelab/shared/abstract/core'
import { ButtonProps } from 'antd'
import { PropsWithChildren } from 'react'

export type RemoveHookFromElementButtonProps = PropsWithChildren<
  ButtonProps & {
    hookId: string
    entity?: IHook
  }
>

export const RemoveHookFromElementButton = ({
  hookId,
  children,
  entity,
  icon,
}: RemoveHookFromElementButtonProps) => {
  // const { openDeleteModal } = useHookDispatch()
  // const onClick = () => openDeleteModal({ deleteIds: [hookId], entity })

  return (
    <ListItemDeleteButton
      onClick={() => {
        //
      }}
    >
      {children || icon ? '' : 'Delete'}
    </ListItemDeleteButton>
  )
}
