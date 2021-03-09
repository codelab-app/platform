import {  RjsfGridFieldTemplate } from '@codelab/tools/generators/form-templates'
export const UpdateVertexInputSchema = {
  "type": "object",
  "properties": {
    "vertexId": {
      "type": "string",
      "minLength": 3
    },
    "type": {
      "type": "string",
      "enum": [
        "React_Fragment",
        "React_Html_Div",
        "React_Html_P",
        "React_Html_A",
        "React_Html_Span",
        "React_Text",
        "React_Icon",
        "React_Menu",
        "React_Menu_Item",
        "React_Menu_ItemGroup",
        "React_Menu_SubMenu",
        "React_Card",
        "React_Grid_Row",
        "React_Grid_Col",
        "React_Card_Grid",
        "React_Card_Meta",
        "React_Typography",
        "React_Typography_Title",
        "React_Typography_Text",
        "React_Typography_Paragraph",
        "React_Alert",
        "React_Affix",
        "React_AutoComplete",
        "React_Button",
        "React_Breadcrumb",
        "React_Breadcrumb_Item",
        "React_Dropdown",
        "React_Form",
        "React_Form_Item",
        "React_Form_ItemHook",
        "React_Form_List",
        "React_Checkbox",
        "React_Input",
        "React_InputNumber",
        "React_Select",
        "React_Select_Option",
        "React_Page_Container",
        "React_RGL_ResponsiveContainer",
        "React_RGL_Container",
        "React_RGL_Item",
        "React_Provider",
        "React_Modal",
        "React_Radio_Group",
        "React_Radio",
        "React_Rate",
        "React_Slider",
        "React_Switch",
        "React_Table",
        "React_Space",
        "React_DatePicker",
        "React_Divider",
        "React_Pagination",
        "React_PageHeader",
        "React_Badge",
        "React_Avatar",
        "React_Comment",
        "React_Calendar",
        "React_Descriptions",
        "React_Descriptions_Item",
        "React_Empty",
        "React_Timeline",
        "React_Timeline_Item",
        "React_Tabs",
        "React_Tabs_TabPane",
        "React_Statistic",
        "React_Tooltip",
        "React_Tag",
        "React_Tree",
        "React_Drawer",
        "React_Progress",
        "React_Result",
        "React_Spin",
        "React_Skeleton",
        "React_Anchor",
        "React_Anchor_Link",
        "React_BackTop",
        "React_ConfigProvider",
        "React_Popconfirm",
        "React_Transfer",
        "React_TreeSelect",
        "React_TreeNode",
        "React_TimePicker",
        "React_Upload",
        "React_Steps",
        "React_Steps_Step",
        "React_Collapse",
        "React_Collapse_Panel",
        "React_Carousel",
        "React_List",
        "React_List_Item",
        "React_List_Item_Meta",
        "React_Mentions",
        "React_Mentions_Option",
        "React_Layout",
        "React_Layout_Header",
        "React_Layout_Sider",
        "React_Layout_Content",
        "React_Layout_Footer",
        "React_Cascader",
        "React_Popover",
        "React_RenderComponent",
        "React_RenderContainer",
        "React_Mapper"
      ],
      "minLength": 1
    }
  },
  "dependencies": {
    "type": {
      "oneOf": [
        {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "React_Button"
              ]
            },
            "buttonProps": {
              "type": "object",
              "properties": {
                "block": {
                  "type": "boolean",
                  "title": "Block",
                  "description": "Option to fit button width to its parent width"
                },
                "danger": {
                  "type": "boolean",
                  "title": "Danger",
                  "description": "Set the danger status of button"
                },
                "disabled": {
                  "type": "boolean",
                  "title": "Disabled",
                  "description": "Disabled state of button"
                },
                "ghost": {
                  "type": "boolean",
                  "title": "Ghost",
                  "description": "Make background transparent and invert text and border colors"
                },
                "href": {
                  "type": "string",
                  "title": "Href",
                  "description": "Redirect url of link button"
                },
                "htmlType": {
                  "type": "string",
                  "enum": [
                    "submit",
                    "button",
                    "reset"
                  ],
                  "description": "Set the original html type of button"
                },
                "icon": {
                  "type": "string",
                  "description": "Set the icon component of button"
                },
                "loading": {
                  "type": "number",
                  "title": "Loading",
                  "description": "Set the loading status of button"
                },
                "shape": {
                  "type": "string",
                  "enum": [
                    "circle",
                    "round"
                  ],
                  "title": "Shape",
                  "description": "Set the loading status of button"
                },
                "size": {
                  "type": "string",
                  "enum": [
                    "small",
                    "middle",
                    "large"
                  ],
                  "title": "Size",
                  "description": "Set the size of button",
                  "default": "middle"
                },
                "target": {
                  "type": "string",
                  "title": "Target",
                  "description": "Same as target attribute of a, works when href is specified"
                },
                "type": {
                  "type": "string",
                  "enum": [
                    "default",
                    "primary",
                    "ghost",
                    "dashed",
                    "link",
                    "text"
                  ],
                  "title": "Type",
                  "description": "Can be set to primary ghost dashed link text default"
                }
              },
              "title": "Button props: "
            }
          }
        }
      ]
    }
  },
  "required": [
    "vertexId",
    "type"
  ]
}
export const UpdateVertexInputUiSchema = {
  "ui:ObjectFieldTemplate": RjsfGridFieldTemplate,
  "ui:spacing": 16,
  "ui:layout": [
    {
      "vertexId": {
        "span": 24
      }
    },
    {
      "type": {
        "span": 24
      }
    },
    {
      "buttonProps": {
        "span": 24
      }
    }
  ],
  "buttonProps": {
    "ui:ObjectFieldTemplate": RjsfGridFieldTemplate,
    "ui:spacing": 16,
    "ui:layout": [
      {
        "block": {
          "span": 6
        },
        "danger": {
          "span": 6
        },
        "disabled": {
          "span": 6
        },
        "ghost": {
          "span": 6
        }
      },
      {
        "href": {
          "span": 24
        }
      },
      {
        "htmlType": {
          "span": 24
        }
      },
      {
        "icon": {
          "span": 24
        }
      },
      {
        "loading": {
          "span": 24
        }
      },
      {
        "shape": {
          "span": 24
        }
      },
      {
        "size": {
          "span": 24
        }
      },
      {
        "target": {
          "span": 24
        }
      },
      {
        "type": {
          "span": 24
        }
      }
    ]
  }
}
export const CreateLambdaInputSchema = {
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "title": "Name"
    },
    "body": {
      "type": "string",
      "title": "Body"
    },
    "appId": {
      "type": "string",
      "title": "App Id"
    }
  }
}
export const CreateLambdaInputUiSchema = {
  "ui:ObjectFieldTemplate": RjsfGridFieldTemplate,
  "ui:spacing": 16,
  "ui:layout": [
    {
      "name": {
        "span": 24
      }
    },
    {
      "body": {
        "span": 24
      }
    },
    {
      "appId": {
        "span": 24
      }
    }
  ]
}
