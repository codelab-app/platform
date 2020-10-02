import { Form } from '@codelab/components/ui'
import { Renderer } from '@codelab/core/renderer'
import {
  BaseNodeType,
  ModelType,
  NodeReactI,
  ReactType,
  TreeType,
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
    Form.createSelect({
      label: 'Type',
      name: 'type',
      options: Object.entries(TreeType),
    }),
  ],
}

const modelNodeFields: NodeReactI = {
  type: 'React.Form.ItemHook',
  props: {
    shouldUpdate: true,
    shouldRender: {
      __type: ['Eval'],
      value: 'return (values) => values.nodeType !== "Ref"',
    },
  },
  children: [
    Form.createSelect({
      label: 'Type',
      name: 'type',
      options: Object.entries(ModelType),
    }),
  ],
}

const nodeFormData: NodeReactI = {
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

const submitButtonData: NodeReactI = {
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
      value: `return this.handlecancel;`,
    },
    ctx: {
      __type: ['Eval', 'Leaf'],
      value: `
        const [form] = this.antd.Form.useForm(); 
        form.setFieldsValue(this.initialvalues); 
        
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
        initialValues: { nodeType: BaseNodeType.React },
        onFinish: {
          __type: ['Eval'],
          value:
            'return (data)=>{this.handlesubmit(data);this.ctx.form.resetFields();}',
        },
      },
      children: [
        nodeTypeSelect,
        reactNodeFields,
        treeNodeFields,
        modelNodeFields,
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
