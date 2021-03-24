import { PropType } from '../../../props/PropType'
import { AtomType, NodeI } from '@codelab/frontend'

/**
 * We create a user object, which is keyed by 'user'
 */
export const formObjectData: NodeI = {
  type: AtomType.ReactForm,
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
      type: AtomType.ReactFormItem,
      props: {
        label: 'Name',
        name: ['company', 'name'],
      },
      children: [
        {
          type: AtomType.ReactInput,
        },
      ],
    },
    {
      type: AtomType.ReactDivider,
      props: {
        orientation: 'left',
      },
      children: [
        {
          type: AtomType.ReactText,
          props: {
            value: 'Address',
          },
        },
      ],
    },
    {
      type: AtomType.ReactFormItem,
      props: {
        label: 'Country',
        name: ['company', 'address', 'country'],
      },
      children: [
        {
          type: AtomType.ReactInput,
        },
      ],
    },
    {
      type: AtomType.ReactFormItem,
      props: {
        label: 'City',
        name: ['company', 'address', 'city'],
      },
      children: [
        {
          type: AtomType.ReactInput,
        },
      ],
    },
    {
      type: AtomType.ReactFormList,
      props: {
        label: 'Devs',
        name: ['company', 'devs'],
      },
      children: [
        {
          type: AtomType.ReactFormItem,
          props: {
            name: 'name',
            label: 'Name',
          },
          children: [
            {
              type: AtomType.ReactInput,
            },
          ],
        },
      ],
    },
    {
      type: AtomType.ReactFormItem,
      children: [
        {
          type: AtomType.ReactButton,
          props: {
            type: 'primary',
            htmlType: 'submit',
          },
          children: [
            {
              type: AtomType.ReactText,
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
