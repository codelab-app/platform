import { CuiForm } from '@codelab/frontend/presentation/codelab-ui'
import type { Meta } from '@storybook/react'
import { createRjsfTypeSchema } from './create-type.rjsf.schema'
import { CreateTypeForm } from './CreateTypeForm'

const meta: Meta<typeof CreateTypeForm> = {
  // component: CreateTypeForm,
  title: 'Create Type Form',
}

export default meta

export const TypeForm = {
  render: () => (
    <CuiForm
      schema={createRjsfTypeSchema}
      // uiSchema={{
      //   __typename: {
      //     'ui:widget': 'hidden',
      //   },
      // }}
    />
  ),
}

export const UniformCreateTypeForm = {
  render: () => <CreateTypeForm />,
}
