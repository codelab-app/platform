import type { Preview } from '@storybook/react'

import {
  NotificationProvider,
  React19Compatibility,
  StyleProviders,
} from '@codelab/frontend-infra-context'
import {
  createRootStore,
  RootStoreProvider,
} from '@codelab/frontend-infra-mobx-store'
import { userDto } from '@codelab/frontend-test-data'
import { JWT_CLAIMS } from '@codelab/shared-abstract-core'
import { initialize, mswLoader } from 'msw-storybook-addon'
// eslint-disable-next-line unused-imports/no-unused-imports
import { v4 } from 'uuid'

import '../styles/main.css'
// import twindConfig from '../twind.config'

/*
 * Initializes MSW
 * See https://github.com/mswjs/msw-storybook-addon#configuring-msw
 * to learn how to customize it
 */
initialize()

const preview: Preview = {
  decorators: [
    (Story) => {
      const user = {
        ...userDto,
        [JWT_CLAIMS]: {
          neo4j_user_id: v4(),
          roles: [],
        },
      }

      const store = createRootStore({
        user,
      })

      return (
        <RootStoreProvider value={store}>
          <React19Compatibility />
          <StyleProviders>
            <NotificationProvider>
              <Story />
            </NotificationProvider>
          </StyleProviders>
        </RootStoreProvider>
      )
    },
  ],
  loaders: [mswLoader],
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
