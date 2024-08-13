import '../styles/global.css'
import { RootProviders } from '@codelab/frontend/infra/context'
import { userDto } from '@codelab/frontend/test/data'
import { useUrl } from '@codelab/frontend-application-shared-store/router'
import type { Preview } from '@storybook/react'
import { ConfigProvider } from 'antd'
import React from 'react'

const preview: Preview = {
  decorators: [
    (Story) => {
      const { params, query } = useUrl()

      return (
        <RootProviders user={userDto}>
          <ConfigProvider theme={{ token: {} }}>
            <Story />
          </ConfigProvider>
        </RootProviders>
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
