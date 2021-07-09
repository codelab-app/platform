import { refetchGetPageQuery } from '@codelab/codegen/graphql'
import { MoveElementForm, MoveElementFormProps } from '@codelab/modules/element'
import React, { useContext } from 'react'
import { PageContext } from '../../providers'

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
  const { cytoscapeRoot, pageId, page } = useContext(PageContext)

  if (!page || !pageId) {
    throw new Error(
      "Can't load MovePageElementForm. No page or pageId provided",
    )
  }

  const parentElementOptions = [
    { label: page.rootElement.name, value: page.rootElement.id },
    ...page.rootElement.descendants.map((e) => ({
      label: e.name,
      value: e.id,
    })),
  ]

  const selectedElementsEdge = cytoscapeRoot
    ?.$id(elementId)
    .connectedEdges()
    .map((e) => e.data())
    .find((d) => d.target === elementId)

  return (
    <MoveElementForm
      initialData={{
        parentElementId: selectedElementsEdge?.source,
        order: selectedElementsEdge?.order,
      }}
      parentElementOptions={parentElementOptions}
      refetchQueries={[refetchGetPageQuery({ input: { pageId: pageId } })]}
      elementId={elementId}
      {...props}
    />
  )
}

MovePageElementForm.displayName = 'MovePageElementForm'
