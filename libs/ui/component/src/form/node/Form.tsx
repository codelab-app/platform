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
import { NodeReactI } from '@codelab/shared/interface/node'
import { ContextModal, EventModal } from '@codelab/state/modal'
import { withActor } from '@codelab/ui/hoc'

export const formNode: NodeReactI = {
  type: 'React.Html.div',
  props: {
    form: {
      __type: ['Eval', 'Single'],
      value: `
        const [form] = this.antd.Form.useForm();
        return form
      `,
    },
  },
  children: [
    {
      type: 'React.Form',
      props: {
        form: {
          __type: ['Eval', 'Leaf'],
          value: 'return this.form',
        },
        initialvalues: {
          __type: ['Eval'],
          value: `
            this.initialvalues? this.form.setFieldsValue(this.initialvalues): null
          `,
        },
        name: 'create-node-form',
        onFinish: {
          __type: ['Eval'],
          value: `
            return (values) => {
              this.handlesubmit(values);
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
  handlesubmit: Function
  initialvalues?: any
}

export const FormNode: React.FC<
  ComponentProps<ContextModal, EventModal> & FormProps
> = withActor<ContextModal, EventModal>(Renderer.components(formNode))
