import { Renderer } from '@codelab/core/renderer'
import type { NodeReactI } from '@codelab/shared/interface/node'

const nodeButtonGroupData: NodeReactI = {
  type: 'React.Html.div',
  children: [
    {
      type: 'React.Html.div',
      children: [
        {
          type: 'React.Text',
          props: { value: 'Current Selection: ' },
        },
        {
          type: 'React.Text',
          props: {
            value: {
              __type: ['Eval'],
              value: 'return this.selectedNode',
            },
          },
        },
      ],
    },
    {
      type: 'React.Html.div',
      props: {
        style: {
          margin: '5px 0',
        },
      },
      children: [
        {
          type: 'React.Button',
          props: {
            type: 'primary',
            onClick: {
              __type: ['Eval'],
              value: `
                return () => {
                  console.log(this);
                  this.openmodal()
                }
              `,
            },
          },
          children: [
            {
              type: 'React.Text',
              props: {
                value: 'Show Create Node Form',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'React.Space',
      children: [
        // {
        //   type: 'React.Button',
        //   props: {
        //     type: 'primary',
        //     onClick: {
        //       __type: ["Eval"],
        //       value: `return () => {
        //         console.log(this.props)
        //         this.props.handledelete.value()
        //       }`,
        //     },
        //   },
        //   children: [
        //     {
        //       type: 'React.Text',
        //       props: {
        //         value: 'Delete Selected Node',
        //       },
        //     },
        //   ],
        // },
        {
          type: 'React.Button',
          props: {
            type: 'primary',
            onClick: {
              __type: ['Eval'],
              value: `return () => this.clearfilter()`,
            },
          },
          children: [
            {
              type: 'React.Text',
              props: {
                value: 'Clear ID filter',
              },
            },
          ],
        },
      ],
    },
  ],
}

export type ButtonGroupProps = {
  openmodal: Function
  handledelete: Function
  selectedNode: any
  clearfilter: Function
}

export const ButtonGroup = Renderer.components<ButtonGroupProps>(
  nodeButtonGroupData,
)
