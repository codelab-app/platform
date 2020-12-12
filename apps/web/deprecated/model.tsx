import React from 'react'
import { Renderer } from '@codelab/alpha/core/renderer'
import { NodeI, NodeType } from '@codelab/alpha/shared/interface/node'
import { PropType } from '@codelab/alpha/shared/interface/props'

export const modelFormData: NodeI = {
  type: NodeType.React_Form,
  props: {
    // name: 'app',
    initialValues: {
      company: {
        name: 'Codelab',
        address: {
          country: 'USA',
          city: 'Los Angeles',
        },
        devs: [{ name: 'Webber' }, { name: 'Vien' }],
      },
    },
    onFinish: {
      __type: [PropType.Eval],
      value: 'return (values) => console.log(values)',
    },
  },
  children: [
    {
      type: NodeType.React_Form_Item,
      props: {
        label: 'Name',
        name: ['company', 'name'],
      },
      children: [
        {
          type: NodeType.React_Input,
        },
      ],
    },
    {
      type: NodeType.React_Divider,
      props: {
        orientation: 'left',
      },
      children: [
        {
          type: NodeType.React_Text,
          props: {
            value: 'Address',
          },
        },
      ],
    },
    {
      type: NodeType.React_Form_Item,
      props: {
        label: 'Country',
        name: ['company', 'address', 'country'],
      },
      children: [
        {
          type: NodeType.React_Input,
        },
      ],
    },
    {
      type: NodeType.React_Form_Item,
      props: {
        label: 'City',
        name: ['company', 'address', 'city'],
      },
      children: [
        {
          type: NodeType.React_Input,
        },
      ],
    },
    {
      type: NodeType.React_Form_List,
      props: {
        label: 'Devs',
        name: ['company', 'devs'],
      },
      children: [
        {
          type: NodeType.React_Form_Item,
          props: {
            name: 'name',
            label: 'Name',
          },
          children: [
            {
              type: NodeType.React_Input,
            },
          ],
        },
      ],
    },
    {
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
    },
  ],
}

const Model = () => {
  const ModelForm = Renderer.components(modelFormData)

  return <ModelForm />
}

export default Model
