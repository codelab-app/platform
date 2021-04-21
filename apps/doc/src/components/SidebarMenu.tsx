import { Menu } from 'antd'
import React from 'react'
import { Frontmatter } from '../templates/blogTemplate'
import { Link } from 'gatsby'
import { css } from '@emotion/react'

interface SidebarMenuProps {
  pages: Array<Frontmatter>
  currentPathname: string
}

const { SubMenu } = Menu

/**
 * Gatsby uses trailing slashes by default
 */
const convertToOpenKeys = (slug) => {
  const paths = slug.split('/').filter((x) => x !== '')

  return paths
    .reduce((acc, cur) => {
      // Any subpath should be open
      return [...acc, `${acc.reverse()[0] ?? ''}/${cur}`]
    }, [])
    .map((x) => `${x}/`)
}

export const SidebarMenu = (props: SidebarMenuProps) => {
  const defaultOpenKeys = convertToOpenKeys(props.currentPathname)

  return (
    <Menu
      css={css`
        height: 100%;
      `}
      collapsedWidth={420}
      defaultSelectedKeys={[props.currentPathname]}
      defaultOpenKeys={defaultOpenKeys}
      mode="inline"
    >
      <SubMenu key="/getting-started/" title="Getting Started">
        <Menu.Item key="/getting-started/what-is-codelab/">
          <Link to="/getting-started/what-is-codelab/">What is Codelab?</Link>
        </Menu.Item>
        <Menu.Item key="/getting-started/getting-started/">
          <Link to="/getting-started/getting-started/">Getting Started</Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu key="/modules/" title="Modules">
        <SubMenu key="/modules/component/" title="Component">
          <Menu.Item key="/modules/component/atom/">
            <Link to="/modules/component/atom/">Atom</Link>
          </Menu.Item>
          <Menu.Item key="/modules/component/component/">
            <Link to="/modules/component/component/">Component</Link>
          </Menu.Item>
          <Menu.Item key="/modules/component/component-element/">
            <Link to="/modules/component/component-element/">
              Component Element
            </Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="/modules/page/">
          <Link to="/modules/page/">Page</Link>
        </Menu.Item>
        <Menu.Item key="/modules/prop/">
          <Link to="/modules/prop/">Prop</Link>
        </Menu.Item>
        <Menu.Item key="/modules/library/">
          <Link to="/modules/library/">Library</Link>
        </Menu.Item>
      </SubMenu>
    </Menu>
  )
}
