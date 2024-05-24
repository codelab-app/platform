import '../styles/global.css'
import { createCoreStore } from '@codelab/frontend/infra/mobx'
import { userDto } from '@codelab/frontend/test/data'
import { StoreProvider } from '@codelab/frontend-application-shared-store'
import { JWT_CLAIMS } from '@codelab/shared/abstract/core'
import type { Preview } from '@storybook/react'
import { ConfigProvider } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import { v4 } from 'uuid'

const preview: Preview = {
  decorators: [
    (Story) => {
      const router = useRouter()

      const user = {
        ...userDto,
        [JWT_CLAIMS]: {
          neo4j_user_id: v4(),
          roles: [],
        },
      }

      const store = createCoreStore(router, user)

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
