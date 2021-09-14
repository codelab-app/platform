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
import React, { useState } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { ElementTreeGraphql } from '../../../tree'
import { refetchGetElementQuery } from '../../get-element'
import { TargetKeyField } from '../create-prop-map-binding/TargetKeyField'
import { useUpdatePropMapBindingMutation } from './UpdatePropMapBinding.api.graphql.gen'
import {
  UpdatePropMapBindingSchema,
  updatePropMapBindingSchema,
} from './updatePropMapBindingSchema'

export interface UpdatePropMapBindingFormProps {
  elementId: string
  providePropCompletion?: (searchValue: string) => Array<string>
  tree: ElementTreeGraphql
}

export const UpdatePropMapBindingForm = ({
  providePropCompletion,
  elementId,
  tree,
  ...props
}: UniFormUseCaseProps<UpdatePropMapBindingSchema> &
  UpdatePropMapBindingFormProps) => {
  const {
    crudModal: {
      reset,
      state: { metadata },
    },
    handleSubmit,
  } = useCrudModalMutationForm({
    entityType: EntityType.App,
    useMutationFunction: useUpdatePropMapBindingMutation,
    mutationOptions: {
      refetchQueries: [refetchGetElementQuery({ input: { elementId } })],
    },
    mapVariables: (
      { sourceKey, targetKey, targetElementId }: UpdatePropMapBindingSchema,
      state,
    ) => ({
      input: {
        data: { sourceKey, targetKey, targetElementId },
        propMapBindingId: state.updateId,
      },
    }),
  })

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
      onSubmit={handleSubmit}
      schema={updatePropMapBindingSchema}
      model={metadata}
      onSubmitError={createNotificationHandler({
        title: 'Error while updating prop map binding',
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

      <ElementIdProvider elementId={elementId}>
        <AutoField name="targetElementId" component={SelectDescendantElement} />
      </ElementIdProvider>

      <TargetKeyField name="targetKey" tree={tree} />
    </FormUniforms>
  )
}
