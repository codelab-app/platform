import type { Meta } from '@storybook/react'
import React from 'react'
import { CreateResourceForm } from './CreateResourceForm'

const meta: Meta<typeof CreateResourceForm> = {
  title: 'Create Resource Form',
}

export default meta

export const CreateResourceFormStory = {
  render: () => <CreateResourceForm />,
}
