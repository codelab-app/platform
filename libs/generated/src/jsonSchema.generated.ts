import { JSONSchema6 } from 'json-schema'

export const ButtonPropsSchema: JSONSchema6 = {
  type: 'object',
  properties: {
    block: {
      type: 'boolean',
    },
    danger: {
      type: 'boolean',
    },
    disabled: {
      type: 'boolean',
    },
    ghost: {
      type: 'boolean',
    },
    href: {
      type: 'string',
    },
    htmlType: {
      type: 'string',
    },
    icon: {
      type: 'object',
    },
    loading: {
      type: 'object',
    },
    shape: {
      type: 'string',
      enum: ['circle', 'round'],
    },
    size: {
      type: 'string',
      enum: ['small', 'middle', 'large'],
    },
    target: {
      type: 'string',
    },
    type: {
      type: 'string',
      enum: ['default', 'primary', 'ghost', 'dashed', 'link', 'text'],
    },
    onClick: {
      $ref: '#/definitions/Function',
    },
  },
  definitions: {
    Function: {
      type: 'object',
    },
  },
}

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
  properties: {
    'data-grid': {
      $ref: '#/definitions/RGLLayoutProps',
    },
    key: {
      type: 'string',
    },
  },
  definitions: {
    RGLLayoutProps: {
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
    },
  },
}
