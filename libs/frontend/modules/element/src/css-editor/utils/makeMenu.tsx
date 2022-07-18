import { Menu } from 'antd'

export const makeMenu = (
  items: Array<string>,
  onClick: (val: string) => void | undefined,
) => {
  return (
    <Menu
      items={items.map((item) => {
        return {
          key: item,
          label: item,
        }
      })}
      onClick={(e) => onClick(e.key)}
    />
  )
}
