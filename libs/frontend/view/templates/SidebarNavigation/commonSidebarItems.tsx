import {
  ApiOutlined,
  AppstoreOutlined,
  CloudServerOutlined,
  DeploymentUnitOutlined,
  FunctionOutlined,
  TagOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { PageType } from '@codelab/frontend/abstract/types'
import { MenuProps } from 'antd'
import Link from 'next/link'
import React from 'react'

export const commonSidebarItems: MenuProps['items'] = [
  {
    icon: <AppstoreOutlined data-testid="app-tab-trigger" title="Apps" />,
    key: PageType.AppList,
    label: <Link href={PageType.AppList}>Apps</Link>,
  },
  {
    icon: <UserOutlined data-testid="admin-tab-trigger" title="Admin" />,
    key: PageType.Admin,
    label: <Link href={PageType.Admin}>Admin</Link>,
  },
  {
    icon: <TagOutlined data-testid="tag-tab-trigger" title="Tags" />,
    key: PageType.Tag,
    label: <Link href={PageType.Tag}>Tags</Link>,
  },
  {
    icon: (
      <DeploymentUnitOutlined data-testid="atom-tab-trigger" title="Atoms" />
    ),
    key: PageType.Atom,
    label: <Link href={PageType.Atom}> Atoms</Link>,
  },
  {
    icon: (
      <CloudServerOutlined
        data-testid="resource-tab-trigger"
        title="Resources"
      />
    ),
    key: PageType.Resource,
    label: <Link href={PageType.Resource}> Resources</Link>,
  },
  {
    icon: <FunctionOutlined title="Lambdas" />,
    key: PageType.LambdaList,
    label: <Link href={PageType.LambdaList}> Lambdas</Link>,
  },
  {
    label: <Link href={PageType.Type}>Types</Link>,
    icon: <ApiOutlined title="Types" />,
    key: PageType.Type,
  },
  // {
  //   icon: <BuildOutlined title="Components" />,
  //   key: PageType.ComponentList,
  //   label: <Link href={PageType.ComponentList}>Components</Link>,
  // },
]
