import {
  ApiOutlined,
  DeploymentUnitOutlined,
  TagOutlined,
} from '@ant-design/icons'
import { PageType } from '@codelab/frontend/abstract/types'
import { MenuProps } from 'antd'
import Link from 'next/link'
import React from 'react'

export const adminMenuItems: MenuProps['items'] = [
  {
    label: <Link href={PageType.Atom}>Atoms</Link>,
    icon: (
      <DeploymentUnitOutlined data-testid="atom-tab-trigger" title="Atoms" />
    ),
    key: PageType.Atom,
  },
  {
    label: <Link href={PageType.Type}>Types</Link>,
    icon: <ApiOutlined title="Types" />,
    key: PageType.Type,
  },
  {
    label: <Link href={PageType.Tag}>Tags</Link>,
    icon: <TagOutlined title="Tags" />,
    key: PageType.Tag,
  },
  // {
  //   icon: <UserOutlined data-testid="admin-tab-trigger" title="Admin" />,
  //   key: PageType.Admin,
  //   label: <Link href={PageType.Admin}>Admin</Link>,
  // },
]
