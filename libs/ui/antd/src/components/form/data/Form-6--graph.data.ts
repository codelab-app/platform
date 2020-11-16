import { IComponentGraph } from '@codelab/core/renderer'
import { NodeType } from '@codelab/shared/interface/node'
import { PropType } from '@codelab/shared/interface/props'

export const formGraphData: IComponentGraph = {
  vertices: [
    {
      id: '1',
      type: NodeType.React_Form,
      props: {
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
    },
    {
      id: '2',
      type: NodeType.React_Form_Item,
      props: {
        label: 'Name',
        name: ['company', 'name'],
      },
      parent: '1',
    },
    {
      id: '3',
      type: NodeType.React_Input,
      parent: '2',
    },
    {
      id: '4',
      type: NodeType.React_Form_Item,
      parent: '1',
    },
    {
      id: '5',
      type: NodeType.React_Button,
      props: {
        type: 'primary',
        htmlType: 'submit',
      },
      parent: '4',
    },
    {
      id: '6',
      type: NodeType.React_Text,
      props: {
        value: 'Submit',
      },
      parent: '5',
    },
  ],
  edges: [
    { id: '1-2', start: '1', end: '2' },
    { id: '2-3', start: '2', end: '3' },
    { id: '1-4', start: '1', end: '4' },
    { id: '4-5', start: '4', end: '5' },
    { id: '5-6', start: '5', end: '6' },
  ],
}
