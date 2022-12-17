import type { BaseType, User } from '@codelab/shared/abstract/codegen'
import type { Integer, Node } from 'neo4j-driver'

export interface GetBaseTypesRecord {
  types: Node<Integer, BaseType>
  owner: Node<Integer, User>
}
