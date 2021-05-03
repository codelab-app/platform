import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  LibraryContext,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import {
  GetPropTypeCListGql,
  useCreatePropTypeCMutation,
} from '@codelab/hasura'
import React, { useContext, useEffect } from 'react'
import { DeepPartial } from 'uniforms'
import { AutoFields, SelectField } from 'uniforms-antd'
import {
  CreatePropTypeCInput,
  createPropTypeCSchema,
} from './createPropTypeCSchema'

type CreatePropTypeCFormProps = UniFormUseCaseProps<CreatePropTypeCInput>

export const CreatePropTypeCForm = (props: CreatePropTypeCFormProps) => {
  const { reset, setLoading } = useCRUDModalForm(EntityType.PropTypeC)
  const { libraries } = useContext(LibraryContext)

  const [mutate, { loading: creating }] = useCreatePropTypeCMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GetPropTypeCListGql,
      },
    ],
  })

  useEffect(() => {
    setLoading(creating)
  }, [creating])

  const onSubmit = (submitData: DeepPartial<CreatePropTypeCInput>) => {
    return mutate({
      variables: {
        data: {
          library_id: submitData?.library,
          label: submitData?.label,
        },
      },
    })
  }

  return (
    <FormUniforms<CreatePropTypeCInput>
      onSubmit={onSubmit}
      schema={createPropTypeCSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating propTypeC',
      })}
      onSubmitSuccess={() => {
        reset()
      }}
      {...props}
    >
      <SelectField
        name="library"
        options={libraries?.map((library) => ({
          label: library.name,
          value: library.id,
        }))}
      />
      <AutoFields fields={['label']} />
    </FormUniforms>
  )
}
