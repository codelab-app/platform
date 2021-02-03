import { JSONSchema7 } from 'json-schema'
import {
  IDecoratorsMap,
  ObjectFieldTemplateFactory,
} from '@codelab/tools/generators/json-schema'

export const DemoInputSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      default: '',
    },
    password: {
      type: 'string',
      default: '',
    },
    firstname: {
      type: 'string',
      default: '',
    },
    lastname: {
      type: 'string',
      default: '',
    },
    notGroupedField: {
      type: 'string',
      default: '',
    },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
}

const DemoInputDecorators: IDecoratorsMap = {
  email: {
    grid: {
      order: 3,
      span: 24,
    },
  },
  password: {
    grid: {
      order: 2,
      span: 24,
    },
  },
  firstname: {
    grid: {
      order: 0,
      span: 12,
    },
  },
  lastname: {
    grid: {
      order: 1,
      span: 12,
    },
  },
}

export const DemoInputFormProps = {
  ObjectFieldTemplate: ObjectFieldTemplateFactory(DemoInputDecorators),
}

export const LayoutSizeSchema: JSONSchema7 = {
  enum: ['lg', 'md', 'sm', 'xs', 'xxs'],
  type: 'string',
  $schema: 'http://json-schema.org/draft-07/schema#',
}

export const ReactGridResponsiveLayoutSchema: JSONSchema7 = {
  description: 'Or we can use LayoutSize as enum if easier',
  type: 'object',
  properties: {
    breakpoints: {
      description: 'Construct a type with a set of properties K of type T',
      type: 'object',
      properties: {
        lg: {
          type: 'number',
        },
        md: {
          type: 'number',
        },
        sm: {
          type: 'number',
        },
        xs: {
          type: 'number',
        },
        xxs: {
          type: 'number',
        },
      },
    },
    cols: {
      description: 'Construct a type with a set of properties K of type T',
      type: 'object',
      properties: {
        lg: {
          type: 'number',
        },
        md: {
          type: 'number',
        },
        sm: {
          type: 'number',
        },
        xs: {
          type: 'number',
        },
        xxs: {
          type: 'number',
        },
      },
    },
    layouts: {
      description: 'Construct a type with a set of properties K of type T',
      type: 'object',
      properties: {
        lg: {
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
              description:
                'If false, will not be draggable. Overrides `static`.',
              type: 'boolean',
            },
            isResizable: {
              description:
                'If false, will not be resizable. Overrides `static`.',
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
        },
        md: {
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
              description:
                'If false, will not be draggable. Overrides `static`.',
              type: 'boolean',
            },
            isResizable: {
              description:
                'If false, will not be resizable. Overrides `static`.',
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
        },
        sm: {
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
              description:
                'If false, will not be draggable. Overrides `static`.',
              type: 'boolean',
            },
            isResizable: {
              description:
                'If false, will not be resizable. Overrides `static`.',
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
        },
        xs: {
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
              description:
                'If false, will not be draggable. Overrides `static`.',
              type: 'boolean',
            },
            isResizable: {
              description:
                'If false, will not be resizable. Overrides `static`.',
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
        },
        xxs: {
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
              description:
                'If false, will not be draggable. Overrides `static`.',
              type: 'boolean',
            },
            isResizable: {
              description:
                'If false, will not be resizable. Overrides `static`.',
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
        },
      },
    },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
}

export const ReactGridItemSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    props: {
      allOf: [
        {
          type: 'object',
          properties: {
            'data-grid': {
              description:
                'From T, pick a set of properties whose keys are in the union K',
              type: 'object',
              properties: {
                static: {
                  description:
                    'If true, equal to `isDraggable: false` and `isResizable: false`.',
                  type: 'boolean',
                },
                x: {
                  description: 'X position in grid units.',
                  type: 'number',
                },
                y: {
                  description: 'Y position in grid units.',
                  type: 'number',
                },
                h: {
                  description: 'Height in grid units.',
                  type: 'number',
                },
                w: {
                  description: 'Width in grid units.',
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
                isDraggable: {
                  description:
                    'If false, will not be draggable. Overrides `static`.',
                  type: 'boolean',
                },
                isResizable: {
                  description:
                    'If false, will not be resizable. Overrides `static`.',
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
            },
          },
        },
        {
          type: 'object',
          properties: {
            key: {
              type: 'string',
            },
          },
        },
      ],
    },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
}

export const CreateAppInputSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
}

export const DeleteAppInputSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
}

export const DemoGridFormInputSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    email1: {
      type: 'string',
      default: '',
    },
    password0: {
      type: 'string',
      default: '',
    },
    name2: {
      type: 'string',
      default: '',
    },
    notGroupedField: {
      type: 'string',
      default: '',
    },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
}

const DemoGridFormInputDecorators: IDecoratorsMap = {
  email1: {
    grid: {
      order: 1,
      span: 12,
    },
  },
  password0: {
    grid: {
      order: 0,
      span: 16,
    },
  },
  name2: {
    grid: {
      order: 2,
      span: 8,
    },
  },
}

export const DemoGridFormInputFormProps = {
  ObjectFieldTemplate: ObjectFieldTemplateFactory(DemoGridFormInputDecorators),
}

export const GetAppInputSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    appId: {
      type: 'string',
    },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
}

export const GetAppsInputSchema: JSONSchema7 = {
  type: 'object',
  $schema: 'http://json-schema.org/draft-07/schema#',
}

export const UpdateAppInputSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    title: {
      type: 'string',
    },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
}

export const AddChildVertexInputSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    parentVertexId: {
      type: 'string',
    },
    vertex: {
      type: 'object',
      properties: {
        type: {
          enum: [
            'React_Affix',
            'React_Alert',
            'React_Anchor',
            'React_Anchor_Link',
            'React_AutoComplete',
            'React_Avatar',
            'React_BackTop',
            'React_Badge',
            'React_Breadcrumb',
            'React_Breadcrumb_Item',
            'React_Button',
            'React_Calendar',
            'React_Card',
            'React_Card_Grid',
            'React_Card_Meta',
            'React_Carousel',
            'React_Cascader',
            'React_Checkbox',
            'React_Collapse',
            'React_Collapse_Panel',
            'React_Comment',
            'React_ConfigProvider',
            'React_DatePicker',
            'React_Descriptions',
            'React_Descriptions_Item',
            'React_Divider',
            'React_Drawer',
            'React_Dropdown',
            'React_Empty',
            'React_Form',
            'React_Form_Item',
            'React_Form_ItemHook',
            'React_Form_List',
            'React_Fragment',
            'React_Html_A',
            'React_Html_Div',
            'React_Html_P',
            'React_Html_Span',
            'React_Icon',
            'React_Input',
            'React_InputNumber',
            'React_Layout',
            'React_Layout_Content',
            'React_Layout_Footer',
            'React_Layout_Header',
            'React_Layout_Sider',
            'React_List',
            'React_List_Item',
            'React_List_Item_Meta',
            'React_Mapper',
            'React_Mentions',
            'React_Mentions_Option',
            'React_Menu',
            'React_Menu_Item',
            'React_Menu_ItemGroup',
            'React_Menu_SubMenu',
            'React_Modal',
            'React_PageHeader',
            'React_Pagination',
            'React_Popconfirm',
            'React_Popover',
            'React_Progress',
            'React_Provider',
            'React_RGL_Container',
            'React_RGL_Item',
            'React_RGL_ResponsiveContainer',
            'React_Radio',
            'React_Radio_Group',
            'React_Rate',
            'React_RenderComponent',
            'React_RenderContainer',
            'React_Result',
            'React_Select',
            'React_Select_Option',
            'React_Skeleton',
            'React_Slider',
            'React_Space',
            'React_Spin',
            'React_Statistic',
            'React_Steps',
            'React_Steps_Step',
            'React_Switch',
            'React_Table',
            'React_Tabs',
            'React_Tabs_TabPane',
            'React_Tag',
            'React_Text',
            'React_TimePicker',
            'React_Timeline',
            'React_Timeline_Item',
            'React_Tooltip',
            'React_Transfer',
            'React_Tree',
            'React_TreeNode',
            'React_TreeSelect',
            'React_Typography',
            'React_Typography_Paragraph',
            'React_Typography_Text',
            'React_Typography_Title',
            'React_Upload',
          ],
          type: 'string',
        },
        props: {
          type: 'object',
          properties: {},
          additionalProperties: true,
        },
      },
    },
    order: {
      type: 'number',
    },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
}

export const CreateGraphInputSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    label: {
      type: 'string',
    },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
}

export const DeleteVertexInputSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    vertexId: {
      type: 'string',
    },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
}

export const GetGraphInputSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
}

export const GetTreeInputSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    graphId: {
      type: 'string',
    },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
}

export const GetVertexInputSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
}

export const MoveVertexInputSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    currentVertexId: {
      type: 'string',
    },
    parentVertexId: {
      type: 'string',
    },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
}

export const UpdateEdgeInputSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    order: {
      type: 'number',
    },
    type: {
      enum: ['Graph', 'Vertex'],
      type: 'string',
    },
    source: {
      type: 'string',
    },
    target: {
      type: 'string',
    },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
}

export const UpdateVertexInputSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    vertexId: {
      type: 'string',
    },
    type: {
      enum: [
        'React_Affix',
        'React_Alert',
        'React_Anchor',
        'React_Anchor_Link',
        'React_AutoComplete',
        'React_Avatar',
        'React_BackTop',
        'React_Badge',
        'React_Breadcrumb',
        'React_Breadcrumb_Item',
        'React_Button',
        'React_Calendar',
        'React_Card',
        'React_Card_Grid',
        'React_Card_Meta',
        'React_Carousel',
        'React_Cascader',
        'React_Checkbox',
        'React_Collapse',
        'React_Collapse_Panel',
        'React_Comment',
        'React_ConfigProvider',
        'React_DatePicker',
        'React_Descriptions',
        'React_Descriptions_Item',
        'React_Divider',
        'React_Drawer',
        'React_Dropdown',
        'React_Empty',
        'React_Form',
        'React_Form_Item',
        'React_Form_ItemHook',
        'React_Form_List',
        'React_Fragment',
        'React_Html_A',
        'React_Html_Div',
        'React_Html_P',
        'React_Html_Span',
        'React_Icon',
        'React_Input',
        'React_InputNumber',
        'React_Layout',
        'React_Layout_Content',
        'React_Layout_Footer',
        'React_Layout_Header',
        'React_Layout_Sider',
        'React_List',
        'React_List_Item',
        'React_List_Item_Meta',
        'React_Mapper',
        'React_Mentions',
        'React_Mentions_Option',
        'React_Menu',
        'React_Menu_Item',
        'React_Menu_ItemGroup',
        'React_Menu_SubMenu',
        'React_Modal',
        'React_PageHeader',
        'React_Pagination',
        'React_Popconfirm',
        'React_Popover',
        'React_Progress',
        'React_Provider',
        'React_RGL_Container',
        'React_RGL_Item',
        'React_RGL_ResponsiveContainer',
        'React_Radio',
        'React_Radio_Group',
        'React_Rate',
        'React_RenderComponent',
        'React_RenderContainer',
        'React_Result',
        'React_Select',
        'React_Select_Option',
        'React_Skeleton',
        'React_Slider',
        'React_Space',
        'React_Spin',
        'React_Statistic',
        'React_Steps',
        'React_Steps_Step',
        'React_Switch',
        'React_Table',
        'React_Tabs',
        'React_Tabs_TabPane',
        'React_Tag',
        'React_Text',
        'React_TimePicker',
        'React_Timeline',
        'React_Timeline_Item',
        'React_Tooltip',
        'React_Transfer',
        'React_Tree',
        'React_TreeNode',
        'React_TreeSelect',
        'React_Typography',
        'React_Typography_Paragraph',
        'React_Typography_Text',
        'React_Typography_Title',
        'React_Upload',
      ],
      type: 'string',
    },
    props: {
      type: 'object',
      properties: {},
      additionalProperties: true,
    },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
}

export const CreatePageInputSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
    appId: {
      type: 'string',
    },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
}

export const DeletePageInputSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    pageId: {
      type: 'string',
    },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
}

export const GetPageInputSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    pageId: {
      type: 'string',
    },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
}

export const GetPagesInputSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    appId: {
      type: 'string',
    },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
}

export const UpdatePageInputSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
    pageId: {
      type: 'string',
    },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
}

export const DeleteUserInputSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
    },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
}

export const LoginUserInputSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
}

export const RegisterUserInputSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
}

export const UpdateUserInputSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
}
