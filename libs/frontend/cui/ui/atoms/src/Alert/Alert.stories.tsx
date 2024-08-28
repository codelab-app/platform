import { RocketIcon } from '@radix-ui/react-icons'
import React from 'react'
import { Alert, AlertDescription, AlertTitle } from './Alert'

export default {
  component: Alert,
  title: 'Atoms/Alert',
}

export const Default = {
  args: {},
  render: () => (
    <Alert>
      <RocketIcon className="size-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
}
