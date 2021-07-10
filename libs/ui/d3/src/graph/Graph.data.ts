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
    { id: 'A_B', source: 'A', target: 'B', label: 'A_B' },
    { id: 'A_C', source: 'A', target: 'C', label: 'A_C' },
    { id: 'C_D', source: 'C', target: 'D', label: 'C_D' },
    { id: 'C_E', source: 'C', target: 'E', label: 'C_E' },
  ],
}
