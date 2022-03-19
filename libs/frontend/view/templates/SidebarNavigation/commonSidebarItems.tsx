import {
  ApiOutlined,
  AppstoreOutlined,
  BuildOutlined,
  ClusterOutlined,
  DeploymentUnitOutlined,
  FunctionOutlined,
  TagOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { PageType } from '@codelab/frontend/abstract/types'
import { Menu } from 'antd'
import Link from 'next/link'
import React from 'react'

export const commonSidebarItems = [
  <Menu.Item
    icon={<AppstoreOutlined data-testid="app-tab-trigger" title="Apps" />}
    key={PageType.AppList}
  >
    <Link href={PageType.AppList}>Apps</Link>
  </Menu.Item>,
  <Menu.Item
    icon={<UserOutlined data-testid="admin-tab-trigger" title="Admin" />}
    key={PageType.Admin}
  >
    <Link href={PageType.Admin}>Admin</Link>
  </Menu.Item>,
  <Menu.Item
    icon={<TagOutlined data-testid="tag-tab-trigger" title="Tags" />}
    key={PageType.Tag}
  >
    <Link href={PageType.Tag}>Tags</Link>
  </Menu.Item>,
  <Menu.Item
    icon={
      <DeploymentUnitOutlined data-testid="atom-tab-trigger" title="Atoms" />
    }
    key={PageType.Atom}
  >
    <Link href={PageType.Atom}>Atoms</Link>
  </Menu.Item>,
  <Menu.Item
    icon={<FunctionOutlined title="Lambdas" />}
    key={PageType.LambdaList}
  >
    <Link href={PageType.LambdaList}>Lambdas</Link>
  </Menu.Item>,
  <Menu.Item icon={<ApiOutlined title="Types" />} key={PageType.Type}>
    <Link href={PageType.Type}>Types</Link>
  </Menu.Item>,

  <Menu.Item
    icon={<BuildOutlined title="Components" />}
    key={PageType.ComponentList}
  >
    <Link href={PageType.ComponentList}>Components</Link>
  </Menu.Item>,
  <Menu.Item icon={<ClusterOutlined title="Stores" />} key={PageType.Store}>
    <Link href={PageType.Store}>Stores</Link>
  </Menu.Item>,
]
