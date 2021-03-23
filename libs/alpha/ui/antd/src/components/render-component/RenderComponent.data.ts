import { PropType } from '../../props/PropType'
import { AtomType, NodeI } from '@codelab/frontend'

export const renderComponentData: NodeI = {
  type: AtomType.ReactRenderComponent,
  children: [
    {
      type: AtomType.ReactButton,
      props: {
        onClick: {
          __type: [PropType.Eval],
          value: 'return () => console.log(this)',
        },
      },
      children: [
        {
          type: AtomType.ReactText,
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

export const renderContainerData: NodeI = {
  type: AtomType.ReactRenderContainer,
  props: { data: 'Data' },
}
