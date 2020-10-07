import { Form } from '@codelab/components/ui'
import { Renderer } from '@codelab/core/renderer'
import {
  NodeReactI,
  ReactType,
  nodeTypeEntries,
} from '@codelab/shared/interface/node'

const parentNodeSelect: NodeReactI = {
  type: 'React.Form.Item',
  props: {
    label: 'Parent',
    name: 'parent',
  },
  children: [
    {
      type: 'React.Select',
      props: {
        options: {
          __type: ['Eval'],
          value: 'return this.parentnodes',
        },
      },
    },
  ],
}

const nodeTypeSelect: NodeReactI = Form.createSelect({
  label: 'NodeType',
  name: 'nodeType',
  options: nodeTypeEntries,
})

const nodeID: NodeReactI = {
  type: 'React.Form.Item',
  props: {
    label: 'ID',
    name: 'id',
  },
  children: [
    {
      type: 'React.Input',
      props: { disabled: true },
    },
  ],
}

const reactNodeFields: NodeReactI = {
  type: 'React.Form.ItemHook',
  props: {
    shouldUpdate: true,
    shouldRender: {
      __type: ['Eval'],
      value: 'return (values) => values.nodeType !== "React"',
    },
  },
  children: [
    Form.createSelect({
      label: 'Type',
      name: 'type',
      options: Object.entries(ReactType),
    }),
  ],
}

const treeNodeFields: NodeReactI = {
  type: 'React.Form.ItemHook',
  props: {
    shouldUpdate: true,
    shouldRender: {
      __type: ['Eval'],
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

const refNodeFields: NodeReactI = {
  type: 'React.Form.ItemHook',
  props: {
    shouldUpdate: true,
    shouldRender: {
      __type: ['Eval'],
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

export const nodeFormData: NodeReactI = {
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
            name: 'key',
          },
          children: [
            {
              type: 'React.Input',
              props: {
                placeholder: 'Key',
              },
            },
          ],
        },
        {
          type: 'React.Form.Item',
          props: {
            name: 'value',
          },
          children: [
            {
              type: 'React.Input',
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

export const modalFormData: NodeReactI = {
  type: 'React.Modal',
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
      type: 'React.Form',
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
