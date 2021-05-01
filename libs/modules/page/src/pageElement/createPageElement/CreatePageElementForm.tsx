import React, { useEffect } from 'react'
import { CreatePageElementInput } from './createPageElementSchema'
import { GetAppGql, useCreatePageElementMutation } from '@codelab/hasura'
import { useContext } from 'react'
import {
  AppContext,
  EntityType,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { DeepPartial } from 'uniforms'
import { PageElementFormBase } from './PageElementFormBase'

type CreatePageElementFormProps = UniFormUseCaseProps<CreatePageElementInput>

export const CreatePageElementForm = ({
  ...props
}: CreatePageElementFormProps) => {
  const { reset, setLoading } = useCRUDModalForm(EntityType.PageElement)
  const { pageId, appId } = useContext(AppContext)

  const [mutate, { loading: creating }] = useCreatePageElementMutation({
    refetchQueries: [
      {
        query: GetAppGql,
        variables: {
          appId,
          pageId,
        },
      },
    ],
  })

  useEffect(() => {
    setLoading(creating)
  }, [creating, setLoading])

  const onSubmit = (submitData: DeepPartial<CreatePageElementInput>) => {
    return mutate({
      variables: {
        input: {
          page_id: pageId,
          ...submitData,
        },
      },
    })
  }

  return (
    <PageElementFormBase
      onSubmit={onSubmit}
      onSubmitSuccess={() => reset()}
      {...props}
    />
  )
}
