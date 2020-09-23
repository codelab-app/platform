import { Button } from '../../button'
import { Divider } from '../../divider'
import { Text } from '../../text'
import { Form } from '../Form.types'
import { NodeReactI } from '@codelab/shared/interface/node'

/**
 * We create a user object, which is keyed by 'user'
 */
export const formObjectData: NodeReactI<
  Form.Props | Form.ItemProps | Text.Props | Button.Props | Divider.Props
> = {
  type: 'React.Form',
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
      type: 'React.Form.Item',
      props: {
        label: 'Name',
        name: ['company', 'name'],
      },
      children: [
        {
          type: 'React.Input',
        },
      ],
    },
    {
      type: 'React.Divider',
      props: {
        orientation: 'left',
      },
      children: [
        {
          type: 'React.Text',
          props: {
            value: 'Address',
          },
        },
      ],
    },
    {
      type: 'React.Form.Item',
      props: {
        label: 'Country',
        name: ['company', 'address', 'country'],
      },
      children: [
        {
          type: 'React.Input',
        },
      ],
    },
    {
      type: 'React.Form.Item',
      props: {
        label: 'City',
        name: ['company', 'address', 'city'],
      },
      children: [
        {
          type: 'React.Input',
        },
      ],
    },
    {
      type: 'React.Form.List',
      props: {
        label: 'Devs',
        name: ['company', 'devs'],
      },
      children: [
        {
          type: 'React.Form.Item',
          props: {
            name: 'name',
            label: 'Name',
          },
          children: [
            {
              type: 'React.Input',
            },
          ],
        },
      ],
    },
    {
      type: 'React.Form.Item',
      children: [
        {
          type: 'React.Button',
          props: {
            type: 'React.primary',
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
    },
  ],
}
