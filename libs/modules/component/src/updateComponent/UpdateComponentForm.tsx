import {
  refetchGetComponentQuery,
  useGetComponentQuery,
  useUpdateComponentMutation,
} from '@codelab/codegen/hasura'
import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { Spin } from 'antd'
import React, { useEffect } from 'react'
import { DeepPartial } from 'uniforms'
import { AutoFields } from 'uniforms-antd'
import {
  UpdateComponentInput,
  updateComponentSchema,
} from './updateComponentSchema'

type UpdateComponentFormProps = UniFormUseCaseProps<UpdateComponentInput>

export const UpdateComponentForm = ({ ...props }: UpdateComponentFormProps) => {
  const {
    reset,
    setLoading,
    state: { updateId: updateComponentId },
  } = useCRUDModalForm(EntityType.Component)

  const [mutate, { loading: updating }] = useUpdateComponentMutation({
    awaitRefetchQueries: true,
    refetchQueries: [refetchGetComponentQuery()],
  })

  useEffect(() => {
    setLoading(updating)
  }, [updating])

  const onSubmit = (submitData: DeepPartial<UpdateComponentInput>) => {
    return mutate({
      variables: {
        componentId: updateComponentId,
        input: submitData,
      },
    })
  }

  const { data, loading } = useGetComponentQuery({
    variables: {
      componentId: updateComponentId,
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
