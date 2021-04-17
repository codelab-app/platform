import { Menu } from 'antd'
import React from 'react'
import { Frontmatter } from '../templates/blogTemplate'
import { Link } from 'gatsby'
import { groupBy, sortBy } from 'lodash'

interface SidebarMenuProps {
  pages: Array<Frontmatter>
  currentPathname: string
}

const { SubMenu } = Menu

/**
 * Gatsby uses trailing slashes by default
 */
const convertToOpenKeys = (slug) => {
  const split = slug.split('/')

  return `/${split[1]}/${split[2]}/`
}

export const SidebarMenu = (props: SidebarMenuProps) => {
  /**
   * Group by top-level menu item
   */
  const groupedMenu = groupBy(
    /**
     * Only show pages with either `order` or `suborder`, to hide a page, comment out those values in README.md
     */
    props.pages.filter((page) => {
      return typeof page.order === 'number' || typeof page.suborder === 'number'
    }),
    (args) => {
      const { title, slug } = args
      const component = slug.split('/')[2]

      return component
    },
  )

  return (
    <Menu
      defaultSelectedKeys={[props.currentPathname]}
      defaultOpenKeys={[convertToOpenKeys(props.currentPathname)]}
      mode="inline"
    >
      <>
        {Object.entries(groupedMenu).map(([component, vals]) => {
          /**
           * Top level menu is determined by slug size, number of `/` separators
           */
          const topLevel = vals.filter((val) => {
            return val.slug.split('/').length <= 4
          })[0]

          return (
            <SubMenu key={topLevel.slug} title={topLevel.title}>
              {sortBy(vals, ({ suborder }) => {
                return suborder
              }).map(({ title, slug }) => {
                return (
                  <Menu.Item key={slug}>
                    <Link to={slug}>{title}</Link>
                  </Menu.Item>
                )
              })}
            </SubMenu>
          )
        })}
      </>
    </Menu>
  )
}
