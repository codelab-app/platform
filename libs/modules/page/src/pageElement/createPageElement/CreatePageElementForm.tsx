import {
  EntityType,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import {
  CreatePageElementInput,
  refetchGetPageQuery,
  useCreatePageElementMutation,
} from '@codelab/graphql'
import React, { useContext, useEffect } from 'react'
import { PageContext } from '../../providers'
import { PageElementFormBase } from './PageElementFormBase'

type CreatePageElementFormProps = UniFormUseCaseProps<CreatePageElementInput>

export const CreatePageElementForm = ({
  ...props
}: CreatePageElementFormProps) => {
  const { reset, setLoading } = useCRUDModalForm(EntityType.PageElement)
  const { pageId } = useContext(PageContext)

  const [mutate, { loading: creating }] = useCreatePageElementMutation({
    refetchQueries: [refetchGetPageQuery({ input: { pageId: pageId || '' } })],
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
