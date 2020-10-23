import { NodeReactI, NodeType } from '@codelab/shared/interface/node'
import { PropType } from '@codelab/shared/interface/props'

export const renderComponentData: NodeReactI<any> = {
  type: NodeType.React_RenderComponent,
  children: [
    {
      type: NodeType.React_Button,
      props: {
        onClick: {
          __type: [PropType.Eval],
          value: 'return () => console.log(this)',
        },
      },
      children: [
        {
          type: NodeType.React_Text,
          props: {
            value: {
              __type: [PropType.Eval],
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
