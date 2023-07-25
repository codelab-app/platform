import { SortDirection } from '@codelab/backend/abstract/codegen'
import type { ITypesExport } from '@codelab/backend/abstract/core'
import {
  ArrayTypeRepository,
  EnumTypeRepository,
  FieldRepository,
  InterfaceTypeRepository,
  UnionTypeRepository,
} from '@codelab/backend/domain/type'
import type { ITypeEntity } from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'

/**
 * Allows us to get only types for an api
 */
export interface TypesToExport {
  /**
   * We will resolve dependent types and fields
   */
  typeIds: Array<ITypeEntity>
}

export class ExportTypesCommand {
  constructor(public typesToExport: TypesToExport) {}
}

/**
 * These are types created by the admin, mostly types related to an atom.
 *
 * We export api separately since those can be it's own file
 */
@CommandHandler(ExportTypesCommand)
export class ExportTypesHandler
  implements ICommandHandler<ExportTypesCommand, ITypesExport>
{
  constructor(
    private readonly enumTypeRepository: EnumTypeRepository,
    private readonly interfaceTypeRepository: InterfaceTypeRepository,
    private readonly fieldRepository: FieldRepository,
    private readonly arrayTypeRepository: ArrayTypeRepository,
    private readonly unionTypeRepository: UnionTypeRepository,
    private readonly commandBus: CommandBus,
  ) {}

  async execute(command: ExportTypesCommand): Promise<ITypesExport> {
    const {
      typesToExport: { typeIds },
    } = command

    /**
     * 1) Get all dependent interface types first
     */
    const result = await Promise.all(
      typeIds.map((typeId) => this.getNestedTypes(typeId)),
    )

    const types = result.flatMap((res) => res.types)
    const fields = result.flatMap((res) => res.fields)

    /**
     * 3) Resolve all dependent types
     */
    const dependantTypes = await this.execute({
      typesToExport: { typeIds: fields.flatMap((field) => field.fieldType) },
    })

    return {
      fields,
      types: [...dependantTypes.types, ...types],
    }
  }

  /**
   * Recursively get all nested interfaces through fields. We do this since searching for more than 1 connection in GraphQL is O(n)
   */
  async getNestedTypes({ __typename, id }: ITypeEntity): Promise<ITypesExport> {
    if (__typename === ITypeKind.InterfaceType) {
      const interfaceType = await this.interfaceTypeRepository.findOne({ id })

      if (!interfaceType) {
        throw new Error('Missing interfaceType')
      }

      const fieldTypes = interfaceType.fields.map((field) => field.fieldType)

      const results: Array<ITypesExport> = await Promise.all(
        fieldTypes.map((fieldType) => this.getNestedTypes(fieldType)),
      )

      const typesExport: ITypesExport = {
        fields: [
          ...interfaceType.fields,
          ...results.map((result) => result.fields).flat(),
        ],
        types: [interfaceType, ...results.map((result) => result.types).flat()],
      }

      return typesExport
    }

    if (__typename === ITypeKind.ActionType) {
      const arrayType = await this.arrayTypeRepository.findOne({ id })

      if (!arrayType) {
        throw new Error('Missing arrayType')
      }

      const itemType = arrayType.itemType
      const results = await this.getNestedTypes(itemType)

      return { fields: results.fields, types: [...results.types, arrayType] }
    }

    return { fields: [], types: [] }
  }

  async exportType({ __typename, id }: ITypeEntity) {
    if (!__typename) {
      throw new Error('Missing __typename')
    }

    switch (__typename) {
      case ITypeKind.InterfaceType: {
        //
      }
    }

    /**
     * UnionTypes
     */
    const unionTypes = (
      await this.unionTypeRepository.find({
        options: {
          sort: [{ name: SortDirection.Asc }],
        },
        where: {
          id,
        },
      })
    ).map(({ descendantTypesIds, typesOfUnionType, ...unionType }) => {
      console.log(descendantTypesIds, descendantTypesIds.sort())

      return {
        ...unionType,
        descendantTypesIds: descendantTypesIds.sort(),
        typesOfUnionType: typesOfUnionType.sort((a, b) =>
          a.name.localeCompare(b.name),
        ),
      }
    })

    /**
     * Array
     */
    const arrayTypes = await this.arrayTypeRepository.find({
      options: {
        sort: [{ name: SortDirection.Asc }],
      },
      where: {
        id,
      },
    })

    const arrayUnionItemTypes = await this.unionTypeRepository.find({
      options: {
        sort: [{ name: SortDirection.Asc }],
      },
      where: {
        id_IN: arrayTypes
          .filter(
            (arrayType) => arrayType.itemType.kind === ITypeKind.UnionType,
          )
          .map((arrayType) => arrayType.itemType.id),
      },
    })

    const unionInterfaceItemTypes = await this.interfaceTypeRepository.find({
      options: {
        sort: [{ name: SortDirection.Asc }],
      },
      where: {
        id_IN: [...arrayUnionItemTypes, ...unionTypes]
          .map((unionType) => unionType.descendantTypesIds)
          .flat(),
      },
    })

    /**
     * Enum
     */
    const enumTypes = (
      await this.enumTypeRepository.find({
        options: {
          sort: [{ name: SortDirection.Asc }],
        },
        where: apiId
          ? {
              fieldRefsConnection: {
                node: {
                  apiConnection: {
                    node: {
                      id: apiId,
                    },
                  },
                },
              },
            }
          : undefined,
      })
    ).map((type) => ({
      ...type,
      allowedValues: type.allowedValues.sort((a, b) =>
        a.key.toString().localeCompare(b.key),
      ),
    }))

    /**
     * Here we create the interface dependency tree order
     *
     * Further to the front are closer to the leaf.
     *
     * Subtypes are included first so that they can be referenced in the parent type
     */
    return {
      fields: [...subTypes.map((value) => value.fields).flat(), ...fields],
      types: [...subTypes.map((subType) => subType.types).flat(), ...types],
    }
  }
}
