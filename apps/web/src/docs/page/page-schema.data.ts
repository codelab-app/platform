import { D3GraphProps, NodeType } from '@codelab/ui/d3'

const PAGE = 'PAGE'
const COMPONENT = 'COMPONENT'
const ELEMENT_1 = 'ELEMENT_1'
const ELEMENT_2 = 'ELEMENT_2'

export const pageSchema: D3GraphProps = {
  nodes: [
    {
      id: PAGE,
      type: NodeType.Page,
    },
    {
      id: COMPONENT,
      type: NodeType.Component,
    },
    {
      id: ELEMENT_1,
      label: NodeType.Element,
      type: NodeType.Element,
    },
    {
      id: ELEMENT_2,
      label: NodeType.Element,
      type: NodeType.Element,
    },
  ],
  links: [
    {
      id: `${PAGE}_${ELEMENT_1}`,
      source: PAGE,
      target: ELEMENT_1,
      label: '1 - m',
    },
    {
      id: `${ELEMENT_1}_${ELEMENT_2}`,
      source: `${ELEMENT_1}`,
      target: `${ELEMENT_2}`,
      label: 'm - m',
    },
    {
      id: `${ELEMENT_2}_${ELEMENT_1}`,
      source: `${ELEMENT_2}`,
      target: `${ELEMENT_1}`,
      // label: 'm - m',
    },
    {
      id: `${ELEMENT_1}_${COMPONENT}`,
      source: ELEMENT_1,
      target: COMPONENT,
      label: '1 - 1',
    },
  ],
}
