import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import {
  refetchGetPropTypeCListQuery,
  useDeletePropTypeCMutation,
  useGetPropTypeCQuery,
} from '@codelab/hasura'
import { Spin } from 'antd'
import React, { useEffect } from 'react'
import { AutoFields } from 'uniforms-antd'
import {
  DeletePropTypeCInput,
  DeletePropTypeCSchema,
} from './deletePropTypeCSchema'

type DeletePropTypeCFormProps = UniFormUseCaseProps<DeletePropTypeCInput>

export const DeletePropTypeCForm = (props: DeletePropTypeCFormProps) => {
  const { reset, setLoading, state } = useCRUDModalForm(EntityType.PropTypeC)
  const { deleteIds: deletePropTypeCIds } = state

  const [mutate, { loading: deleting }] = useDeletePropTypeCMutation({
    awaitRefetchQueries: true,
    refetchQueries: [refetchGetPropTypeCListQuery()],
  })

  useEffect(() => {
    setLoading(deleting)
  }, [deleting])

  const { data, loading } = useGetPropTypeCQuery({
    variables: {
      propTypeCId: deletePropTypeCIds[0],
    },
  })

  const propTypeCItem = data?.prop_type_c_by_pk

  if (loading) {
    return <Spin />
  }

  const onSubmit = () => {
    return mutate({
      variables: {
        propTypeCId: deletePropTypeCIds[0],
      },
    })
  }

  return (
    <FormUniforms<DeletePropTypeCInput>
      onSubmit={onSubmit}
      schema={DeletePropTypeCSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while deleting PropTypeC',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <h4>
        Are you sure you want to delete PropTypeCs "{propTypeCItem?.label}"?
      </h4>
      <AutoFields />
    </FormUniforms>
  )
}
