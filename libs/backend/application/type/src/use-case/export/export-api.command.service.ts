import type { AnyType } from '@codelab/backend/abstract/codegen'
import type { IApiOutputDto } from '@codelab/backend/abstract/core'
import {
  ArrayTypeRepository,
  InterfaceTypeRepository,
  TypeFactory,
} from '@codelab/backend/domain/type'
import type { IApiEntity, ITypeEntity } from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandHandler } from '@nestjs/cqrs'

export class ExportApiCommand {
  constructor(public apiId: IApiEntity) {}
}

/**
 * Export top level types and all nested types. The dependency of the types should be ordered
 */
@CommandHandler(ExportApiCommand)
export class ExportApiHandler
  implements ICommandHandler<ExportApiCommand, IApiOutputDto>
{
  constructor(
    private readonly interfaceTypeRepository: InterfaceTypeRepository,
    private readonly arrayTypeRepository: ArrayTypeRepository,
    private readonly typeFactory: TypeFactory,
  ) {}

  async execute(command: ExportApiCommand): Promise<IApiOutputDto> {
    const { apiId } = command
    /**
     * 1) Get all dependent types first
     */
    const { fields, types } = await this.getNestedTypes(apiId)

    /**
     * 3) Resolve all dependent types
     */
    const dependantTypes = (
      await Promise.all(
        fields.flatMap((field) => this.typeFactory.findOne(field.fieldType)),
      )
    ).filter((type): type is AnyType => Boolean(type))

    return {
      fields,
      types: [...dependantTypes, ...types],
    }
  }

  /**
   * Recursively get all nested interfaces through fields. We do this since searching for more than 1 connection in GraphQL is O(n)
   */
  async getNestedTypes({ __typename, id }: IApiEntity): Promise<IApiOutputDto> {
    if (__typename === ITypeKind.InterfaceType) {
      const interfaceType = await this.interfaceTypeRepository.findOne({ id })

      if (!interfaceType) {
        throw new Error('Missing interfaceType')
      }

      const fieldTypes = interfaceType.fields.map((field) => field.fieldType)

      const types: Array<IApiOutputDto> = await Promise.all(
        fieldTypes.map((fieldType) => this.getNestedTypes(fieldType)),
      )

      const typesExport: IApiOutputDto = {
        fields: [
          ...interfaceType.fields,
          ...types.map((result) => result.fields).flat(),
        ],
        types: [interfaceType, ...types.map((result) => result.types).flat()],
      }

      return typesExport
    }

    if (__typename === ITypeKind.ArrayType) {
      const arrayType = await this.arrayTypeRepository.findOne({ id })

      if (!arrayType) {
        throw new Error('Missing ArrayType')
      }

      const itemType = arrayType.itemType
      const results = await this.getNestedTypes(itemType)

      return { fields: results.fields, types: [...results.types, arrayType] }
    }

    return { fields: [], types: [] }
  }
}
