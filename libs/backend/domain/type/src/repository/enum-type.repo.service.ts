import type { IEnumTypeDto, INodeType } from '@codelab/shared-abstract-core'
import type {
  EnumTypeFragment,
  EnumTypeOptions,
  EnumTypeWhere,
} from '@codelab/shared-infra-gqlgen'

import { PinoLoggerService } from '@codelab/backend-infra-adapter-logger'
import { AbstractRepository } from '@codelab/backend-infra-core'
import {
  createTypeApi,
  enumTypeMapper,
  findTypeApi,
  updateTypeApi,
} from '@codelab/shared-domain-module-type'
import { Injectable } from '@nestjs/common'

@Injectable()
export class EnumTypeRepository extends AbstractRepository<
  INodeType.EnumType,
  IEnumTypeDto,
  EnumTypeFragment,
  EnumTypeWhere,
  EnumTypeOptions
> {
  constructor(protected override loggerService: PinoLoggerService) {
    super(loggerService)
  }

  protected async _addMany(enumTypes: Array<IEnumTypeDto>) {
    // Create the enum types with no allowedValues first to keep initial mutation light
    const withoutValues = enumTypes.map((dto) => ({
      ...enumTypeMapper.toCreateInput({ ...dto, allowedValues: [] }),
      allowedValues: undefined,
    }))

    const {
      types: { types: created },
    } = await createTypeApi().CreateEnumTypes({ input: withoutValues })

    // Append allowedValues in manageable chunks to avoid single huge transactions
    const BATCH_SIZE = 100

    for (const dto of enumTypes) {
      for (let i = 0; i < dto.allowedValues.length; i += BATCH_SIZE) {
        const slice = dto.allowedValues.slice(i, i + BATCH_SIZE)

        await updateTypeApi().UpdateEnumTypes({
          update: {
            allowedValues: [
              {
                create: slice.map((value) => ({
                  node: { id: value.id, key: value.key, value: value.value },
                })),
              },
            ],
          },
          where: { id: dto.id },
        })
      }
    }

    return created
  }

  protected async _find({
    options,
    where,
  }: {
    where?: EnumTypeWhere
    options?: EnumTypeOptions
  }) {
    const { types } = await findTypeApi().GetEnumTypes({
      options,
      where,
    })

    return types
  }

  protected async _update(enumType: IEnumTypeDto, where: EnumTypeWhere) {
    const {
      types: { types },
    } = await updateTypeApi().UpdateEnumTypes({
      update: enumTypeMapper.toUpdateInput(enumType),
      where,
    })

    return types[0]
  }
}
