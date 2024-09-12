import '../styles/global.css'
import { RootProviders } from '@codelab/frontend/infra/context'
import { preferenceDto, userDto } from '@codelab/frontend/test/data'
import type { Preview } from '@storybook/react'
import { ConfigProvider } from 'antd'

const preview: Preview = {
  decorators: [
    (Story) => {
      return (
        <RootProviders preference={preferenceDto} user={userDto}>
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

  tags: ['autodocs'],
}

export default preview
