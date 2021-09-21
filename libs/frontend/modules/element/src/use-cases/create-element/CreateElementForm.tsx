import { BaseMutationOptions } from '@apollo/client'
import { useGetAtomsQuery } from '@codelab/frontend/modules/atom'
import {
  SelectAnyElement,
  SelectAtom,
  SelectComponent,
} from '@codelab/frontend/modules/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalMutationForm,
} from '@codelab/frontend/view/components'
import React, { useRef } from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { useCreateElementMutation } from './CreateElement.web.graphql.gen'
import { CreateElementSchema, createElementSchema } from './createElementSchema'

export interface CreateElementFormProps
  extends UniFormUseCaseProps<CreateElementSchema> {
  refetchQueries?: BaseMutationOptions['refetchQueries']
  initialData: Partial<Pick<CreateElementSchema, 'parentElementId'>> | undefined
}

export const CreateElementForm = ({
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
    mapVariables: (formData: CreateElementSchema) => ({
      input: {
        ...formData,
      },
    }),
  })

  const { data: atoms } = useGetAtomsQuery()

  return (
    <FormUniforms<CreateElementSchema>
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

      <AutoField name="atomId" component={SelectAtom} />
      <AutoField name="componentId" component={SelectComponent} />
      <AutoField name="parentElementId" component={SelectAnyElement} />
    </FormUniforms>
  )
}
