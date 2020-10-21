import { Renderer } from '@codelab/core/renderer'
import type { NodeReactI } from '@codelab/shared/interface/node'
import { NodeType } from '@codelab/shared/interface/node'

const nodeButtonGroupData: NodeReactI = {
  type: NodeType.React_Html_Div,
  children: [
    {
      type: NodeType.React_Html_Div,
      children: [
        {
          type: NodeType.React_Text,
          props: { value: 'Current Selection: ' },
        },
        {
          type: NodeType.React_Text,
          props: {
            value: {
              __type: ['Eval'],
              value: 'return this.selectednodename',
            },
          },
        },
      ],
    },
    {
      type: NodeType.React_Html_Div,
      props: {
        style: {
          margin: '5px 0',
        },
      },
      children: [
        {
          type: NodeType.React_Button,
          props: {
            type: 'primary',
            onClick: {
              __type: ['Eval'],
              value: `
                return () => {
                  this.setvisibility(true)
                }
              `,
            },
          },
          children: [
            {
              type: NodeType.React_Text,
              props: {
                value: 'Show Create Node Form',
              },
            },
          ],
        },
      ],
    },
    {
      type: NodeType.React_Space,
      children: [
        {
          type: NodeType.React_Button,
          props: {
            type: 'primary',
            onClick: {
              __type: ['Eval'],
              value: `
                return () => {
                  console.log(this)
                  this.handledelete()
                }
              `,
            },
          },
          children: [
            {
              type: NodeType.React_Text,
              props: {
                value: 'Delete Selected Node',
              },
            },
          ],
        },
        {
          type: NodeType.React_Button,
          props: {
            type: 'primary',
            onClick: {
              eval: true,
              value: `
                return () => 
                this.clearfilter()
              `,
            },
          },
          children: [
            {
              type: NodeType.React_Text,
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
  setvisibility: Function
  handledelete: Function
  selectednodename: string
  clearfilter: Function
}

export const ButtonGroup = Renderer.components<ButtonGroupProps>(
  nodeButtonGroupData,
)
