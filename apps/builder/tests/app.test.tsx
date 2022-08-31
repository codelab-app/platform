import 'mock-match-media/jest-setup.cjs'
import '../mocks'
import {
  fireEvent,
  getByRole,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import * as React from 'react'
import { mockCreateAppsHandler, mockGetApps } from '../mocks/handlers'
import { App } from '../pages/_app'
import { AppsPage } from '../pages/apps/index'

jest.mock('next/router', () => require('next-router-mock'))

// integration tests typically only mock HTTP requests via MSW

test(`display fetch app`, async () => {
  // The custom render returns a promise that resolves when the app has
  //   finished loading (if you're server rendering, you may not need this).
  // The custom render also allows you to specify your initial route
  await render(<App Component={AppsPage} pageProps={{}} />)

  await waitFor(() => {
    screen.getByText('test')
  })
})

test('create an app', async () => {
  await render(<App Component={AppsPage} pageProps={{}} />)

  fireEvent.click(screen.getByRole('button', { name: /Create App/i }))

  fireEvent.input(screen.getByLabelText('Name'), {
    target: {
      value: 'demo name',
    },
  })

  fireEvent.input(screen.getByLabelText('Slug'), {
    target: {
      value: 'demo slug',
    },
  })

  const btn = getByRole(screen.getByRole('dialog'), 'button', {
    name: /Create Demo/i,
  })

  fireEvent.click(btn)

  await waitFor(() => expect(mockCreateAppsHandler).toHaveBeenCalledTimes(1))

  await waitFor(() => {
    screen.getByText('demo name')
  })
})
