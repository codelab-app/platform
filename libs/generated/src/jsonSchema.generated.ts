import { JSONSchema6 } from 'json-schema'

export const RGLLayoutPropsSchema: JSONSchema6 = {
  type: 'object',
  properties: {
    i: {
      type: 'string',
    },
    x: {
      type: 'number',
    },
    y: {
      type: 'number',
    },
    w: {
      type: 'number',
    },
    h: {
      type: 'number',
    },
    minW: {
      type: 'number',
    },
    maxW: {
      type: 'number',
    },
    minH: {
      type: 'number',
    },
    maxH: {
      type: 'number',
    },
    emoved: {
      type: 'boolean',
    },
    static: {
      type: 'boolean',
    },
    isDraggable: {
      type: 'boolean',
    },
    isResizable: {
      type: 'boolean',
    },
    resizeHandles: {
      type: 'array',
    },
    isBounded: {
      type: 'boolean',
    },
  },
}
export const RGLItemPropsSchema: JSONSchema6 = {
  type: 'object',
}
