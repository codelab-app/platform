import { D3GraphProps } from './Graph.i'

export const d3GraphData: D3GraphProps = {
  nodes: [
    {
      id: 'A',
    },
    {
      id: 'B',
    },
    {
      id: 'C',
    },
    {
      id: 'D',
    },
    {
      id: 'E',
    },
  ],
  links: [
    { id: 'A_B', source: 'A', target: 'B' },
    { id: 'A_C', source: 'A', target: 'C' },
    { id: 'C_D', source: 'C', target: 'D' },
    { id: 'C_E', source: 'C', target: 'E' },
  ],
}
