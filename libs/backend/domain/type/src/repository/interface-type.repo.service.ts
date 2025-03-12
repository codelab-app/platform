import type {
  IInterfaceTypeDto,
  INodeType,
  ITypeRef,
} from '@codelab/shared/abstract/core'
import type {
  InterfaceTypeOptions,
  InterfaceTypeWhere,
} from '@codelab/shared/infra/gqlgen'
import type { Static, TAnySchema } from '@sinclair/typebox'

import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import { AbstractRepository } from '@codelab/backend/infra/core'
import {
  getDependentTypes,
  Neo4jService,
} from '@codelab/backend-infra-adapter/neo4j-driver'
import { InterfaceTypeFragment } from '@codelab/shared/infra/gqlgen'
import { Validator } from '@codelab/shared/infra/typebox'
import {
  createTypeApi,
  findTypeApi,
  interfaceTypeMapper,
  updateTypeApi,
} from '@codelab/shared-domain-module/type'
import { Injectable } from '@nestjs/common'

@Injectable()
export class InterfaceTypeRepository extends AbstractRepository<
  INodeType.InterfaceType,
  IInterfaceTypeDto,
  InterfaceTypeFragment,
  InterfaceTypeWhere,
  InterfaceTypeOptions
> {
  constructor(
    private neo4jService: Neo4jService,

    protected override loggerService: PinoLoggerService,
  ) {
    super(loggerService)
  }

  async getDependentTypes<T extends TAnySchema>(
    { id }: ITypeRef,
    schema?: T,
  ): Promise<Array<Static<T>>> {
    return this.neo4jService.withReadTransaction(async (txn) => {
      const { records } = await txn.run(getDependentTypes, { id })

      const types = [...records.values()].flatMap((record) => [
        ...record.values(),
      ])

      if (schema) {
        for (const type of types) {
          return Validator.parse(schema, type)
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
    this.loggerService.log('interfaceTypes', {
      interfaceTypes: interfaceTypes.map((interfaceType) =>
        interfaceTypeMapper.toCreateInput(interfaceType),
      ),
    })

    const {
      types: { types },
    } = await createTypeApi().CreateInterfaceTypes({
      input: interfaceTypes.map((interfaceType) =>
        interfaceTypeMapper.toCreateInput(interfaceType),
      ),
    })

    return types
  }

  protected async _find({
    options,
    where,
  }: {
    options: InterfaceTypeOptions
    where: InterfaceTypeWhere
  }) {
    const { types } = await findTypeApi().GetInterfaceTypes({
      options,
      where,
    })

    return types
  }

  /**
   * For update, we can't assume if fields exist or not.
   *
   * Scenario: Say a field was deleted, then we run a seeder, we would have to create for the deleted field
   */
  protected async _update(dto: IInterfaceTypeDto, where: InterfaceTypeWhere) {
    const {
      types: { types },
    } = await updateTypeApi().UpdateInterfaceTypes({
      update: interfaceTypeMapper.toUpdateInput(dto),
      where,
    })

    return types[0]
  }
}
