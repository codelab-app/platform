import { ReactNodeI } from '@codelab/graph'
import { ButtonProps } from '../../button/Button'
import { FormItemProps, FormProps } from '../Form.types'
import { TextProps } from '../../text/Text.types'
import { DividerProps } from '../../divider/Divider.types'

/**
 * We create a user object, which is keyed by 'user'
 */
export const formObjectData: ReactNodeI<
  FormProps | FormItemProps | TextProps | ButtonProps | DividerProps
> = {
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
