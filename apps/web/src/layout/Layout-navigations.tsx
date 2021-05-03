import {
  ApartmentOutlined,
  AppstoreOutlined,
  BookOutlined,
  CopyOutlined,
  DeploymentUnitOutlined,
  FunctionOutlined,
} from '@ant-design/icons'
import { LibraryContext, PageType, PaneType } from '@codelab/frontend/shared'
import { Menu } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import xw from 'xwind'

export const LayoutNavigations = () => {
  const router = useRouter()
  const { libraries } = useContext(LibraryContext)

  return (
    <div data-testid="pane-main" css={xw`h-full`}>
      <Menu
        css={xw`w-full h-full`}
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
          key={PageType.Library}
          icon={
            <BookOutlined data-testid="library-tab-trigger" title="Library" />
          }
        >
          <Link
            href={{
              pathname: PageType.Library,
            }}
          >
            Library
          </Link>
        </Menu.Item>
        <Menu.Item
          key={PageType.AtomList}
          icon={
            <DeploymentUnitOutlined
              data-testid="atom-tab-trigger"
              title="Atom"
            />
          }
        >
          <Link
            href={{
              pathname: PageType.AtomList,
              query: {
                libraryId: libraries?.[0].id,
              },
            }}
          >
            Atom
          </Link>
        </Menu.Item>
        <Menu.Divider />
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
        <Menu.Divider />
      </Menu>
    </div>
  )
}
