import '../styles/global.css'
import { createCoreStore } from '@codelab/frontend/infra/mobx'
import { StoreProvider } from '@codelab/frontend-application-shared-store/provider'
import { useUrl } from '@codelab/frontend-application-shared-store/router'
import { JWT_CLAIMS } from '@codelab/shared/abstract/core'
import { guestUser, userDto } from '@codelab/shared/data/test'
import type { Preview } from '@storybook/react'
import { ConfigProvider } from 'antd'
import { useRouter } from 'next/navigation'
import React from 'react'
import { v4 } from 'uuid'

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
