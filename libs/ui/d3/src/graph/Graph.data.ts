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

export const d3TestData: D3GraphProps = {
  nodes: [
    {
      id: 'root',
    },
    {
      id: 'a',
    },
    {
      id: 'b',
    },
    {
      id: 'c',
    },
    {
      id: 'd',
    },
    {
      id: 'e',
    },
    {
      id: 'f',
    },
  ],
  links: [
    {
      id: 'c56d662d-6397-4040-a878-b08cd3630e4f',
      source: 'root',
      target: 'a',
    },
    {
      id: 'f8882e09-9540-498a-b405-262257fe3818',
      source: 'root',
      target: 'd',
    },
    {
      id: 'ce8520dd-813d-4a05-bee1-e580cf3c8d87',
      source: 'a',
      target: 'b',
    },
    {
      id: 'c40a2b73-964c-4387-ad9a-acb9fa3a7e49',
      source: 'a',
      target: 'c',
    },
    {
      id: '3860e1f9-84e0-477f-a2e8-de978346a88b',
      source: 'd',
      target: 'e',
    },
    {
      id: 'b3697a6b-4c6a-44b3-8169-a027b3f24ccc',
      source: 'd',
      target: 'f',
    },
  ],
}

export const d3TestDataMoved: D3GraphProps = {
  nodes: [
    {
      id: 'root',
    },
    {
      id: 'a',
    },
    {
      id: 'b',
    },
    {
      id: 'c',
    },
    {
      id: 'd',
    },
    {
      id: 'e',
    },
    {
      id: 'f',
    },
  ],
  links: [
    {
      id: '986f5ef0-57b4-4abb-be89-a65d9ece6798',
      source: 'root',
      target: 'a',
    },
    {
      id: '1cf089e2-3442-4efb-9d5a-e6b245a97960',
      source: 'root',
      target: 'd',
    },
    {
      id: '1f090e7b-6816-4f4a-965d-f55ee29707e9',
      source: 'a',
      target: 'b',
    },
    {
      id: 'ab709dde-6d71-4e9e-bc5b-3c728f89a38c',
      source: 'a',
      target: 'f',
    },
    {
      id: '225f80d1-4081-4fa5-b502-df7f29321530',
      source: 'a',
      target: 'c',
    },
    {
      id: '1732172b-0d20-4d91-98ad-79c87d3db115',
      source: 'd',
      target: 'e',
    },
  ],
}
