import type { Element } from '@codelab/shared/infra/gql'

import {
  getElementDescendants,
  Neo4jService,
} from '@codelab/backend-infra-adapter/neo4j-driver'
import { Injectable } from '@nestjs/common'

import { ElementRepository } from '../repository'

@Injectable()
export class ElementDescendantsService {
  constructor(
    private readonly neo4jService: Neo4jService,
    private readonly elementRepository: ElementRepository,
  ) {}

  async getDescendants(element: Element) {
    return this.neo4jService.withReadTransaction(async (txn) => {
      const { records } = await txn.run(getElementDescendants, {
        rootId: element.id,
      })

      const descendantIds = records[0]?.get(0) || []

      return this.elementRepository.find({
        where: { id_IN: [element.id].concat(descendantIds) },
      })
    })
  }
}
