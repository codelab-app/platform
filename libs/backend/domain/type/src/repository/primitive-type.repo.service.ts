import type {
  PrimitiveType,
  PrimitiveTypeOptions,
  PrimitiveTypeWhere,
} from '@codelab/backend/abstract/codegen'
import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import {
  exportPrimitiveTypeSelectionSet,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IPrimitiveTypeDto } from '@codelab/shared/abstract/core'
import type { BaseTypeUniqueWhere } from '@codelab/shared/abstract/types'
import { connectOwner } from '@codelab/shared/domain/mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrimitiveTypeRepository extends AbstractRepository<
  IPrimitiveTypeDto,
  PrimitiveType,
  PrimitiveTypeWhere,
  PrimitiveTypeOptions
> {
  constructor(
    private ogmService: OgmService,
    protected traceService: TraceService,
    protected validationService: ValidationService,

    protected loggerService: CodelabLoggerService,
    protected authService: AuthDomainService,
  ) {
    super(traceService, validationService, loggerService)
  }

  protected async _addMany(primitiveTypes: Array<IPrimitiveTypeDto>) {
    return (
      await (
        await this.ogmService.PrimitiveType
      ).create({
        input: primitiveTypes.map(({ __typename, ...type }) => ({
          ...type,
          owner: connectOwner(this.authService.currentUser),
        })),
      })
    ).primitiveTypes
  }

  protected async _find({
    options,
    where,
  }: {
    where?: PrimitiveTypeWhere
    options?: PrimitiveTypeOptions
  }) {
    return await (
      await this.ogmService.PrimitiveType
    ).find({
      options,
      selectionSet: `{ ${exportPrimitiveTypeSelectionSet} }`,
      where,
    })
  }

  protected async _update(
    { __typename, id, name, primitiveKind }: IPrimitiveTypeDto,
    where: BaseTypeUniqueWhere,
  ) {
    return (
      await (
        await this.ogmService.PrimitiveType
      ).update({
        update: { name },
        where,
      })
    ).primitiveTypes[0]
  }
}
