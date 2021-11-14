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
import { TargetKeyField } from '../create-prop-map-binding/TargetKeyField'
import {
  UpdatePropMapBindingSchema,
  updatePropMapBindingSchema,
} from './updatePropMapBindingSchema'

export interface UpdatePropMapBindingFormProps
  extends Omit<FormUniformsProps<UpdatePropMapBindingSchema>, 'schema'> {
  elementId: string
  providePropCompletion?: (searchValue: string) => Array<string>
  tree: ElementTree
}

export const UpdatePropMapBindingForm = ({
  providePropCompletion,
  elementId,
  tree,
  ...props
}: UpdatePropMapBindingFormProps) => {
  const [propCompleteOptions, setPropCompleteOptions] = useState<
    Array<{ label: string; value: string }>
  >([])

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
    <FormUniforms<UpdatePropMapBindingSchema>
      schema={updatePropMapBindingSchema}
      {...props}
    >
      <AutoFields omitFields={['sourceKey', 'targetElementId', 'targetKey']} />

      <AutoCompleteField
        name="sourceKey"
        onSearch={handlePropSearch}
        options={propCompleteOptions}
      />

      <ElementIdProvider elementId={elementId}>
        <AutoField name="targetElementId" component={SelectDescendantElement} />
      </ElementIdProvider>

      <TargetKeyField name="targetKey" tree={tree} />
    </FormUniforms>
  )
}
