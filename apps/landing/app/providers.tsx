'use client'

import type { PropsWithChildren } from 'react'

import { AntdRegistry } from '@ant-design/nextjs-registry'
import { Auth0Provider } from '@auth0/nextjs-auth0'
import { App as AntdApp, ConfigProvider } from 'antd'

import { MenuProvider } from '../src/home/menu/MenuContext'
import { StyledComponentsRegistry } from './styled-components-registry'

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <StyledComponentsRegistry>
      <AntdRegistry>
        <MenuProvider>
          <Auth0Provider>
            <ConfigProvider
              theme={{
                token: {
                  fontFamily: 'Nunito',
                  fontFamilyCode: 'Nunito',
                },
              }}
            >
              <AntdApp>{children}</AntdApp>
            </ConfigProvider>
          </Auth0Provider>
        </MenuProvider>
      </AntdRegistry>
    </StyledComponentsRegistry>
  )
}
