import { ItemCallback } from 'react-grid-layout'
import { DashboardHandlerProps } from '../../../../../../../apps/web/src/dashboard/Dashboard-handlers'

export type OnDragStart = (props?: DashboardHandlerProps) => ItemCallback

export const onDragStart: OnDragStart = (props?: DashboardHandlerProps) => (
  layout,
  oldItem,
  newItem,
  placeholder,
  event,
  element,
) => {
  // console.log(layout, oldItem, newItem, placeholder, event, element)
  const vertexId = oldItem.i

  console.log('onDragStart', vertexId)
  console.log(props)
  props?.setDashboardDrawer({ visible: true, vertexId })
}
