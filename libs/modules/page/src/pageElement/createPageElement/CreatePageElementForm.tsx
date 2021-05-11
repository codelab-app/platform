import {
  AppPageContext,
  EntityType,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import {
  refetchGetAppPageQuery,
  useCreatePageElementMutation,
} from '@codelab/hasura'
import React, { useContext, useEffect } from 'react'
import { DeepPartial } from 'uniforms'
import { CreatePageElementInput } from './createPageElementSchema'
import { PageElementFormBase } from './PageElementFormBase'

type CreatePageElementFormProps = UniFormUseCaseProps<CreatePageElementInput>

export const CreatePageElementForm = ({
  ...props
}: CreatePageElementFormProps) => {
  const { reset, setLoading } = useCRUDModalForm(EntityType.PageElement)
  const { pageId, appId } = useContext(AppPageContext)

  const [mutate, { loading: creating }] = useCreatePageElementMutation({
    refetchQueries: [refetchGetAppPageQuery({ appId, pageId })],
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
