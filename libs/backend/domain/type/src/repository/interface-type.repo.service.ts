import type {
  InterfaceType,
  InterfaceTypeOptions,
  InterfaceTypeWhere,
} from '@codelab/backend/abstract/codegen'
import { AuthService } from '@codelab/backend/application/service'
import {
  getDependentTypes,
  interfaceTypeSelectionSet,
  Neo4jService,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import {
  type IInterfaceTypeDTO,
  type ITypeEntity,
} from '@codelab/shared/abstract/core'
import {
  connectAuth0Owner,
  connectNodeIds,
} from '@codelab/shared/domain/mapper'
import { Span } from '@codelab/backend/infra/adapter/otel'
import { Injectable } from '@nestjs/common'
import type { Static, TAnySchema } from '@sinclair/typebox'

@Injectable()
export class InterfaceTypeRepository extends AbstractRepository<
  IInterfaceTypeDTO,
  InterfaceType,
  InterfaceTypeWhere,
  InterfaceTypeOptions
> {
  constructor(
    private ogmService: OgmService,
    protected traceService: TraceService,
    private neo4jService: Neo4jService,
    protected validationService: ValidationService,
    private authService: AuthService,
  ) {
    super(traceService, validationService)
  }

  @Span()
  async getDependentTypes<T extends TAnySchema>(
    { id }: ITypeEntity,
    schema?: T,
  ): Promise<Array<Static<T>>> {
    return this.neo4jService.withReadTransaction(async (txn) => {
      const { records } = await txn.run(getDependentTypes, { id })

      this.traceService.addAttributes({ id, records })

      const types = records[0]?.get(0) ?? []

      if (schema) {
        for (const type of types) {
          return this.validationService.validateAndClean(schema, type)
        }
      }

      return types
    })
  }

  protected async _find({
    options,
    where,
  }: {
    options: InterfaceTypeOptions
    where: InterfaceTypeWhere
  }) {
    return await (
      await this.ogmService.InterfaceType
    ).find({
      options,
      selectionSet: interfaceTypeSelectionSet,
      where,
    })
  }

  /**
   * If interface doesn't exist, we can safely assume that fields don't exist as well. So fields will always be created.
   *
   * Even if interface was deleted & fields are not, it is no harm to leave those old fields un-attached. We could run a clean up process for un-attached fields
   */
  protected async _add(interfaceTypes: Array<IInterfaceTypeDTO>) {
    return (
      await (
        await this.ogmService.InterfaceType
      ).create({
        input: interfaceTypes.map(
          ({ __typename, fields, ...interfaceType }) => ({
            ...interfaceType,
            // fields: this.mapCreateFields(fields),
            fields: connectNodeIds(fields.map(({ id }) => id)),
            owner: connectAuth0Owner(this.authService.currentUser),
          }),
        ),
        selectionSet: `{ interfaceTypes ${interfaceTypeSelectionSet} }`,
      })
    ).interfaceTypes
  }

  /**
   * For update, we can't assume if fields exist or not.
   *
   * Scenario: Say a field was deleted, then we run a seeder, we would have to create for the deleted field
   */
  protected async _update(
    { __typename, fields, id, name, ...data }: IInterfaceTypeDTO,
    where: InterfaceTypeWhere,
  ) {
    return (
      await (
        await this.ogmService.InterfaceType
      ).update({
        selectionSet: `{ interfaceTypes ${interfaceTypeSelectionSet} }`,
        update: {
          name,
          // fields: this.mapUpdateFields(fields),
        },
        where,
      })
    ).interfaceTypes[0]
  }
}
