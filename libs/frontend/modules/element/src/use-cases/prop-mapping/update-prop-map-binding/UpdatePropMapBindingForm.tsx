import { UseCaseFormWithRef } from '@codelab/frontend/abstract/types'
import { SelectDescendantElement } from '@codelab/frontend/modules/type'
import { AutoCompleteField, Form } from '@codelab/frontend/view/components'
import { UpdatePropMapBindingData } from '@codelab/shared/abstract/codegen'
import React, { useState } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { PropMapBindingProps } from '../create-prop-map-binding'
import { TargetKeyField } from '../create-prop-map-binding/TargetKeyField'
import { updatePropMapBindingSchema } from './updatePropMapBindingSchema'

export type UpdatePropMapBindingFormProps =
  UseCaseFormWithRef<UpdatePropMapBindingData> & PropMapBindingProps

export const UpdatePropMapBindingForm = ({
  providePropCompletion,
  elementId,
  tree,
  onSubmit,
  model,
  onSubmitSuccess,
  onSubmitError,
  submitRef,
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
    <Form<UpdatePropMapBindingData>
      model={model}
      onSubmit={onSubmit}
      onSubmitError={onSubmitError}
      onSubmitSuccess={onSubmitSuccess}
      schema={updatePropMapBindingSchema}
      submitRef={submitRef}
    >
      <AutoFields omitFields={['sourceKey', 'targetElementId', 'targetKey']} />
      <AutoCompleteField
        name="sourceKey"
        onSearch={handlePropSearch}
        options={propCompleteOptions}
      />
      {/* <ElementIdProvider elementId={elementId}>*/}
      <AutoField component={SelectDescendantElement} name="targetElementId" />
      {/* </ElementIdProvider>*/}
      <TargetKeyField name="targetKey" tree={tree} />
    </Form>
  )
}
