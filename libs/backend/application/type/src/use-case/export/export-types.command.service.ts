import type { AnyType } from '@codelab/backend/abstract/codegen'
import type { IApiOutputDto } from '@codelab/backend/abstract/core'
import {
  ActionTypeRepository,
  ArrayTypeRepository,
  EnumTypeRepository,
  FieldRepository,
  InterfaceTypeRepository,
  TypeFactory,
  UnionTypeRepository,
} from '@codelab/backend/domain/type'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import type { ITypeEntity } from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'

export class ExportTypesCommand {
  constructor(public typeIds: Array<ITypeEntity>) {}
}

/**
 * Export top level types and all nested types. The dependency of the types should be ordered
 */
@CommandHandler(ExportTypesCommand)
export class ExportTypesHandler
  implements ICommandHandler<ExportTypesCommand, IApiOutputDto>
{
  constructor(
    private readonly enumTypeRepository: EnumTypeRepository,
    private readonly interfaceTypeRepository: InterfaceTypeRepository,
    private readonly fieldRepository: FieldRepository,
    private readonly arrayTypeRepository: ArrayTypeRepository,
    private readonly actionTypeRepository: ActionTypeRepository,
    private readonly unionTypeRepository: UnionTypeRepository,
    private readonly commandBus: CommandBus,
    private readonly typeFactory: TypeFactory,
    private traceService: TraceService,
  ) {}

  async execute(command: ExportTypesCommand): Promise<IApiOutputDto> {
    const { typeIds } = command

    /**
     * 1) Get all dependent types first
     */
    const result = await Promise.all(
      typeIds.map((typeId) => this.getNestedTypes(typeId)),
    )

    const types = result.flatMap((res) => res.types)
    const fields = result.flatMap((res) => res.fields)

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
  async getNestedTypes({
    __typename,
    id,
  }: ITypeEntity): Promise<IApiOutputDto> {
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
