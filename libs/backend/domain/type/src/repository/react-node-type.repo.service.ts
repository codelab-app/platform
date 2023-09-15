import type {
  ReactNodeType,
  ReactNodeTypeOptions,
  ReactNodeTypeWhere,
} from '@codelab/backend/abstract/codegen'
import { AuthService } from '@codelab/backend/application/shared'
import {
  exportReactNodeTypeSelectionSet,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IReactNodeTypeDTO } from '@codelab/shared/abstract/core'
import { connectAuth0Owner } from '@codelab/shared/domain/mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ReactNodeTypeRepository extends AbstractRepository<
  IReactNodeTypeDTO,
  ReactNodeType,
  ReactNodeTypeWhere,
  ReactNodeTypeOptions
> {
  constructor(
    private ogmService: OgmService,
    protected traceService: TraceService,
    protected validationService: ValidationService,
    private authService: AuthService,
  ) {
    super(traceService, validationService)
  }

  protected async _find({
    options,
    where,
  }: {
    where?: ReactNodeTypeWhere
    options?: ReactNodeTypeOptions
  }) {
    return await (
      await this.ogmService.ReactNodeType
    ).find({
      options,
      selectionSet: exportReactNodeTypeSelectionSet,
      where,
    })
  }

  protected async _add(reactNodeTypes: Array<IReactNodeTypeDTO>) {
    return (
      await (
        await this.ogmService.ReactNodeType
      ).create({
        input: reactNodeTypes.map(({ __typename, ...reactNodeType }) => ({
          ...reactNodeType,
          owner: connectAuth0Owner(this.authService.currentUser),
        })),
        selectionSet: `{ reactNodeTypes ${exportReactNodeTypeSelectionSet} }`,
      })
    ).reactNodeTypes
  }

  protected async _update(
    { __typename, id, name }: IReactNodeTypeDTO,
    where: ReactNodeTypeWhere,
  ) {
    return (
      await (
        await this.ogmService.ReactNodeType
      ).update({
        selectionSet: `{ reactNodeTypes ${exportReactNodeTypeSelectionSet} }`,
        update: { name },
        where,
      })
    ).reactNodeTypes[0]
  }
}
