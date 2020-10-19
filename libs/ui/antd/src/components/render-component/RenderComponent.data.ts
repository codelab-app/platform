import { NodeReactI } from '@codelab/shared/interface/node'

export const renderComponentData: NodeReactI<any> = {
  type: 'React.RenderComponent',
  children: [
    {
      type: 'React.Button',
      props: {
        onClick: {
          __type: ['Eval'],
          value: 'return () => console.log(this)',
        },
      },
      children: [
        {
          type: 'React.Text',
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
  type: 'React.RenderContainer',
  props: { data: 'Data' },
}
