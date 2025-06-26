import { ElementRepository } from '@codelab/backend-domain-element'
import {
  getPageElements,
  getPageElementsBatch,
  Neo4jService,
} from '@codelab/backend-infra-adapter-neo4j-driver'
import { IRef } from '@codelab/shared-abstract-core'
import { ElementFragment } from '@codelab/shared-infra-gqlgen'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PageElementsService {
  constructor(
    private readonly neo4jService: Neo4jService,
    private readonly elementRepository: ElementRepository,
  ) {}

  /**
   * Get root element and all its descendants
   */
  async getElements(page: IRef) {
    return this.neo4jService.withReadTransaction(async (txn) => {
      const { records } = await txn.run(getPageElements, {
        pageId: page.id,
      })

      const elements = records[0]?.get(0) || []

      return this.elementRepository.find({
        where: { id_IN: elements },
      })
    }, 'GetPageElements')
  }

  /**
   * Batch version to get elements for multiple pages
   * Returns a map of page ID to their elements
   */
  async getElementsBatch(
    pageIds: ReadonlyArray<string>,
  ): Promise<Map<string, Array<ElementFragment>>> {
    return this.neo4jService.withReadTransaction(async (txn) => {
      const { records } = await txn.run(getPageElementsBatch, {
        pageIds: [...pageIds],
      })

      // Build result map
      const resultMap = new Map<string, Array<ElementFragment>>()
      const pageElementIds = new Map<string, string[]>()
      
      // First, collect all element IDs per page
      for (const record of records) {
        const pageId = record.get('pageId') as string
        const elementIds = record.get('elementIds') as string[]
        pageElementIds.set(pageId, elementIds)
      }

      // Then, fetch all elements in a single query
      const allElementIds = Array.from(pageElementIds.values()).flat()
      const allElements = await this.elementRepository.find({
        where: { id_IN: allElementIds },
      })

      // Create a map of element ID to element for quick lookup
      const elementMap = new Map<string, ElementFragment>()
      for (const element of allElements) {
        elementMap.set(element.id, element)
      }

      // Finally, build the result map
      for (const [pageId, elementIds] of pageElementIds) {
        const elements = elementIds
          .map((id) => elementMap.get(id))
          .filter((element): element is ElementFragment => element !== undefined)
        resultMap.set(pageId, elements)
      }

      // Ensure all requested page IDs are in the result
      for (const pageId of pageIds) {
        if (!resultMap.has(pageId)) {
          resultMap.set(pageId, [])
        }
      }

      return resultMap
    }, 'GetPageElementsBatch')
  }
}
