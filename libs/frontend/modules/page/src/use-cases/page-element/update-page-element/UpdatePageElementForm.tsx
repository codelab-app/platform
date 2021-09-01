import {
  UpdateElementForm,
  UpdateElementFormProps,
} from '@codelab/frontend/modules/element'
import React, { useContext } from 'react'
import { PageContext } from '../../../providers'
import { refetchGetPageQuery } from '../../page/get-page/GetPage.api.graphql'

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
