import type {
  InterfaceType,
  InterfaceTypeFieldsFieldInput,
  InterfaceTypeOptions,
  InterfaceTypeWhere,
} from '@codelab/backend/abstract/codegen'
import {
  getDependentTypes,
  interfaceTypeSelectionSet,
  Neo4jService,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { AbstractRepository } from '@codelab/backend/infra/core'
import {
  type IFieldDTO,
  type IInterfaceTypeDTO,
  type ITypeDTO,
  type ITypeEntity,
} from '@codelab/shared/abstract/core'
import { Typebox } from '@codelab/shared/abstract/types'
import {
  connectAuth0Owner,
  connectNodeId,
  connectNodeIds,
} from '@codelab/shared/domain/mapper'
import { Span } from '@codelab/shared/infra/otel'
import { Injectable } from '@nestjs/common'
import { type TAnySchema } from '@sinclair/typebox'
import { ValidationService } from 'backend/infra/adapter/typebox'

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
  ) {
    super(traceService, validationService)
  }

  @Span()
  async getDependentTypes(
    { id }: ITypeEntity,
    schema?: TAnySchema,
  ): Promise<Array<ITypeDTO>> {
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
          ({ __typename, fields, owner, ...interfaceType }) => ({
            ...interfaceType,
            // fields: this.mapCreateFields(fields),
            fields: connectNodeIds(fields.map(({ id }) => id)),
            owner: connectAuth0Owner(owner),
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
    { __typename, fields, id, name, owner, ...data }: IInterfaceTypeDTO,
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

  private mapCreateFields(
    fields: Array<IFieldDTO>,
  ): InterfaceTypeFieldsFieldInput {
    return {
      create: fields.map(
        ({ api, fieldType, nextSibling, prevSibling, ...field }) => ({
          node: {
            ...field,
            fieldType: connectNodeId(fieldType.id),
            nextSibling: connectNodeId(nextSibling?.id),
            prevSibling: connectNodeId(prevSibling?.id),
          },
        }),
      ),
    }
  }

  /**
   * Don't update fields in interface. If done here, would have to assume the fields exist or not.
   *
   * Different logic exists for field update or creation here
   */
  // private mapUpdateFields(
  //   fields: Array<IField>,
  // ): InterfaceTypeFieldsUpdateFieldInput {
  //   return {
  //     create: fields.map(({ api, fieldType, ...field }) => ({
  //       node: {
  //         ...field,
  //         fieldType: connectNode(fieldType.id),
  //       },
  //     })),
  //   }
  // }
}
