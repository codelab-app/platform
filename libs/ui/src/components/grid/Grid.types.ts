import { PropsFromKeys } from '@codelab/shared/interface'

export const gridPropKeys = [
  'width',
  'autoSize',
  'cols',
  'draggableCancel',
  'draggableHandle',
  'verticalCompact',
  'compactType',
  'layout',
  'margin',
  'containerPadding',
  'rowHeight',
  'droppingItem',
  'isDraggable',
  'isResizable',
  'isBounded',
  'useCSSTransforms',
  'transformScale',
  'preventCollision',
  'isDroppable',
  'onLayoutChange',
  'onDragStart',
  'onDrag',
  'onDragStop',
  'onResizeStart',
  'onResize',
  'onResizeStop',
  'onDrop',
  'innerRef',
] as const

export const responsiveGridPropKeys = [
  'breakpoints',
  'cols',
  'margin',
  'containerPadding',
  'layouts',
  'onBreakpointChange',
  'onLayoutChange',
  'onWidthChange',
] as const

export const gridItemPropKeys = [
  'i',
  'x',
  'y',
  'w',
  'h',
  'minW',
  'maxW',
  'minH',
  'maxH',
  'static',
  'isDraggable',
  'isResizable',
  'isBounded',
] as const

export type GridProps = PropsFromKeys<typeof gridPropKeys[number]>

export type ResponsiveGridProps = PropsFromKeys<
  typeof responsiveGridPropKeys[number]
>

export type GridItemProps = PropsFromKeys<typeof gridItemPropKeys[number]>
