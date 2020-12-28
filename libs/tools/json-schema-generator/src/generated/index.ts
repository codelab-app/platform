export const Affix = {
  "type": "object",
  "properties": {
    "target": {
      "description": "设置 Affix 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数",
      "type": "object"
    },
    "onChange": {
      "description": "固定状态改变时触发的回调函数",
      "type": "object"
    },
    "offsetTop": {
      "description": "距离窗口顶部达到指定偏移量后触发",
      "type": "number"
    },
    "offsetBottom": {
      "description": "距离窗口底部达到指定偏移量后触发",
      "type": "number"
    }
  },
  "$schema": "http://json-schema.org/draft-07/schema#"
}

export const Alert = {
  "type": "object",
  "properties": {
    "icon": {
      "$ref": "#/definitions/React.ReactNode"
    },
    "type": {
      "description": "Type of Alert styles, options:`success`, `info`, `warning`, `error`",
      "enum": [
        "error",
        "info",
        "success",
        "warning"
      ],
      "type": "string"
    },
    "onClick": {
      "type": "object"
    },
    "className": {
      "type": "string"
    },
    "role": {
      "description": "https://www.w3.org/TR/2014/REC-html5-20141028/dom.html#aria-role-attribute",
      "type": "string"
    },
    "onMouseEnter": {
      "type": "object"
    },
    "onMouseLeave": {
      "type": "object"
    },
    "prefixCls": {
      "type": "string"
    },
    "message": {
      "$ref": "#/definitions/React.ReactNode",
      "description": "Content of Alert"
    },
    "closable": {
      "description": "Whether Alert can be closed",
      "type": "boolean"
    },
    "closeText": {
      "$ref": "#/definitions/React.ReactNode",
      "description": "Close text to show"
    },
    "description": {
      "$ref": "#/definitions/React.ReactNode",
      "description": "Additional content of Alert"
    },
    "onClose": {
      "description": "Callback when close Alert",
      "type": "object"
    },
    "afterClose": {
      "description": "Trigger when animation ending of Alert",
      "type": "object"
    },
    "showIcon": {
      "description": "Whether to show icon",
      "type": "boolean"
    },
    "banner": {
      "type": "boolean"
    }
  },
  "$schema": "http://json-schema.org/draft-07/schema#"
}

export const Anchor = {
  "type": "object",
  "properties": {
    "onClick": {
      "type": "object"
    },
    "onChange": {
      "description": "Listening event when scrolling change active link",
      "type": "object"
    },
    "offsetTop": {
      "type": "number"
    },
    "bounds": {
      "type": "number"
    },
    "affix": {
      "type": "boolean"
    },
    "showInkInFixed": {
      "type": "boolean"
    },
    "getContainer": {
      "type": "object"
    },
    "getCurrentAnchor": {
      "description": "Return customize highlight anchor",
      "type": "object"
    },
    "targetOffset": {
      "description": "Scroll to target offset value, if none, it's offsetTop prop value or 0.",
      "type": "number"
    }
  },
  "$schema": "http://json-schema.org/draft-07/schema#"
}

export const Button = {
  "type": "object",
  "properties": {
    "loading": {
      "anyOf": [
        {
          "type": "object",
          "properties": {
            "delay": {
              "type": "number"
            }
          }
        },
        {
          "type": "boolean"
        }
      ]
    },
    "size": {
      "enum": [
        "large",
        "middle",
        "small"
      ],
      "type": "string"
    },
    "block": {
      "type": "boolean"
    },
    "ghost": {
      "type": "boolean"
    },
    "danger": {
      "type": "boolean"
    },
    "type": {
      "enum": [
        "dashed",
        "default",
        "ghost",
        "link",
        "primary",
        "text"
      ],
      "type": "string"
    },
    "className": {
      "type": "string"
    },
    "shape": {
      "enum": [
        "circle",
        "round"
      ],
      "type": "string"
    },
    "prefixCls": {
      "type": "string"
    }
  },
  "$schema": "http://json-schema.org/draft-07/schema#"
}

