import {
  CreateElementForm,
  CreateElementFormProps,
} from '@codelab/frontend/modules/element'
import { PageContext } from '@codelab/frontend/presenter/container'
import { refetchGetPageQuery } from '@codelab/shared/codegen/graphql'
import React, { useContext } from 'react'

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
    ...tree.getAllNodes().map((element) => ({
      label: element.name || element.atom.type,
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

CreatePageElementForm.displayName = 'CreatePageElementForm'
