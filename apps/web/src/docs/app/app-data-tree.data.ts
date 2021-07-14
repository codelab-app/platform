import { D3TreeData, NodeType } from '@codelab/ui/d3'

export const appDataTree: D3TreeData = {
  label: 'User A',
  type: NodeType.User,
  children: [
    {
      label: 'App A',
      type: NodeType.App,
      children: [
        {
          label: 'Page 1',
          type: NodeType.Page,
        },
        {
          label: 'Page 2',
          type: NodeType.Page,
        },
      ],
    },
    {
      label: 'App B',
      type: NodeType.App,
      children: [
        {
          label: 'Page 1',
          type: NodeType.Page,
        },
      ],
    },
  ],
}
