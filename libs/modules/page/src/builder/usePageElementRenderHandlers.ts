import { RenderHandlers } from '@codelab/frontend/builder'
import { ElementNode } from '@codelab/frontend/shared'
import { Core } from 'cytoscape'
import { useCallback } from 'react'
import { useSetPageBuilderState } from '.'

/**
 * Adapter for RenderHandlers in the context of Page elements
 */
export const usePageElementRenderHandlers = (cy: Core): RenderHandlers => {
  // const [addChildVertexMutation] = useAddChildVertexMutation()
  // const updateVertexMutation = useUpdateVertexMutation({
  //   refetchQueries: [
  //     {
  //       query: GetPageGql,
  //       variables: {
  //         input: {
  //           pageId,
  //         },
  //       },
  //     },
  //   ],
  // })

  // const addChildVertex = (input: AddChildVertexInput) =>
  //   addChildVertexMutation({
  //     refetchQueries: [{ query: GetPageGql, variables: { input: { pageId } } }],
  //     variables: {
  //       input,
  //     },
  //   })

  // Use setters only, because we don't want to re-render this everytime the hover/selected element is cahanged
  const { selectPageElement, setHoveringPageElement } = useSetPageBuilderState()

  const getNodeById = (id: string) =>
    cy.getElementById(id).first().data() as ElementNode

  const handleClick = useCallback(
    (id) => selectPageElement(getNodeById(id)),
    [],
  )

  const handleMouseEnter = useCallback(
    (id) => setHoveringPageElement(getNodeById(id)),
    [],
  )

  const handleMouseLeave = useCallback(() => setHoveringPageElement(null), [])

  return {
    handleClick,
    handleMouseEnter,
    handleMouseLeave,
  }
}
