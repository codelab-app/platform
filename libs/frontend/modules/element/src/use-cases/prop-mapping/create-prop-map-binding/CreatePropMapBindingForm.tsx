import { SelectDescendantElement } from '@codelab/frontend/modules/type'
import { ElementIdProvider } from '@codelab/frontend/presenter/container'
import {
  AutoCompleteField,
  FormUniforms,
  FormUniformsProps,
} from '@codelab/frontend/view/components'
import { ElementTree } from '@codelab/shared/core'
import React, { useState } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import {
  CreatePropMapBindingSchema,
  createPropMapBindingSchema,
} from './createPropMapBindingSchema'
import { TargetKeyField } from './TargetKeyField'

export interface CreatePropMapBindingFormProps
  extends Omit<FormUniformsProps<CreatePropMapBindingSchema>, 'schema'> {
  elementId: string
  providePropCompletion?: (searchValue: string) => Array<string>
  tree: ElementTree
}

export const CreatePropMapBindingForm = ({
  elementId: initialElementId,
  providePropCompletion,
  tree,
  ...props
}: CreatePropMapBindingFormProps) => {
  const [propCompleteOptions, setPropCompleteOptions] = useState<
    Array<{ label: string; value: string }>
  >(
    providePropCompletion
      ? providePropCompletion('').map((o) => ({ value: o, label: o }))
      : [],
  )

  const handlePropSearch = (value: string) => {
    if (providePropCompletion) {
      setPropCompleteOptions(
        providePropCompletion(value).map((option) => ({
          value: option,
          label: option,
        })),
      )
    }
  }

  return (
    <FormUniforms<CreatePropMapBindingSchema>
      model={{ elementId: initialElementId }}
      schema={createPropMapBindingSchema}
      {...props}
    >
      <AutoFields omitFields={['sourceKey', 'targetElementId', 'targetKey']} />

      <AutoCompleteField
        name="sourceKey"
        onSearch={handlePropSearch}
        options={propCompleteOptions}
      />

      <ElementIdProvider elementId={initialElementId}>
        <AutoField name="targetElementId" component={SelectDescendantElement} />
      </ElementIdProvider>

      <TargetKeyField name="targetKey" tree={tree} />
    </FormUniforms>
  )
}
