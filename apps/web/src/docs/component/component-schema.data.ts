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
    {
      id: NodeType.Atom,
      type: NodeType.Atom,
    },
  ],
  links: [
    {
      id: `${NodeType.Component}_${NodeType.Element}`,
      label: '',
      source: NodeType.Component,
      target: NodeType.Element,
    },
    {
      id: `${NodeType.Element}_${NodeType.Component}`,
      label: '',
      source: NodeType.Element,
      target: NodeType.Component,
    },
    {
      id: `${NodeType.Element}_${NodeType.Atom}`,
      label: '',
      source: NodeType.Element,
      target: NodeType.Atom,
    },
  ],
}
