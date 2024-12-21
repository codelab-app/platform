import type { Element, Page } from '@codelab/shared/infra/gql'

import { ElementRepository } from '@codelab/backend/domain/element'
import {
  getElementDescendants,
  Neo4jDriverService,
} from '@codelab/backend-infra-adapter/neo4j-driver'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PageElementsService {
  constructor(
    private readonly neo4jDriverService: Neo4jDriverService,
    private readonly elementRepository: ElementRepository,
  ) {}

  /**
   * Get root element and all its descendants
   */
  async getElements(page: Page) {
    const rootElementId = page.rootElement.id

    return this.neo4jDriverService.withReadTransaction(async (txn) => {
      const { records } = await txn.run(getElementDescendants, {
        rootId: rootElementId,
      })

      const descendantIds = records[0]?.get(0) || []
      const elements = [rootElementId].concat(descendantIds)

      return this.elementRepository.find({
        where: { id_IN: elements },
      })
    })
  }
}
