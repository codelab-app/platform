import type {
  PrimitiveType,
  PrimitiveTypeOptions,
  PrimitiveTypeWhere,
} from '@codelab/backend/abstract/codegen'
import { AuthService } from '@codelab/backend/application/service'
import {
  exportPrimitiveTypeSelectionSet,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IPrimitiveTypeDTO } from '@codelab/shared/abstract/core'
import type { BaseTypeUniqueWhere } from '@codelab/shared/abstract/types'
import { connectAuth0Owner } from '@codelab/shared/domain/mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrimitiveTypeRepository extends AbstractRepository<
  IPrimitiveTypeDTO,
  PrimitiveType,
  PrimitiveTypeWhere,
  PrimitiveTypeOptions
> {
  constructor(
    private ogmService: OgmService,
    protected traceService: TraceService,
    protected validationService: ValidationService,
    protected authService: AuthService,
  ) {
    super(traceService, validationService)
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
      selectionSet: exportPrimitiveTypeSelectionSet,
      where,
    })
  }

  protected async _add(primitiveTypes: Array<IPrimitiveTypeDTO>) {
    return (
      await (
        await this.ogmService.PrimitiveType
      ).create({
        input: primitiveTypes.map(({ __typename, ...type }) => ({
          ...type,
          owner: connectAuth0Owner(this.authService.currentUser),
        })),
        selectionSet: `{ primitiveTypes ${exportPrimitiveTypeSelectionSet} }`,
      })
    ).primitiveTypes
  }

  protected async _update(
    { __typename, id, name, primitiveKind }: IPrimitiveTypeDTO,
    where: BaseTypeUniqueWhere,
  ) {
    return (
      await (
        await this.ogmService.PrimitiveType
      ).update({
        selectionSet: `{ primitiveTypes ${exportPrimitiveTypeSelectionSet} }`,
        update: { name },
        where,
      })
    ).primitiveTypes[0]
  }
}
