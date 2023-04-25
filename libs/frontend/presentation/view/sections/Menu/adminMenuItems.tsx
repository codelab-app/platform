import {
  ApiOutlined,
  DeploymentUnitOutlined,
  TagOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { PageType } from '@codelab/frontend/abstract/types'
import type { MenuProps } from 'antd'
import Link from 'next/link'
import React from 'react'

export const adminMenuItems: MenuProps['items'] = [
  {
    icon: (
      <DeploymentUnitOutlined data-testid="atom-tab-trigger" title="Atoms" />
    ),
    key: PageType.Atom,
    label: <Link href={PageType.Atom}>Atoms</Link>,
  },
  {
    icon: <ApiOutlined title="Types" />,
    key: PageType.Type,
    label: <Link href={PageType.Type}>Types</Link>,
  },
  {
    icon: <TagOutlined title="Tags" />,
    key: PageType.Tag,
    label: <Link href={PageType.Tag}>Tags</Link>,
  },
  {
    icon: <UserOutlined title="Admin" />,
    key: PageType.Admin,
    label: <Link href={PageType.Admin}>Admin</Link>,
  },
]
