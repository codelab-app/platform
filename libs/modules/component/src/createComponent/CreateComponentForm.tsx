import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  LibraryContext,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { GetLibrariesGql, useCreateComponentMutation } from '@codelab/hasura'
import React, { useContext, useEffect } from 'react'
import { DeepPartial } from 'uniforms'
import { AutoField, SelectField } from 'uniforms-antd'
import {
  CreateComponentInput,
  createComponentSchema,
} from './createComponentSchema'

type CreateComponentFormProps = UniFormUseCaseProps<CreateComponentInput>

export const CreateComponentForm = ({ ...props }: CreateComponentFormProps) => {
  const { reset, setLoading } = useCRUDModalForm(EntityType.Component)
  const { libraries } = useContext(LibraryContext)

  const [mutate, { loading: creating }] = useCreateComponentMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GetLibrariesGql,
      },
    ],
  })

  useEffect(() => {
    setLoading(creating)
  }, [creating])

  const onSubmit = (submitData: DeepPartial<CreateComponentInput>) => {
    return mutate({
      variables: {
        input: {
          library_id: submitData.library_id,
          label: submitData.label,
        },
      },
    })
  }

  return (
    <FormUniforms<CreateComponentInput>
      data-testid="create-component-form"
      onSubmit={onSubmit}
      schema={createComponentSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating component',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <SelectField
        name="library_id"
        label="Library"
        options={libraries?.map((library) => ({
          label: library.name,
          value: library.id,
        }))}
      />
      <AutoField name="label" />
    </FormUniforms>
  )
}
