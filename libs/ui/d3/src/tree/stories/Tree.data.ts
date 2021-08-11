import { D3TreeData } from '../tree.interface'

export const d3TreeData: D3TreeData = {
  label: 'A1',
  children: [
    {
      label: 'B1',
      children: [
        {
          label: 'C1',
          value: 100,
        },
        {
          label: 'C2',
          value: 300,
        },
        {
          label: 'C3',
          value: 200,
        },
      ],
    },
    {
      label: 'B2',
      value: 200,
    },
  ],
}
