import {
  EnumTypeValue,
  TypesPageTypeBase,
  User,
} from '@codelab/shared/abstract/codegen'
import { Integer, Node } from 'neo4j-driver'

export interface TypesOfTypePage {
  types: Node<Integer, TypesPageTypeBase>
  'collect(allowedValues)': Array<Node<Integer, EnumTypeValue>>
  'collect(unionTypes)': Array<Node<Integer, TypesPageTypeBase>>
  owner: Node<Integer, User>
}
