import { ItemCallback } from 'react-grid-layout'
import { DashboardHandlerProps } from '../../../../../../../apps/web/src/dashboard/drawer/Dashboard-handlers'

export type RGLHandlers = (props: DashboardHandlerProps) => ItemCallback

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
  props?.setDashboardDrawer({ visible: true, vertexId })
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
