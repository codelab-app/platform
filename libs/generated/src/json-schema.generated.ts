import { JSONSchema7 } from 'json-schema'

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
          description: 'Used with Graphql',
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
            'React_Grid',
            'React_Grid_Layout_Container',
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
            'React_Radio',
            'React_Radio_Group',
            'React_Rate',
            'React_RenderComponent',
            'React_RenderContainer',
            'React_ResponsiveGrid',
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
            'Ref',
            'Tree',
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

export const GetGraphByInputSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    appId: {
      type: 'string',
    },
    pageId: {
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
    graphId: {
      type: 'string',
    },
    type: {
      enum: ['Graph', 'Vertex'],
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
      description: 'Used with Graphql',
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
        'React_Grid',
        'React_Grid_Layout_Container',
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
        'React_Radio',
        'React_Radio_Group',
        'React_Rate',
        'React_RenderComponent',
        'React_RenderContainer',
        'React_ResponsiveGrid',
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
        'Ref',
        'Tree',
      ],
      type: 'string',
    },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
}

export const AddGridInputSchema: JSONSchema7 = {
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
