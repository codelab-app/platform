import { JSONSchema7 } from 'json-schema'

export const ButtonPropsSchema: JSONSchema7 = {
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
    shape: {
      type: 'string',
      enum: ['circle', 'round', 'default'],
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
  },
  title: 'Button',
}

export const RGLLayoutPropsSchema: JSONSchema7 = {
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

export const RGLItemPropsSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    'data-grid': {
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
    key: {
      type: 'string',
    },
  },
  title: 'RGL Item',
}

export const TextPropsSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    value: {
      type: 'string',
    },
  },
  title: 'Text',
}

export const TypographyTitlePropsSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    level: {
      type: 'number',
      enum: [1, 2, 3, 4, 5],
    },
    type: {
      type: 'string',
      enum: ['secondary', 'success', 'warning', 'danger'],
    },
  },
  title: 'Typography Title',
}
export const TypographyTextPropsSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    mark: {
      type: 'boolean',
    },
  },
}

export const PropsSchema: JSONSchema7 = {
  anyOf: [
    {
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
        shape: {
          type: 'string',
          enum: ['circle', 'round', 'default'],
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
      },
      title: 'Button',
    },
    {
      type: 'object',
      properties: {
        'data-grid': {
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
        key: {
          type: 'string',
        },
      },
      title: 'RGL Item',
    },
    {
      type: 'object',
      properties: {
        level: {
          type: 'number',
          enum: [1, 2, 3, 4, 5],
        },
        type: {
          type: 'string',
          enum: ['secondary', 'success', 'warning', 'danger'],
        },
      },
      title: 'Typography Title',
    },
    {
      type: 'object',
      properties: {
        value: {
          type: 'string',
        },
      },
      title: 'Text',
    },
  ],
}

export const UpdateVertexInputSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    vertexId: {
      type: 'string',
      minLength: 3,
    },
    type: {
      type: 'string',
      enum: [
        'React_Fragment',
        'React_Html_Div',
        'React_Html_P',
        'React_Html_A',
        'React_Html_Span',
        'React_Text',
        'React_Icon',
        'React_Menu',
        'React_Menu_Item',
        'React_Menu_ItemGroup',
        'React_Menu_SubMenu',
        'React_Card',
        'React_Card_Grid',
        'React_Card_Meta',
        'React_Typography',
        'React_Typography_Title',
        'React_Typography_Text',
        'React_Typography_Paragraph',
        'React_Alert',
        'React_Affix',
        'React_AutoComplete',
        'React_Button',
        'React_Breadcrumb',
        'React_Breadcrumb_Item',
        'React_Dropdown',
        'React_Form',
        'React_Form_Item',
        'React_Form_ItemHook',
        'React_Form_List',
        'React_Checkbox',
        'React_Input',
        'React_InputNumber',
        'React_Select',
        'React_Select_Option',
        'React_RGL_ResponsiveContainer',
        'React_RGL_Container',
        'React_RGL_Item',
        'React_Provider',
        'React_Modal',
        'React_Radio_Group',
        'React_Radio',
        'React_Rate',
        'React_Slider',
        'React_Switch',
        'React_Table',
        'React_Space',
        'React_DatePicker',
        'React_Divider',
        'React_Pagination',
        'React_PageHeader',
        'React_Badge',
        'React_Avatar',
        'React_Comment',
        'React_Calendar',
        'React_Descriptions',
        'React_Descriptions_Item',
        'React_Empty',
        'React_Timeline',
        'React_Timeline_Item',
        'React_Tabs',
        'React_Tabs_TabPane',
        'React_Statistic',
        'React_Tooltip',
        'React_Tag',
        'React_Tree',
        'React_Drawer',
        'React_Progress',
        'React_Result',
        'React_Spin',
        'React_Skeleton',
        'React_Anchor',
        'React_Anchor_Link',
        'React_BackTop',
        'React_ConfigProvider',
        'React_Popconfirm',
        'React_Transfer',
        'React_TreeSelect',
        'React_TreeNode',
        'React_TimePicker',
        'React_Upload',
        'React_Steps',
        'React_Steps_Step',
        'React_Collapse',
        'React_Collapse_Panel',
        'React_Carousel',
        'React_List',
        'React_List_Item',
        'React_List_Item_Meta',
        'React_Mentions',
        'React_Mentions_Option',
        'React_Layout',
        'React_Layout_Header',
        'React_Layout_Sider',
        'React_Layout_Content',
        'React_Layout_Footer',
        'React_Cascader',
        'React_Popover',
        'React_RenderComponent',
        'React_RenderContainer',
        'React_Mapper',
      ],
    },
    props: {
      anyOf: [
        {
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
            shape: {
              type: 'string',
              enum: ['circle', 'round', 'default'],
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
          },
          title: 'Button',
        },
        {
          type: 'object',
          properties: {
            'data-grid': {
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
            key: {
              type: 'string',
            },
          },
          title: 'RGL Item',
        },
        {
          type: 'object',
          properties: {
            level: {
              type: 'number',
              enum: [1, 2, 3, 4, 5],
            },
            type: {
              type: 'string',
              enum: ['secondary', 'success', 'warning', 'danger'],
            },
          },
          title: 'Typography Title',
        },
        {
          type: 'object',
          properties: {
            value: {
              type: 'string',
            },
          },
          title: 'Text',
        },
      ],
    },
  },
  required: ['vertexId'],
}
