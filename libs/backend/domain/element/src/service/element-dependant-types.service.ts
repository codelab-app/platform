import {
  ActionTypeRepository,
  ArrayTypeRepository,
  CodeMirrorTypeRepository,
  EnumTypeRepository,
  FieldRepository,
  InterfaceTypeRepository,
  PrimitiveTypeRepository,
  ReactNodeTypeRepository,
  RenderPropTypeRepository,
  RichTextTypeRepository,
  UnionTypeRepository,
} from '@codelab/backend/domain/type'
import {
  getElementDependantTypes,
  Neo4jService,
} from '@codelab/backend-infra-adapter/neo4j-driver'
import { type IRef, ITypeKind } from '@codelab/shared/abstract/core'
import { Element, ElementFragment } from '@codelab/shared/infra/gql'
import { Injectable } from '@nestjs/common'

/**
 * Get dependant types for an element
 */
@Injectable()
export class ElementDependantTypesService {
  constructor(private neo4jService: Neo4jService) {}

  /**
   * This attempts to get all dependent types for an element
   */
  async getDependantTypes(element: Element) {
    return this.neo4jService.withReadTransaction(async (txn) => {
      const { records } = await txn.run(getElementDependantTypes, {
        id: element.id,
      })

      const dependantTypes = records.map((rec) => ({
        __typename: rec.get(0).__typename,
        id: rec.get(0).id,
      }))

      return dependantTypes
    })
  }
}
