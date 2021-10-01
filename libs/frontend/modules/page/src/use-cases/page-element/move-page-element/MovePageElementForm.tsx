// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  MoveElementForm,
  MoveElementFormProps,
} from '@codelab/frontend/modules/element'
import { SelectElementProvider } from '@codelab/frontend/modules/type'
import React, { useContext } from 'react'
import { PageContext } from '../../../providers'
import { refetchGetPageQuery } from '../../page/get-page/GetPage.web.graphql.gen'

type MovePageElementFormProps = Omit<
  MoveElementFormProps,
  'initialData' | 'parentElementOptions' | 'refetchQueries' | 'tree'
>

/**
 * Wrapper for {@link MoveElementForm} in the context of a Page
 * Needed, because we need to tell it to refetch the page after the mutation
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
