import PlusOutlined from '@ant-design/icons/PlusOutlined'
import type { ListItemButtonProps } from './ListItemButton'
import { ListItemButton } from './ListItemButton'

export type ListItemCreateButtonProps = Omit<
  ListItemButtonProps,
  'icon' | 'title'
>

export const ListItemCreateButton = (props: ListItemCreateButtonProps) => (
  <ListItemButton icon={<PlusOutlined />} onClick={props.onClick} title="Add" />
)
