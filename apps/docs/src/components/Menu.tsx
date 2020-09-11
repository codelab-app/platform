import { Menu as AntMenu } from 'antd'
import { Link } from 'gatsby'
import React from 'react'

/**
 * A menu component
 *
 * @param props
 */
const Menu = (props: any) => {
  const { level, path, order, title } = props

  switch (level) {
    case 0:
      return (
        <AntMenu.Item key={title}>
          <Link to={path}>{title}</Link>
        </AntMenu.Item>
      )
    case 1:
      return (p: any) => (
        <AntMenu.SubMenu
          key="sub4"
          title={
            <span>
              <span>Navigation Three</span>
            </span>
          }
        >
          {p.children}
        </AntMenu.SubMenu>
      )
    default:
      return (
        <AntMenu.Item key={title}>
          <Link to={path}>{title}</Link>
        </AntMenu.Item>
      )
  }
}
