import {
  ApiOutlined,
  AppstoreOutlined,
  BuildOutlined,
  DeploymentUnitOutlined,
  FunctionOutlined,
  TagOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { PageType } from '@codelab/frontend/model/store/router'
import { Menu } from 'antd'
import Link from 'next/link'
import React from 'react'

export const commonSidebarItems = [
  <Menu.Item
    key={PageType.AppList}
    icon={<AppstoreOutlined data-testid="app-tab-trigger" title="Apps" />}
  >
    <Link href={PageType.AppList}>Apps</Link>
  </Menu.Item>,
  <Menu.Item
    key={PageType.Admin}
    icon={<UserOutlined data-testid="admin-tab-trigger" title="Admin" />}
  >
    <Link href={PageType.Admin}>Admin</Link>
  </Menu.Item>,
  <Menu.Item
    key={PageType.Tag}
    icon={<TagOutlined data-testid="tag-tab-trigger" title="Tags" />}
  >
    <Link href={PageType.Tag}>Tags</Link>
  </Menu.Item>,
  <Menu.Item
    key={PageType.Atom}
    icon={
      <DeploymentUnitOutlined data-testid="atom-tab-trigger" title="Atoms" />
    }
  >
    <Link href={PageType.Atom}>Atoms</Link>
  </Menu.Item>,
  <Menu.Item
    key={PageType.LambdaList}
    icon={<FunctionOutlined title="Lambdas" />}
  >
    <Link href={PageType.LambdaList}>Lambdas</Link>
  </Menu.Item>,
  <Menu.Item key={PageType.Type} icon={<ApiOutlined title="Types" />}>
    <Link href={PageType.Type}>Types</Link>
  </Menu.Item>,

  <Menu.Item
    key={PageType.ComponentList}
    icon={<BuildOutlined title="Components" />}
  >
    <Link href={PageType.ComponentList}>Components</Link>
  </Menu.Item>,
]
