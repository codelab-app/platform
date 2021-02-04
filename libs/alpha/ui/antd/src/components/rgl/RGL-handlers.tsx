import { ItemCallback } from 'react-grid-layout'
import { PaneConfigHandlersProps } from '../../../../../../../apps/web/src/builder/pane-config/Pane-config--handlers'

export type RGLHandlers = (props: PaneConfigHandlersProps) => ItemCallback

export const onDragStart: RGLHandlers = (props) => (
  layout,
  vertex,
  newItem,
  placeholder,
  event,
  element,
) => {
  // console.log(layout, oldItem, newItem, placeholder, event, element)
  const vertexId = vertex.i

  // console.log('onDragStart', vertexId)
  // console.log(props)
  props?.setBuilderDrawer({ visible: true, vertexId })
}

export const onResizeStop: RGLHandlers = ({ updateVertexMutation }) => (
  layout,
  oldVertex,
  newVertex,
) => {
  const updateVertex = updateVertexMutation[0]

  return updateVertex({
    variables: {
      input: {
        vertexId: newVertex.i,
        props: {
          'data-grid': {
            ...newVertex,
          },
        },
      },
    },
  })
}
