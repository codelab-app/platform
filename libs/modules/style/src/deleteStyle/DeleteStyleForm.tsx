import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import {
  refetchGetStylesListQuery,
  useDeleteStyleMutation,
  useGetStyleQuery,
} from '@codelab/hasura'
import { Spin } from 'antd'
import React, { useEffect } from 'react'
import { AutoFields } from 'uniforms-antd'
import { DeleteStyleInput, DeleteStyleSchema } from './deleteStyleSchema'

type DeleteStyleFormProps = UniFormUseCaseProps<DeleteStyleInput>

export const DeleteStyleForm = (props: DeleteStyleFormProps) => {
  const { reset, setLoading, state } = useCRUDModalForm(EntityType.Style)
  const { deleteIds: deleteStyleIds } = state

  const [mutate, { loading: deleting }] = useDeleteStyleMutation({
    refetchQueries: [refetchGetStylesListQuery()],
  })

  useEffect(() => {
    setLoading(deleting)
  }, [deleting])

  const { data, loading } = useGetStyleQuery({
    variables: {
      styleId: deleteStyleIds[0],
    },
  })

  const style = data?.style_by_pk

  if (loading) {
    return <Spin />
  }

  const onSubmit = () => {
    return mutate({
      variables: {
        styleId: deleteStyleIds[0],
      },
    })
  }

  return (
    <FormUniforms<DeleteStyleInput>
      onSubmit={onSubmit}
      schema={DeleteStyleSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while deleting style',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <h4>Are you sure you want to delete style "{style?.name}"?</h4>
      <AutoFields />
    </FormUniforms>
  )
}
