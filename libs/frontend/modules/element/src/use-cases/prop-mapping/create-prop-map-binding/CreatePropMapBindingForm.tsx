import { SelectDescendantElement } from '@codelab/frontend/modules/type'
import { ElementIdProvider } from '@codelab/frontend/presenter/container'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  AutoCompleteField,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalMutationForm,
} from '@codelab/frontend/view/components'
import { ElementTree } from '@codelab/shared/core'
import React, { useState } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { useCreatePropMapBindingMutation } from './CreatePropMapBinding.web.graphql.gen'
import {
  CreatePropMapBindingSchema,
  createPropMapBindingSchema,
} from './createPropMapBindingSchema'
import { TargetKeyField } from './TargetKeyField'

export interface CreatePropMapBindingFormProps {
  elementId: string
  providePropCompletion?: (searchValue: string) => Array<string>
  tree: ElementTree
}

export const CreatePropMapBindingForm = ({
  elementId: initialElementId,
  providePropCompletion,
  tree,
  ...props
}: UniFormUseCaseProps<CreatePropMapBindingSchema> &
  CreatePropMapBindingFormProps) => {
  const {
    crudModal: { reset },
    handleSubmit,
  } = useCrudModalMutationForm({
    entityType: EntityType.App,
    useMutationFunction: useCreatePropMapBindingMutation,
    mapVariables: ({
      sourceKey,
      targetKey,
      targetElementId,
      elementId,
    }: CreatePropMapBindingSchema) => ({
      input: {
        sourceKey: sourceKey.trim(),
        targetKey: targetKey.trim(),
        targetElementId,
        elementId,
      },
    }),
  })

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
      onSubmit={handleSubmit}
      model={{ elementId: initialElementId }}
      schema={createPropMapBindingSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating prop map binding',
      })}
      onSubmitSuccess={() => reset()}
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
