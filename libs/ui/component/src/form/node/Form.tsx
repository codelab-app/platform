import React from 'react'
import { nodeID } from './Form-nodeID--text'
import { nodeTypeSelect } from './Form-nodeType--select'
import { parentNodeSelect } from './Form-parentNode'
import { propsFields } from './Form-props'
import { reactNodeFields } from './Form-reactNode'
import { refNodeFields } from './Form-refNode'
import { submitButtonData } from './Form-submitButton'
import { treeNodeFields } from './Form-treeNode'
import { Renderer } from '@codelab/core/renderer'
import { ComponentProps } from '@codelab/shared/interface/component'
import { NodeReactI, NodeType } from '@codelab/shared/interface/node'
import { PropType } from '@codelab/shared/interface/props'
import { ContextModal, EventModal } from '@codelab/state/modal'
import { withActor } from '@codelab/ui/hoc'

export const formNode: NodeReactI = {
  type: NodeType.React_Html_Div,
  props: {
    form: {
      __type: [PropType.Eval, PropType.Single],
      value: `
        const [form] = this.antd.Form.useForm();
        return form
      `,
    },
  },
  children: [
    {
      type: NodeType.React_Form,
      props: {
        form: {
          __type: [PropType.Eval, PropType.Leaf],
          value: 'return this.form',
        },
        name: 'create-node-form',
        onFinish: {
          __type: [PropType.Eval],
          value: `
            return (values) => {
              this.handleSubmit(values);
              this.form.resetFields();
            }
          `,
        },
      },
      children: [
        nodeID,
        // formLabel,
        nodeTypeSelect,
        reactNodeFields,
        treeNodeFields,
        refNodeFields,
        propsFields,
        parentNodeSelect,
        submitButtonData,
      ],
    },
  ],
}

interface FormProps {
  handleSubmit: Function
}

export const FormNode: React.FC<
  ComponentProps<ContextModal, EventModal> & FormProps
> = withActor<ContextModal, EventModal>(Renderer.components(formNode))
