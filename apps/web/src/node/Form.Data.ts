import {
  ReactNodeI,
  NodeTypeEnum,
  ReactNodeTypeEnum,
} from '@codelab/shared/interface/node'
import { Form } from '@codelab/components/ui'
import { CreateNodeFormProps } from './CreateNodeFormProps'
import { CreateNodeFormSubmitBtn } from './CreateNodeFormSubmitBtn'

const NodeTypeSelect: ReactNodeI = Form.createSelect({
  label: 'NodeType',
  name: 'nodeType',
  options: Object.entries(NodeTypeEnum),
  // style: {
  //   width: 300,
  // },
})
const ReactNodeSpecificFields: ReactNodeI = {
  type: 'Form.ItemHook',
  nodeType: 'React',
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
      options: Object.entries(ReactNodeTypeEnum),
      // style: {
      //   width: 300,
      // },
    }),
  ],
}
const TreeNodeSpecificFields: ReactNodeI = {
  type: 'Form.ItemHook',
  nodeType: 'React',
  props: {
    shouldUpdate: true,
    shouldRender: {
      eval: true,
      value: 'return (values) => values.nodeType !== "Tree"',
    },
  },
  children: [
    {
      type: 'Form.Item',
      nodeType: 'React',
      props: {
        label: 'ID',
        name: 'ID',
      },
      children: [{ type: 'Input', nodeType: 'React', props: {} }],
    },
  ],
}
const RefSpecificFields: ReactNodeI = {
  type: 'Form.ItemHook',
  nodeType: 'React',
  props: {
    shouldUpdate: true,
    shouldRender: {
      eval: true,
      value: 'return (values) => values.nodeType !== "Ref"',
    },
  },
  children: [
    {
      type: 'Form.Item',
      nodeType: 'React',
      props: {
        label: 'id',
        name: 'id',
      },
      children: [{ type: 'Input', nodeType: 'React' }],
    },
  ],
}

export const FormData: ReactNodeI = {
  type: 'Modal',
  nodeType: 'React',
  props: {
    title: 'Create Node Form',
    footer: null,
    visible: {
      eval: true,
      value: 'return this.props.isModalShown.value',
    },
  },
  children: [
    {
      type: 'Form',
      nodeType: 'React',
      props: {
        name: 'create-node-form',
        initialValues: { nodeType: NodeTypeEnum.React },
        onFinish: {
          eval: true,
          value: 'return this.props.onSubmitForm.value',
        },
      },
      children: [
        NodeTypeSelect,
        ReactNodeSpecificFields,
        TreeNodeSpecificFields,
        RefSpecificFields,
        CreateNodeFormProps,
        CreateNodeFormSubmitBtn,
      ],
    },
  ],
}
