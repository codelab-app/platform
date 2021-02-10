import { omit } from 'lodash'
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
  props?.setPaneConfig({ vertexId })
}

export const onResizeStop: RGLHandlers = ({ updateVertexMutation }) => (
  layout,
  oldVertex,
  newVertex,
  placeholder,
  event,
  // This is the resize handle, the data-attributes are located on the parent
  element,
) => {
  const updateVertex = updateVertexMutation[0]
  const vertexId = element.parentElement?.getAttribute('data-id')

  if (!vertexId) {
    return null
  }

  return updateVertex({
    variables: {
      input: {
        vertexId,
        props: {
          'data-grid': {
            // Don't save index
            ...omit(newVertex, 'i'),
          },
        },
      },
    },
  })
}
