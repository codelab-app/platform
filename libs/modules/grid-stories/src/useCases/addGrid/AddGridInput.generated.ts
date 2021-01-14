export const AddGridInputSchema = {
  type: 'object',
  properties: {
    i: {
      description:
        'A string corresponding to the component key.\nUses the index of components instead if not provided.',
      type: 'string',
    },
    x: {
      description: 'X position in grid units.',
      type: 'number',
    },
    y: {
      description: 'Y position in grid units.',
      type: 'number',
    },
    w: {
      description: 'Width in grid units.',
      type: 'number',
    },
    h: {
      description: 'Height in grid units.',
      type: 'number',
    },
    minW: {
      description: 'Minimum width in grid units.',
      type: 'number',
    },
    maxW: {
      description: 'Maximum width in grid units.',
      type: 'number',
    },
    minH: {
      description: 'Minimum height in grid units.',
      type: 'number',
    },
    maxH: {
      description: 'Maximum height in grid units.',
      type: 'number',
    },
    moved: {
      description:
        'set by DragEvents (onDragStart, onDrag, onDragStop) and ResizeEvents (onResizeStart, onResize, onResizeStop)',
      type: 'boolean',
    },
    static: {
      description:
        'If true, equal to `isDraggable: false` and `isResizable: false`.',
      type: 'boolean',
    },
    isDraggable: {
      description: 'If false, will not be draggable. Overrides `static`.',
      type: 'boolean',
    },
    isResizable: {
      description: 'If false, will not be resizable. Overrides `static`.',
      type: 'boolean',
    },
    resizeHandles: {
      description:
        'By default, a handle is only shown on the bottom-right (southeast) corner.\nNote that resizing from the top or left is generally not intuitive.',
      type: 'array',
      items: {
        enum: ['e', 'n', 'ne', 'nw', 's', 'se', 'sw', 'w'],
        type: 'string',
      },
    },
    isBounded: {
      description:
        'If true and draggable, item will be moved only within grid.',
      type: 'boolean',
    },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
}
