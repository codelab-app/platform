import { D3TreeData, NodeType } from '@codelab/ui/d3'

export const componentData: D3TreeData = {
  label: 'Component',
  type: NodeType.Component,
  children: [
    {
      label: 'RootElement',
      type: NodeType.Element,
      children: [
        {
          label: 'Element',
          type: NodeType.Element,
          children: [
            {
              label: 'Card',
              type: NodeType.Component,
            },
            {
              label: 'Element',
              type: NodeType.Element,
              children: [
                {
                  label: 'Typography.Text',
                  type: NodeType.Atom,
                },
              ],
            },
            {
              label: 'Element',
              type: NodeType.Element,
              children: [
                {
                  label: 'Button',
                  type: NodeType.Atom,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
