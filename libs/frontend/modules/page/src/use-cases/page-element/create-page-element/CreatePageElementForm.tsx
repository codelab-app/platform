// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  CreateElementForm,
  CreateElementFormProps,
  ElementFragment,
} from '@codelab/frontend/modules/element'
import { SelectElementProvider } from '@codelab/frontend/modules/type'
import React, { useContext } from 'react'
import { PageContext } from '../../../providers'
import { refetchGetPageQuery } from '../../page/get-page/GetPage.web.graphql.gen'

type CreatePageElementFormProps = Omit<
  CreateElementFormProps,
  'parentElementOptions' | 'refetchQueries'
>

/**
 * Wrapper for {@link CreateElementForm} in the context of a Page
 */
export const CreatePageElementForm = (props: CreatePageElementFormProps) => {
  const { pageId, page, tree } = useContext(PageContext)

  if (!page) {
    return null
  }

  const parentElementOptions = [
    ...(
      tree.getAllVertices(tree.isElementPredicate) as Array<ElementFragment>
    ).map((element) => ({
      label: element.name || element.atom?.type,
      value: element.id,
    })),
  ]

  const refetchQueries = [
    refetchGetPageQuery({ input: { pageId: pageId || '' } }),
  ]

  return (
    <SelectElementProvider tree={tree}>
      <CreateElementForm refetchQueries={refetchQueries} {...props} />
    </SelectElementProvider>
  )
}

CreatePageElementForm.displayName = 'CreatePageElementForm'
