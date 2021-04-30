import React from 'react'
import { Menu } from 'antd'
import { PageType, PaneType } from '@codelab/frontend/shared'
import {
  ApartmentOutlined,
  AppstoreOutlined,
  BookOutlined,
  CopyOutlined,
  DeploymentUnitOutlined,
  FunctionOutlined,
} from '@ant-design/icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useGetLibrariesQuery } from '@codelab/hasura'

const { SubMenu } = Menu

export const LayoutNavigations = () => {
  const router = useRouter()
  const {
    data: librariesData,
    loading: loadingLibraries,
  } = useGetLibrariesQuery()

  console.log(loadingLibraries, librariesData?.library[0].id)

  return (
    <div data-testid="pane-main">
      <Menu
        style={{ width: '100%' }}
        defaultSelectedKeys={[router.pathname]}
        defaultOpenKeys={[]}
        mode="inline"
      >
        <Menu.Item
          key={PageType.AppList}
          icon={<AppstoreOutlined data-testid="app-tab-trigger" title="Apps" />}
        >
          <Link href={PageType.AppList}>Apps</Link>
        </Menu.Item>
        <Menu.Divider />
        {/* <SubMenu
          key="sub1"
          icon={
            <BookOutlined data-testid="library-tab-trigger" title="Library" />
          }
          title="Library"
        >
          <Menu.Item key="2">Library</Menu.Item>
          <Menu.Divider />
          <Menu.Item key="3">Atom</Menu.Item>
          <Menu.Item key="4">Component</Menu.Item>
        </SubMenu> */}
        <Menu.Item
          key={PageType.PageDetail}
          icon={<CopyOutlined data-testid="page-tab-trigger" title="Pages" />}
        >
          <Link
            href={{
              pathname: PageType.PageDetail,
              query: { ...router.query, pane: PaneType.Page },
            }}
          >
            Page
          </Link>
        </Menu.Item>
        <Menu.Item
          key="tree"
          icon={
            <ApartmentOutlined data-testid="tree-tab-trigger" title="Tree" />
          }
        >
          Tree
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          key="component"
          icon={
            <BookOutlined data-testid="library-tab-trigger" title="Library" />
          }
        >
          <Link
            href={{
              pathname: PageType.LibraryList,
              query: { ...router.query, pane: PaneType.Library },
            }}
          >
            Library
          </Link>
        </Menu.Item>
        <Menu.Item
          key="atom"
          icon={
            <DeploymentUnitOutlined
              data-testid="atom-tab-trigger"
              title="Atom"
            />
          }
        >
          {loadingLibraries ? (
            'Atom'
          ) : (
            <Link
              href={{
                pathname: PageType.AtomList,
                query: {
                  libraryId: librariesData?.library[0].id,
                  // atomId: 'adfa',
                },
              }}
            >
              Atom
            </Link>
          )}
        </Menu.Item>
        <Menu.Item
          key="lambda"
          icon={
            <FunctionOutlined
              data-testid="lambda-tab-trigger"
              title="Function"
            />
          }
        >
          Lambda
        </Menu.Item>
      </Menu>
    </div>
  )
}
