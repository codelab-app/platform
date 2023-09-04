import type {
  ArrayType,
  ArrayTypeOptions,
  ArrayTypeWhere,
} from '@codelab/backend/abstract/codegen'
import {
  exportArrayTypeSelectionSet,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IArrayTypeDTO } from '@codelab/shared/abstract/core'
import {
  connectAuth0Owner,
  connectNodeId,
  reconnectNodeId,
} from '@codelab/shared/domain/mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ArrayTypeRepository extends AbstractRepository<
  IArrayTypeDTO,
  ArrayType,
  ArrayTypeWhere,
  ArrayTypeOptions
> {
  constructor(
    private ogmService: OgmService,
    protected traceService: TraceService,
  ) {
    super(traceService)
  }

  async _find({
    options,
    where,
  }: {
    where?: ArrayTypeWhere
    options?: ArrayTypeOptions
  }) {
    return await (
      await this.ogmService.ArrayType
    ).find({
      options,
      selectionSet: exportArrayTypeSelectionSet,
      where,
    })
  }

  protected async _add(primitiveTypes: Array<IArrayTypeDTO>) {
    return (
      await (
        await this.ogmService.ArrayType
      ).create({
        input: primitiveTypes.map(
          ({ __typename, itemType, owner, ...type }) => ({
            ...type,
            itemType: connectNodeId(itemType?.id),
            owner: connectAuth0Owner(owner),
          }),
        ),
        selectionSet: `{ arrayTypes ${exportArrayTypeSelectionSet} }`,
      })
    ).arrayTypes
  }

  protected async _update(
    { __typename, id, itemType, name, owner, ...primitiveType }: IArrayTypeDTO,
    where: ArrayTypeWhere,
  ) {
    return (
      await (
        await this.ogmService.ArrayType
      ).update({
        selectionSet: `{ arrayTypes ${exportArrayTypeSelectionSet} }`,
        update: {
          itemType: reconnectNodeId(itemType?.id),
          name,
        },
        where,
      })
    ).arrayTypes[0]
  }
}
