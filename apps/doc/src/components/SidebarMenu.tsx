import { Menu } from 'antd'
import React from 'react'
import { Frontmatter } from '../templates/blogTemplate'
import { Link } from 'gatsby'

interface SidebarMenuProps {
  pages: Array<Frontmatter>
  currentPathname: string
}

export const SidebarMenu = (props: SidebarMenuProps) => {
  return (
    <Menu defaultSelectedKeys={[props.currentPathname]} mode="inline">
      {props.pages.map((page) => {
        return (
          <Menu.Item key={page.slug}>
            <Link to={page.slug}>{page.title}</Link>
          </Menu.Item>
        )
      })}
    </Menu>
  )
}
