import { BaseMutationOptions } from '@apollo/client'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalMutationForm,
} from '@codelab/frontend/view/components'
import {
  CreateElementInput,
  useCreateElementMutation,
  useGetAtomsQuery,
  useGetComponentsQuery,
} from '@codelab/shared/codegen/graphql'
import React, { useRef } from 'react'
import { AutoFields, SelectField } from 'uniforms-antd'
import { createElementSchema } from './createElementSchema'

export interface CreateElementFormProps
  extends UniFormUseCaseProps<CreateElementInput> {
  parentElementOptions: Array<{ label: string; value: string }>
  refetchQueries?: BaseMutationOptions['refetchQueries']
  initialData: Partial<Pick<CreateElementInput, 'parentElementId'>> | undefined
}

export const CreateElementForm = ({
  parentElementOptions,
  refetchQueries,
  initialData,
  ...props
}: CreateElementFormProps) => {
  const initialDataRef = useRef(initialData)

  const {
    handleSubmit,
    crudModal: {
      reset,
      state: { metadata },
    },
  } = useCrudModalMutationForm({
    entityType: EntityType.Element,
    mutationOptions: { refetchQueries },
    useMutationFunction: useCreateElementMutation,
    mapVariables: (formData: CreateElementInput) => ({
      input: {
        ...formData,
      },
    }),
  })

  const { data: atoms } = useGetAtomsQuery()
  const { data: components } = useGetComponentsQuery()

  return (
    <FormUniforms<CreateElementInput>
      schema={createElementSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating element',
      })}
      onSubmit={handleSubmit}
      onSubmitSuccess={() => reset()}
      model={{
        parentElementId:
          initialDataRef.current?.parentElementId ?? metadata?.parentElementId,
      }}
      {...props}
    >
      <AutoFields omitFields={['parentElementId', 'atomId', 'componentId']} />

      <SelectField
        name="atomId"
        label="Atom"
        showSearch={true}
        optionFilterProp="label"
        options={atoms?.getAtoms?.map((atom) => ({
          label: atom.name,
          value: atom.id,
        }))}
      />

      <SelectField
        name="componentId"
        label="Component"
        showSearch={true}
        optionFilterProp="label"
        options={components?.getComponents.map((comp) => ({
          label: comp.name,
          value: comp.id,
        }))}
      />

      <SelectField
        name="parentElementId"
        label="Parent element"
        showSearch={true}
        optionFilterProp="label"
        options={parentElementOptions}
      />
    </FormUniforms>
  )
}
