import { CuiForm } from '@codelab/frontend/presentation/codelab-ui'
import { Form } from '@codelab/frontend/presentation/view'
import type { Meta } from '@storybook/react'
import { Button, ConfigProvider } from 'antd'
import React from 'react'
import { createRjsfTypeSchema } from './create-type.rjsf.schema'
import type { CreateTypeForm } from './CreateTypeForm'

const meta: Meta<typeof CreateTypeForm> = {
  // component: CreateTypeForm,
  title: 'Create Type Form',
}

export default meta

export const TypeForm = {
  render: () => <CuiForm schema={createRjsfTypeSchema} />,
}

export const Test = {
  render: () => <Button>Test</Button>,
}
