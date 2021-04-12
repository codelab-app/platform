import { AppContext } from '@codelab/frontend/shared'
// We want to use `@codelab/hasura`
// import {
//   AddChildVertexInput,
//   useAddChildVertexMutation,
//   useUpdateVertexMutation,
// } from '@codelab/generated'
import { useContext } from 'react'
import { useBuilderSelectionState } from '../selection'

export const useComponentHandlers = () => {
  const { pageId } = useContext(AppContext)
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

  const selection = useBuilderSelectionState()

  return {
    updateVertexMutation: () => null,
    addChildVertex: (args: any) => null,
    selectPageElement: selection.setSelected,
    resetHoverOverlay: selection.resetHovering,
    showHoverOverlay: selection.setHovering,
  }
}

export type ComponentHandlers = ReturnType<typeof useComponentHandlers>
