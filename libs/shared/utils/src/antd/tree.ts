import { EventDataNode, TreeProps } from 'antd/lib/tree'

// https://github.com/ant-design/ant-design/issues/15926
export const onDrop: TreeProps['onDrop'] = (info) => {
  const dragNode = info.dragNode
  const dropNode = info.node

  const isSameLevel = (a: EventDataNode, b: EventDataNode) => {
    const aLevel = a.pos.split('-').length
    const bLevel = b.pos.split('-').length

    return aLevel === bLevel
  }

  const canDrop = isSameLevel(dragNode, dropNode)

  if (!canDrop) {
    return
  }
}
