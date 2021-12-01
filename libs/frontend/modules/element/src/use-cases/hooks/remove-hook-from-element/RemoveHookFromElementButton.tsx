import { ListItemDeleteButton } from '@codelab/frontend/view/components'
import { useHookDispatch } from '../../../hooks/useHookDispatch'
import { RemoveHookFromElementButtonProps } from './types'

export const RemoveHookFromElementButton = ({
  hookId,
  children,
  entity,
  ...props
}: RemoveHookFromElementButtonProps) => {
  const { openDeleteModal } = useHookDispatch()
  const onClick = () => openDeleteModal({ deleteIds: [hookId], entity })

  return (
    <ListItemDeleteButton onClick={onClick} {...props}>
      {children || (props?.icon ? '' : 'Delete')}
    </ListItemDeleteButton>
  )
}
