import type {
  ElementFragment,
  ElementOptions,
  ElementWhere,
} from '@codelab/shared/infra/gql'

import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import { IElementDto } from '@codelab/shared/abstract/core'
import {
  elementApi,
  elementMapper,
} from '@codelab/shared-domain-module/element'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ElementRepository extends AbstractRepository<
  IElementDto,
  ElementFragment,
  ElementWhere,
  ElementOptions
> {
  constructor(
    protected override validationService: ValidationService,
    protected override loggerService: PinoLoggerService,
  ) {
    super(validationService, loggerService)
  }

  /**
   * We only deal with connecting/disconnecting relationships, actual items should exist already
   */
  protected async _addMany(elements: Array<IElementDto>) {
    const {
      createElements: { elements: createdElements },
    } = await elementApi().CreateElements({
      input: elements.map((element) => elementMapper.toCreateInput(element)),
    })

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
