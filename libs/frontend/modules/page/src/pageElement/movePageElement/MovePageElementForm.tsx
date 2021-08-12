import {
  MoveElementForm,
  MoveElementFormProps,
} from '@codelab/frontend/modules/element'
import { PageContext } from '@codelab/frontend/presenter/container'
import { refetchGetPageQuery } from '@codelab/shared/codegen/graphql'
import React, { useContext } from 'react'

type MovePageElementFormProps = Omit<
  MoveElementFormProps,
  'initialData' | 'parentElementOptions' | 'refetchQueries'
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

  const parentElementOptions = [
    ...tree.getAllElements().map((e) => ({
      label: e.name,
      value: e.id,
    })),
  ]

  const order = tree.getOrderInParent(elementId)
  const parent = tree.getParent(elementId)

  return (
    <MoveElementForm
      initialData={{
        parentElementId: parent?.id as string,
        order,
      }}
      parentElementOptions={parentElementOptions}
      refetchQueries={[refetchGetPageQuery({ input: { pageId: pageId } })]}
      elementId={elementId}
      {...props}
    />
  )
}

MovePageElementForm.displayName = 'MovePageElementForm'
