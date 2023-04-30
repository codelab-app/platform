import { Menu } from 'antd'

export const makeMenu = (
  items: Array<string>,
  onClick: (val: string) => undefined | void,
) => {
  return (
    <Menu
      items={items.map((item) => {
        return {
          key: item,
          label: item,
        }
      })}
      onClick={(event) => onClick(event.key)}
    />
  )
}
