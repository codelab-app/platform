import { TypeFactory } from '@codelab/backend-domain-type'
import {
  getElementDependantTypes,
  getElementsDependantTypes,
  Neo4jService,
} from '@codelab/backend-infra-adapter-neo4j-driver'
import { ITypeRef } from '@codelab/shared-abstract-core'
import { Element, TypeFragment } from '@codelab/shared-infra-gqlgen'
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
   *
   * Since we are looping through the types, it's making individual graphql queries for each type
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
    }, 'GetElementDependantTypes')
  }

  /**
   * Batch version to get dependent types for multiple elements
   * Returns a map of element ID to their dependent types
   * This version fetches all type data directly from Neo4j without additional API calls
   */
  async getDependantTypesBatch(
    elementIds: ReadonlyArray<string>,
  ): Promise<Map<string, Array<TypeFragment>>> {
    return this.neo4jService.withReadTransaction(async (txn) => {
      const { records } = await txn.run(getElementsDependantTypes, {
        ids: [...elementIds],
      })

      // Build result map directly from Neo4j data
      const resultMap = new Map<string, Array<TypeFragment>>()
      
      for (const record of records) {
        const elementId = record.get('elementId') as string
        const types = record.get('types') as Array<TypeFragment>
        
        // Cypher query already returns data in the correct format
        resultMap.set(elementId, types)
      }

      // Ensure all requested element IDs are in the result
      for (const elementId of elementIds) {
        if (!resultMap.has(elementId)) {
          resultMap.set(elementId, [])
        }
      }

      return resultMap
    }, 'GetElementsDependantTypesBatch')
  }
}
