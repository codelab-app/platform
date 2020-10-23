import { Button } from '../../button'
import { Divider } from '../../divider'
import { Text } from '../../text'
import { Form } from '../Form.types'
import { NodeReactI, NodeType } from '@codelab/shared/interface/node'
import { PropType } from '@codelab/shared/interface/props'

/**
 * We create a user object, which is keyed by 'user'
 */
export const formObjectData: NodeReactI<
  Form.Props | Form.ItemProps | Text.Props | Button.Props | Divider.Props
> = {
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
