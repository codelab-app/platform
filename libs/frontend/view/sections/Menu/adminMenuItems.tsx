import { ApiOutlined, DeploymentUnitOutlined } from '@ant-design/icons'
import { PageType } from '@codelab/frontend/abstract/types'
import { MenuProps } from 'antd'
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
    label: <Link href={PageType.Type}>Types</Link>,
    icon: <ApiOutlined title="Types" />,
    key: PageType.Type,
  },
  // {
  //   icon: <UserOutlined data-testid="admin-tab-trigger" title="Admin" />,
  //   key: PageType.Admin,
  //   label: <Link href={PageType.Admin}>Admin</Link>,
  // },
]
