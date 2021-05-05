import { useBuilderSelection } from '../selection'

export const useComponentHandlers = () => {
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

  const selection = useBuilderSelection()

  return {
    updateVertexMutation: () => null,
    addChildVertex: (args: any) => null,
    selectPageElement: selection.setSelected,
    resetHoverOverlay: selection.resetHovering,
    showHoverOverlay: selection.setHovering,
  }
}

export type ComponentHandlers = ReturnType<typeof useComponentHandlers>
