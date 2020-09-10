import { ReactNodeI } from '@codelab/shared/interface/node'

export interface NodeMngmtPanelProps {
  onAddNodeRequested: () => void
  onDeleteNodeRequested: () => void
}
export const NodeMngmtPanelData: ReactNodeI = {
  nodeType: 'React',
  type: 'Html.div',
  children: [
    {
      type: 'Html.div',
      nodeType: 'React',
      props: {
        style: {},
      },
      children: [
        {
          nodeType: 'React',
          type: 'Text',
          props: { value: 'Current Selection: ' },
        },
        {
          nodeType: 'React',
          type: 'Text',
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
      type: 'Html.div',
      nodeType: 'React',
      props: {
        style: {
          margin: '5px 0',
        },
      },
      children: [
        {
          nodeType: 'React',
          type: 'Button',
          props: {
            type: 'primary',
            onClick: {
              eval: true,
              value:
                'return ()=>{console.log(this);this.props.onAddNodeRequested.value()}',
            },
          },
          children: [
            {
              type: 'Text',
              nodeType: 'React',
              props: {
                value: 'Add to Selected Node',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'Html.div',
      nodeType: 'React',
      props: {
        style: {},
      },
      children: [
        {
          nodeType: 'React',
          type: 'Button',
          props: {
            type: 'primary',
            onClick: {
              eval: true,
              value: 'return ()=>{this.props.deleteNode()}',
            },
          },
          children: [
            {
              type: 'Text',
              nodeType: 'React',
              props: {
                value: 'Delete Selected Node',
              },
            },
          ],
        },
      ],
    },
  ],
}
