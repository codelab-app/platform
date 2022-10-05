import { BaseType, User } from '@codelab/shared/abstract/codegen'
import { Integer, Node } from 'neo4j-driver'

export interface GetBaseTypesRecord {
  types: Node<Integer, BaseType>
  owner: Node<Integer, User>
}
