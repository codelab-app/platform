import { D3GraphProps, NodeType } from '@codelab/ui/d3'

export const componentSchema: D3GraphProps = {
  nodes: [
    {
      id: NodeType.Component,
      type: NodeType.Component,
    },
    {
      id: NodeType.Element,
      type: NodeType.Element,
    },
  ],
  links: [],
}
