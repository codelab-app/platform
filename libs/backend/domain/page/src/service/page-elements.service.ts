import { ElementRepository } from '@codelab/backend-domain-element'
import {
  getPageElements,
  Neo4jService,
} from '@codelab/backend-infra-adapter-neo4j-driver'
import { IRef } from '@codelab/shared-abstract-core'
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
    })
  }
}
