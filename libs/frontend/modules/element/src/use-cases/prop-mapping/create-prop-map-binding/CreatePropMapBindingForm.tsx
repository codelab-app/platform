import { FormProps, UseCaseFormWithRef } from '@codelab/frontend/abstract/props'
import { SelectDescendantElement } from '@codelab/frontend/modules/type'
import { ElementIdProvider } from '@codelab/frontend/presenter/container'
import { AutoCompleteField, Form } from '@codelab/frontend/view/components'
import { CreatePropMapBindingInput } from '@codelab/shared/abstract/codegen'
import { ElementTree } from '@codelab/shared/core'
import React, { useState } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { createPropMapBindingSchema } from './createPropMapBindingSchema'
import { TargetKeyField } from './TargetKeyField'

export type CreatePropMapBindingFormProps =
  UseCaseFormWithRef<CreatePropMapBindingInput> & PropMapBindingProps

export interface PropMapBindingProps {
  elementId: string
  providePropCompletion?: (searchValue: string) => Array<string>
  tree: ElementTree
}

export const CreatePropMapBindingForm = ({
  elementId: initialElementId,
  providePropCompletion,
  tree,
  onSubmit,
  onSubmitSuccess,
  onSubmitError,
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
    <Form<CreatePropMapBindingInput>
      model={{ elementId: initialElementId }}
      onSubmit={onSubmit}
      onSubmitError={onSubmitError}
      onSubmitSuccess={onSubmitSuccess}
      schema={createPropMapBindingSchema}
      submitRef={undefined}
    >
      <AutoFields omitFields={['sourceKey', 'targetElementId', 'targetKey']} />

      <AutoCompleteField
        name="sourceKey"
        onSearch={handlePropSearch}
        options={propCompleteOptions}
      />

      <ElementIdProvider elementId={initialElementId}>
        <AutoField component={SelectDescendantElement} name="targetElementId" />
      </ElementIdProvider>

      <TargetKeyField name="targetKey" tree={tree} />
    </Form>
  )
}
