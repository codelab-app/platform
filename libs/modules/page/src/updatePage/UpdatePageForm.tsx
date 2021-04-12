import React, { useEffect } from 'react'
import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { UpdatePageInput, UpdatePageSchema } from './updateFromSchema'
import {
  GetPageGql,
  useUpdatePageMutation,
  useGetPageQuery,
} from '@codelab/hasura'
import { DeepPartial } from 'uniforms'
import { Spin } from 'antd'
import { AutoFields } from 'uniforms-antd'
type UpdatePageFormProps = UniFormUseCaseProps<UpdatePageInput>

export const UpdatePageForm = (props: UpdatePageFormProps) => {
  const { reset, setLoading, state } = useCRUDModalForm(EntityType.Page)
  const { id: pageId } = state

  const [mutate, { loading: updating }] = useUpdatePageMutation({
    refetchQueries: [
      {
        query: GetPageGql,
        variables: {
          pageId,
        },
      },
    ],
  })
  useEffect(() => {
    setLoading(updating)
  }, [updating])

  const { data, loading } = useGetPageQuery({
    variables: {
      pageId,
    },
  })

  const page = data?.page_by_pk

  if (loading) {
    return <Spin />
  }

  const onSubmit = (submitData: DeepPartial<UpdatePageInput>) => {
    return mutate({
      variables: {
        input: {
          ...(submitData as any),
        },
        pageId,
      },
    })
  }

  return (
    <FormUniforms<UpdatePageInput>
      onSubmit={onSubmit}
      schema={UpdatePageSchema}
      model={{ name: page?.name }}
      onSubmitError={createNotificationHandler({
        title: 'Error while updating page',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <AutoFields />
    </FormUniforms>
  )
}
