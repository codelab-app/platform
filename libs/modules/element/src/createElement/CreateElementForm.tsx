import { BaseMutationOptions } from '@apollo/client'
import {
  CreateElementInput,
  useCreateElementMutation,
  useGetAtomsQuery,
} from '@codelab/codegen/graphql'
import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalMutationForm,
} from '@codelab/frontend/shared'
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
    crudModal: { reset },
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

  return (
    <FormUniforms<CreateElementInput>
      schema={createElementSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating element',
      })}
      onSubmit={handleSubmit}
      onSubmitSuccess={() => reset()}
      model={{ parentElementId: initialDataRef.current?.parentElementId }}
      {...props}
    >
      <AutoFields omitFields={['parentElementId', 'atomId']} />

      <SelectField
        name="atomId"
        label="Atom"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore https://github.com/vazco/uniforms/issues/951
        showSearch={true}
        optionFilterProp="label"
        options={atoms?.atoms.map((atom) => ({
          label: atom.name,
          value: atom.id,
        }))}
      />

      <SelectField
        name="parentElementId"
        label="Parent element"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore https://github.com/vazco/uniforms/issues/951
        showSearch={true}
        optionFilterProp="label"
        options={parentElementOptions}
      />
    </FormUniforms>
  )
}
