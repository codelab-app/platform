import React from 'react'
import { ReactNodeI } from '@codelab/shared/interface/node'
import { TreeDom } from '@codelab/components/ui'

export const modelFormData: ReactNodeI = {
  type: 'Form',
  nodeType: 'React',
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
    onFinish: { eval: true, value: 'return (values) => console.log(values)' },
  },
  children: [
    {
      type: 'Form.Item',
      nodeType: 'React',
      props: {
        label: 'Name',
        name: ['company', 'name'],
      },
      children: [
        {
          type: 'Input',
          nodeType: 'React',
        },
      ],
    },
    {
      type: 'Divider',
      nodeType: 'React',
      props: {
        orientation: 'left',
      },
      children: [
        {
          type: 'Text',
          nodeType: 'React',
          props: {
            value: 'Address',
          },
        },
      ],
    },
    {
      type: 'Form.Item',
      nodeType: 'React',
      props: {
        label: 'Country',
        name: ['company', 'address', 'country'],
      },
      children: [
        {
          type: 'Input',
          nodeType: 'React',
        },
      ],
    },
    {
      type: 'Form.Item',
      nodeType: 'React',
      props: {
        label: 'City',
        name: ['company', 'address', 'city'],
      },
      children: [
        {
          type: 'Input',
          nodeType: 'React',
        },
      ],
    },
    {
      type: 'Form.List',
      nodeType: 'React',
      props: {
        label: 'Devs',
        name: ['company', 'devs'],
      },
      children: [
        {
          type: 'Form.Item',
          nodeType: 'React',
          props: {
            name: 'name',
            label: 'Name',
          },
          children: [
            {
              type: 'Input',
              nodeType: 'React',
            },
          ],
        },
      ],
    },
    {
      type: 'Form.Item',
      nodeType: 'React',
      children: [
        {
          type: 'Button',
          nodeType: 'React',
          props: {
            type: 'primary',
            htmlType: 'submit',
          },
          children: [
            {
              type: 'Text',
              nodeType: 'React',
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
  const ModelForm = TreeDom.render(modelFormData)

  return <ModelForm />
}

export default Model
