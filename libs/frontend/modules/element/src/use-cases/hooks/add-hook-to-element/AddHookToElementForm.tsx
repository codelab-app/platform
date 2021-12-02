import { InterfaceForm } from '@codelab/frontend/modules/type'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { addHookToElementSchema } from './addHookToElementSchema'
import { AddHookToElementFormProps } from './types'

export const AddHookToElementForm = ({
  interfaceLoading,
  ...props
}: AddHookToElementFormProps) => {
  return (
    <InterfaceForm {...props} schema={addHookToElementSchema}>
      <AutoFields omitFields={['appId']} />
    </InterfaceForm>
  )
}
