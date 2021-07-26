import { D3TreeData, NodeType } from '@codelab/ui/d3'

export const pageData: D3TreeData = {
  label: 'Page',
  type: NodeType.Page,
  children: [
    {
      label: 'Root',
      type: NodeType.Element,
      children: [
        {
          label: 'Col',
          type: NodeType.Element,
          children: [
            {
              label: 'Grid',
              type: NodeType.Element,
            },
            {
              label: 'Grid',
              type: NodeType.Element,
            },
          ],
        },
        {
          label: 'Col',
          type: NodeType.Element,
          children: [
            {
              label: 'Grid',
              type: NodeType.Element,
            },
            {
              label: 'Grid',
              type: NodeType.Element,
            },
            {
              label: 'Grid',
              type: NodeType.Element,
            },
          ],
        },
      ],
    },
  ],
  // nodes: [
  //   {
  //     id: ELEMENT_1_1,
  //     type: NodeType.Element,
  //   },
  //   {
  //     id: ELEMENT_1_2,
  //     type: NodeType.Element,
  //   },
  //   {
  //     id: ELEMENT_2_1,
  //     type: NodeType.Element,
  //   },
  //   {
  //     id: ELEMENT_2_2,
  //     type: NodeType.Element,
  //   },
  // ],
  // links: [
  //   {
  //     id: `${PAGE}_${ELEMENT_ROOT}`,
  //     source: PAGE,
  //     target: ELEMENT_ROOT,
  //   },
  //   {
  //     id: `${ELEMENT_ROOT}_${ELEMENT_1_1}`,
  //     source: ELEMENT_ROOT,
  //     target: ELEMENT_1_1,
  //   },
  //   {
  //     id: `${ELEMENT_ROOT}_${ELEMENT_1_2}`,
  //     source: ELEMENT_ROOT,
  //     target: ELEMENT_1_2,
  //   },
  //   {
  //     id: `${ELEMENT_1_1}_${ELEMENT_2_1}`,
  //     source: ELEMENT_1_1,
  //     target: ELEMENT_2_1,
  //   },
  //   {
  //     id: `${ELEMENT_1_1}_${ELEMENT_2_2}`,
  //     source: ELEMENT_1_1,
  //     target: ELEMENT_2_2,
  //   },
  // ],
}
