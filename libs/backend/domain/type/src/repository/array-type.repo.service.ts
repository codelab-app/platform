import type {
  ArrayType,
  ArrayTypeOptions,
  ArrayTypeWhere,
} from '@codelab/backend/abstract/codegen'
import type { IArrayTypeDto } from '@codelab/shared/abstract/core'

import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import {
  exportArrayTypeSelectionSet,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import {
  connectNodeId,
  connectOwner,
  reconnectNodeId,
} from '@codelab/shared/domain-old'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ArrayTypeRepository extends AbstractRepository<
  IArrayTypeDto,
  ArrayType,
  ArrayTypeWhere,
  ArrayTypeOptions
> {
  constructor(
    private ogmService: OgmService,

    protected validationService: ValidationService,
    protected loggerService: CodelabLoggerService,
    private authService: AuthDomainService,
  ) {
    super(validationService, loggerService)
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
      selectionSet: `{ ${exportArrayTypeSelectionSet} }`,
      where,
    })
  }

  protected async _addMany(primitiveTypes: Array<IArrayTypeDto>) {
    return (
      await (
        await this.ogmService.ArrayType
      ).create({
        input: primitiveTypes.map(({ __typename, itemType, ...type }) => ({
          ...type,
          itemType: connectNodeId(itemType?.id),
          owner: connectOwner(this.authService.currentUser),
        })),
      })
    ).arrayTypes
  }

  protected async _update(
    { __typename, id, itemType, name, ...primitiveType }: IArrayTypeDto,
    where: ArrayTypeWhere,
  ) {
    return (
      await (
        await this.ogmService.ArrayType
      ).update({
        update: {
          itemType: reconnectNodeId(itemType?.id),
          name,
        },
        where,
      })
    ).arrayTypes[0]
  }
}
