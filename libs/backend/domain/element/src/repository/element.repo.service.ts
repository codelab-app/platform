import type { IElementDto, INodeType } from '@codelab/shared-abstract-core'
import type {
  ElementFragment,
  ElementOptions,
  ElementWhere,
} from '@codelab/shared-infra-gqlgen'

import { PinoLoggerService } from '@codelab/backend-infra-adapter-logger'
import { AbstractRepository } from '@codelab/backend-infra-core'
import {
  elementApi,
  elementMapper,
} from '@codelab/shared-domain-module-element'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ElementRepository extends AbstractRepository<
  INodeType.Element,
  IElementDto,
  ElementFragment,
  ElementWhere,
  ElementOptions
> {
  constructor(protected override loggerService: PinoLoggerService) {
    super(loggerService)
  }

  /**
   * We only deal with connecting/disconnecting relationships, actual items should exist already
   */
  protected async _addMany(elements: Array<IElementDto>) {
    const startTime = Date.now()

    this.loggerService.log(
      'ElementRepository._addMany starting GraphQL mutation',
      {
        elementCount: elements.length,
        elementIds: elements.map((element) => element.id),
      },
    )

    const {
      createElements: { elements: createdElements },
    } = await elementApi().CreateElements({
      input: elements.map((element) => elementMapper.toCreateInput(element)),
    })

    this.loggerService.log(
      'ElementRepository._addMany GraphQL mutation completed',
      {
        createdCount: createdElements.length,
        duration: Date.now() - startTime,
      },
    )

    return createdElements
  }

  protected async _find(params: {
    where?: ElementWhere
    options?: ElementOptions
  }) {
    const { items } = await elementApi().ElementList(params)

    return items
  }

  protected async _update(element: IElementDto, where: ElementWhere) {
    const {
      updateElements: { elements },
    } = await elementApi().UpdateElements({
      update: elementMapper.toUpdateInput(element),
      where,
    })

    return elements[0]
  }
}
