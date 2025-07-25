import type { ComponentFragment } from '@codelab/shared-infra-gqlgen'

import { ElementRepository } from '@codelab/backend-domain-element'
import {
  getComponentElements,
  Neo4jService,
} from '@codelab/backend-infra-adapter-neo4j-driver'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ComponentElementsService {
  constructor(
    private readonly neo4jService: Neo4jService,
    private readonly elementRepository: ElementRepository,
  ) {}

  /**
   * Get root element and all its descendants
   */
  async getElements(component: ComponentFragment) {
    return this.neo4jService.withReadTransaction(async (txn) => {
      const { records } = await txn.run(getComponentElements, {
        componentId: component.id,
      })

      const elements = records[0]?.get(0) || []

      return this.elementRepository.find({
        where: { id_IN: elements },
      })
    }, 'GetComponentElements')
  }
}
