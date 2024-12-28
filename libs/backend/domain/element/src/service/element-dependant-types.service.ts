import { TypeFactory } from '@codelab/backend/domain/type'
import {
  getElementDependantTypes,
  Neo4jService,
} from '@codelab/backend-infra-adapter/neo4j-driver'
import { ITypeRef } from '@codelab/shared/abstract/core'
import { Element, TypeFragment } from '@codelab/shared/infra/gql'
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

      const typeRefs: Array<ITypeRef> = records.map((rec) => ({
        __typename: rec.get(0).__typename,
        id: rec.get(0).id,
      }))

      return Promise.all(
        typeRefs.map((type) => this.typeFactory.findOneOrFail(type)),
      )
    })
  }
}
