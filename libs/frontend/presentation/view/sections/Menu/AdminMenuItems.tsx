import {
  ApiOutlined,
  DeploymentUnitOutlined,
  TagOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { PageType } from '@codelab/frontend/abstract/types'
import type { NavigationBarItem } from '@codelab/frontend/presentation//codelab-ui'
import React from 'react'

export const adminMenuItems: Array<NavigationBarItem> = [
  {
    icon: (
      <DeploymentUnitOutlined data-testid="atom-tab-trigger" title="Atoms" />
    ),
    key: PageType.Atoms,
    link: {
      href: PageType.Atoms,
    },
    title: 'Atoms',
  },
  {
    icon: <ApiOutlined title="Types" />,
    key: PageType.Type,
    link: {
      href: PageType.Type,
    },
    title: 'Types',
  },
  {
    icon: <TagOutlined title="Tags" />,
    key: PageType.Tag,
    link: {
      href: PageType.Tag,
    },
    title: 'Tags',
  },
  {
    icon: <UserOutlined title="Admin" />,
    key: PageType.Admin,
    link: {
      href: PageType.Admin,
    },
    title: 'Admin',
  },
]
