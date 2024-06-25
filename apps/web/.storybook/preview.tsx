import '../styles/global.css'
import { createCoreStore } from '@codelab/frontend/infra/mobx'
import { StoreProvider } from '@codelab/frontend-application-shared-store/provider'
import { useUrl } from '@codelab/frontend-application-shared-store/router'
import { guestUser } from '@codelab/shared/data/test'
import type { Preview } from '@storybook/react'
import { ConfigProvider } from 'antd'
import React from 'react'

const preview: Preview = {
  decorators: [
    (Story) => {
      const { params, query } = useUrl()
      const store = createCoreStore({ params, query }, guestUser)

      return (
        <StoreProvider value={store}>
          <ConfigProvider theme={{ token: {} }}>
            <Story />
          </ConfigProvider>
        </StoreProvider>
      )
    },
  ],
  parameters: {
    backgrounds: {
      values: [
        { name: 'red', value: '#f00' },
        { name: 'green', value: '#0f0' },
      ],
    },
  },
}

export default preview
