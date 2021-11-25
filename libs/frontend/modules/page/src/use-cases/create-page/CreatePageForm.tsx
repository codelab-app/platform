import { FormUniforms } from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { createPageSchema } from './createPageSchema'
import { CreatePageFormProps, CreatePageMutationInput } from './types'

export const CreatePageForm = (props: CreatePageFormProps) => {
  return (
    <FormUniforms<CreatePageMutationInput> schema={createPageSchema} {...props}>
      <AutoFields omitFields={['appId']} />
    </FormUniforms>
  )
}
