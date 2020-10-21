import { NodeReactI, NodeType } from '@codelab/shared/interface/node'

export const renderComponentData: NodeReactI<any> = {
  type: NodeType.React_RenderComponent,
  children: [
    {
      type: NodeType.React_Button,
      props: {
        onClick: {
          __type: ['Eval'],
          value: 'return () => console.log(this)',
        },
      },
      children: [
        {
          type: NodeType.React_Text,
          props: {
            value: {
              __type: ['Eval'],
              value: 'return this.data',
            },
          },
        },
      ],
    },
  ],
}

export const renderContainerData: NodeReactI<any> = {
  type: NodeType.React_RenderContainer,
  props: { data: 'Data' },
}
