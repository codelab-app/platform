import type { IHook } from '@codelab/frontend/abstract/domain'
import { ListItemDeleteButton } from '@codelab/frontend-presentation-view/components/button'
import type { ButtonProps } from 'antd'
import type { PropsWithChildren } from 'react'

export type RemoveHookFromElementButtonProps = PropsWithChildren<
  ButtonProps & {
    hookId: string
    entity?: IHook
  }
>

export const RemoveHookFromElementButton = ({
  children,
  entity,
  hookId,
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
