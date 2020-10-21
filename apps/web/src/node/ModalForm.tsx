import { Renderer } from '@codelab/core/renderer'
import {
  NodeReactI,
  NodeType,
  ReactType,
  nodeTypeEntries,
} from '@codelab/shared/interface/node'
import { CodelabForm } from '@codelab/ui/antd'

const parentNodeSelect: NodeReactI = {
  type: NodeType.React_Form_Item,
  props: {
    label: 'Parent',
    name: 'parent',
  },
  children: [
    {
      type: NodeType.React_Select,
      props: {
        options: {
          __type: ['Eval'],
          value: 'return this.parentnodes',
        },
      },
    },
  ],
}

const nodeTypeSelect: NodeReactI = CodelabForm.createSelect({
  label: 'NodeType',
  name: 'nodeType',
  options: nodeTypeEntries,
})

const nodeID: NodeReactI = {
  type: NodeType.React_Form_Item,
  props: {
    label: 'ID',
    name: 'id',
  },
  children: [
    {
      type: NodeType.React_Input,
      props: { disabled: true },
    },
  ],
}

const reactNodeFields: NodeReactI = {
  type: NodeType.React_Form_ItemHook,
  props: {
    shouldUpdate: true,
    shouldRender: {
      __type: ['Eval'],
      value: 'return (values) => values.nodeType !== "React"',
    },
  },
  children: [
    CodelabForm.createSelect({
      label: 'Type',
      name: 'type',
      options: Object.entries(ReactType),
    }),
  ],
}

const treeNodeFields: NodeReactI = {
  type: NodeType.React_Form_ItemHook,
  props: {
    shouldUpdate: true,
    shouldRender: {
      __type: ['Eval'],
      value: 'return (values) => values.nodeType !== "Tree"',
    },
  },
  children: [
    {
      type: NodeType.React_Form_Item,
      props: {
        label: 'ID',
        name: 'ID',
      },
      children: [{ type: NodeType.React_Input }],
    },
  ],
}

const refNodeFields: NodeReactI = {
  type: NodeType.React_Form_ItemHook,
  props: {
    shouldUpdate: true,
    shouldRender: {
      __type: ['Eval'],
      value: 'return (values) => values.nodeType !== "Ref"',
    },
  },
  children: [
    {
      type: NodeType.React_Form_Item,
      props: {
        label: 'id',
        name: 'id',
      },
      children: [{ type: NodeType.React_Input }],
    },
  ],
}

export const nodeFormData: NodeReactI = {
  type: NodeType.React_Form_Item,
  props: {
    label: 'Prop',
    name: 'prop',
  },
  children: [
    {
      type: NodeType.React_Form_List,
      props: {
        name: 'props',
      },
      children: [
        {
          type: NodeType.React_Form_Item,
          props: {
            name: 'key',
          },
          children: [
            {
              type: NodeType.React_Input,
              props: {
                placeholder: 'Key',
              },
            },
          ],
        },
        {
          type: NodeType.React_Form_Item,
          props: {
            name: 'value',
          },
          children: [
            {
              type: NodeType.React_Input,
              props: {
                placeholder: 'Value',
              },
            },
          ],
        },
      ],
    },
  ],
}

export const submitButtonData: NodeReactI = {
  type: NodeType.React_Form_Item,
  children: [
    {
      type: NodeType.React_Button,
      props: {
        type: 'primary',
        htmlType: 'submit',
      },
      children: [
        {
          type: NodeType.React_Text,
          props: {
            value: 'Submit',
          },
        },
      ],
    },
  ],
}

export const modalFormData: NodeReactI = {
  type: NodeType.React_Modal,
  props: {
    title: 'Create Node Form',
    footer: null,
    visible: {
      __type: ['Eval'],
      value: 'return this.visibility',
    },
    onCancel: {
      __type: ['Eval'],
      value: `
        return () => this.handlecancel()
      `,
    },
    ctx: {
      __type: ['Eval', 'Leaf'],
      value: `
        const [form] = this.antd.Form.useForm();

        this.React.useEffect(()=> {
          this.visibility ? form.setFieldsValue(this.initialvalues) : form.resetFields()
        }, [this.visibility])

        return { form }
      `,
    },
  },
  children: [
    {
      type: NodeType.React_Form,
      props: {
        form: { __type: ['Eval'], value: 'return this.ctx.form' },
        name: 'create-node-form',
        onFinish: {
          __type: ['Eval'],
          value: 'return this.handlesubmit',
        },
      },
      children: [
        nodeID,
        nodeTypeSelect,
        reactNodeFields,
        treeNodeFields,
        refNodeFields,
        nodeFormData,
        parentNodeSelect,
        submitButtonData,
      ],
    },
  ],
}

type ModalFormProps = {
  handlesubmit: Function
  visibility: boolean
  handlecancel: Function
  parentnodes: Array<any>
  initialvalues?: any
}

export const ModalForm = Renderer.components<ModalFormProps>(modalFormData)
