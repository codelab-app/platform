import type { AnyType } from '@codelab/backend/abstract/codegen'
import type {
  IApiOutputDto,
  ITypeOutputDto,
} from '@codelab/backend/abstract/core'
import {
  ArrayTypeRepository,
  FieldRepository,
  InterfaceTypeRepository,
  TypeFactory,
} from '@codelab/backend/domain/type'
import type {
  IApiEntity,
  IFieldDTO,
  IInterfaceTypeDTO,
  IInterfaceTypeEntity,
  ITypeDTO,
  ITypeEntity,
} from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { IEntity } from '@codelab/shared/abstract/types'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandHandler } from '@nestjs/cqrs'

export class ExportApiCommand {
  constructor(public api: IApiEntity) {}
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
    private readonly fieldRepository: FieldRepository,
  ) {}

  async execute(command: ExportApiCommand): Promise<IApiOutputDto> {
    const { api } = command

    /**
     * 1) Get all dependent types first
     */
    const nestedTypes = await this.interfaceTypeRepository.getDependentTypes(
      api,
    )

    const interfaceTypes = nestedTypes.filter(
      (type): type is IInterfaceTypeDTO =>
        type.__typename === `${ITypeKind.InterfaceType}`,
    )

    if (!interfaceTypes.length) {
      throw new Error('InterfaceType not found')
    }

    const fieldIds = interfaceTypes.reduce(
      (accFieldIds, { id }) => ({
        ...accFieldIds,
        id,
      }),
      [] as Array<string>,
    )

    const fields = await this.fieldRepository.find({
      where: { id_IN: fieldIds },
    })

    return {
      api: interfaceTypes[0]!,
      fields,
      types: nestedTypes,
    }
  }

  /**
   * Recursively get all nested interfaces through fields. We do this since searching for more than 1 connection in GraphQL is O(n)
   */
  // async getNestedTypes({
  //   __typename,
  //   id,
  // }: ITypeEntity): Promise<ITypeOutputDto> {
  //   if (__typename === ITypeKind.InterfaceType) {
  //     const interfaceType = await this.interfaceTypeRepository.findOne({ id })

  //     if (!interfaceType) {
  //       throw new Error('Missing interfaceType')
  //     }

  //     const fieldTypes = interfaceType.fields.map((field) => field.fieldType)

  //     const types: Array<ITypeOutputDto> = await Promise.all(
  //       fieldTypes.map((fieldType) => this.getNestedTypes(fieldType)),
  //     )

  //     const typesExport: ITypeOutputDto = {
  //       fields: [
  //         ...interfaceType.fields,
  //         ...types.map((result) => result.fields).flat(),
  //       ],
  //       types: [interfaceType, ...types.map((result) => result.types).flat()],
  //     }

  //     return typesExport
  //   }

  //   if (__typename === ITypeKind.ArrayType) {
  //     const arrayType = await this.arrayTypeRepository.findOne({ id })

  //     if (!arrayType) {
  //       throw new Error('Missing ArrayType')
  //     }

  //     const itemType = arrayType.itemType
  //     const results = await this.getNestedTypes(itemType)

  //     return { fields: results.fields, types: [...results.types, arrayType] }
  //   }

  //   return { fields: [], types: [] }
  // }
}
