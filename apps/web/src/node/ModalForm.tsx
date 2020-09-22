import { Form } from '@codelab/components/ui'
import { Renderer } from '@codelab/core/renderer'
import {
  BaseNodeTypeEnum,
  NodeDtoReactI,
  NodeTypeReactEnum,
  nodeTypeEnumEntries,
} from '@codelab/shared/interface/node'

const nodeTypeSelect: NodeDtoReactI = Form.createSelect({
  label: 'NodeType',
  name: 'nodeType',
  options: nodeTypeEnumEntries,
})

const reactNodeFields: NodeDtoReactI = {
  type: 'React.Form.ItemHook',
  props: {
    shouldUpdate: true,
    shouldRender: {
      eval: true,
      value: 'return (values) => values.nodeType !== "React"',
    },
  },
  children: [
    Form.createSelect({
      label: 'Type',
      name: 'type',
      options: Object.entries(NodeTypeReactEnum),
    }),
  ],
}

const treeNodeFields: NodeDtoReactI = {
  type: 'React.Form.ItemHook',
  props: {
    shouldUpdate: true,
    shouldRender: {
      eval: true,
      value: 'return (values) => values.nodeType !== "Tree"',
    },
  },
  children: [
    {
      type: 'React.Form.Item',
      props: {
        label: 'ID',
        name: 'ID',
      },
      children: [{ type: 'React.Input' }],
    },
  ],
}

const refNodeFields: NodeDtoReactI = {
  type: 'React.Form.ItemHook',
  props: {
    shouldUpdate: true,
    shouldRender: {
      eval: true,
      value: 'return (values) => values.nodeType !== "Ref"',
    },
  },
  children: [
    {
      type: 'React.Form.Item',
      props: {
        label: 'id',
        name: 'id',
      },
      children: [{ type: 'React.Input' }],
    },
  ],
}

export const nodeFormData: NodeDtoReactI = {
  type: 'React.Form.Item',
  props: {
    label: 'Prop',
    name: 'prop',
  },
  children: [
    {
      type: 'React.Form.List',
      props: {
        name: 'props',
      },
      children: [
        {
          type: 'React.Form.Item',
          props: {
            name: 'name',
          },
          children: [
            {
              type: 'React.Input',
              props: {
                placeholder: 'Name',
              },
            },
          ],
        },
        {
          type: 'React.Form.Item',
          props: {
            name: 'type',
          },
          children: [
            {
              type: 'React.Input',
              props: {
                placeholder: 'Type',
              },
            },
          ],
        },
      ],
    },
  ],
}
export const submitButtonData: NodeDtoReactI = {
  type: 'React.Form.Item',
  children: [
    {
      type: 'React.Button',
      props: {
        type: 'primary',
        htmlType: 'submit',
      },
      children: [
        {
          type: 'React.Text',
          props: {
            value: 'Submit',
          },
        },
      ],
    },
  ],
}

export const modalFormData: NodeDtoReactI = {
  type: 'React.Modal',
  props: {
    title: 'Create Node Form',
    footer: null,
    visible: {
      eval: true,
      value: 'return this.props.visibility.value',
    },
    onCancel: {
      eval: true,
      value: `return () => {
        this.props.setvisibility.value(false)
      }`,
    },
  },
  children: [
    {
      type: 'React.Form',
      props: {
        name: 'create-node-form',
        initialValues: { nodeType: BaseNodeTypeEnum.React },
        onFinish: {
          eval: true,
          value: 'return this.props.handlesubmit.value',
        },
      },
      children: [
        nodeTypeSelect,
        reactNodeFields,
        treeNodeFields,
        refNodeFields,
        nodeFormData,
        submitButtonData,
      ],
    },
  ],
}

interface ModalFormProps {
  handlesubmit: Function
  visibility: boolean
  setvisibility: Function
}

export const ModalForm = Renderer.components<ModalFormProps>(modalFormData)
