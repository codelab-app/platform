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
              eval: true,
              value: 'return this.props.selectedNode',
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
              eval: true,
              value: `return () => {
                  console.log(this.props);
                  this.props.setvisibility.value(true)
                }`,
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
        //       eval: true,
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
              eval: true,
              value: `return () => 
                this.props.clearfilter.value()
              `,
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

export interface ButtonGroupProps {
  setvisibility: Function
  handledelete: Function
  clearfilter: Function
}

export const ButtonGroup = Renderer.components<ButtonGroupProps>(
  nodeButtonGroupData,
)
