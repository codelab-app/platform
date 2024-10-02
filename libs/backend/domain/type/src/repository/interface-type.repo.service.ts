import type {
  InterfaceType,
  InterfaceTypeOptions,
  InterfaceTypeWhere,
} from '@codelab/backend/abstract/codegen'
import type {
  IInterfaceTypeDto,
  ITypeMaybeRef,
} from '@codelab/shared/abstract/core'
import type { Static, TAnySchema } from '@sinclair/typebox'

import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import {
  getDependentTypes,
  interfaceTypeSelectionSet,
  Neo4jService,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import { connectNodeIds, connectOwner } from '@codelab/shared/domain'
import { Injectable } from '@nestjs/common'

@Injectable()
export class InterfaceTypeRepository extends AbstractRepository<
  IInterfaceTypeDto,
  InterfaceType,
  InterfaceTypeWhere,
  InterfaceTypeOptions
> {
  constructor(
    private ogmService: OgmService,

    private neo4jService: Neo4jService,
    protected override validationService: ValidationService,
    protected override loggerService: CodelabLoggerService,
    private authService: AuthDomainService,
  ) {
    super(validationService, loggerService)
  }

  async getDependentTypes<T extends TAnySchema>(
    { id }: ITypeMaybeRef,
    schema?: T,
  ): Promise<Array<Static<T>>> {
    return this.neo4jService.withReadTransaction(async (txn) => {
      const { records } = await txn.run(getDependentTypes, { id })

      const types = [...records.values()].flatMap((record) => [
        ...record.values(),
      ])

      if (schema) {
        for (const type of types) {
          return this.validationService.validateAndClean(schema, type)
        }
      }

      return types
    })
  }

  /**
   * If interface doesn't exist, we can safely assume that fields don't exist as well. So fields will always be created.
   *
   * Even if interface was deleted & fields are not, it is no harm to leave those old fields un-attached. We could run a clean up process for un-attached fields
   */
  protected async _addMany(interfaceTypes: Array<IInterfaceTypeDto>) {
    return (
      await (
        await this.ogmService.InterfaceType
      ).create({
        input: interfaceTypes.map(
          ({ __typename, fields, ...interfaceType }) => ({
            ...interfaceType,
            // fields: this.mapCreateFields(fields),
            fields: connectNodeIds(fields.map(({ id }) => id)),
            owner: connectOwner(this.authService.currentUser),
          }),
        ),
      })
    ).interfaceTypes
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
      selectionSet: `{ ${interfaceTypeSelectionSet} }`,
      where,
    })
  }

  /**
   * For update, we can't assume if fields exist or not.
   *
   * Scenario: Say a field was deleted, then we run a seeder, we would have to create for the deleted field
   */
  protected async _update(
    { __typename, fields, id, name, ...data }: IInterfaceTypeDto,
    where: InterfaceTypeWhere,
  ) {
    return (
      await (
        await this.ogmService.InterfaceType
      ).update({
        update: {
          name,
          // fields: this.mapUpdateFields(fields),
        },
        where,
      })
    ).interfaceTypes[0]
  }
}
