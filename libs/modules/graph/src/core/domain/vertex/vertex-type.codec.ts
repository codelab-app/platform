import * as t from 'io-ts'

// TODO: we want to generate from
// import { NodeType } from '@codelab/backend'
export enum VertexType {
  'React_Grid_Layout_Container',
  'React_Grid',
  'React_ResponsiveGrid',
}

export const VertexTypeC = t.union([
  t.literal('React_Grid_Layout_Container'),
  t.literal('React_Grid'),
  t.literal('React_ResponsiveGrid'),
  t.null,
])

export type VertexTypeC = t.TypeOf<typeof VertexTypeC>
