import '../styles/global.css'
import { useUrl } from '@codelab/frontend-application-shared-store/router'
import { guestUser } from '@codelab/shared/data/test'
import type { Preview } from '@storybook/react'
import { ConfigProvider } from 'antd'
import React from 'react'
import { Providers } from '../components'

const preview: Preview = {
  decorators: [
    (Story) => {
      const { params, query } = useUrl()

      return (
        <Providers user={guestUser}>
          <ConfigProvider theme={{ token: {} }}>
            <Story />
          </ConfigProvider>
        </Providers>
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
