import { refetchGetPageQuery } from '@codelab/codegen/graphql'
import {
  CreateElementForm,
  CreateElementFormProps,
} from '@codelab/modules/element'
import React, { useContext } from 'react'
import { PageContext } from '../../providers'

type CreatePageElementFormProps = Omit<
  CreateElementFormProps,
  'parentElementOptions' | 'refetchQueries'
>

/**
 * Wrapper for {@link CreateElementForm} in the context of a Page
 */
export const CreatePageElementForm = (props: CreatePageElementFormProps) => {
  const { pageId, page } = useContext(PageContext)

  if (!page) {
    return null
  }

  const parentElementOptions = [
    { label: page.rootElement.name, value: page.rootElement.id },
    ...page.rootElement.descendants.map((element) => ({
      label: element.name,
      value: element.id,
    })),
  ]

  const refetchQueries = [
    refetchGetPageQuery({ input: { pageId: pageId || '' } }),
  ]

  return (
    <CreateElementForm
      parentElementOptions={parentElementOptions}
      refetchQueries={refetchQueries}
      {...props}
    />
  )
}

CreatePageElementForm.displayName = 'MovePageElementForm'
