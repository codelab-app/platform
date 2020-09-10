/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
import { Layout as ALayout, Menu } from 'antd'
import { Link } from 'gatsby'
import './app.scss'
import { reduce } from 'lodash'
import React, { ReactElement } from 'react'
import { Node } from '@codelab/entity/node'
import { Frontmatter } from '../templates/docTemplate.i'

const { Header, Content, Footer, Sider } = ALayout

export type LayoutProps = {
  frontmatters?: Array<Frontmatter>
  frontmatter: Frontmatter
  children: ReactElement | Array<ReactElement>
}

const Layout = (props: LayoutProps) => {
  const { children, frontmatter, frontmatters: menuNodes = [] } = props

  const nodes = menuNodes.map(
    (node) =>
      new Node<Frontmatter>({
        id: node.order.toString(),
        nodeType: 'Tree',
        props: { ...node },
      }),
  )

  const menu = {
    type: 'Menu',
    props: {
      mode: 'inline',
      theme: 'dark',
      style: {
        width: 320,
      },
    },
    children: [],
  }

  const menuData = reduce(
    nodes,
    (acc, menuNode, index) => {
      const { level, key } = menuNode.props

      let node = {}

      if (level === 0 || level === 2) {
        node = {
          type: 'Menu.Item',
          props: {
            key,
          },
        }
      }

      if (level === 1) {
        node = {
          type: 'Menu.SubMenu',
          props: {
            key,
          },
        }
      }

      return { ...acc, children: [...acc.children, node] }
    },
    menu,
  )

  // const data = useStaticQuery(graphql`
  //     query SiteTitleQuery {
  //         site {
  //             siteMetadata {
  //                 title
  //             }
  //         }
  //     }
  // `);
  //

  return (
    <ALayout>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[frontmatter.title]}
        >
          {menuNodes
            .filter(({ order }) => order)
            .map((item) => {
              return (
                <Menu.Item key={item.title}>
                  <Link to={item.path}>{item.title}</Link>
                </Menu.Item>
              )
            })}
        </Menu>
      </Sider>
      <ALayout style={{ marginLeft: 200 }}>
        {/* <Header style={{ background: '#fff', padding: 0 }} /> */}
        <Content style={{ margin: '1rem 1.5rem', overflow: 'initial' }}>
          <h1 style={{ fontSize: '1.75rem' }}>{frontmatter.title}</h1>
          <hr />
          {children}
        </Content>
      </ALayout>
    </ALayout>
  )
}

export default Layout
