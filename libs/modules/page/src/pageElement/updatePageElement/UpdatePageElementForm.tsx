import { refetchGetPageQuery } from '@codelab/codegen/graphql'
import { PageContext } from '@codelab/frontend/shared'
import {
  UpdateElementForm,
  UpdateElementFormProps,
} from '@codelab/modules/element'
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
