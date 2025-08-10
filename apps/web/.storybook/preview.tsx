import type { Preview } from '@storybook/nextjs'

import {
  NotificationProvider,
  React19Compatibility,
  StyleProviders,
} from '@codelab/frontend-infra-context'
import {
  createRootStore,
  RootStoreProvider,
} from '@codelab/frontend-infra-mobx-store'
import { initialize, mswLoader } from 'msw-storybook-addon'
import React from 'react'

import '../styles/app.css'
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
      const store = createRootStore()

      // Set user after store creation if needed
      // const user = {
      //   ...userDto,
      //   [JWT_CLAIMS]: {
      //     neo4j_user_id: v4(),
      //     roles: [],
      //   },
      // }

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
