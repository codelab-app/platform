import { D3GraphProps, NodeType } from '@codelab/ui/d3'

export const appSchema: D3GraphProps = {
  nodes: [
    {
      id: NodeType.User,
      type: NodeType.User,
    },
    {
      id: NodeType.App,
      type: NodeType.App,
    },
    {
      id: NodeType.Page,
      type: NodeType.Page,
    },
  ],
  links: [
    {
      id: `${NodeType.User}_${NodeType.App}`,
      source: NodeType.User,
      target: NodeType.App,
      label: '1 - apps - m',
    },
    {
      id: `${NodeType.App}_${NodeType.Page}`,
      source: NodeType.App,
      target: NodeType.Page,
      label: '1 - pages - m',
    },
  ],
}
