import {
  MoveElementForm,
  MoveElementFormProps,
} from '@codelab/frontend/modules/element'
import { SelectElementProvider } from '@codelab/frontend/modules/type'
import React, { useContext } from 'react'
import { PageContext } from '../../../providers'
import { refetchGetPageQuery } from '../../page/get-page/GetPage.api.graphql'

type MovePageElementFormProps = Omit<
  MoveElementFormProps,
  'initialData' | 'parentElementOptions' | 'refetchQueries' | 'tree'
>

/**
 * Wrapper for {@link MoveElementForm} in the context of a Page
 */
export const MovePageElementForm = ({
  elementId,
  ...props
}: MovePageElementFormProps) => {
  const { pageId, page, tree } = useContext(PageContext)

  if (!page || !pageId) {
    throw new Error(
      "Can't load MovePageElementForm. No page or pageId provided",
    )
  }

  return (
    <SelectElementProvider tree={tree}>
      <MoveElementForm
        tree={tree}
        refetchQueries={[refetchGetPageQuery({ input: { pageId: pageId } })]}
        elementId={elementId}
        {...props}
      />
    </SelectElementProvider>
  )
}

MovePageElementForm.displayName = 'MovePageElementForm'
