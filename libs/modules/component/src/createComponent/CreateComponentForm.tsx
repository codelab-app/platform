import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { GetComponentsGql, useCreateComponentMutation } from '@codelab/hasura'
import React, { useEffect } from 'react'
import { DeepPartial } from 'uniforms'
import { AutoFields } from 'uniforms-antd'
import {
  CreateComponentInput,
  createComponentSchema,
} from './createComponentSchema'

type CreateComponentFormProps = UniFormUseCaseProps<CreateComponentInput>

export const CreateComponentForm = ({ ...props }: CreateComponentFormProps) => {
  const { reset, setLoading } = useCRUDModalForm(EntityType.Component)

  const [mutate, { loading: creating }] = useCreateComponentMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GetComponentsGql,
      },
    ],
  })

  useEffect(() => {
    setLoading(creating)
  }, [creating])

  // const { library } = useSelectedLibrary()

  const onSubmit = (submitData: DeepPartial<CreateComponentInput>) => {
    return mutate({
      variables: {
        input: {
          ...submitData,
          // library_id: library?.id,
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
      <AutoFields />
    </FormUniforms>
  )
}
