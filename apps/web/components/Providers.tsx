'use client'

import { AntdRegistry } from '@ant-design/nextjs-registry'
import { FormContextProvider } from '@codelab/frontend-presentation-components-form'
import App from 'antd/lib/app'
import ConfigProvider from 'antd/lib/config-provider'
import { Provider } from 'jotai'
import type { PropsWithChildren } from 'react'
import React from 'react'
import { theme } from '../app/theme'
import { StyledComponentsRegistry } from './StyledComponentsRegistry'

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <StyledComponentsRegistry>
      <ConfigProvider theme={theme}>
        <AntdRegistry>
          <Provider>
            <App>{children}</App>
          </Provider>
        </AntdRegistry>
      </ConfigProvider>
    </StyledComponentsRegistry>
  )
}
