import React, { useContext, useEffect } from 'react'
import {
  AppContext,
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
} from '@codelab/frontend/shared'
import {
  useDeletePageElementMutation,
  useGetPageElementQuery,
  RootAppGql,
} from '@codelab/hasura'
import { useCRUDModalForm } from '@codelab/frontend/shared'
import { Spin } from 'antd'
import { AutoFields } from 'uniforms-antd'
import { emptyJsonSchema, EmptyJsonSchemaType } from '@codelab/frontend/shared'

type DeletePageElementFormProps = UniFormUseCaseProps<EmptyJsonSchemaType>

export const DeletePageElementForm = (props: DeletePageElementFormProps) => {
  const {
    reset,
    setLoading,
    state: { id: pageElementId },
  } = useCRUDModalForm(EntityType.PageElement)

  const { pageId, appId } = useContext(AppContext)

  const [mutate, { loading: deleting }] = useDeletePageElementMutation({
    refetchQueries: [
      {
        query: RootAppGql,
        variables: {
          pageId,
          appId,
        },
      },
    ],
  })

  useEffect(() => {
    setLoading(deleting)
  }, [deleting, setLoading])

  const { data, loading } = useGetPageElementQuery({
    variables: {
      pageElementId,
    },
  })

  const element = data?.page_element_by_pk

  if (loading) {
    return <Spin />
  }

  const onSubmit = () => {
    return mutate({
      variables: {
        pageElementId,
      },
    })
  }

  return (
    <FormUniforms<EmptyJsonSchemaType>
      data-testid="delete-component-element-form"
      id="delete-component-element-form"
      onSubmit={onSubmit}
      schema={emptyJsonSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while deleting component element',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <h4>Are you sure you want to delete page element "{element?.name}"?</h4>
      <AutoFields />
    </FormUniforms>
  )
}
