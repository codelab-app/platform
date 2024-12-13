import type {
  Element,
  ElementOptions,
  ElementWhere,
} from '@codelab/backend/abstract/codegen'

import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import {
  elementSelectionSet,
  getElementWithDescendants,
  Neo4jService,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import { IElementDto } from '@codelab/shared/abstract/core'
import { elementMapper } from '@codelab/shared-domain-module/element'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ElementRepository extends AbstractRepository<
  IElementDto,
  Element,
  ElementWhere,
  ElementOptions
> {
  constructor(
    private ogmService: OgmService,
    private neo4jService: Neo4jService,
    protected override validationService: ValidationService,
    protected override loggerService: CodelabLoggerService,
  ) {
    super(validationService, loggerService)
  }

  async getElementWithDescendants(rootId: string) {
    return getElementWithDescendants(this.neo4jService, this.ogmService, {
      id: rootId,
    })
  }

  /**
   * We only deal with connecting/disconnecting relationships, actual items should exist already
   */
  protected async _addMany(elements: Array<IElementDto>) {
    return (
      await this.ogmService.Element.create({
        input: elements.map((element) => elementMapper.toCreateInput(element)),
      })
    ).elements
  }

  protected async _find({
    options,
    where,
  }: {
    where?: ElementWhere
    options?: ElementOptions
  }) {
    return await (
      await this.ogmService.Element
    ).find({
      options,
      selectionSet: `{ ${elementSelectionSet} }`,
      where,
    })
  }

  protected async _update(element: IElementDto, where: ElementWhere) {
    return (
      await (
        await this.ogmService.Element
      ).update({
        update: elementMapper.toUpdateInput(element),
        where,
      })
    ).elements[0]
  }
}
