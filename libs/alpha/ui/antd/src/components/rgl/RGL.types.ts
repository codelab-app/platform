import { PropsFromKeys } from '@codelab/alpha/shared/interface/props'

export namespace RGL {
  export const propKeys = [
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

  export const responsivePropKeys = [
    'breakpoints',
    'cols',
    'margin',
    'containerPadding',
    'layouts',
    'onBreakpointChange',
    'onLayoutChange',
    'onWidthChange',
  ] as const

  export const itemPropKeys = [
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

  export type Props = PropsFromKeys<typeof propKeys[number]>

  export type ResponsiveProps = PropsFromKeys<typeof responsivePropKeys[number]>

  export type ItemProps = PropsFromKeys<typeof itemPropKeys[number]>
}
