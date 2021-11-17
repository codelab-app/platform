import { CreatePageInput } from '@codelab/frontend/abstract/codegen'
import { FormUniforms } from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { createPageSchema } from './createPageSchema'
import { CreatePageFormProps } from './types'

export const CreatePageForm = (props: CreatePageFormProps) => {
  return (
    <FormUniforms<CreatePageInput> schema={createPageSchema} {...props}>
      <AutoFields omitFields={['appId']} />
    </FormUniforms>
  )
}
