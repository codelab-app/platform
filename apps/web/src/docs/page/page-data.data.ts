import { D3GraphProps, NodeType } from '@codelab/ui/d3'

const PAGE = 'PAGE'
const ELEMENT_ROOT = 'ELEMENT_ROOT'
const ELEMENT_1_1 = 'ELEMENT_1_1'
const ELEMENT_1_2 = 'ELEMENT_1_2'
const ELEMENT_2_1 = 'ELEMENT_2_1'
const ELEMENT_2_2 = 'ELEMENT_2_2'

export const pageData: D3GraphProps = {
  nodes: [
    {
      id: PAGE,
      type: NodeType.Page,
    },
    {
      id: ELEMENT_ROOT,
      type: NodeType.Element,
    },
    {
      id: ELEMENT_1_1,
      type: NodeType.Element,
    },
    {
      id: ELEMENT_1_2,
      type: NodeType.Element,
    },
    {
      id: ELEMENT_2_1,
      type: NodeType.Element,
    },
    {
      id: ELEMENT_2_2,
      type: NodeType.Element,
    },
  ],
  links: [
    {
      id: `${PAGE}_${ELEMENT_ROOT}`,
      source: PAGE,
      target: ELEMENT_ROOT,
    },
    {
      id: `${ELEMENT_ROOT}_${ELEMENT_1_1}`,
      source: ELEMENT_ROOT,
      target: ELEMENT_1_1,
    },
    {
      id: `${ELEMENT_ROOT}_${ELEMENT_1_2}`,
      source: ELEMENT_ROOT,
      target: ELEMENT_1_2,
    },
    {
      id: `${ELEMENT_1_1}_${ELEMENT_2_1}`,
      source: ELEMENT_1_1,
      target: ELEMENT_2_1,
    },
    {
      id: `${ELEMENT_1_1}_${ELEMENT_2_2}`,
      source: ELEMENT_1_1,
      target: ELEMENT_2_2,
    },
  ],
}
