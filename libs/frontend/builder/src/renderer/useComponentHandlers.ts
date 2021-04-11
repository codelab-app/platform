import { AppContext } from '@codelab/frontend/shared'
import {
  AddChildVertexInput,
  GetPageGql,
  useAddChildVertexMutation,
  useUpdateVertexMutation,
} from '@codelab/generated'
import { useContext } from 'react'
import { useBuilderSelectionState } from '../selection'

export const useComponentHandlers = () => {
  const { pageId } = useContext(AppContext)
  const [addChildVertexMutation] = useAddChildVertexMutation()
  const updateVertexMutation = useUpdateVertexMutation({
    refetchQueries: [
      {
        query: GetPageGql,
        variables: {
          input: {
            pageId,
          },
        },
      },
    ],
  })

  const addChildVertex = (input: AddChildVertexInput) =>
    addChildVertexMutation({
      refetchQueries: [{ query: GetPageGql, variables: { input: { pageId } } }],
      variables: {
        input,
      },
    })

  const selection = useBuilderSelectionState()

  return {
    updateVertexMutation,
    addChildVertex,
    selectPageElement: selection.setSelected,
    resetHoverOverlay: selection.resetHovering,
    showHoverOverlay: selection.setHovering,
  }
}

export type ComponentHandlers = ReturnType<typeof useComponentHandlers>
