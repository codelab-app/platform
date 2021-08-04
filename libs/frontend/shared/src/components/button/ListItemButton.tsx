import { Button, ButtonProps } from 'antd'

export type ListItemButtonProps = Omit<ButtonProps, 'size' | 'type'> &
  Required<Pick<ButtonProps, 'icon'>>

export const ListItemButton = (props: ListItemButtonProps) => {
  return <Button size="small" type="text" {...props}></Button>
}
