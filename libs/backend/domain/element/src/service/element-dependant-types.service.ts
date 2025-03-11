import { TypeFactory } from '@codelab/backend/domain/type'
import {
  getElementDependantTypes,
  Neo4jService,
} from '@codelab/backend-infra-adapter/neo4j-driver'
import { ITypeRef } from '@codelab/shared/abstract/core'
import { Element, TypeFragment } from '@codelab/shared/infra/gqlgen'
import { Injectable } from '@nestjs/common'

/**
 * Get dependant types for an element
 */
@Injectable()
export class ElementDependantTypesService {
  constructor(
    private neo4jService: Neo4jService,
    private typeFactory: TypeFactory,
  ) {}

  /**
   * This attempts to get all dependent types for an element
   */
  async getDependantTypes(
    element: Pick<Element, 'id'>,
  ): Promise<Array<TypeFragment>> {
    return this.neo4jService.withReadTransaction(async (txn) => {
      const { records } = await txn.run(getElementDependantTypes, {
        id: element.id,
      })

      const typeRefs: Array<ITypeRef> = records.map((rec) => rec.get(0))
      const types = []

      for (const typeRef of typeRefs) {
        const fullType = await this.typeFactory.findOneOrFail(typeRef)

        types.push(fullType)
      }

      return types
    })
  }
}
