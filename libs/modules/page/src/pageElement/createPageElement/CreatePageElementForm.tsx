import {
  AppPageContext,
  EntityType,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import {
  CreatePageElementInput,
  useCreatePageElementMutation,
} from '@codelab/graphql'
import React, { useEffect } from 'react'
import { PageElementFormBase } from './PageElementFormBase'

type CreatePageElementFormProps = UniFormUseCaseProps<CreatePageElementInput>

export const CreatePageElementForm = ({
  ...props
}: CreatePageElementFormProps) => {
  const { reset, setLoading } = useCRUDModalForm(EntityType.PageElement)

  //Not yet sure what should we refetch here*
  const [mutate, { loading: creating }] = useCreatePageElementMutation({
    // refetchQueries: [refetchGetAppPageQuery({ appId, pageId })],
  })

  useEffect(() => {
    setLoading(creating)
  }, [creating, setLoading])

  const onSubmit = (submitData: CreatePageElementInput) => {
    return mutate({
      variables: {
        input: {
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
