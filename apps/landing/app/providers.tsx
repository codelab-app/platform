'use client'

import type { PropsWithChildren } from 'react'

import { Auth0Provider } from '@auth0/nextjs-auth0'
import { App as AntdApp, ConfigProvider } from 'antd'

import { MenuProvider } from '../src/home/menu/MenuContext'

export const Providers = ({ children }: PropsWithChildren) => {
  return (
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
  )
}
