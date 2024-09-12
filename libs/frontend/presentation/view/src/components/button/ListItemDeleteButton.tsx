import DeleteOutlined from '@ant-design/icons/lib/icons/DeleteOutlined'
import type { ListItemButtonProps } from './ListItemButton'
import { ListItemButton } from './ListItemButton'

export type ListItemDeleteButtonProps = Omit<
  ListItemButtonProps,
  'danger' | 'icon'
>

export const ListItemDeleteButton = (props: ListItemDeleteButtonProps) => {
  return (
    <ListItemButton
      danger={true}
      icon={<DeleteOutlined />}
      onClick={props.onClick}
    >
      {props.children}
    </ListItemButton>
  )
}
