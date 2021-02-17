import { JSONSchema7 } from 'json-schema'

export const AffixPropsSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: ['React_Affix'],
    },
    props: {
      type: 'object',
      properties: {
        offsetBottom: {
          type: 'string',
          description: 'Offset from the bottom of the viewport (in pixels)',
        },
        offsetTop: {
          type: 'string',
          description: 'Offset from the top of the viewport (in pixels)',
          default: 0,
        },
      },
      title: '',
    },
  },
}

export const AutoCompletePropsSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: ['React_AutoComplete'],
    },
    props: {
      type: 'object',
      properties: {
        allowClear: {
          type: 'boolean',
          description: 'Show clear button',
        },
        autoFocus: {
          type: 'boolean',
          description: 'If get focus when component mounted',
        },
        backfill: {
          type: 'boolean',
          description:
            'If backfill selected item the input when using keyboard',
        },
        childrenInputElement: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'Customize input element',
        },
        childrenDataSource: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'Data source to auto complete',
        },
        defaultActiveFirstOption: {
          type: 'boolean',
          description: 'Whether active first option by default',
          default: true,
        },
        defaultOpen: {
          type: 'boolean',
          description: 'Initial open state of dropdown',
        },
        defaultValue: {
          type: 'string',
          description: 'Initial selected option',
        },
        disabled: {
          type: 'boolean',
          description: 'Whether disabled select',
        },
        dropdownClassName: {
          type: 'string',
          description: 'The className of dropdown menu',
        },
        dropdownMatchSelectWidth: {
          type: 'number',
          description:
            'Determine whether the dropdown menu and the select input are the same width. Default set min-width same as input. Will ignore when value less than select width. false will disable virtual scroll\t',
        },
        filterOption: {
          type: 'boolean',
          description:
            'If true, filter options by input, if function, filter options against it. The function will receive two arguments, inputValue and option, if the function returns true, the option will be included in the filtered set; Otherwise, it will be excluded\t',
        },
        notFoundContent: {
          type: 'string',
          description: 'Specify content to show when no result matches',
          default: 'Not Found',
        },
        open: {
          type: 'boolean',
          description: 'Controlled open state of dropdown',
        },
        options: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              label: {
                type: 'string',
                title: 'Label',
              },
              value: {
                type: 'string',
                title: 'Value',
              },
            },
          },
          description:
            'Select options. Will get better perf than jsx definition',
        },
        placeholder: {
          type: 'string',
          description: 'The placeholder of input',
        },
        value: {
          type: 'string',
          description: 'Selected option',
        },
        onBlur: {
          type: 'string',
          description: 'Called when leaving the component',
        },
        onChange: {
          type: 'string',
          description:
            'Called when select an option or input value change, or value of input is changed',
        },
        onDropdownVisibleChange: {
          type: 'string',
          description: 'Called when dropdown open',
        },
        onFocus: {
          type: 'string',
          description: 'Called when entering the component',
        },
        onSearch: {
          type: 'string',
          description: 'Called when searching items',
        },
        onSelect: {
          type: 'string',
          description:
            "Called when a option is selected. param is option's value and option instance",
        },
      },
      title: '',
    },
  },
}

export const AvatarPropsSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    alt: {
      type: 'string',
      description:
        'This attribute defines the alternative text describing the image',
    },
    gap: {
      type: 'number',
      description: 'Letter type unit distance between left and right sides',
    },
    icon: {
      type: 'string',
      description: 'Custom icon type for an icon avatar',
    },
    shape: {
      type: 'string',
      description: 'The shape of avatar',
      enum: ['circle', 'square'],
      default: 'circle',
    },
    size: {
      type: 'object',
      properties: {
        size: {
          type: 'string',
          enum: ['large', 'small', 'default'],
        },
        xxl: {
          type: 'string',
          enum: ['xxl'],
        },
        xl: {
          type: 'string',
          enum: ['xl'],
        },
        lg: {
          type: 'string',
          enum: ['lg'],
        },
        md: {
          type: 'string',
          enum: ['md'],
        },
        sm: {
          type: 'string',
          enum: ['sm'],
        },
        xs: {
          type: 'string',
          enum: ['xs'],
        },
      },
      description: 'The size of the avatar',
      title: 'Avatar Size',
    },
    src: {
      type: 'string',
      description:
        'The address of the image for an image avatar or image element',
    },
    srcSet: {
      type: 'string',
      description: 'A list of sources to use for different screen resolutions',
    },
  },
}
export const AvatarSelectedPropsSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: ['React_Avatar'],
    },
    props: {
      type: 'object',
      properties: {
        alt: {
          type: 'string',
          description:
            'This attribute defines the alternative text describing the image',
        },
        gap: {
          type: 'number',
          description: 'Letter type unit distance between left and right sides',
        },
        icon: {
          type: 'string',
          description: 'Custom icon type for an icon avatar',
        },
        shape: {
          type: 'string',
          description: 'The shape of avatar',
          enum: ['circle', 'square'],
          default: 'circle',
        },
        size: {
          type: 'object',
          properties: {
            size: {
              type: 'string',
              enum: ['large', 'small', 'default'],
            },
            xxl: {
              type: 'string',
              enum: ['xxl'],
            },
            xl: {
              type: 'string',
              enum: ['xl'],
            },
            lg: {
              type: 'string',
              enum: ['lg'],
            },
            md: {
              type: 'string',
              enum: ['md'],
            },
            sm: {
              type: 'string',
              enum: ['sm'],
            },
            xs: {
              type: 'string',
              enum: ['xs'],
            },
          },
          description: 'The size of the avatar',
          title: 'Avatar Size',
        },
        src: {
          type: 'string',
          description:
            'The address of the image for an image avatar or image element',
        },
        srcSet: {
          type: 'string',
          description:
            'A list of sources to use for different screen resolutions',
        },
      },
      title: '',
    },
  },
}

export const BreadCrumbPropsSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    params: {
      type: 'string',
      description: 'Routing parameters',
    },
    routes: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            minLength: 1,
          },
          breadcrumbName: {
            type: 'string',
            minLength: 1,
          },
          children: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                path: {
                  type: 'string',
                  minLength: 1,
                },
                breadcrumbName: {
                  type: 'string',
                  minLength: 1,
                },
              },
              required: ['path', 'breadcrumbName'],
            },
          },
        },
        required: ['path', 'breadcrumbName'],
      },
      description: 'The routing stack information of router',
    },
    separator: {
      type: 'string',
      description: 'Custom separator',
    },
  },
}
export const BreadcrumbSelectedPropsSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: ['React_Breadcrumb'],
    },
    props: {
      type: 'object',
      properties: {
        params: {
          type: 'string',
          description: 'Routing parameters',
        },
        routes: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              path: {
                type: 'string',
                minLength: 1,
              },
              breadcrumbName: {
                type: 'string',
                minLength: 1,
              },
              children: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    path: {
                      type: 'string',
                      minLength: 1,
                    },
                    breadcrumbName: {
                      type: 'string',
                      minLength: 1,
                    },
                  },
                  required: ['path', 'breadcrumbName'],
                },
              },
            },
            required: ['path', 'breadcrumbName'],
          },
          description: 'The routing stack information of router',
        },
        separator: {
          type: 'string',
          description: 'Custom separator',
        },
      },
      title: '',
    },
  },
}

export const BreadcrumbItemPropsSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: ['React_Breadcrumb_Item'],
    },
    props: {
      type: 'object',
      properties: {
        className: {
          type: 'string',
          description: 'The additional css class',
        },
        dropdownProps: {
          type: 'object',
          properties: {
            arrow: {
              type: 'boolean',
              description: 'Whether the dropdown arrow should be visible',
              default: false,
            },
            disabled: {
              type: 'boolean',
              description: 'Whether the dropdown menu is disabled',
            },
            overlay: {
              type: 'object',
              properties: {
                defaultOpenKeys: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                  description:
                    'Array with the keys of default opened sub menus',
                },
                defaultSelectedKeys: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                  description:
                    'Array with the keys of default selected menu items',
                },
                expandIcon: {
                  type: 'string',
                  description: 'custom expand icon of submenu',
                },
                forceSubMenuRender: {
                  type: 'boolean',
                  description:
                    'Render submenu into DOM before it becomes visible',
                },
                inlineCollapsed: {
                  type: 'boolean',
                  description:
                    'Specifies the collapsed status when menu is inline mode',
                },
                inlineIndent: {
                  type: 'number',
                  description:
                    'Indent (in pixels) of inline menu items on each level',
                  default: 24,
                },
                mode: {
                  type: 'string',
                  description: 'Type of menu',
                  enum: [
                    'horizontal',
                    'vertical',
                    'vertical-left',
                    'vertical-right',
                    'inline',
                  ],
                  default: 'vertical',
                },
                multiple: {
                  type: 'boolean',
                  description: 'Allows selection of multiple items',
                },
                openKeys: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                  description:
                    'Array with the keys of currently opened sub-menus',
                },
                overflowedIndicator: {
                  type: 'string',
                  description: 'Customized icon when menu is collapsed',
                },
                selectable: {
                  type: 'boolean',
                  description: 'Allows selecting menu items',
                },
                selectedKeys: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                  description:
                    'Array with the keys of currently selected menu items',
                },
                style: {
                  type: 'string',
                  description: 'Style of the root node',
                },
                subMenuCloseDelay: {
                  type: 'number',
                  description:
                    'Delay time to hide submenu when mouse leaves (in seconds)',
                  default: 0.1,
                },
                subMenuOpenDelay: {
                  type: 'number',
                  description:
                    'Delay time to show submenu when mouse enters, (in seconds)',
                  default: 0,
                },
                theme: {
                  type: 'string',
                  description: 'Color theme of the menu',
                  enum: ['light', 'dark'],
                  default: 'light',
                },
                triggerSubMenuAction: {
                  type: 'string',
                  description: 'Which action can trigger submenu open/close',
                  enum: ['hover', 'click'],
                  default: 'hover',
                },
              },
              description: 'The dropdown menu',
            },
            overlayClassName: {
              type: 'string',
              description: 'The class name of the dropdown root element',
            },
            overlayStyle: {
              type: 'string',
              description: 'The style of the dropdown root element',
            },
            placement: {
              type: 'string',
              description: 'Placement of popup menu',
              enum: [
                'topLeft',
                'topCenter',
                'topRight',
                'bottomLeft',
                'bottomCenter',
                'bottomRight',
              ],
              default: 'bottomLeft',
            },
            trigger: {
              type: 'array',
              items: {
                type: 'string',
                enum: ['click', 'hover', 'contextMenu'],
              },
              description:
                "The trigger mode which executes the dropdown action. Note that hover can't be used on touchscreens",
              title: 'Trigger',
              uniqueItems: true,
              maxItems: 3,
              default: ['hover'],
            },
            visible: {
              type: 'boolean',
              description: 'Whether the dropdown menu is currently visible',
            },
          },
          description: 'The dropdown props',
          title: 'Dropdown Props',
        },
        href: {
          type: 'string',
          description: 'Target of hyperlink',
        },
        overlay: {
          type: 'object',
          properties: {
            defaultOpenKeys: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Array with the keys of default opened sub menus',
            },
            defaultSelectedKeys: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Array with the keys of default selected menu items',
            },
            expandIcon: {
              type: 'string',
              description: 'custom expand icon of submenu',
            },
            forceSubMenuRender: {
              type: 'boolean',
              description: 'Render submenu into DOM before it becomes visible',
            },
            inlineCollapsed: {
              type: 'boolean',
              description:
                'Specifies the collapsed status when menu is inline mode',
            },
            inlineIndent: {
              type: 'number',
              description:
                'Indent (in pixels) of inline menu items on each level',
              default: 24,
            },
            mode: {
              type: 'string',
              description: 'Type of menu',
              enum: [
                'horizontal',
                'vertical',
                'vertical-left',
                'vertical-right',
                'inline',
              ],
              default: 'vertical',
            },
            multiple: {
              type: 'boolean',
              description: 'Allows selection of multiple items',
            },
            openKeys: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Array with the keys of currently opened sub-menus',
            },
            overflowedIndicator: {
              type: 'string',
              description: 'Customized icon when menu is collapsed',
            },
            selectable: {
              type: 'boolean',
              description: 'Allows selecting menu items',
            },
            selectedKeys: {
              type: 'array',
              items: {
                type: 'string',
              },
              description:
                'Array with the keys of currently selected menu items',
            },
            style: {
              type: 'string',
              description: 'Style of the root node',
            },
            subMenuCloseDelay: {
              type: 'number',
              description:
                'Delay time to hide submenu when mouse leaves (in seconds)',
              default: 0.1,
            },
            subMenuOpenDelay: {
              type: 'number',
              description:
                'Delay time to show submenu when mouse enters, (in seconds)',
              default: 0,
            },
            theme: {
              type: 'string',
              description: 'Color theme of the menu',
              enum: ['light', 'dark'],
              default: 'light',
            },
            triggerSubMenuAction: {
              type: 'string',
              description: 'Which action can trigger submenu open/close',
              enum: ['hover', 'click'],
              default: 'hover',
            },
          },
          description: 'The dropdown menu',
          title: 'Menu Props',
        },
      },
      title: '',
    },
  },
}

export const ButtonPropsSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: ['React_Button'],
    },
    props: {
      type: 'object',
      properties: {
        block: {
          type: 'boolean',
          description: 'Option to fit button width to its parent width',
        },
        danger: {
          type: 'boolean',
          description: 'Set the danger status of button',
        },
        disabled: {
          type: 'boolean',
          description: 'Disabled state of button',
        },
        ghost: {
          type: 'boolean',
          description:
            'Make background transparent and invert text and border colors\t',
        },
        href: {
          type: 'string',
          description: 'Redirect url of link button',
        },
        htmlType: {
          type: 'string',
          description: 'Set the original html type of button',
          enum: ['submit', 'button', 'reset'],
        },
        icon: {
          type: 'string',
          description: 'Set the icon component of button',
        },
        loading: {
          type: 'number',
          description: 'Set the loading status of button',
        },
        shape: {
          type: 'string',
          description: 'Can be set button shape',
          enum: ['circle', 'round'],
        },
        size: {
          type: 'string',
          description: 'Set the size of button',
          default: 'middle',
          enum: ['small', 'middle', 'large'],
        },
        target: {
          type: 'string',
          description:
            'Same as target attribute of a, works when href is specified',
        },
        type: {
          type: 'string',
          description: 'Can be set to primary ghost dashed link text default',
          enum: ['default', 'primary', 'ghost', 'dashed', 'link', 'text'],
        },
      },
      title: '',
    },
  },
}

export const CardPropsSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: ['React_Card'],
    },
    props: {
      type: 'object',
      properties: {
        actions: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'The action list, shows at the bottom of the Card',
        },
        activeTabKey: {
          type: 'string',
          description: "Current TabPane's key",
        },
        bodyStyle: {
          type: 'string',
          description: 'Inline style to apply to the card content',
        },
        bordered: {
          type: 'boolean',
          description: 'Toggles rendering of the border around the card',
          default: true,
        },
        cover: {
          type: 'string',
          description: 'Card cover',
        },
        defaultActiveTabKey: {
          type: 'string',
          description:
            "Initial active TabPane's key, if activeTabKey is not set",
        },
        extra: {
          type: 'string',
          description: 'Content to render in the top-right corner of the card',
        },
        headStyle: {
          type: 'string',
          description: 'Inline style to apply to the card head',
        },
        hoverable: {
          type: 'boolean',
          description: 'Lift up when hovering card',
        },
        loading: {
          type: 'boolean',
          description:
            'Shows a loading indicator while the contents of the card are being fetched',
        },
        size: {
          type: 'string',
          description: 'Size of card',
          enum: ['default', 'small'],
          default: 'default',
        },
        tabBarExtraContent: {
          type: 'string',
          description: 'Extra content in tab bar',
        },
        tabList: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              key: {
                type: 'string',
                minLength: 1,
              },
              tab: {
                type: 'string',
              },
              disabled: {
                type: 'boolean',
              },
            },
            required: ['key', 'tab'],
          },
          description: "List of TabPane's head",
        },
        title: {
          type: 'string',
          description: 'Card title',
        },
        type: {
          type: 'string',
          description: 'Card style type, can be set to inner or not set',
          enum: ['inner'],
        },
      },
      title: '',
    },
  },
}

export const CardGridPropsSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: ['React_Card_Grid'],
    },
    props: {
      type: 'object',
      properties: {
        className: {
          type: 'string',
          description: 'The className of container',
        },
        hoverable: {
          type: 'boolean',
          description: 'Lift up when hovering card grid',
        },
        style: {
          type: 'string',
          description: 'The style object of container',
        },
      },
      title: '',
    },
  },
}

export const CardMetaPropsSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: ['React_Card_Meta'],
    },
    props: {
      type: 'object',
      properties: {
        avatar: {
          type: 'string',
          description: 'Avatar or icon',
        },
        className: {
          type: 'string',
          description: 'The className of container',
        },
        description: {
          type: 'string',
          description: 'Description content',
        },
        style: {
          type: 'string',
          description: 'The style object of container',
        },
        title: {
          type: 'string',
          description: 'Title content',
        },
      },
      title: '',
    },
  },
}

export const CascaderPropsSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: ['React_Cascader'],
    },
    props: {
      type: 'object',
      title: '',
    },
  },
}

export const DividerPropsSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: ['React_Divider'],
    },
    props: {
      type: 'object',
      properties: {
        className: {
          type: 'string',
          description: 'The className of container',
        },
        dashed: {
          type: 'boolean',
          description: 'Whether line is dashed',
        },
        orientation: {
          type: 'string',
          description: 'The position of title inside divider',
          enum: ['left', 'right', 'center'],
          default: 'center',
        },
        plain: {
          type: 'boolean',
          description: 'Divider text show as plain style',
        },
        style: {
          type: 'string',
          description: 'The style object of container',
        },
        type: {
          type: 'string',
          description: 'The direction type of divider',
          enum: ['horizontal', 'vertical'],
          default: 'horizontal',
        },
      },
      title: '',
    },
  },
}

export const DropDownPropsSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    arrow: {
      type: 'boolean',
      description: 'Whether the dropdown arrow should be visible',
      default: false,
    },
    disabled: {
      type: 'boolean',
      description: 'Whether the dropdown menu is disabled',
    },
    overlay: {
      type: 'object',
      properties: {
        defaultOpenKeys: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'Array with the keys of default opened sub menus',
        },
        defaultSelectedKeys: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'Array with the keys of default selected menu items',
        },
        expandIcon: {
          type: 'string',
          description: 'custom expand icon of submenu',
        },
        forceSubMenuRender: {
          type: 'boolean',
          description: 'Render submenu into DOM before it becomes visible',
        },
        inlineCollapsed: {
          type: 'boolean',
          description:
            'Specifies the collapsed status when menu is inline mode',
        },
        inlineIndent: {
          type: 'number',
          description: 'Indent (in pixels) of inline menu items on each level',
          default: 24,
        },
        mode: {
          type: 'string',
          description: 'Type of menu',
          enum: [
            'horizontal',
            'vertical',
            'vertical-left',
            'vertical-right',
            'inline',
          ],
          default: 'vertical',
        },
        multiple: {
          type: 'boolean',
          description: 'Allows selection of multiple items',
        },
        openKeys: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'Array with the keys of currently opened sub-menus',
        },
        overflowedIndicator: {
          type: 'string',
          description: 'Customized icon when menu is collapsed',
        },
        selectable: {
          type: 'boolean',
          description: 'Allows selecting menu items',
        },
        selectedKeys: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'Array with the keys of currently selected menu items',
        },
        style: {
          type: 'string',
          description: 'Style of the root node',
        },
        subMenuCloseDelay: {
          type: 'number',
          description:
            'Delay time to hide submenu when mouse leaves (in seconds)',
          default: 0.1,
        },
        subMenuOpenDelay: {
          type: 'number',
          description:
            'Delay time to show submenu when mouse enters, (in seconds)',
          default: 0,
        },
        theme: {
          type: 'string',
          description: 'Color theme of the menu',
          enum: ['light', 'dark'],
          default: 'light',
        },
        triggerSubMenuAction: {
          type: 'string',
          description: 'Which action can trigger submenu open/close',
          enum: ['hover', 'click'],
          default: 'hover',
        },
      },
      description: 'The dropdown menu',
    },
    overlayClassName: {
      type: 'string',
      description: 'The class name of the dropdown root element',
    },
    overlayStyle: {
      type: 'string',
      description: 'The style of the dropdown root element',
    },
    placement: {
      type: 'string',
      description: 'Placement of popup menu',
      enum: [
        'topLeft',
        'topCenter',
        'topRight',
        'bottomLeft',
        'bottomCenter',
        'bottomRight',
      ],
      default: 'bottomLeft',
    },
    trigger: {
      type: 'array',
      items: {
        type: 'string',
        enum: ['click', 'hover', 'contextMenu'],
      },
      description:
        "The trigger mode which executes the dropdown action. Note that hover can't be used on touchscreens",
      title: 'Trigger',
      uniqueItems: true,
      maxItems: 3,
      default: ['hover'],
    },
    visible: {
      type: 'boolean',
      description: 'Whether the dropdown menu is currently visible',
    },
  },
}
export const DropdownSelectedPropsSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: ['React_Dropdown'],
    },
    props: {
      type: 'object',
      properties: {
        arrow: {
          type: 'boolean',
          description: 'Whether the dropdown arrow should be visible',
          default: false,
        },
        disabled: {
          type: 'boolean',
          description: 'Whether the dropdown menu is disabled',
        },
        overlay: {
          type: 'object',
          properties: {
            defaultOpenKeys: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Array with the keys of default opened sub menus',
            },
            defaultSelectedKeys: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Array with the keys of default selected menu items',
            },
            expandIcon: {
              type: 'string',
              description: 'custom expand icon of submenu',
            },
            forceSubMenuRender: {
              type: 'boolean',
              description: 'Render submenu into DOM before it becomes visible',
            },
            inlineCollapsed: {
              type: 'boolean',
              description:
                'Specifies the collapsed status when menu is inline mode',
            },
            inlineIndent: {
              type: 'number',
              description:
                'Indent (in pixels) of inline menu items on each level',
              default: 24,
            },
            mode: {
              type: 'string',
              description: 'Type of menu',
              enum: [
                'horizontal',
                'vertical',
                'vertical-left',
                'vertical-right',
                'inline',
              ],
              default: 'vertical',
            },
            multiple: {
              type: 'boolean',
              description: 'Allows selection of multiple items',
            },
            openKeys: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Array with the keys of currently opened sub-menus',
            },
            overflowedIndicator: {
              type: 'string',
              description: 'Customized icon when menu is collapsed',
            },
            selectable: {
              type: 'boolean',
              description: 'Allows selecting menu items',
            },
            selectedKeys: {
              type: 'array',
              items: {
                type: 'string',
              },
              description:
                'Array with the keys of currently selected menu items',
            },
            style: {
              type: 'string',
              description: 'Style of the root node',
            },
            subMenuCloseDelay: {
              type: 'number',
              description:
                'Delay time to hide submenu when mouse leaves (in seconds)',
              default: 0.1,
            },
            subMenuOpenDelay: {
              type: 'number',
              description:
                'Delay time to show submenu when mouse enters, (in seconds)',
              default: 0,
            },
            theme: {
              type: 'string',
              description: 'Color theme of the menu',
              enum: ['light', 'dark'],
              default: 'light',
            },
            triggerSubMenuAction: {
              type: 'string',
              description: 'Which action can trigger submenu open/close',
              enum: ['hover', 'click'],
              default: 'hover',
            },
          },
          description: 'The dropdown menu',
        },
        overlayClassName: {
          type: 'string',
          description: 'The class name of the dropdown root element',
        },
        overlayStyle: {
          type: 'string',
          description: 'The style of the dropdown root element',
        },
        placement: {
          type: 'string',
          description: 'Placement of popup menu',
          enum: [
            'topLeft',
            'topCenter',
            'topRight',
            'bottomLeft',
            'bottomCenter',
            'bottomRight',
          ],
          default: 'bottomLeft',
        },
        trigger: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['click', 'hover', 'contextMenu'],
          },
          description:
            "The trigger mode which executes the dropdown action. Note that hover can't be used on touchscreens",
          title: 'Trigger',
          uniqueItems: true,
          maxItems: 3,
          default: ['hover'],
        },
        visible: {
          type: 'boolean',
          description: 'Whether the dropdown menu is currently visible',
        },
      },
      title: '',
    },
  },
}

export const IconPropsSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: ['React_Icon'],
    },
    props: {
      type: 'object',
      properties: {
        className: {
          type: 'string',
          description: 'The className of Icon',
        },
        rotate: {
          type: 'string',
          description: 'Rotate by n degrees (not working in IE9)',
        },
        spin: {
          type: 'boolean',
          description: 'Rotate icon with animation',
        },
        style: {
          type: 'string',
          description: 'The style properties of icon, like fontSize and color',
        },
        twoToneColor: {
          type: 'string',
          description:
            'Only supports the two-tone icon. Specify the primary color',
        },
      },
      title: '',
    },
  },
}

export const LayoutPropsSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: [
        'React_Layout',
        'React_Layout_Header',
        'React_Layout_Footer',
        'React_Layout_Content',
      ],
    },
    props: {
      type: 'object',
      properties: {
        className: {
          type: 'string',
          description: 'Container className',
        },
        hasSider: {
          type: 'boolean',
          description:
            "Whether contain Sider in children, don't have to assign it normally. Useful in ssr avoid style flickering\t",
        },
        style: {
          type: 'string',
          description: 'To customize the styles',
        },
      },
      title: '',
    },
  },
}

export const LayoutSiderPropsSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: ['React_Layout_Sider'],
    },
    props: {
      type: 'object',
      properties: {
        breakpoint: {
          type: 'string',
          description: 'Breakpoints of the responsive layout',
          enum: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
        },
        className: {
          type: 'string',
          description: 'Container className',
        },
        collapsed: {
          type: 'boolean',
          description: 'To set the current status',
        },
        collapsedWidth: {
          type: 'number',
          description:
            'Width of the collapsed sidebar, by setting to 0 a special trigger will appear',
          default: 80,
        },
        collapsible: {
          type: 'boolean',
          description: 'Whether can be collapsed',
        },
        defaultCollapsed: {
          type: 'boolean',
          description: 'To set the initial status',
        },
        reverseArrow: {
          type: 'boolean',
          description:
            'Reverse direction of arrow, for a sider that expands from the right',
        },
        style: {
          type: 'string',
          description: 'To customize the styles',
        },
        theme: {
          type: 'string',
          description: 'Color theme of the sidebar',
          enum: ['light', 'dark'],
          default: 'dark',
        },
        trigger: {
          type: 'string',
          description:
            'Specify the customized trigger, set to null to hide the trigger',
        },
        width: {
          type: 'string',
          description: 'Width of the sidebar',
          default: 200,
        },
        zeroWidthTriggerStyle: {
          type: 'string',
          description:
            'To customize the styles of the special trigger that appears when collapsedWidth is 0',
        },
      },
      title: '',
    },
  },
}

export const MenuPropsSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    defaultOpenKeys: {
      type: 'array',
      items: {
        type: 'string',
      },
      description: 'Array with the keys of default opened sub menus',
    },
    defaultSelectedKeys: {
      type: 'array',
      items: {
        type: 'string',
      },
      description: 'Array with the keys of default selected menu items',
    },
    expandIcon: {
      type: 'string',
      description: 'custom expand icon of submenu',
    },
    forceSubMenuRender: {
      type: 'boolean',
      description: 'Render submenu into DOM before it becomes visible',
    },
    inlineCollapsed: {
      type: 'boolean',
      description: 'Specifies the collapsed status when menu is inline mode',
    },
    inlineIndent: {
      type: 'number',
      description: 'Indent (in pixels) of inline menu items on each level',
      default: 24,
    },
    mode: {
      type: 'string',
      description: 'Type of menu',
      enum: [
        'horizontal',
        'vertical',
        'vertical-left',
        'vertical-right',
        'inline',
      ],
      default: 'vertical',
    },
    multiple: {
      type: 'boolean',
      description: 'Allows selection of multiple items',
    },
    openKeys: {
      type: 'array',
      items: {
        type: 'string',
      },
      description: 'Array with the keys of currently opened sub-menus',
    },
    overflowedIndicator: {
      type: 'string',
      description: 'Customized icon when menu is collapsed',
    },
    selectable: {
      type: 'boolean',
      description: 'Allows selecting menu items',
    },
    selectedKeys: {
      type: 'array',
      items: {
        type: 'string',
      },
      description: 'Array with the keys of currently selected menu items',
    },
    style: {
      type: 'string',
      description: 'Style of the root node',
    },
    subMenuCloseDelay: {
      type: 'number',
      description: 'Delay time to hide submenu when mouse leaves (in seconds)',
      default: 0.1,
    },
    subMenuOpenDelay: {
      type: 'number',
      description: 'Delay time to show submenu when mouse enters, (in seconds)',
      default: 0,
    },
    theme: {
      type: 'string',
      description: 'Color theme of the menu',
      enum: ['light', 'dark'],
      default: 'light',
    },
    triggerSubMenuAction: {
      type: 'string',
      description: 'Which action can trigger submenu open/close',
      enum: ['hover', 'click'],
      default: 'hover',
    },
  },
}
export const MenuSelectedPropsSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: ['React_Menu'],
    },
    props: {
      type: 'object',
      properties: {
        defaultOpenKeys: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'Array with the keys of default opened sub menus',
        },
        defaultSelectedKeys: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'Array with the keys of default selected menu items',
        },
        expandIcon: {
          type: 'string',
          description: 'custom expand icon of submenu',
        },
        forceSubMenuRender: {
          type: 'boolean',
          description: 'Render submenu into DOM before it becomes visible',
        },
        inlineCollapsed: {
          type: 'boolean',
          description:
            'Specifies the collapsed status when menu is inline mode',
        },
        inlineIndent: {
          type: 'number',
          description: 'Indent (in pixels) of inline menu items on each level',
          default: 24,
        },
        mode: {
          type: 'string',
          description: 'Type of menu',
          enum: [
            'horizontal',
            'vertical',
            'vertical-left',
            'vertical-right',
            'inline',
          ],
          default: 'vertical',
        },
        multiple: {
          type: 'boolean',
          description: 'Allows selection of multiple items',
        },
        openKeys: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'Array with the keys of currently opened sub-menus',
        },
        overflowedIndicator: {
          type: 'string',
          description: 'Customized icon when menu is collapsed',
        },
        selectable: {
          type: 'boolean',
          description: 'Allows selecting menu items',
        },
        selectedKeys: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'Array with the keys of currently selected menu items',
        },
        style: {
          type: 'string',
          description: 'Style of the root node',
        },
        subMenuCloseDelay: {
          type: 'number',
          description:
            'Delay time to hide submenu when mouse leaves (in seconds)',
          default: 0.1,
        },
        subMenuOpenDelay: {
          type: 'number',
          description:
            'Delay time to show submenu when mouse enters, (in seconds)',
          default: 0,
        },
        theme: {
          type: 'string',
          description: 'Color theme of the menu',
          enum: ['light', 'dark'],
          default: 'light',
        },
        triggerSubMenuAction: {
          type: 'string',
          description: 'Which action can trigger submenu open/close',
          enum: ['hover', 'click'],
          default: 'hover',
        },
      },
      title: '',
    },
  },
}

export const MenuItemPropsSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    danger: {
      type: 'boolean',
      description: 'Display the danger style',
    },
    disabled: {
      type: 'boolean',
      description: 'Whether menu item is disabled',
    },
    icon: {
      type: 'string',
      description: 'The icon of the menu item',
    },
    key: {
      type: 'string',
      description: 'Unique ID of the menu item',
    },
    title: {
      type: 'string',
      description: 'Set display title for collapsed item',
    },
  },
}
export const MenuItemSelectedPropsSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: ['React_Menu_Item'],
    },
    props: {
      type: 'object',
      properties: {
        danger: {
          type: 'boolean',
          description: 'Display the danger style',
        },
        disabled: {
          type: 'boolean',
          description: 'Whether menu item is disabled',
        },
        icon: {
          type: 'string',
          description: 'The icon of the menu item',
        },
        key: {
          type: 'string',
          description: 'Unique ID of the menu item',
        },
        title: {
          type: 'string',
          description: 'Set display title for collapsed item',
        },
      },
      title: '',
    },
  },
}

export const MenuItemGroupPropsSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: ['React_Menu_ItemGroup'],
    },
    props: {
      type: 'object',
      properties: {
        children: {
          type: 'array',
          title: 'Children of type MenuItem',
          items: {
            type: 'object',
            properties: {
              danger: {
                type: 'boolean',
                description: 'Display the danger style',
              },
              disabled: {
                type: 'boolean',
                description: 'Whether menu item is disabled',
              },
              icon: {
                type: 'string',
                description: 'The icon of the menu item',
              },
              key: {
                type: 'string',
                description: 'Unique ID of the menu item',
              },
              title: {
                type: 'string',
                description: 'Set display title for collapsed item',
              },
            },
          },
        },
        title: {
          type: 'string',
          description: 'The title of the group',
        },
      },
      title: '',
    },
  },
}

export const MenuSubMenuPropsSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: ['React_Menu_SubMenu'],
    },
    props: {
      type: 'object',
      properties: {
        children: {
          type: 'array',
          description: 'Sub-menus or sub-menu items',
          title: 'Children of type MenuItem',
          items: {
            type: 'object',
            properties: {
              danger: {
                type: 'boolean',
                description: 'Display the danger style',
              },
              disabled: {
                type: 'boolean',
                description: 'Whether menu item is disabled',
              },
              icon: {
                type: 'string',
                description: 'The icon of the menu item',
              },
              key: {
                type: 'string',
                description: 'Unique ID of the menu item',
              },
              title: {
                type: 'string',
                description: 'Set display title for collapsed item',
              },
            },
          },
        },
        disabled: {
          type: 'boolean',
          description: 'Whether sub-menu is disabled',
        },
        icon: {
          type: 'string',
          description: 'Icon of sub menu',
        },
        key: {
          type: 'string',
          description: 'Unique ID of the sub-menu',
        },
        popupClassName: {
          type: 'string',
          description: 'Sub-menu class name, not working when mode="inline"',
        },
        popupOffset: {
          type: 'array',
          title: 'Popup offset in the format of number, number',
          items: [
            {
              title: 'A number',
              type: 'number',
              default: 0,
            },
            {
              title: 'A number',
              type: 'number',
              default: 0,
            },
          ],
        },
        title: {
          type: 'string',
          description: 'Title of sub menu',
        },
      },
      title: '',
    },
  },
}

export const PageHeaderPropsSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: ['React_PageHeader'],
    },
    props: {
      type: 'object',
      properties: {
        avatar: {
          type: 'object',
          properties: {
            alt: {
              type: 'string',
              description:
                'This attribute defines the alternative text describing the image',
            },
            gap: {
              type: 'number',
              description:
                'Letter type unit distance between left and right sides',
            },
            icon: {
              type: 'string',
              description: 'Custom icon type for an icon avatar',
            },
            shape: {
              type: 'string',
              description: 'The shape of avatar',
              enum: ['circle', 'square'],
              default: 'circle',
            },
            size: {
              type: 'object',
              properties: {
                size: {
                  type: 'string',
                  enum: ['large', 'small', 'default'],
                },
                xxl: {
                  type: 'string',
                  enum: ['xxl'],
                },
                xl: {
                  type: 'string',
                  enum: ['xl'],
                },
                lg: {
                  type: 'string',
                  enum: ['lg'],
                },
                md: {
                  type: 'string',
                  enum: ['md'],
                },
                sm: {
                  type: 'string',
                  enum: ['sm'],
                },
                xs: {
                  type: 'string',
                  enum: ['xs'],
                },
              },
              description: 'The size of the avatar',
              title: 'Avatar Size',
            },
            src: {
              type: 'string',
              description:
                'The address of the image for an image avatar or image element',
            },
            srcSet: {
              type: 'string',
              description:
                'A list of sources to use for different screen resolutions',
            },
          },
          description: 'Avatar next to the title bar',
          title: 'Avatar Props',
        },
        backIcon: {
          type: 'string',
          description:
            'Custom back icon, if false the back icon will not be displayed',
        },
        breadcrumb: {
          type: 'object',
          properties: {
            params: {
              type: 'string',
              description: 'Routing parameters',
            },
            routes: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  path: {
                    type: 'string',
                    minLength: 1,
                  },
                  breadcrumbName: {
                    type: 'string',
                    minLength: 1,
                  },
                  children: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        path: {
                          type: 'string',
                          minLength: 1,
                        },
                        breadcrumbName: {
                          type: 'string',
                          minLength: 1,
                        },
                      },
                      required: ['path', 'breadcrumbName'],
                    },
                  },
                },
                required: ['path', 'breadcrumbName'],
              },
              description: 'The routing stack information of router',
            },
            separator: {
              type: 'string',
              description: 'Custom separator',
            },
          },
          description: 'Breadcrumb configuration',
          title: 'Breadcrumb props',
        },
        extra: {
          type: 'string',
          description:
            'Operating area, at the end of the line of the title line',
        },
        footer: {
          type: 'string',
          description: "PageHeader's footer, generally used to render TabBar",
        },
        ghost: {
          type: 'boolean',
          description: 'PageHeader type, will change background color',
        },
        subTitle: {
          type: 'string',
          description: 'Custom subtitle text',
        },
        tags: {
          type: 'array',
          description: 'Tag list next to title',
          items: {
            type: 'object',
            properties: {
              closable: {
                type: 'boolean',
                description: 'Whether the Tag can be closed',
              },
              closeIcon: {
                type: 'string',
                description: 'Custom close icon',
              },
              color: {
                type: 'string',
                description: 'Color of the Tag',
              },
              icon: {
                type: 'string',
                description: 'Set the icon of tag',
              },
              visible: {
                type: 'boolean',
                description: 'Whether the Tag is closed or not',
              },
            },
          },
        },
        title: {
          type: 'string',
          description: 'Custom title text',
        },
      },
      title: '',
    },
  },
}

export const PaginationPropsSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: ['React_Pagination'],
    },
    props: {
      type: 'object',
      properties: {
        current: {
          type: 'number',
          description: 'Current page number',
        },
        defaultCurrent: {
          type: 'number',
          description: 'Default initial page number',
          default: 1,
        },
        defaultPageSize: {
          type: 'number',
          description: 'Default number of data items per page',
          default: 10,
        },
        disabled: {
          type: 'boolean',
          description: 'Disable pagination',
        },
        hideOnSinglePage: {
          type: 'boolean',
          description: 'Whether to hide pager on single page',
        },
        pageSize: {
          type: 'number',
          description: 'Number of data items per page',
        },
        pageSizeOptions: {
          type: 'array',
          items: {
            default: ['10', '20', '50', '100'],
            type: 'string',
          },
          description: 'Specify the sizeChanger options',
        },
        responsive: {
          type: 'boolean',
          description:
            'If size is not specified, Pagination would resize according to the width of the window',
        },
        showLessItems: {
          type: 'boolean',
          description: 'Show less page items',
        },
        showQuickJumper: {
          type: 'boolean',
          description: 'Determine whether you can jump to pages directly',
        },
        showSizeChanger: {
          type: 'boolean',
          description:
            'Determine whether to show pageSize select, it will be true when total > 50',
        },
        showTitle: {
          type: 'boolean',
          description: "Show page item's title",
        },
        simple: {
          type: 'boolean',
          description: 'Whether to use simple mode',
        },
        size: {
          type: 'string',
          description: 'Specify the size of Pagination, can be set to small',
          enum: ['default', 'small'],
          default: 'default',
        },
        total: {
          type: 'number',
          description: 'Total number of data items',
          default: 0,
        },
      },
      title: '',
      dependencies: {
        showQuickJumper: {
          oneOf: [
            {
              type: 'object',
              properties: {
                showQuickJumper: {
                  enum: [false],
                },
              },
            },
            {
              type: 'object',
              properties: {
                showQuickJumper: {
                  enum: [true],
                },
                goButton: {
                  type: 'string',
                },
              },
            },
          ],
        },
      },
    },
  },
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
      type: 'string',
      enum: ['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne'],
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
          type: 'string',
          enum: ['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne'],
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

export const SpacePropsSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: ['React_Space'],
    },
    props: {
      type: 'object',
      properties: {
        align: {
          type: 'string',
          description: 'Align items',
          enum: ['start', 'end', 'center', 'baseline'],
        },
        direction: {
          type: 'string',
          description: 'The space direction',
          enum: ['horizontal', 'vertical'],
          default: 'horizontal',
        },
        size: {
          type: 'string',
          description: 'The space size',
        },
        split: {
          type: 'string',
          description: 'Set split',
        },
        wrap: {
          type: 'boolean',
          description: 'Auto wrap line, when horizontal effective',
        },
      },
      title: '',
    },
  },
}

export const StepsPropsSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: ['React_Steps'],
    },
    props: {
      type: 'object',
      properties: {
        className: {
          type: 'string',
          description: 'Additional class to Steps',
        },
        current: {
          type: 'number',
          description:
            'To set the current step, counting from 0. You can overwrite this state by using status of Step',
        },
        direction: {
          type: 'string',
          description:
            'To specify the direction of the step bar, horizontal or vertical',
          enum: ['horizontal', 'vertical'],
          default: 'horizontal',
        },
        initial: {
          type: 'number',
          description: 'Set the initial step, counting from 0',
          default: 0,
        },
        labelPlacement: {
          type: 'string',
          description:
            'Place title and description with horizontal or vertical direction',
          enum: ['horizontal', 'vertical'],
          default: 'horizontal',
        },
        percent: {
          type: 'number',
          description:
            'Progress circle percentage of current step in process status (only works on basic Steps)',
        },
        progressDot: {
          type: 'boolean',
          description:
            'Steps with progress dot style, customize the progress dot by setting it to a function. labelPlacement will be vertical',
        },
        responsive: {
          type: 'boolean',
          description:
            'change to vertical direction when screen width smaller than 532px',
        },
        size: {
          type: 'string',
          description:
            'To specify the size of the step bar, default and small are currently supported',
          enum: ['default', 'small'],
          default: 'default',
        },
        status: {
          type: 'string',
          description:
            'To specify the status of current step, can be set to one of the following values: wait process finish error',
          enum: ['wait', 'process', 'finish', 'error'],
          default: 'process',
        },
        type: {
          type: 'string',
          description:
            'Type of steps, can be set to one of the following values: default, navigation',
          enum: ['default', 'navigation'],
          default: 'default',
        },
      },
      title: '',
    },
  },
}

export const StepsStepPropsSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: ['React_Steps_Step'],
    },
    props: {
      type: 'object',
      properties: {
        description: {
          type: 'string',
          description: 'Description of the step, optional property',
        },
        disabled: {
          type: 'boolean',
          description: 'Disable click',
        },
        icon: {
          type: 'string',
          description: 'Icon of the step, optional property',
        },
        status: {
          type: 'string',
          description:
            'To specify the status. It will be automatically set by current of Steps if not configured. Optional values are: wait process finish error',
          enum: ['wait', 'process', 'finish', 'error'],
          default: 'wait',
        },
        subTitle: {
          type: 'string',
          description: 'Subtitle of the step',
        },
        title: {
          type: 'string',
          description: 'Title of the step',
        },
      },
      title: '',
    },
  },
}

export const TagPropsSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    closable: {
      type: 'boolean',
      description: 'Whether the Tag can be closed',
    },
    closeIcon: {
      type: 'string',
      description: 'Custom close icon',
    },
    color: {
      type: 'string',
      description: 'Color of the Tag',
    },
    icon: {
      type: 'string',
      description: 'Set the icon of tag',
    },
    visible: {
      type: 'boolean',
      description: 'Whether the Tag is closed or not',
    },
  },
}
export const TagSelectedPropsSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: ['React_Tag'],
    },
    props: {
      type: 'object',
      properties: {
        closable: {
          type: 'boolean',
          description: 'Whether the Tag can be closed',
        },
        closeIcon: {
          type: 'string',
          description: 'Custom close icon',
        },
        color: {
          type: 'string',
          description: 'Color of the Tag',
        },
        icon: {
          type: 'string',
          description: 'Set the icon of tag',
        },
        visible: {
          type: 'boolean',
          description: 'Whether the Tag is closed or not',
        },
      },
      title: '',
    },
  },
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
  type: 'object',
  properties: {
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
  },
  title: '',
  dependencies: {
    type: {
      oneOf: [
        {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['React_Button'],
            },
            props: {
              type: 'object',
              properties: {
                block: {
                  type: 'boolean',
                  description: 'Option to fit button width to its parent width',
                },
                danger: {
                  type: 'boolean',
                  description: 'Set the danger status of button',
                },
                disabled: {
                  type: 'boolean',
                  description: 'Disabled state of button',
                },
                ghost: {
                  type: 'boolean',
                  description:
                    'Make background transparent and invert text and border colors\t',
                },
                href: {
                  type: 'string',
                  description: 'Redirect url of link button',
                },
                htmlType: {
                  type: 'string',
                  description: 'Set the original html type of button',
                  enum: ['submit', 'button', 'reset'],
                },
                icon: {
                  type: 'string',
                  description: 'Set the icon component of button',
                },
                loading: {
                  type: 'number',
                  description: 'Set the loading status of button',
                },
                shape: {
                  type: 'string',
                  description: 'Can be set button shape',
                  enum: ['circle', 'round'],
                },
                size: {
                  type: 'string',
                  description: 'Set the size of button',
                  default: 'middle',
                  enum: ['small', 'middle', 'large'],
                },
                target: {
                  type: 'string',
                  description:
                    'Same as target attribute of a, works when href is specified',
                },
                type: {
                  type: 'string',
                  description:
                    'Can be set to primary ghost dashed link text default',
                  enum: [
                    'default',
                    'primary',
                    'ghost',
                    'dashed',
                    'link',
                    'text',
                  ],
                },
              },
              title: '',
            },
          },
        },
        {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['React_Card'],
            },
            props: {
              type: 'object',
              properties: {
                actions: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                  description:
                    'The action list, shows at the bottom of the Card',
                },
                activeTabKey: {
                  type: 'string',
                  description: "Current TabPane's key",
                },
                bodyStyle: {
                  type: 'string',
                  description: 'Inline style to apply to the card content',
                },
                bordered: {
                  type: 'boolean',
                  description:
                    'Toggles rendering of the border around the card',
                  default: true,
                },
                cover: {
                  type: 'string',
                  description: 'Card cover',
                },
                defaultActiveTabKey: {
                  type: 'string',
                  description:
                    "Initial active TabPane's key, if activeTabKey is not set",
                },
                extra: {
                  type: 'string',
                  description:
                    'Content to render in the top-right corner of the card',
                },
                headStyle: {
                  type: 'string',
                  description: 'Inline style to apply to the card head',
                },
                hoverable: {
                  type: 'boolean',
                  description: 'Lift up when hovering card',
                },
                loading: {
                  type: 'boolean',
                  description:
                    'Shows a loading indicator while the contents of the card are being fetched',
                },
                size: {
                  type: 'string',
                  description: 'Size of card',
                  enum: ['default', 'small'],
                  default: 'default',
                },
                tabBarExtraContent: {
                  type: 'string',
                  description: 'Extra content in tab bar',
                },
                tabList: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      key: {
                        type: 'string',
                        minLength: 1,
                      },
                      tab: {
                        type: 'string',
                      },
                      disabled: {
                        type: 'boolean',
                      },
                    },
                    required: ['key', 'tab'],
                  },
                  description: "List of TabPane's head",
                },
                title: {
                  type: 'string',
                  description: 'Card title',
                },
                type: {
                  type: 'string',
                  description:
                    'Card style type, can be set to inner or not set',
                  enum: ['inner'],
                },
              },
              title: '',
            },
          },
        },
        {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['React_Card_Grid'],
            },
            props: {
              type: 'object',
              properties: {
                className: {
                  type: 'string',
                  description: 'The className of container',
                },
                hoverable: {
                  type: 'boolean',
                  description: 'Lift up when hovering card grid',
                },
                style: {
                  type: 'string',
                  description: 'The style object of container',
                },
              },
              title: '',
            },
          },
        },
        {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['React_Card_Meta'],
            },
            props: {
              type: 'object',
              properties: {
                avatar: {
                  type: 'string',
                  description: 'Avatar or icon',
                },
                className: {
                  type: 'string',
                  description: 'The className of container',
                },
                description: {
                  type: 'string',
                  description: 'Description content',
                },
                style: {
                  type: 'string',
                  description: 'The style object of container',
                },
                title: {
                  type: 'string',
                  description: 'Title content',
                },
              },
              title: '',
            },
          },
        },
        {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['React_Icon'],
            },
            props: {
              type: 'object',
              properties: {
                className: {
                  type: 'string',
                  description: 'The className of Icon',
                },
                rotate: {
                  type: 'string',
                  description: 'Rotate by n degrees (not working in IE9)',
                },
                spin: {
                  type: 'boolean',
                  description: 'Rotate icon with animation',
                },
                style: {
                  type: 'string',
                  description:
                    'The style properties of icon, like fontSize and color',
                },
                twoToneColor: {
                  type: 'string',
                  description:
                    'Only supports the two-tone icon. Specify the primary color',
                },
              },
              title: '',
            },
          },
        },
        {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['React_Divider'],
            },
            props: {
              type: 'object',
              properties: {
                className: {
                  type: 'string',
                  description: 'The className of container',
                },
                dashed: {
                  type: 'boolean',
                  description: 'Whether line is dashed',
                },
                orientation: {
                  type: 'string',
                  description: 'The position of title inside divider',
                  enum: ['left', 'right', 'center'],
                  default: 'center',
                },
                plain: {
                  type: 'boolean',
                  description: 'Divider text show as plain style',
                },
                style: {
                  type: 'string',
                  description: 'The style object of container',
                },
                type: {
                  type: 'string',
                  description: 'The direction type of divider',
                  enum: ['horizontal', 'vertical'],
                  default: 'horizontal',
                },
              },
              title: '',
            },
          },
        },
        {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: [
                'React_Layout',
                'React_Layout_Header',
                'React_Layout_Footer',
                'React_Layout_Content',
              ],
            },
            props: {
              type: 'object',
              properties: {
                className: {
                  type: 'string',
                  description: 'Container className',
                },
                hasSider: {
                  type: 'boolean',
                  description:
                    "Whether contain Sider in children, don't have to assign it normally. Useful in ssr avoid style flickering\t",
                },
                style: {
                  type: 'string',
                  description: 'To customize the styles',
                },
              },
              title: '',
            },
          },
        },
        {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['React_Layout_Sider'],
            },
            props: {
              type: 'object',
              properties: {
                breakpoint: {
                  type: 'string',
                  description: 'Breakpoints of the responsive layout',
                  enum: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
                },
                className: {
                  type: 'string',
                  description: 'Container className',
                },
                collapsed: {
                  type: 'boolean',
                  description: 'To set the current status',
                },
                collapsedWidth: {
                  type: 'number',
                  description:
                    'Width of the collapsed sidebar, by setting to 0 a special trigger will appear',
                  default: 80,
                },
                collapsible: {
                  type: 'boolean',
                  description: 'Whether can be collapsed',
                },
                defaultCollapsed: {
                  type: 'boolean',
                  description: 'To set the initial status',
                },
                reverseArrow: {
                  type: 'boolean',
                  description:
                    'Reverse direction of arrow, for a sider that expands from the right',
                },
                style: {
                  type: 'string',
                  description: 'To customize the styles',
                },
                theme: {
                  type: 'string',
                  description: 'Color theme of the sidebar',
                  enum: ['light', 'dark'],
                  default: 'dark',
                },
                trigger: {
                  type: 'string',
                  description:
                    'Specify the customized trigger, set to null to hide the trigger',
                },
                width: {
                  type: 'string',
                  description: 'Width of the sidebar',
                  default: 200,
                },
                zeroWidthTriggerStyle: {
                  type: 'string',
                  description:
                    'To customize the styles of the special trigger that appears when collapsedWidth is 0',
                },
              },
              title: '',
            },
          },
        },
        {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['React_Space'],
            },
            props: {
              type: 'object',
              properties: {
                align: {
                  type: 'string',
                  description: 'Align items',
                  enum: ['start', 'end', 'center', 'baseline'],
                },
                direction: {
                  type: 'string',
                  description: 'The space direction',
                  enum: ['horizontal', 'vertical'],
                  default: 'horizontal',
                },
                size: {
                  type: 'string',
                  description: 'The space size',
                },
                split: {
                  type: 'string',
                  description: 'Set split',
                },
                wrap: {
                  type: 'boolean',
                  description: 'Auto wrap line, when horizontal effective',
                },
              },
              title: '',
            },
          },
        },
        {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['React_Affix'],
            },
            props: {
              type: 'object',
              properties: {
                offsetBottom: {
                  type: 'string',
                  description:
                    'Offset from the bottom of the viewport (in pixels)',
                },
                offsetTop: {
                  type: 'string',
                  description:
                    'Offset from the top of the viewport (in pixels)',
                  default: 0,
                },
              },
              title: '',
            },
          },
        },
        {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['React_Breadcrumb'],
            },
            props: {
              type: 'object',
              properties: {
                params: {
                  type: 'string',
                  description: 'Routing parameters',
                },
                routes: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      path: {
                        type: 'string',
                        minLength: 1,
                      },
                      breadcrumbName: {
                        type: 'string',
                        minLength: 1,
                      },
                      children: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            path: {
                              type: 'string',
                              minLength: 1,
                            },
                            breadcrumbName: {
                              type: 'string',
                              minLength: 1,
                            },
                          },
                          required: ['path', 'breadcrumbName'],
                        },
                      },
                    },
                    required: ['path', 'breadcrumbName'],
                  },
                  description: 'The routing stack information of router',
                },
                separator: {
                  type: 'string',
                  description: 'Custom separator',
                },
              },
              title: '',
            },
          },
        },
        {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['React_Breadcrumb_Item'],
            },
            props: {
              type: 'object',
              properties: {
                className: {
                  type: 'string',
                  description: 'The additional css class',
                },
                dropdownProps: {
                  type: 'object',
                  properties: {
                    arrow: {
                      type: 'boolean',
                      description:
                        'Whether the dropdown arrow should be visible',
                      default: false,
                    },
                    disabled: {
                      type: 'boolean',
                      description: 'Whether the dropdown menu is disabled',
                    },
                    overlay: {
                      type: 'object',
                      properties: {
                        defaultOpenKeys: {
                          type: 'array',
                          items: {
                            type: 'string',
                          },
                          description:
                            'Array with the keys of default opened sub menus',
                        },
                        defaultSelectedKeys: {
                          type: 'array',
                          items: {
                            type: 'string',
                          },
                          description:
                            'Array with the keys of default selected menu items',
                        },
                        expandIcon: {
                          type: 'string',
                          description: 'custom expand icon of submenu',
                        },
                        forceSubMenuRender: {
                          type: 'boolean',
                          description:
                            'Render submenu into DOM before it becomes visible',
                        },
                        inlineCollapsed: {
                          type: 'boolean',
                          description:
                            'Specifies the collapsed status when menu is inline mode',
                        },
                        inlineIndent: {
                          type: 'number',
                          description:
                            'Indent (in pixels) of inline menu items on each level',
                          default: 24,
                        },
                        mode: {
                          type: 'string',
                          description: 'Type of menu',
                          enum: [
                            'horizontal',
                            'vertical',
                            'vertical-left',
                            'vertical-right',
                            'inline',
                          ],
                          default: 'vertical',
                        },
                        multiple: {
                          type: 'boolean',
                          description: 'Allows selection of multiple items',
                        },
                        openKeys: {
                          type: 'array',
                          items: {
                            type: 'string',
                          },
                          description:
                            'Array with the keys of currently opened sub-menus',
                        },
                        overflowedIndicator: {
                          type: 'string',
                          description: 'Customized icon when menu is collapsed',
                        },
                        selectable: {
                          type: 'boolean',
                          description: 'Allows selecting menu items',
                        },
                        selectedKeys: {
                          type: 'array',
                          items: {
                            type: 'string',
                          },
                          description:
                            'Array with the keys of currently selected menu items',
                        },
                        style: {
                          type: 'string',
                          description: 'Style of the root node',
                        },
                        subMenuCloseDelay: {
                          type: 'number',
                          description:
                            'Delay time to hide submenu when mouse leaves (in seconds)',
                          default: 0.1,
                        },
                        subMenuOpenDelay: {
                          type: 'number',
                          description:
                            'Delay time to show submenu when mouse enters, (in seconds)',
                          default: 0,
                        },
                        theme: {
                          type: 'string',
                          description: 'Color theme of the menu',
                          enum: ['light', 'dark'],
                          default: 'light',
                        },
                        triggerSubMenuAction: {
                          type: 'string',
                          description:
                            'Which action can trigger submenu open/close',
                          enum: ['hover', 'click'],
                          default: 'hover',
                        },
                      },
                      description: 'The dropdown menu',
                    },
                    overlayClassName: {
                      type: 'string',
                      description:
                        'The class name of the dropdown root element',
                    },
                    overlayStyle: {
                      type: 'string',
                      description: 'The style of the dropdown root element',
                    },
                    placement: {
                      type: 'string',
                      description: 'Placement of popup menu',
                      enum: [
                        'topLeft',
                        'topCenter',
                        'topRight',
                        'bottomLeft',
                        'bottomCenter',
                        'bottomRight',
                      ],
                      default: 'bottomLeft',
                    },
                    trigger: {
                      type: 'array',
                      items: {
                        type: 'string',
                        enum: ['click', 'hover', 'contextMenu'],
                      },
                      description:
                        "The trigger mode which executes the dropdown action. Note that hover can't be used on touchscreens",
                      title: 'Trigger',
                      uniqueItems: true,
                      maxItems: 3,
                      default: ['hover'],
                    },
                    visible: {
                      type: 'boolean',
                      description:
                        'Whether the dropdown menu is currently visible',
                    },
                  },
                  description: 'The dropdown props',
                  title: 'Dropdown Props',
                },
                href: {
                  type: 'string',
                  description: 'Target of hyperlink',
                },
                overlay: {
                  type: 'object',
                  properties: {
                    defaultOpenKeys: {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                      description:
                        'Array with the keys of default opened sub menus',
                    },
                    defaultSelectedKeys: {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                      description:
                        'Array with the keys of default selected menu items',
                    },
                    expandIcon: {
                      type: 'string',
                      description: 'custom expand icon of submenu',
                    },
                    forceSubMenuRender: {
                      type: 'boolean',
                      description:
                        'Render submenu into DOM before it becomes visible',
                    },
                    inlineCollapsed: {
                      type: 'boolean',
                      description:
                        'Specifies the collapsed status when menu is inline mode',
                    },
                    inlineIndent: {
                      type: 'number',
                      description:
                        'Indent (in pixels) of inline menu items on each level',
                      default: 24,
                    },
                    mode: {
                      type: 'string',
                      description: 'Type of menu',
                      enum: [
                        'horizontal',
                        'vertical',
                        'vertical-left',
                        'vertical-right',
                        'inline',
                      ],
                      default: 'vertical',
                    },
                    multiple: {
                      type: 'boolean',
                      description: 'Allows selection of multiple items',
                    },
                    openKeys: {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                      description:
                        'Array with the keys of currently opened sub-menus',
                    },
                    overflowedIndicator: {
                      type: 'string',
                      description: 'Customized icon when menu is collapsed',
                    },
                    selectable: {
                      type: 'boolean',
                      description: 'Allows selecting menu items',
                    },
                    selectedKeys: {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                      description:
                        'Array with the keys of currently selected menu items',
                    },
                    style: {
                      type: 'string',
                      description: 'Style of the root node',
                    },
                    subMenuCloseDelay: {
                      type: 'number',
                      description:
                        'Delay time to hide submenu when mouse leaves (in seconds)',
                      default: 0.1,
                    },
                    subMenuOpenDelay: {
                      type: 'number',
                      description:
                        'Delay time to show submenu when mouse enters, (in seconds)',
                      default: 0,
                    },
                    theme: {
                      type: 'string',
                      description: 'Color theme of the menu',
                      enum: ['light', 'dark'],
                      default: 'light',
                    },
                    triggerSubMenuAction: {
                      type: 'string',
                      description:
                        'Which action can trigger submenu open/close',
                      enum: ['hover', 'click'],
                      default: 'hover',
                    },
                  },
                  description: 'The dropdown menu',
                  title: 'Menu Props',
                },
              },
              title: '',
            },
          },
        },
        {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['React_Dropdown'],
            },
            props: {
              type: 'object',
              properties: {
                arrow: {
                  type: 'boolean',
                  description: 'Whether the dropdown arrow should be visible',
                  default: false,
                },
                disabled: {
                  type: 'boolean',
                  description: 'Whether the dropdown menu is disabled',
                },
                overlay: {
                  type: 'object',
                  properties: {
                    defaultOpenKeys: {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                      description:
                        'Array with the keys of default opened sub menus',
                    },
                    defaultSelectedKeys: {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                      description:
                        'Array with the keys of default selected menu items',
                    },
                    expandIcon: {
                      type: 'string',
                      description: 'custom expand icon of submenu',
                    },
                    forceSubMenuRender: {
                      type: 'boolean',
                      description:
                        'Render submenu into DOM before it becomes visible',
                    },
                    inlineCollapsed: {
                      type: 'boolean',
                      description:
                        'Specifies the collapsed status when menu is inline mode',
                    },
                    inlineIndent: {
                      type: 'number',
                      description:
                        'Indent (in pixels) of inline menu items on each level',
                      default: 24,
                    },
                    mode: {
                      type: 'string',
                      description: 'Type of menu',
                      enum: [
                        'horizontal',
                        'vertical',
                        'vertical-left',
                        'vertical-right',
                        'inline',
                      ],
                      default: 'vertical',
                    },
                    multiple: {
                      type: 'boolean',
                      description: 'Allows selection of multiple items',
                    },
                    openKeys: {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                      description:
                        'Array with the keys of currently opened sub-menus',
                    },
                    overflowedIndicator: {
                      type: 'string',
                      description: 'Customized icon when menu is collapsed',
                    },
                    selectable: {
                      type: 'boolean',
                      description: 'Allows selecting menu items',
                    },
                    selectedKeys: {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                      description:
                        'Array with the keys of currently selected menu items',
                    },
                    style: {
                      type: 'string',
                      description: 'Style of the root node',
                    },
                    subMenuCloseDelay: {
                      type: 'number',
                      description:
                        'Delay time to hide submenu when mouse leaves (in seconds)',
                      default: 0.1,
                    },
                    subMenuOpenDelay: {
                      type: 'number',
                      description:
                        'Delay time to show submenu when mouse enters, (in seconds)',
                      default: 0,
                    },
                    theme: {
                      type: 'string',
                      description: 'Color theme of the menu',
                      enum: ['light', 'dark'],
                      default: 'light',
                    },
                    triggerSubMenuAction: {
                      type: 'string',
                      description:
                        'Which action can trigger submenu open/close',
                      enum: ['hover', 'click'],
                      default: 'hover',
                    },
                  },
                  description: 'The dropdown menu',
                },
                overlayClassName: {
                  type: 'string',
                  description: 'The class name of the dropdown root element',
                },
                overlayStyle: {
                  type: 'string',
                  description: 'The style of the dropdown root element',
                },
                placement: {
                  type: 'string',
                  description: 'Placement of popup menu',
                  enum: [
                    'topLeft',
                    'topCenter',
                    'topRight',
                    'bottomLeft',
                    'bottomCenter',
                    'bottomRight',
                  ],
                  default: 'bottomLeft',
                },
                trigger: {
                  type: 'array',
                  items: {
                    type: 'string',
                    enum: ['click', 'hover', 'contextMenu'],
                  },
                  description:
                    "The trigger mode which executes the dropdown action. Note that hover can't be used on touchscreens",
                  title: 'Trigger',
                  uniqueItems: true,
                  maxItems: 3,
                  default: ['hover'],
                },
                visible: {
                  type: 'boolean',
                  description: 'Whether the dropdown menu is currently visible',
                },
              },
              title: '',
            },
          },
        },
        {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['React_Menu'],
            },
            props: {
              type: 'object',
              properties: {
                defaultOpenKeys: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                  description:
                    'Array with the keys of default opened sub menus',
                },
                defaultSelectedKeys: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                  description:
                    'Array with the keys of default selected menu items',
                },
                expandIcon: {
                  type: 'string',
                  description: 'custom expand icon of submenu',
                },
                forceSubMenuRender: {
                  type: 'boolean',
                  description:
                    'Render submenu into DOM before it becomes visible',
                },
                inlineCollapsed: {
                  type: 'boolean',
                  description:
                    'Specifies the collapsed status when menu is inline mode',
                },
                inlineIndent: {
                  type: 'number',
                  description:
                    'Indent (in pixels) of inline menu items on each level',
                  default: 24,
                },
                mode: {
                  type: 'string',
                  description: 'Type of menu',
                  enum: [
                    'horizontal',
                    'vertical',
                    'vertical-left',
                    'vertical-right',
                    'inline',
                  ],
                  default: 'vertical',
                },
                multiple: {
                  type: 'boolean',
                  description: 'Allows selection of multiple items',
                },
                openKeys: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                  description:
                    'Array with the keys of currently opened sub-menus',
                },
                overflowedIndicator: {
                  type: 'string',
                  description: 'Customized icon when menu is collapsed',
                },
                selectable: {
                  type: 'boolean',
                  description: 'Allows selecting menu items',
                },
                selectedKeys: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                  description:
                    'Array with the keys of currently selected menu items',
                },
                style: {
                  type: 'string',
                  description: 'Style of the root node',
                },
                subMenuCloseDelay: {
                  type: 'number',
                  description:
                    'Delay time to hide submenu when mouse leaves (in seconds)',
                  default: 0.1,
                },
                subMenuOpenDelay: {
                  type: 'number',
                  description:
                    'Delay time to show submenu when mouse enters, (in seconds)',
                  default: 0,
                },
                theme: {
                  type: 'string',
                  description: 'Color theme of the menu',
                  enum: ['light', 'dark'],
                  default: 'light',
                },
                triggerSubMenuAction: {
                  type: 'string',
                  description: 'Which action can trigger submenu open/close',
                  enum: ['hover', 'click'],
                  default: 'hover',
                },
              },
              title: '',
            },
          },
        },
        {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['React_Menu_Item'],
            },
            props: {
              type: 'object',
              properties: {
                danger: {
                  type: 'boolean',
                  description: 'Display the danger style',
                },
                disabled: {
                  type: 'boolean',
                  description: 'Whether menu item is disabled',
                },
                icon: {
                  type: 'string',
                  description: 'The icon of the menu item',
                },
                key: {
                  type: 'string',
                  description: 'Unique ID of the menu item',
                },
                title: {
                  type: 'string',
                  description: 'Set display title for collapsed item',
                },
              },
              title: '',
            },
          },
        },
        {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['React_Menu_SubMenu'],
            },
            props: {
              type: 'object',
              properties: {
                children: {
                  type: 'array',
                  description: 'Sub-menus or sub-menu items',
                  title: 'Children of type MenuItem',
                  items: {
                    type: 'object',
                    properties: {
                      danger: {
                        type: 'boolean',
                        description: 'Display the danger style',
                      },
                      disabled: {
                        type: 'boolean',
                        description: 'Whether menu item is disabled',
                      },
                      icon: {
                        type: 'string',
                        description: 'The icon of the menu item',
                      },
                      key: {
                        type: 'string',
                        description: 'Unique ID of the menu item',
                      },
                      title: {
                        type: 'string',
                        description: 'Set display title for collapsed item',
                      },
                    },
                  },
                },
                disabled: {
                  type: 'boolean',
                  description: 'Whether sub-menu is disabled',
                },
                icon: {
                  type: 'string',
                  description: 'Icon of sub menu',
                },
                key: {
                  type: 'string',
                  description: 'Unique ID of the sub-menu',
                },
                popupClassName: {
                  type: 'string',
                  description:
                    'Sub-menu class name, not working when mode="inline"',
                },
                popupOffset: {
                  type: 'array',
                  title: 'Popup offset in the format of number, number',
                  items: [
                    {
                      title: 'A number',
                      type: 'number',
                      default: 0,
                    },
                    {
                      title: 'A number',
                      type: 'number',
                      default: 0,
                    },
                  ],
                },
                title: {
                  type: 'string',
                  description: 'Title of sub menu',
                },
              },
              title: '',
            },
          },
        },
        {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['React_Menu_ItemGroup'],
            },
            props: {
              type: 'object',
              properties: {
                children: {
                  type: 'array',
                  title: 'Children of type MenuItem',
                  items: {
                    type: 'object',
                    properties: {
                      danger: {
                        type: 'boolean',
                        description: 'Display the danger style',
                      },
                      disabled: {
                        type: 'boolean',
                        description: 'Whether menu item is disabled',
                      },
                      icon: {
                        type: 'string',
                        description: 'The icon of the menu item',
                      },
                      key: {
                        type: 'string',
                        description: 'Unique ID of the menu item',
                      },
                      title: {
                        type: 'string',
                        description: 'Set display title for collapsed item',
                      },
                    },
                  },
                },
                title: {
                  type: 'string',
                  description: 'The title of the group',
                },
              },
              title: '',
            },
          },
        },
        {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['React_PageHeader'],
            },
            props: {
              type: 'object',
              properties: {
                avatar: {
                  type: 'object',
                  properties: {
                    alt: {
                      type: 'string',
                      description:
                        'This attribute defines the alternative text describing the image',
                    },
                    gap: {
                      type: 'number',
                      description:
                        'Letter type unit distance between left and right sides',
                    },
                    icon: {
                      type: 'string',
                      description: 'Custom icon type for an icon avatar',
                    },
                    shape: {
                      type: 'string',
                      description: 'The shape of avatar',
                      enum: ['circle', 'square'],
                      default: 'circle',
                    },
                    size: {
                      type: 'object',
                      properties: {
                        size: {
                          type: 'string',
                          enum: ['large', 'small', 'default'],
                        },
                        xxl: {
                          type: 'string',
                          enum: ['xxl'],
                        },
                        xl: {
                          type: 'string',
                          enum: ['xl'],
                        },
                        lg: {
                          type: 'string',
                          enum: ['lg'],
                        },
                        md: {
                          type: 'string',
                          enum: ['md'],
                        },
                        sm: {
                          type: 'string',
                          enum: ['sm'],
                        },
                        xs: {
                          type: 'string',
                          enum: ['xs'],
                        },
                      },
                      description: 'The size of the avatar',
                      title: 'Avatar Size',
                    },
                    src: {
                      type: 'string',
                      description:
                        'The address of the image for an image avatar or image element',
                    },
                    srcSet: {
                      type: 'string',
                      description:
                        'A list of sources to use for different screen resolutions',
                    },
                  },
                  description: 'Avatar next to the title bar',
                  title: 'Avatar Props',
                },
                backIcon: {
                  type: 'string',
                  description:
                    'Custom back icon, if false the back icon will not be displayed',
                },
                breadcrumb: {
                  type: 'object',
                  properties: {
                    params: {
                      type: 'string',
                      description: 'Routing parameters',
                    },
                    routes: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          path: {
                            type: 'string',
                            minLength: 1,
                          },
                          breadcrumbName: {
                            type: 'string',
                            minLength: 1,
                          },
                          children: {
                            type: 'array',
                            items: {
                              type: 'object',
                              properties: {
                                path: {
                                  type: 'string',
                                  minLength: 1,
                                },
                                breadcrumbName: {
                                  type: 'string',
                                  minLength: 1,
                                },
                              },
                              required: ['path', 'breadcrumbName'],
                            },
                          },
                        },
                        required: ['path', 'breadcrumbName'],
                      },
                      description: 'The routing stack information of router',
                    },
                    separator: {
                      type: 'string',
                      description: 'Custom separator',
                    },
                  },
                  description: 'Breadcrumb configuration',
                  title: 'Breadcrumb props',
                },
                extra: {
                  type: 'string',
                  description:
                    'Operating area, at the end of the line of the title line',
                },
                footer: {
                  type: 'string',
                  description:
                    "PageHeader's footer, generally used to render TabBar",
                },
                ghost: {
                  type: 'boolean',
                  description: 'PageHeader type, will change background color',
                },
                subTitle: {
                  type: 'string',
                  description: 'Custom subtitle text',
                },
                tags: {
                  type: 'array',
                  description: 'Tag list next to title',
                  items: {
                    type: 'object',
                    properties: {
                      closable: {
                        type: 'boolean',
                        description: 'Whether the Tag can be closed',
                      },
                      closeIcon: {
                        type: 'string',
                        description: 'Custom close icon',
                      },
                      color: {
                        type: 'string',
                        description: 'Color of the Tag',
                      },
                      icon: {
                        type: 'string',
                        description: 'Set the icon of tag',
                      },
                      visible: {
                        type: 'boolean',
                        description: 'Whether the Tag is closed or not',
                      },
                    },
                  },
                },
                title: {
                  type: 'string',
                  description: 'Custom title text',
                },
              },
              title: '',
            },
          },
        },
        {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['React_Avatar'],
            },
            props: {
              type: 'object',
              properties: {
                alt: {
                  type: 'string',
                  description:
                    'This attribute defines the alternative text describing the image',
                },
                gap: {
                  type: 'number',
                  description:
                    'Letter type unit distance between left and right sides',
                },
                icon: {
                  type: 'string',
                  description: 'Custom icon type for an icon avatar',
                },
                shape: {
                  type: 'string',
                  description: 'The shape of avatar',
                  enum: ['circle', 'square'],
                  default: 'circle',
                },
                size: {
                  type: 'object',
                  properties: {
                    size: {
                      type: 'string',
                      enum: ['large', 'small', 'default'],
                    },
                    xxl: {
                      type: 'string',
                      enum: ['xxl'],
                    },
                    xl: {
                      type: 'string',
                      enum: ['xl'],
                    },
                    lg: {
                      type: 'string',
                      enum: ['lg'],
                    },
                    md: {
                      type: 'string',
                      enum: ['md'],
                    },
                    sm: {
                      type: 'string',
                      enum: ['sm'],
                    },
                    xs: {
                      type: 'string',
                      enum: ['xs'],
                    },
                  },
                  description: 'The size of the avatar',
                  title: 'Avatar Size',
                },
                src: {
                  type: 'string',
                  description:
                    'The address of the image for an image avatar or image element',
                },
                srcSet: {
                  type: 'string',
                  description:
                    'A list of sources to use for different screen resolutions',
                },
              },
              title: '',
            },
          },
        },
        {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['React_Tag'],
            },
            props: {
              type: 'object',
              properties: {
                closable: {
                  type: 'boolean',
                  description: 'Whether the Tag can be closed',
                },
                closeIcon: {
                  type: 'string',
                  description: 'Custom close icon',
                },
                color: {
                  type: 'string',
                  description: 'Color of the Tag',
                },
                icon: {
                  type: 'string',
                  description: 'Set the icon of tag',
                },
                visible: {
                  type: 'boolean',
                  description: 'Whether the Tag is closed or not',
                },
              },
              title: '',
            },
          },
        },
        {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['React_Pagination'],
            },
            props: {
              type: 'object',
              properties: {
                current: {
                  type: 'number',
                  description: 'Current page number',
                },
                defaultCurrent: {
                  type: 'number',
                  description: 'Default initial page number',
                  default: 1,
                },
                defaultPageSize: {
                  type: 'number',
                  description: 'Default number of data items per page',
                  default: 10,
                },
                disabled: {
                  type: 'boolean',
                  description: 'Disable pagination',
                },
                hideOnSinglePage: {
                  type: 'boolean',
                  description: 'Whether to hide pager on single page',
                },
                pageSize: {
                  type: 'number',
                  description: 'Number of data items per page',
                },
                pageSizeOptions: {
                  type: 'array',
                  items: {
                    default: ['10', '20', '50', '100'],
                    type: 'string',
                  },
                  description: 'Specify the sizeChanger options',
                },
                responsive: {
                  type: 'boolean',
                  description:
                    'If size is not specified, Pagination would resize according to the width of the window',
                },
                showLessItems: {
                  type: 'boolean',
                  description: 'Show less page items',
                },
                showQuickJumper: {
                  type: 'boolean',
                  description:
                    'Determine whether you can jump to pages directly',
                },
                showSizeChanger: {
                  type: 'boolean',
                  description:
                    'Determine whether to show pageSize select, it will be true when total > 50',
                },
                showTitle: {
                  type: 'boolean',
                  description: "Show page item's title",
                },
                simple: {
                  type: 'boolean',
                  description: 'Whether to use simple mode',
                },
                size: {
                  type: 'string',
                  description:
                    'Specify the size of Pagination, can be set to small',
                  enum: ['default', 'small'],
                  default: 'default',
                },
                total: {
                  type: 'number',
                  description: 'Total number of data items',
                  default: 0,
                },
              },
              title: '',
              dependencies: {
                showQuickJumper: {
                  oneOf: [
                    {
                      type: 'object',
                      properties: {
                        showQuickJumper: {
                          enum: [false],
                        },
                      },
                    },
                    {
                      type: 'object',
                      properties: {
                        showQuickJumper: {
                          enum: [true],
                        },
                        goButton: {
                          type: 'string',
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['React_Steps'],
            },
            props: {
              type: 'object',
              properties: {
                className: {
                  type: 'string',
                  description: 'Additional class to Steps',
                },
                current: {
                  type: 'number',
                  description:
                    'To set the current step, counting from 0. You can overwrite this state by using status of Step',
                },
                direction: {
                  type: 'string',
                  description:
                    'To specify the direction of the step bar, horizontal or vertical',
                  enum: ['horizontal', 'vertical'],
                  default: 'horizontal',
                },
                initial: {
                  type: 'number',
                  description: 'Set the initial step, counting from 0',
                  default: 0,
                },
                labelPlacement: {
                  type: 'string',
                  description:
                    'Place title and description with horizontal or vertical direction',
                  enum: ['horizontal', 'vertical'],
                  default: 'horizontal',
                },
                percent: {
                  type: 'number',
                  description:
                    'Progress circle percentage of current step in process status (only works on basic Steps)',
                },
                progressDot: {
                  type: 'boolean',
                  description:
                    'Steps with progress dot style, customize the progress dot by setting it to a function. labelPlacement will be vertical',
                },
                responsive: {
                  type: 'boolean',
                  description:
                    'change to vertical direction when screen width smaller than 532px',
                },
                size: {
                  type: 'string',
                  description:
                    'To specify the size of the step bar, default and small are currently supported',
                  enum: ['default', 'small'],
                  default: 'default',
                },
                status: {
                  type: 'string',
                  description:
                    'To specify the status of current step, can be set to one of the following values: wait process finish error',
                  enum: ['wait', 'process', 'finish', 'error'],
                  default: 'process',
                },
                type: {
                  type: 'string',
                  description:
                    'Type of steps, can be set to one of the following values: default, navigation',
                  enum: ['default', 'navigation'],
                  default: 'default',
                },
              },
              title: '',
            },
          },
        },
        {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['React_Steps_Step'],
            },
            props: {
              type: 'object',
              properties: {
                description: {
                  type: 'string',
                  description: 'Description of the step, optional property',
                },
                disabled: {
                  type: 'boolean',
                  description: 'Disable click',
                },
                icon: {
                  type: 'string',
                  description: 'Icon of the step, optional property',
                },
                status: {
                  type: 'string',
                  description:
                    'To specify the status. It will be automatically set by current of Steps if not configured. Optional values are: wait process finish error',
                  enum: ['wait', 'process', 'finish', 'error'],
                  default: 'wait',
                },
                subTitle: {
                  type: 'string',
                  description: 'Subtitle of the step',
                },
                title: {
                  type: 'string',
                  description: 'Title of the step',
                },
              },
              title: '',
            },
          },
        },
        {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['React_AutoComplete'],
            },
            props: {
              type: 'object',
              properties: {
                allowClear: {
                  type: 'boolean',
                  description: 'Show clear button',
                },
                autoFocus: {
                  type: 'boolean',
                  description: 'If get focus when component mounted',
                },
                backfill: {
                  type: 'boolean',
                  description:
                    'If backfill selected item the input when using keyboard',
                },
                childrenInputElement: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                  description: 'Customize input element',
                },
                childrenDataSource: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                  description: 'Data source to auto complete',
                },
                defaultActiveFirstOption: {
                  type: 'boolean',
                  description: 'Whether active first option by default',
                  default: true,
                },
                defaultOpen: {
                  type: 'boolean',
                  description: 'Initial open state of dropdown',
                },
                defaultValue: {
                  type: 'string',
                  description: 'Initial selected option',
                },
                disabled: {
                  type: 'boolean',
                  description: 'Whether disabled select',
                },
                dropdownClassName: {
                  type: 'string',
                  description: 'The className of dropdown menu',
                },
                dropdownMatchSelectWidth: {
                  type: 'number',
                  description:
                    'Determine whether the dropdown menu and the select input are the same width. Default set min-width same as input. Will ignore when value less than select width. false will disable virtual scroll\t',
                },
                filterOption: {
                  type: 'boolean',
                  description:
                    'If true, filter options by input, if function, filter options against it. The function will receive two arguments, inputValue and option, if the function returns true, the option will be included in the filtered set; Otherwise, it will be excluded\t',
                },
                notFoundContent: {
                  type: 'string',
                  description: 'Specify content to show when no result matches',
                  default: 'Not Found',
                },
                open: {
                  type: 'boolean',
                  description: 'Controlled open state of dropdown',
                },
                options: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      label: {
                        type: 'string',
                        title: 'Label',
                      },
                      value: {
                        type: 'string',
                        title: 'Value',
                      },
                    },
                  },
                  description:
                    'Select options. Will get better perf than jsx definition',
                },
                placeholder: {
                  type: 'string',
                  description: 'The placeholder of input',
                },
                value: {
                  type: 'string',
                  description: 'Selected option',
                },
                onBlur: {
                  type: 'string',
                  description: 'Called when leaving the component',
                },
                onChange: {
                  type: 'string',
                  description:
                    'Called when select an option or input value change, or value of input is changed',
                },
                onDropdownVisibleChange: {
                  type: 'string',
                  description: 'Called when dropdown open',
                },
                onFocus: {
                  type: 'string',
                  description: 'Called when entering the component',
                },
                onSearch: {
                  type: 'string',
                  description: 'Called when searching items',
                },
                onSelect: {
                  type: 'string',
                  description:
                    "Called when a option is selected. param is option's value and option instance",
                },
              },
              title: '',
            },
          },
        },
      ],
    },
  },
}

export const UpdateVertexInputSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    vertexId: {
      type: 'string',
      minLength: 3,
    },
    props: {
      type: 'object',
      properties: {
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
      },
      title: '',
      dependencies: {
        type: {
          oneOf: [
            {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: ['React_Button'],
                },
                props: {
                  type: 'object',
                  properties: {
                    block: {
                      type: 'boolean',
                      description:
                        'Option to fit button width to its parent width',
                    },
                    danger: {
                      type: 'boolean',
                      description: 'Set the danger status of button',
                    },
                    disabled: {
                      type: 'boolean',
                      description: 'Disabled state of button',
                    },
                    ghost: {
                      type: 'boolean',
                      description:
                        'Make background transparent and invert text and border colors\t',
                    },
                    href: {
                      type: 'string',
                      description: 'Redirect url of link button',
                    },
                    htmlType: {
                      type: 'string',
                      description: 'Set the original html type of button',
                      enum: ['submit', 'button', 'reset'],
                    },
                    icon: {
                      type: 'string',
                      description: 'Set the icon component of button',
                    },
                    loading: {
                      type: 'number',
                      description: 'Set the loading status of button',
                    },
                    shape: {
                      type: 'string',
                      description: 'Can be set button shape',
                      enum: ['circle', 'round'],
                    },
                    size: {
                      type: 'string',
                      description: 'Set the size of button',
                      default: 'middle',
                      enum: ['small', 'middle', 'large'],
                    },
                    target: {
                      type: 'string',
                      description:
                        'Same as target attribute of a, works when href is specified',
                    },
                    type: {
                      type: 'string',
                      description:
                        'Can be set to primary ghost dashed link text default',
                      enum: [
                        'default',
                        'primary',
                        'ghost',
                        'dashed',
                        'link',
                        'text',
                      ],
                    },
                  },
                  title: '',
                },
              },
            },
            {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: ['React_Card'],
                },
                props: {
                  type: 'object',
                  properties: {
                    actions: {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                      description:
                        'The action list, shows at the bottom of the Card',
                    },
                    activeTabKey: {
                      type: 'string',
                      description: "Current TabPane's key",
                    },
                    bodyStyle: {
                      type: 'string',
                      description: 'Inline style to apply to the card content',
                    },
                    bordered: {
                      type: 'boolean',
                      description:
                        'Toggles rendering of the border around the card',
                      default: true,
                    },
                    cover: {
                      type: 'string',
                      description: 'Card cover',
                    },
                    defaultActiveTabKey: {
                      type: 'string',
                      description:
                        "Initial active TabPane's key, if activeTabKey is not set",
                    },
                    extra: {
                      type: 'string',
                      description:
                        'Content to render in the top-right corner of the card',
                    },
                    headStyle: {
                      type: 'string',
                      description: 'Inline style to apply to the card head',
                    },
                    hoverable: {
                      type: 'boolean',
                      description: 'Lift up when hovering card',
                    },
                    loading: {
                      type: 'boolean',
                      description:
                        'Shows a loading indicator while the contents of the card are being fetched',
                    },
                    size: {
                      type: 'string',
                      description: 'Size of card',
                      enum: ['default', 'small'],
                      default: 'default',
                    },
                    tabBarExtraContent: {
                      type: 'string',
                      description: 'Extra content in tab bar',
                    },
                    tabList: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          key: {
                            type: 'string',
                            minLength: 1,
                          },
                          tab: {
                            type: 'string',
                          },
                          disabled: {
                            type: 'boolean',
                          },
                        },
                        required: ['key', 'tab'],
                      },
                      description: "List of TabPane's head",
                    },
                    title: {
                      type: 'string',
                      description: 'Card title',
                    },
                    type: {
                      type: 'string',
                      description:
                        'Card style type, can be set to inner or not set',
                      enum: ['inner'],
                    },
                  },
                  title: '',
                },
              },
            },
            {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: ['React_Card_Grid'],
                },
                props: {
                  type: 'object',
                  properties: {
                    className: {
                      type: 'string',
                      description: 'The className of container',
                    },
                    hoverable: {
                      type: 'boolean',
                      description: 'Lift up when hovering card grid',
                    },
                    style: {
                      type: 'string',
                      description: 'The style object of container',
                    },
                  },
                  title: '',
                },
              },
            },
            {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: ['React_Card_Meta'],
                },
                props: {
                  type: 'object',
                  properties: {
                    avatar: {
                      type: 'string',
                      description: 'Avatar or icon',
                    },
                    className: {
                      type: 'string',
                      description: 'The className of container',
                    },
                    description: {
                      type: 'string',
                      description: 'Description content',
                    },
                    style: {
                      type: 'string',
                      description: 'The style object of container',
                    },
                    title: {
                      type: 'string',
                      description: 'Title content',
                    },
                  },
                  title: '',
                },
              },
            },
            {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: ['React_Icon'],
                },
                props: {
                  type: 'object',
                  properties: {
                    className: {
                      type: 'string',
                      description: 'The className of Icon',
                    },
                    rotate: {
                      type: 'string',
                      description: 'Rotate by n degrees (not working in IE9)',
                    },
                    spin: {
                      type: 'boolean',
                      description: 'Rotate icon with animation',
                    },
                    style: {
                      type: 'string',
                      description:
                        'The style properties of icon, like fontSize and color',
                    },
                    twoToneColor: {
                      type: 'string',
                      description:
                        'Only supports the two-tone icon. Specify the primary color',
                    },
                  },
                  title: '',
                },
              },
            },
            {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: ['React_Divider'],
                },
                props: {
                  type: 'object',
                  properties: {
                    className: {
                      type: 'string',
                      description: 'The className of container',
                    },
                    dashed: {
                      type: 'boolean',
                      description: 'Whether line is dashed',
                    },
                    orientation: {
                      type: 'string',
                      description: 'The position of title inside divider',
                      enum: ['left', 'right', 'center'],
                      default: 'center',
                    },
                    plain: {
                      type: 'boolean',
                      description: 'Divider text show as plain style',
                    },
                    style: {
                      type: 'string',
                      description: 'The style object of container',
                    },
                    type: {
                      type: 'string',
                      description: 'The direction type of divider',
                      enum: ['horizontal', 'vertical'],
                      default: 'horizontal',
                    },
                  },
                  title: '',
                },
              },
            },
            {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: [
                    'React_Layout',
                    'React_Layout_Header',
                    'React_Layout_Footer',
                    'React_Layout_Content',
                  ],
                },
                props: {
                  type: 'object',
                  properties: {
                    className: {
                      type: 'string',
                      description: 'Container className',
                    },
                    hasSider: {
                      type: 'boolean',
                      description:
                        "Whether contain Sider in children, don't have to assign it normally. Useful in ssr avoid style flickering\t",
                    },
                    style: {
                      type: 'string',
                      description: 'To customize the styles',
                    },
                  },
                  title: '',
                },
              },
            },
            {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: ['React_Layout_Sider'],
                },
                props: {
                  type: 'object',
                  properties: {
                    breakpoint: {
                      type: 'string',
                      description: 'Breakpoints of the responsive layout',
                      enum: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
                    },
                    className: {
                      type: 'string',
                      description: 'Container className',
                    },
                    collapsed: {
                      type: 'boolean',
                      description: 'To set the current status',
                    },
                    collapsedWidth: {
                      type: 'number',
                      description:
                        'Width of the collapsed sidebar, by setting to 0 a special trigger will appear',
                      default: 80,
                    },
                    collapsible: {
                      type: 'boolean',
                      description: 'Whether can be collapsed',
                    },
                    defaultCollapsed: {
                      type: 'boolean',
                      description: 'To set the initial status',
                    },
                    reverseArrow: {
                      type: 'boolean',
                      description:
                        'Reverse direction of arrow, for a sider that expands from the right',
                    },
                    style: {
                      type: 'string',
                      description: 'To customize the styles',
                    },
                    theme: {
                      type: 'string',
                      description: 'Color theme of the sidebar',
                      enum: ['light', 'dark'],
                      default: 'dark',
                    },
                    trigger: {
                      type: 'string',
                      description:
                        'Specify the customized trigger, set to null to hide the trigger',
                    },
                    width: {
                      type: 'string',
                      description: 'Width of the sidebar',
                      default: 200,
                    },
                    zeroWidthTriggerStyle: {
                      type: 'string',
                      description:
                        'To customize the styles of the special trigger that appears when collapsedWidth is 0',
                    },
                  },
                  title: '',
                },
              },
            },
            {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: ['React_Space'],
                },
                props: {
                  type: 'object',
                  properties: {
                    align: {
                      type: 'string',
                      description: 'Align items',
                      enum: ['start', 'end', 'center', 'baseline'],
                    },
                    direction: {
                      type: 'string',
                      description: 'The space direction',
                      enum: ['horizontal', 'vertical'],
                      default: 'horizontal',
                    },
                    size: {
                      type: 'string',
                      description: 'The space size',
                    },
                    split: {
                      type: 'string',
                      description: 'Set split',
                    },
                    wrap: {
                      type: 'boolean',
                      description: 'Auto wrap line, when horizontal effective',
                    },
                  },
                  title: '',
                },
              },
            },
            {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: ['React_Affix'],
                },
                props: {
                  type: 'object',
                  properties: {
                    offsetBottom: {
                      type: 'string',
                      description:
                        'Offset from the bottom of the viewport (in pixels)',
                    },
                    offsetTop: {
                      type: 'string',
                      description:
                        'Offset from the top of the viewport (in pixels)',
                      default: 0,
                    },
                  },
                  title: '',
                },
              },
            },
            {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: ['React_Breadcrumb'],
                },
                props: {
                  type: 'object',
                  properties: {
                    params: {
                      type: 'string',
                      description: 'Routing parameters',
                    },
                    routes: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          path: {
                            type: 'string',
                            minLength: 1,
                          },
                          breadcrumbName: {
                            type: 'string',
                            minLength: 1,
                          },
                          children: {
                            type: 'array',
                            items: {
                              type: 'object',
                              properties: {
                                path: {
                                  type: 'string',
                                  minLength: 1,
                                },
                                breadcrumbName: {
                                  type: 'string',
                                  minLength: 1,
                                },
                              },
                              required: ['path', 'breadcrumbName'],
                            },
                          },
                        },
                        required: ['path', 'breadcrumbName'],
                      },
                      description: 'The routing stack information of router',
                    },
                    separator: {
                      type: 'string',
                      description: 'Custom separator',
                    },
                  },
                  title: '',
                },
              },
            },
            {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: ['React_Breadcrumb_Item'],
                },
                props: {
                  type: 'object',
                  properties: {
                    className: {
                      type: 'string',
                      description: 'The additional css class',
                    },
                    dropdownProps: {
                      type: 'object',
                      properties: {
                        arrow: {
                          type: 'boolean',
                          description:
                            'Whether the dropdown arrow should be visible',
                          default: false,
                        },
                        disabled: {
                          type: 'boolean',
                          description: 'Whether the dropdown menu is disabled',
                        },
                        overlay: {
                          type: 'object',
                          properties: {
                            defaultOpenKeys: {
                              type: 'array',
                              items: {
                                type: 'string',
                              },
                              description:
                                'Array with the keys of default opened sub menus',
                            },
                            defaultSelectedKeys: {
                              type: 'array',
                              items: {
                                type: 'string',
                              },
                              description:
                                'Array with the keys of default selected menu items',
                            },
                            expandIcon: {
                              type: 'string',
                              description: 'custom expand icon of submenu',
                            },
                            forceSubMenuRender: {
                              type: 'boolean',
                              description:
                                'Render submenu into DOM before it becomes visible',
                            },
                            inlineCollapsed: {
                              type: 'boolean',
                              description:
                                'Specifies the collapsed status when menu is inline mode',
                            },
                            inlineIndent: {
                              type: 'number',
                              description:
                                'Indent (in pixels) of inline menu items on each level',
                              default: 24,
                            },
                            mode: {
                              type: 'string',
                              description: 'Type of menu',
                              enum: [
                                'horizontal',
                                'vertical',
                                'vertical-left',
                                'vertical-right',
                                'inline',
                              ],
                              default: 'vertical',
                            },
                            multiple: {
                              type: 'boolean',
                              description: 'Allows selection of multiple items',
                            },
                            openKeys: {
                              type: 'array',
                              items: {
                                type: 'string',
                              },
                              description:
                                'Array with the keys of currently opened sub-menus',
                            },
                            overflowedIndicator: {
                              type: 'string',
                              description:
                                'Customized icon when menu is collapsed',
                            },
                            selectable: {
                              type: 'boolean',
                              description: 'Allows selecting menu items',
                            },
                            selectedKeys: {
                              type: 'array',
                              items: {
                                type: 'string',
                              },
                              description:
                                'Array with the keys of currently selected menu items',
                            },
                            style: {
                              type: 'string',
                              description: 'Style of the root node',
                            },
                            subMenuCloseDelay: {
                              type: 'number',
                              description:
                                'Delay time to hide submenu when mouse leaves (in seconds)',
                              default: 0.1,
                            },
                            subMenuOpenDelay: {
                              type: 'number',
                              description:
                                'Delay time to show submenu when mouse enters, (in seconds)',
                              default: 0,
                            },
                            theme: {
                              type: 'string',
                              description: 'Color theme of the menu',
                              enum: ['light', 'dark'],
                              default: 'light',
                            },
                            triggerSubMenuAction: {
                              type: 'string',
                              description:
                                'Which action can trigger submenu open/close',
                              enum: ['hover', 'click'],
                              default: 'hover',
                            },
                          },
                          description: 'The dropdown menu',
                        },
                        overlayClassName: {
                          type: 'string',
                          description:
                            'The class name of the dropdown root element',
                        },
                        overlayStyle: {
                          type: 'string',
                          description: 'The style of the dropdown root element',
                        },
                        placement: {
                          type: 'string',
                          description: 'Placement of popup menu',
                          enum: [
                            'topLeft',
                            'topCenter',
                            'topRight',
                            'bottomLeft',
                            'bottomCenter',
                            'bottomRight',
                          ],
                          default: 'bottomLeft',
                        },
                        trigger: {
                          type: 'array',
                          items: {
                            type: 'string',
                            enum: ['click', 'hover', 'contextMenu'],
                          },
                          description:
                            "The trigger mode which executes the dropdown action. Note that hover can't be used on touchscreens",
                          title: 'Trigger',
                          uniqueItems: true,
                          maxItems: 3,
                          default: ['hover'],
                        },
                        visible: {
                          type: 'boolean',
                          description:
                            'Whether the dropdown menu is currently visible',
                        },
                      },
                      description: 'The dropdown props',
                      title: 'Dropdown Props',
                    },
                    href: {
                      type: 'string',
                      description: 'Target of hyperlink',
                    },
                    overlay: {
                      type: 'object',
                      properties: {
                        defaultOpenKeys: {
                          type: 'array',
                          items: {
                            type: 'string',
                          },
                          description:
                            'Array with the keys of default opened sub menus',
                        },
                        defaultSelectedKeys: {
                          type: 'array',
                          items: {
                            type: 'string',
                          },
                          description:
                            'Array with the keys of default selected menu items',
                        },
                        expandIcon: {
                          type: 'string',
                          description: 'custom expand icon of submenu',
                        },
                        forceSubMenuRender: {
                          type: 'boolean',
                          description:
                            'Render submenu into DOM before it becomes visible',
                        },
                        inlineCollapsed: {
                          type: 'boolean',
                          description:
                            'Specifies the collapsed status when menu is inline mode',
                        },
                        inlineIndent: {
                          type: 'number',
                          description:
                            'Indent (in pixels) of inline menu items on each level',
                          default: 24,
                        },
                        mode: {
                          type: 'string',
                          description: 'Type of menu',
                          enum: [
                            'horizontal',
                            'vertical',
                            'vertical-left',
                            'vertical-right',
                            'inline',
                          ],
                          default: 'vertical',
                        },
                        multiple: {
                          type: 'boolean',
                          description: 'Allows selection of multiple items',
                        },
                        openKeys: {
                          type: 'array',
                          items: {
                            type: 'string',
                          },
                          description:
                            'Array with the keys of currently opened sub-menus',
                        },
                        overflowedIndicator: {
                          type: 'string',
                          description: 'Customized icon when menu is collapsed',
                        },
                        selectable: {
                          type: 'boolean',
                          description: 'Allows selecting menu items',
                        },
                        selectedKeys: {
                          type: 'array',
                          items: {
                            type: 'string',
                          },
                          description:
                            'Array with the keys of currently selected menu items',
                        },
                        style: {
                          type: 'string',
                          description: 'Style of the root node',
                        },
                        subMenuCloseDelay: {
                          type: 'number',
                          description:
                            'Delay time to hide submenu when mouse leaves (in seconds)',
                          default: 0.1,
                        },
                        subMenuOpenDelay: {
                          type: 'number',
                          description:
                            'Delay time to show submenu when mouse enters, (in seconds)',
                          default: 0,
                        },
                        theme: {
                          type: 'string',
                          description: 'Color theme of the menu',
                          enum: ['light', 'dark'],
                          default: 'light',
                        },
                        triggerSubMenuAction: {
                          type: 'string',
                          description:
                            'Which action can trigger submenu open/close',
                          enum: ['hover', 'click'],
                          default: 'hover',
                        },
                      },
                      description: 'The dropdown menu',
                      title: 'Menu Props',
                    },
                  },
                  title: '',
                },
              },
            },
            {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: ['React_Dropdown'],
                },
                props: {
                  type: 'object',
                  properties: {
                    arrow: {
                      type: 'boolean',
                      description:
                        'Whether the dropdown arrow should be visible',
                      default: false,
                    },
                    disabled: {
                      type: 'boolean',
                      description: 'Whether the dropdown menu is disabled',
                    },
                    overlay: {
                      type: 'object',
                      properties: {
                        defaultOpenKeys: {
                          type: 'array',
                          items: {
                            type: 'string',
                          },
                          description:
                            'Array with the keys of default opened sub menus',
                        },
                        defaultSelectedKeys: {
                          type: 'array',
                          items: {
                            type: 'string',
                          },
                          description:
                            'Array with the keys of default selected menu items',
                        },
                        expandIcon: {
                          type: 'string',
                          description: 'custom expand icon of submenu',
                        },
                        forceSubMenuRender: {
                          type: 'boolean',
                          description:
                            'Render submenu into DOM before it becomes visible',
                        },
                        inlineCollapsed: {
                          type: 'boolean',
                          description:
                            'Specifies the collapsed status when menu is inline mode',
                        },
                        inlineIndent: {
                          type: 'number',
                          description:
                            'Indent (in pixels) of inline menu items on each level',
                          default: 24,
                        },
                        mode: {
                          type: 'string',
                          description: 'Type of menu',
                          enum: [
                            'horizontal',
                            'vertical',
                            'vertical-left',
                            'vertical-right',
                            'inline',
                          ],
                          default: 'vertical',
                        },
                        multiple: {
                          type: 'boolean',
                          description: 'Allows selection of multiple items',
                        },
                        openKeys: {
                          type: 'array',
                          items: {
                            type: 'string',
                          },
                          description:
                            'Array with the keys of currently opened sub-menus',
                        },
                        overflowedIndicator: {
                          type: 'string',
                          description: 'Customized icon when menu is collapsed',
                        },
                        selectable: {
                          type: 'boolean',
                          description: 'Allows selecting menu items',
                        },
                        selectedKeys: {
                          type: 'array',
                          items: {
                            type: 'string',
                          },
                          description:
                            'Array with the keys of currently selected menu items',
                        },
                        style: {
                          type: 'string',
                          description: 'Style of the root node',
                        },
                        subMenuCloseDelay: {
                          type: 'number',
                          description:
                            'Delay time to hide submenu when mouse leaves (in seconds)',
                          default: 0.1,
                        },
                        subMenuOpenDelay: {
                          type: 'number',
                          description:
                            'Delay time to show submenu when mouse enters, (in seconds)',
                          default: 0,
                        },
                        theme: {
                          type: 'string',
                          description: 'Color theme of the menu',
                          enum: ['light', 'dark'],
                          default: 'light',
                        },
                        triggerSubMenuAction: {
                          type: 'string',
                          description:
                            'Which action can trigger submenu open/close',
                          enum: ['hover', 'click'],
                          default: 'hover',
                        },
                      },
                      description: 'The dropdown menu',
                    },
                    overlayClassName: {
                      type: 'string',
                      description:
                        'The class name of the dropdown root element',
                    },
                    overlayStyle: {
                      type: 'string',
                      description: 'The style of the dropdown root element',
                    },
                    placement: {
                      type: 'string',
                      description: 'Placement of popup menu',
                      enum: [
                        'topLeft',
                        'topCenter',
                        'topRight',
                        'bottomLeft',
                        'bottomCenter',
                        'bottomRight',
                      ],
                      default: 'bottomLeft',
                    },
                    trigger: {
                      type: 'array',
                      items: {
                        type: 'string',
                        enum: ['click', 'hover', 'contextMenu'],
                      },
                      description:
                        "The trigger mode which executes the dropdown action. Note that hover can't be used on touchscreens",
                      title: 'Trigger',
                      uniqueItems: true,
                      maxItems: 3,
                      default: ['hover'],
                    },
                    visible: {
                      type: 'boolean',
                      description:
                        'Whether the dropdown menu is currently visible',
                    },
                  },
                  title: '',
                },
              },
            },
            {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: ['React_Menu'],
                },
                props: {
                  type: 'object',
                  properties: {
                    defaultOpenKeys: {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                      description:
                        'Array with the keys of default opened sub menus',
                    },
                    defaultSelectedKeys: {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                      description:
                        'Array with the keys of default selected menu items',
                    },
                    expandIcon: {
                      type: 'string',
                      description: 'custom expand icon of submenu',
                    },
                    forceSubMenuRender: {
                      type: 'boolean',
                      description:
                        'Render submenu into DOM before it becomes visible',
                    },
                    inlineCollapsed: {
                      type: 'boolean',
                      description:
                        'Specifies the collapsed status when menu is inline mode',
                    },
                    inlineIndent: {
                      type: 'number',
                      description:
                        'Indent (in pixels) of inline menu items on each level',
                      default: 24,
                    },
                    mode: {
                      type: 'string',
                      description: 'Type of menu',
                      enum: [
                        'horizontal',
                        'vertical',
                        'vertical-left',
                        'vertical-right',
                        'inline',
                      ],
                      default: 'vertical',
                    },
                    multiple: {
                      type: 'boolean',
                      description: 'Allows selection of multiple items',
                    },
                    openKeys: {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                      description:
                        'Array with the keys of currently opened sub-menus',
                    },
                    overflowedIndicator: {
                      type: 'string',
                      description: 'Customized icon when menu is collapsed',
                    },
                    selectable: {
                      type: 'boolean',
                      description: 'Allows selecting menu items',
                    },
                    selectedKeys: {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                      description:
                        'Array with the keys of currently selected menu items',
                    },
                    style: {
                      type: 'string',
                      description: 'Style of the root node',
                    },
                    subMenuCloseDelay: {
                      type: 'number',
                      description:
                        'Delay time to hide submenu when mouse leaves (in seconds)',
                      default: 0.1,
                    },
                    subMenuOpenDelay: {
                      type: 'number',
                      description:
                        'Delay time to show submenu when mouse enters, (in seconds)',
                      default: 0,
                    },
                    theme: {
                      type: 'string',
                      description: 'Color theme of the menu',
                      enum: ['light', 'dark'],
                      default: 'light',
                    },
                    triggerSubMenuAction: {
                      type: 'string',
                      description:
                        'Which action can trigger submenu open/close',
                      enum: ['hover', 'click'],
                      default: 'hover',
                    },
                  },
                  title: '',
                },
              },
            },
            {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: ['React_Menu_Item'],
                },
                props: {
                  type: 'object',
                  properties: {
                    danger: {
                      type: 'boolean',
                      description: 'Display the danger style',
                    },
                    disabled: {
                      type: 'boolean',
                      description: 'Whether menu item is disabled',
                    },
                    icon: {
                      type: 'string',
                      description: 'The icon of the menu item',
                    },
                    key: {
                      type: 'string',
                      description: 'Unique ID of the menu item',
                    },
                    title: {
                      type: 'string',
                      description: 'Set display title for collapsed item',
                    },
                  },
                  title: '',
                },
              },
            },
            {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: ['React_Menu_SubMenu'],
                },
                props: {
                  type: 'object',
                  properties: {
                    children: {
                      type: 'array',
                      description: 'Sub-menus or sub-menu items',
                      title: 'Children of type MenuItem',
                      items: {
                        type: 'object',
                        properties: {
                          danger: {
                            type: 'boolean',
                            description: 'Display the danger style',
                          },
                          disabled: {
                            type: 'boolean',
                            description: 'Whether menu item is disabled',
                          },
                          icon: {
                            type: 'string',
                            description: 'The icon of the menu item',
                          },
                          key: {
                            type: 'string',
                            description: 'Unique ID of the menu item',
                          },
                          title: {
                            type: 'string',
                            description: 'Set display title for collapsed item',
                          },
                        },
                      },
                    },
                    disabled: {
                      type: 'boolean',
                      description: 'Whether sub-menu is disabled',
                    },
                    icon: {
                      type: 'string',
                      description: 'Icon of sub menu',
                    },
                    key: {
                      type: 'string',
                      description: 'Unique ID of the sub-menu',
                    },
                    popupClassName: {
                      type: 'string',
                      description:
                        'Sub-menu class name, not working when mode="inline"',
                    },
                    popupOffset: {
                      type: 'array',
                      title: 'Popup offset in the format of number, number',
                      items: [
                        {
                          title: 'A number',
                          type: 'number',
                          default: 0,
                        },
                        {
                          title: 'A number',
                          type: 'number',
                          default: 0,
                        },
                      ],
                    },
                    title: {
                      type: 'string',
                      description: 'Title of sub menu',
                    },
                  },
                  title: '',
                },
              },
            },
            {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: ['React_Menu_ItemGroup'],
                },
                props: {
                  type: 'object',
                  properties: {
                    children: {
                      type: 'array',
                      title: 'Children of type MenuItem',
                      items: {
                        type: 'object',
                        properties: {
                          danger: {
                            type: 'boolean',
                            description: 'Display the danger style',
                          },
                          disabled: {
                            type: 'boolean',
                            description: 'Whether menu item is disabled',
                          },
                          icon: {
                            type: 'string',
                            description: 'The icon of the menu item',
                          },
                          key: {
                            type: 'string',
                            description: 'Unique ID of the menu item',
                          },
                          title: {
                            type: 'string',
                            description: 'Set display title for collapsed item',
                          },
                        },
                      },
                    },
                    title: {
                      type: 'string',
                      description: 'The title of the group',
                    },
                  },
                  title: '',
                },
              },
            },
            {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: ['React_PageHeader'],
                },
                props: {
                  type: 'object',
                  properties: {
                    avatar: {
                      type: 'object',
                      properties: {
                        alt: {
                          type: 'string',
                          description:
                            'This attribute defines the alternative text describing the image',
                        },
                        gap: {
                          type: 'number',
                          description:
                            'Letter type unit distance between left and right sides',
                        },
                        icon: {
                          type: 'string',
                          description: 'Custom icon type for an icon avatar',
                        },
                        shape: {
                          type: 'string',
                          description: 'The shape of avatar',
                          enum: ['circle', 'square'],
                          default: 'circle',
                        },
                        size: {
                          type: 'object',
                          properties: {
                            size: {
                              type: 'string',
                              enum: ['large', 'small', 'default'],
                            },
                            xxl: {
                              type: 'string',
                              enum: ['xxl'],
                            },
                            xl: {
                              type: 'string',
                              enum: ['xl'],
                            },
                            lg: {
                              type: 'string',
                              enum: ['lg'],
                            },
                            md: {
                              type: 'string',
                              enum: ['md'],
                            },
                            sm: {
                              type: 'string',
                              enum: ['sm'],
                            },
                            xs: {
                              type: 'string',
                              enum: ['xs'],
                            },
                          },
                          description: 'The size of the avatar',
                          title: 'Avatar Size',
                        },
                        src: {
                          type: 'string',
                          description:
                            'The address of the image for an image avatar or image element',
                        },
                        srcSet: {
                          type: 'string',
                          description:
                            'A list of sources to use for different screen resolutions',
                        },
                      },
                      description: 'Avatar next to the title bar',
                      title: 'Avatar Props',
                    },
                    backIcon: {
                      type: 'string',
                      description:
                        'Custom back icon, if false the back icon will not be displayed',
                    },
                    breadcrumb: {
                      type: 'object',
                      properties: {
                        params: {
                          type: 'string',
                          description: 'Routing parameters',
                        },
                        routes: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              path: {
                                type: 'string',
                                minLength: 1,
                              },
                              breadcrumbName: {
                                type: 'string',
                                minLength: 1,
                              },
                              children: {
                                type: 'array',
                                items: {
                                  type: 'object',
                                  properties: {
                                    path: {
                                      type: 'string',
                                      minLength: 1,
                                    },
                                    breadcrumbName: {
                                      type: 'string',
                                      minLength: 1,
                                    },
                                  },
                                  required: ['path', 'breadcrumbName'],
                                },
                              },
                            },
                            required: ['path', 'breadcrumbName'],
                          },
                          description:
                            'The routing stack information of router',
                        },
                        separator: {
                          type: 'string',
                          description: 'Custom separator',
                        },
                      },
                      description: 'Breadcrumb configuration',
                      title: 'Breadcrumb props',
                    },
                    extra: {
                      type: 'string',
                      description:
                        'Operating area, at the end of the line of the title line',
                    },
                    footer: {
                      type: 'string',
                      description:
                        "PageHeader's footer, generally used to render TabBar",
                    },
                    ghost: {
                      type: 'boolean',
                      description:
                        'PageHeader type, will change background color',
                    },
                    subTitle: {
                      type: 'string',
                      description: 'Custom subtitle text',
                    },
                    tags: {
                      type: 'array',
                      description: 'Tag list next to title',
                      items: {
                        type: 'object',
                        properties: {
                          closable: {
                            type: 'boolean',
                            description: 'Whether the Tag can be closed',
                          },
                          closeIcon: {
                            type: 'string',
                            description: 'Custom close icon',
                          },
                          color: {
                            type: 'string',
                            description: 'Color of the Tag',
                          },
                          icon: {
                            type: 'string',
                            description: 'Set the icon of tag',
                          },
                          visible: {
                            type: 'boolean',
                            description: 'Whether the Tag is closed or not',
                          },
                        },
                      },
                    },
                    title: {
                      type: 'string',
                      description: 'Custom title text',
                    },
                  },
                  title: '',
                },
              },
            },
            {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: ['React_Avatar'],
                },
                props: {
                  type: 'object',
                  properties: {
                    alt: {
                      type: 'string',
                      description:
                        'This attribute defines the alternative text describing the image',
                    },
                    gap: {
                      type: 'number',
                      description:
                        'Letter type unit distance between left and right sides',
                    },
                    icon: {
                      type: 'string',
                      description: 'Custom icon type for an icon avatar',
                    },
                    shape: {
                      type: 'string',
                      description: 'The shape of avatar',
                      enum: ['circle', 'square'],
                      default: 'circle',
                    },
                    size: {
                      type: 'object',
                      properties: {
                        size: {
                          type: 'string',
                          enum: ['large', 'small', 'default'],
                        },
                        xxl: {
                          type: 'string',
                          enum: ['xxl'],
                        },
                        xl: {
                          type: 'string',
                          enum: ['xl'],
                        },
                        lg: {
                          type: 'string',
                          enum: ['lg'],
                        },
                        md: {
                          type: 'string',
                          enum: ['md'],
                        },
                        sm: {
                          type: 'string',
                          enum: ['sm'],
                        },
                        xs: {
                          type: 'string',
                          enum: ['xs'],
                        },
                      },
                      description: 'The size of the avatar',
                      title: 'Avatar Size',
                    },
                    src: {
                      type: 'string',
                      description:
                        'The address of the image for an image avatar or image element',
                    },
                    srcSet: {
                      type: 'string',
                      description:
                        'A list of sources to use for different screen resolutions',
                    },
                  },
                  title: '',
                },
              },
            },
            {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: ['React_Tag'],
                },
                props: {
                  type: 'object',
                  properties: {
                    closable: {
                      type: 'boolean',
                      description: 'Whether the Tag can be closed',
                    },
                    closeIcon: {
                      type: 'string',
                      description: 'Custom close icon',
                    },
                    color: {
                      type: 'string',
                      description: 'Color of the Tag',
                    },
                    icon: {
                      type: 'string',
                      description: 'Set the icon of tag',
                    },
                    visible: {
                      type: 'boolean',
                      description: 'Whether the Tag is closed or not',
                    },
                  },
                  title: '',
                },
              },
            },
            {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: ['React_Pagination'],
                },
                props: {
                  type: 'object',
                  properties: {
                    current: {
                      type: 'number',
                      description: 'Current page number',
                    },
                    defaultCurrent: {
                      type: 'number',
                      description: 'Default initial page number',
                      default: 1,
                    },
                    defaultPageSize: {
                      type: 'number',
                      description: 'Default number of data items per page',
                      default: 10,
                    },
                    disabled: {
                      type: 'boolean',
                      description: 'Disable pagination',
                    },
                    hideOnSinglePage: {
                      type: 'boolean',
                      description: 'Whether to hide pager on single page',
                    },
                    pageSize: {
                      type: 'number',
                      description: 'Number of data items per page',
                    },
                    pageSizeOptions: {
                      type: 'array',
                      items: {
                        default: ['10', '20', '50', '100'],
                        type: 'string',
                      },
                      description: 'Specify the sizeChanger options',
                    },
                    responsive: {
                      type: 'boolean',
                      description:
                        'If size is not specified, Pagination would resize according to the width of the window',
                    },
                    showLessItems: {
                      type: 'boolean',
                      description: 'Show less page items',
                    },
                    showQuickJumper: {
                      type: 'boolean',
                      description:
                        'Determine whether you can jump to pages directly',
                    },
                    showSizeChanger: {
                      type: 'boolean',
                      description:
                        'Determine whether to show pageSize select, it will be true when total > 50',
                    },
                    showTitle: {
                      type: 'boolean',
                      description: "Show page item's title",
                    },
                    simple: {
                      type: 'boolean',
                      description: 'Whether to use simple mode',
                    },
                    size: {
                      type: 'string',
                      description:
                        'Specify the size of Pagination, can be set to small',
                      enum: ['default', 'small'],
                      default: 'default',
                    },
                    total: {
                      type: 'number',
                      description: 'Total number of data items',
                      default: 0,
                    },
                  },
                  title: '',
                  dependencies: {
                    showQuickJumper: {
                      oneOf: [
                        {
                          type: 'object',
                          properties: {
                            showQuickJumper: {
                              enum: [false],
                            },
                          },
                        },
                        {
                          type: 'object',
                          properties: {
                            showQuickJumper: {
                              enum: [true],
                            },
                            goButton: {
                              type: 'string',
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
            },
            {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: ['React_Steps'],
                },
                props: {
                  type: 'object',
                  properties: {
                    className: {
                      type: 'string',
                      description: 'Additional class to Steps',
                    },
                    current: {
                      type: 'number',
                      description:
                        'To set the current step, counting from 0. You can overwrite this state by using status of Step',
                    },
                    direction: {
                      type: 'string',
                      description:
                        'To specify the direction of the step bar, horizontal or vertical',
                      enum: ['horizontal', 'vertical'],
                      default: 'horizontal',
                    },
                    initial: {
                      type: 'number',
                      description: 'Set the initial step, counting from 0',
                      default: 0,
                    },
                    labelPlacement: {
                      type: 'string',
                      description:
                        'Place title and description with horizontal or vertical direction',
                      enum: ['horizontal', 'vertical'],
                      default: 'horizontal',
                    },
                    percent: {
                      type: 'number',
                      description:
                        'Progress circle percentage of current step in process status (only works on basic Steps)',
                    },
                    progressDot: {
                      type: 'boolean',
                      description:
                        'Steps with progress dot style, customize the progress dot by setting it to a function. labelPlacement will be vertical',
                    },
                    responsive: {
                      type: 'boolean',
                      description:
                        'change to vertical direction when screen width smaller than 532px',
                    },
                    size: {
                      type: 'string',
                      description:
                        'To specify the size of the step bar, default and small are currently supported',
                      enum: ['default', 'small'],
                      default: 'default',
                    },
                    status: {
                      type: 'string',
                      description:
                        'To specify the status of current step, can be set to one of the following values: wait process finish error',
                      enum: ['wait', 'process', 'finish', 'error'],
                      default: 'process',
                    },
                    type: {
                      type: 'string',
                      description:
                        'Type of steps, can be set to one of the following values: default, navigation',
                      enum: ['default', 'navigation'],
                      default: 'default',
                    },
                  },
                  title: '',
                },
              },
            },
            {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: ['React_Steps_Step'],
                },
                props: {
                  type: 'object',
                  properties: {
                    description: {
                      type: 'string',
                      description: 'Description of the step, optional property',
                    },
                    disabled: {
                      type: 'boolean',
                      description: 'Disable click',
                    },
                    icon: {
                      type: 'string',
                      description: 'Icon of the step, optional property',
                    },
                    status: {
                      type: 'string',
                      description:
                        'To specify the status. It will be automatically set by current of Steps if not configured. Optional values are: wait process finish error',
                      enum: ['wait', 'process', 'finish', 'error'],
                      default: 'wait',
                    },
                    subTitle: {
                      type: 'string',
                      description: 'Subtitle of the step',
                    },
                    title: {
                      type: 'string',
                      description: 'Title of the step',
                    },
                  },
                  title: '',
                },
              },
            },
            {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: ['React_AutoComplete'],
                },
                props: {
                  type: 'object',
                  properties: {
                    allowClear: {
                      type: 'boolean',
                      description: 'Show clear button',
                    },
                    autoFocus: {
                      type: 'boolean',
                      description: 'If get focus when component mounted',
                    },
                    backfill: {
                      type: 'boolean',
                      description:
                        'If backfill selected item the input when using keyboard',
                    },
                    childrenInputElement: {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                      description: 'Customize input element',
                    },
                    childrenDataSource: {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                      description: 'Data source to auto complete',
                    },
                    defaultActiveFirstOption: {
                      type: 'boolean',
                      description: 'Whether active first option by default',
                      default: true,
                    },
                    defaultOpen: {
                      type: 'boolean',
                      description: 'Initial open state of dropdown',
                    },
                    defaultValue: {
                      type: 'string',
                      description: 'Initial selected option',
                    },
                    disabled: {
                      type: 'boolean',
                      description: 'Whether disabled select',
                    },
                    dropdownClassName: {
                      type: 'string',
                      description: 'The className of dropdown menu',
                    },
                    dropdownMatchSelectWidth: {
                      type: 'number',
                      description:
                        'Determine whether the dropdown menu and the select input are the same width. Default set min-width same as input. Will ignore when value less than select width. false will disable virtual scroll\t',
                    },
                    filterOption: {
                      type: 'boolean',
                      description:
                        'If true, filter options by input, if function, filter options against it. The function will receive two arguments, inputValue and option, if the function returns true, the option will be included in the filtered set; Otherwise, it will be excluded\t',
                    },
                    notFoundContent: {
                      type: 'string',
                      description:
                        'Specify content to show when no result matches',
                      default: 'Not Found',
                    },
                    open: {
                      type: 'boolean',
                      description: 'Controlled open state of dropdown',
                    },
                    options: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          label: {
                            type: 'string',
                            title: 'Label',
                          },
                          value: {
                            type: 'string',
                            title: 'Value',
                          },
                        },
                      },
                      description:
                        'Select options. Will get better perf than jsx definition',
                    },
                    placeholder: {
                      type: 'string',
                      description: 'The placeholder of input',
                    },
                    value: {
                      type: 'string',
                      description: 'Selected option',
                    },
                    onBlur: {
                      type: 'string',
                      description: 'Called when leaving the component',
                    },
                    onChange: {
                      type: 'string',
                      description:
                        'Called when select an option or input value change, or value of input is changed',
                    },
                    onDropdownVisibleChange: {
                      type: 'string',
                      description: 'Called when dropdown open',
                    },
                    onFocus: {
                      type: 'string',
                      description: 'Called when entering the component',
                    },
                    onSearch: {
                      type: 'string',
                      description: 'Called when searching items',
                    },
                    onSelect: {
                      type: 'string',
                      description:
                        "Called when a option is selected. param is option's value and option instance",
                    },
                  },
                  title: '',
                },
              },
            },
          ],
        },
      },
    },
  },
  required: ['vertexId'],
}
