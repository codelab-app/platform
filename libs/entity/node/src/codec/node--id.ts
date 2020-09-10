import * as t from 'io-ts'

export interface NodeIDBrand {
  readonly NodeID: unique symbol
}

export const nodeID = t.brand(
  t.string,
  (s): s is t.Branded<string, NodeIDBrand> => typeof s === 'string',
  'NodeID',
)

export type NodeID = t.TypeOf<typeof nodeID>
