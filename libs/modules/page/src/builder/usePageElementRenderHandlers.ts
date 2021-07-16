import { ElementTree } from '@codelab/modules/element'
import { useCallback } from 'react'
import { useSetPageBuilderState } from '.'

/**
 * RenderHandlers in the context of Page elements
 */
export const usePageElementRenderHandlers = (tree: ElementTree) => {
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

  // Use setters only, because we don't want to re-render this everytime the hover/selected element is changed
  const { selectPageElement, setHoveringPageElement } = useSetPageBuilderState()

  const handleClick = useCallback(
    (id) => selectPageElement(tree.getElementById(id)),
    [tree],
  )

  const handleMouseEnter = useCallback(
    (id) => setHoveringPageElement(tree.getElementById(id)),
    [tree],
  )

  const handleMouseLeave = useCallback(
    () => setHoveringPageElement(null),
    [setHoveringPageElement],
  )

  return {
    handleClick,
    handleMouseEnter,
    handleMouseLeave,
  }
}
