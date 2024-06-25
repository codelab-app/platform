import { AntdRegistry } from '@ant-design/nextjs-registry'
import { StoreProvider } from '@codelab/frontend-application-shared-store/provider'
import type { IUserDto } from '@codelab/shared/abstract/core'
import { App, ConfigProvider } from 'antd'
import React from 'react'
import { CuiProvider } from '../providers/CuiProvider'
import { StyledComponentsRegistry } from '../registry'
import { theme } from '../theme'

const Layout = ({
  children,
  user,
}: {
  user: IUserDto
  children: React.ReactNode
}) => {
  return (
    <StyledComponentsRegistry>
      <CuiProvider>
        <StoreProvider user={user}>
          <AntdRegistry>
            <ConfigProvider theme={theme}>
              <App>{children}</App>
            </ConfigProvider>
          </AntdRegistry>
        </StoreProvider>
      </CuiProvider>
    </StyledComponentsRegistry>
  )
}

export default Layout
