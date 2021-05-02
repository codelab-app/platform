import React, { useEffect } from 'react'
import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'

import {
  GetComponentsGql,
  useGetComponentQuery,
  useUpdateComponentMutation,
} from '@codelab/hasura'
import {
  updateComponentSchema,
  UpdateComponentInput,
} from './updateComponentSchema'
import { DeepPartial } from 'uniforms'
import { AutoFields } from 'uniforms-antd'
import { Spin } from 'antd'

type UpdateComponentFormProps = UniFormUseCaseProps<UpdateComponentInput>

export const UpdateComponentForm = ({ ...props }: UpdateComponentFormProps) => {
  const {
    reset,
    setLoading,
    state: { id: componentId },
  } = useCRUDModalForm(EntityType.Component)

  const [mutate, { loading: updating }] = useUpdateComponentMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GetComponentsGql,
      },
    ],
  })

  useEffect(() => {
    setLoading(updating)
  }, [updating])

  const onSubmit = (submitData: DeepPartial<UpdateComponentInput>) => {
    return mutate({
      variables: {
        componentId,
        input: submitData,
      },
    })
  }

  const { data, loading } = useGetComponentQuery({
    variables: {
      componentId,
    },
  })

  const component = data?.component_by_pk

  if (loading) {
    return <Spin />
  }

  return (
    <FormUniforms<UpdateComponentInput>
      data-testid="update-component-form"
      onSubmit={onSubmit}
      model={{
        label: component?.label,
      }}
      schema={updateComponentSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while updating component',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <AutoFields />
    </FormUniforms>
  )
}
