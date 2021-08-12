import {
  UpdateElementForm,
  UpdateElementFormProps,
} from '@codelab/frontend/modules/element'
import { PageContext } from '@codelab/frontend/presenter/container'
import { refetchGetPageQuery } from '@codelab/shared/codegen/graphql'
import React, { useContext } from 'react'

export type UpdatePageElementFormProps = Omit<
  UpdateElementFormProps,
  'refetchQueries'
>

/**
 * Wrapper for {@link UpdateElementForm} in the context of a Page
 */
export const UpdatePageElementForm = (props: UpdatePageElementFormProps) => {
  const { pageId } = useContext(PageContext)

  const refetchQueries = [
    refetchGetPageQuery({ input: { pageId: pageId as string } }),
  ]

  return <UpdateElementForm refetchQueries={refetchQueries} {...props} />
}

UpdatePageElementForm.displayName = 'UpdatePageElementForm'
