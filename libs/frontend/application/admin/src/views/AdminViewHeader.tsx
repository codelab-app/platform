import {
  CuiHeader,
  CuiHeaderBreadcrumb,
} from '@codelab/frontend/presentation/codelab-ui'
import { Image } from 'antd'
import React from 'react'

export const AdminViewHeader = () => (
  <CuiHeader
    direction={<CuiHeaderBreadcrumb items={[{ title: 'Admin' }]} />}
    logo={
      <Image
        alt="codelab logo"
        className="size-full"
        preview={false}
        src="/logo.png"
      />
    }
  />
)
