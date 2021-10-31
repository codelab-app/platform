import {
  AntdDesignApi,
  LoggerService,
  LoggerTokens,
} from '@codelab/backend/infra'
import {
  CreateFieldRequest,
  CreateFieldService,
  CreateTypeInput,
  CreateTypeRequest,
  CreateTypeService,
  GetFieldInput,
  GetFieldService,
  GetTypeService,
  TypeRef,
} from '@codelab/backend/modules/type'
import { env } from '@codelab/backend/shared/testing'
import { createIfMissing } from '@codelab/backend/shared/utils'
import { IUser, TypeKind } from '@codelab/shared/abstract/core'
import { pascalCaseToWords } from '@codelab/shared/utils'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { BaseTypeName, baseTypes } from '../data/baseTypes'
import {
  CustomAtomApiFactory,
  CustomAtomApiFactoryInput,
} from '../utils/customAtomApi'
import {
  isReactNodeTypeRegex,
  isRenderPropType,
} from '../utils/isRenderPropType'
import { AtomSeeder } from './atom-seeder'

/**
 * Handle seeding of types
 */
@Injectable()
export class TypeSeeder {
  private baseTypes: Map<BaseTypeName, string> | undefined

  constructor(
    private createTypeService: CreateTypeService,
    private getTypeService: GetTypeService,
    private createFieldService: CreateFieldService,
    private getFieldService: GetFieldService,
    private atomSeeder: AtomSeeder,
    @Inject(LoggerTokens.LoggerProvider) private logger: LoggerService,
  ) {}

  public async seedBaseTypes(currentUser: IUser) {
    this.baseTypes = await this.seedAllIfMissing(baseTypes, currentUser)

    return this.baseTypes
  }

  /**
   * Checks which of those types exists by the same name
   * Those that are missing are created
   * Returns a map of all input type names and their ids
   */
  private async seedAllIfMissing(
    inputs: Array<CreateTypeInput>,
    currentUser: IUser,
  ): Promise<Map<BaseTypeName, string>> {
    const results: Map<BaseTypeName, string> = new Map()
    const isCi = env === 'ci'

    for (const input of inputs) {
      const handle = async () => {
        const result = await this.seedTypeIfNotExisting({
          input,
          currentUser,
        }).then((id) => ({
          key: input.name,
          id,
        }))

        results.set(result.key as any, result.id)
      }

      if (isCi) {
        await new Promise((resolve, reject) => {
          setTimeout(() => handle().then(resolve).catch(reject), 500)
        })
      } else {
        await handle()
      }
    }

    return results
  }

  /**
   * Checks if a type with the same name exists, if not - creates it
   * Returns the id in both cases
   */
  private async seedTypeIfNotExisting(
    request: CreateTypeRequest,
  ): Promise<string> {
    const { input, currentUser } = request

    return createIfMissing(
      () => this.getTypeByName(input.name, currentUser),
      () => this.createType(request),
    )
  }

  public async seedAtomApi(
    atomId: string,
    data: Array<AntdDesignApi>,
    currentUser: IUser,
  ) {
    this.logger.log('Seeding atom api...')

    const atom = await this.atomSeeder.getAtom({ where: { id: atomId } })

    if (!atom) {
      throw new Error(`Atom ${atomId} doesn't exist`)
    }

    const atomApiId = atom.api?.id

    if (!atomApiId) {
      throw new Error("Atom doesn't have API")
    }

    for (const apiField of data) {
      this.logger.log(apiField, 'Seeding api field...')

      const type = await this.getTypeForApi(apiField, atom.name)

      if (type) {
        await this.createFieldIfMissing({
          input: {
            key: apiField.property,
            name: pascalCaseToWords(apiField.property),
            interfaceId: atomApiId,
            description: apiField.description,
            type,
          },
          currentUser,
        })

        continue
      }

      const unionTypeData = await this.getUnionTypeData(apiField, atom.name)

      if (!unionTypeData) {
        continue
      }

      if (unionTypeData.enumValues.length > 0) {
        const enumTypeId = await this.seedTypeIfNotExisting({
          currentUser,
          input: this.createEnumTypeInputForAtomType(
            atom.name,
            apiField.property,
            unionTypeData.enumValues,
          ),
        })

        unionTypeData.newType.unionType.typeIdsOfUnionType.push(enumTypeId)
      }

      await this.createFieldIfMissing({
        input: {
          key: apiField.property,
          name: pascalCaseToWords(apiField.property),
          interfaceId: atomApiId,
          description: apiField.description,
          type: { newType: unionTypeData.newType },
        },
        currentUser,
      })
    }
  }

  private createEnumTypeInputForAtomType = (
    atomName: string,
    property: string,
    allowValues: Array<string>,
  ) => ({
    typeKind: TypeKind.EnumType,
    name: `${atomName} ${pascalCaseToWords(property)} Enum`,
    enumType: {
      allowedValues: allowValues.map((value) => ({
        value,
        name: pascalCaseToWords(value),
      })),
    },
  })

  private async getUnionTypeData(apiField: AntdDesignApi, atomName: string) {
    const type = apiField.type.trim()
    const isUnionType = type.includes('|')

    if (!isUnionType) {
      return undefined
    }

    const processedData = type
      .split('|')
      .map((mappedType) => mappedType.trim())
      // Either a type id , or a map
      .reduce<{ ids: Array<string>; enumValues: Array<string> }>(
        (reducedData, mappedType) => {
          const typeRef = this.getTypeForApi(
            { ...apiField, type: mappedType },
            atomName,
          )

          if (typeRef?.existingTypeId) {
            reducedData.ids.push(typeRef.existingTypeId)

            return reducedData
          }

          // enum values should be something likes: abc, or 'abc' not {key: 'value'}, or [1,2,3]....
          if (/^[a-zA-Z1-9]+$/.test(mappedType) || /^'.+'$/.test(mappedType)) {
            reducedData.enumValues.push(mappedType)
          }

          return reducedData
        },
        { ids: [], enumValues: [] },
      )

    if (
      processedData.ids.length === 0 &&
      processedData.enumValues.length === 0
    ) {
      return undefined
    }

    return {
      enumValues: processedData.enumValues,
      newType: {
        typeKind: TypeKind.UnionType,
        name: `${atomName} ${pascalCaseToWords(apiField.property)} Union Type`,
        unionType: {
          typeIdsOfUnionType: processedData.ids,
        },
      },
    }
  }

  private async createFieldIfMissing(
    request: CreateFieldRequest,
  ): Promise<string> {
    try {
      return await this.createField(request)
    } catch (e: any) {
      if (!e?.toString().includes('already exists')) {
        throw e
      }

      // field already exists with this key
      const foundField = await this.getField({
        byInterface: {
          interfaceId: request.input.interfaceId,
          fieldKey: request.input.key,
        },
      })

      return foundField?.id as string
    }
  }

  public async seedCustomAtomApis(
    allCustomAtomApiFactories: Array<CustomAtomApiFactory>,
    currentUser: IUser,
  ) {
    if (!this.baseTypes) {
      throw new Error("call seedBaseTypes before seeding Atom's API")
    }

    const factoryInput: CustomAtomApiFactoryInput = {
      baseTypeIdsByName: this.baseTypes,
      createTypeIfMissing: (typeInput) =>
        this.seedTypeIfNotExisting({ input: typeInput, currentUser }),
      createFieldIfMissing: (fieldInput) =>
        this.createFieldIfMissing({ input: fieldInput, currentUser }),
    }

    for (const apiFactory of allCustomAtomApiFactories) {
      const api = await apiFactory(factoryInput)

      const atom = await this.atomSeeder.getAtom({
        where: { type: api.atomType },
      })

      if (!atom) {
        throw new Error(
          `Error while seeding custom atoms, atom with type ${api.atomType} not found`,
        )
      }

      if (!atom.api?.id) {
        throw new Error("Atom doesn't have API")
      }

      for (const field of api.fields) {
        await this.createFieldIfMissing({
          input: {
            ...field,
            interfaceId: atom.api.id,
          },
          currentUser,
        })
      }
    }
  }

  private getTypeByName(name: string, currentUser: IUser) {
    return this.getTypeService
      .execute({ input: { where: { name } }, currentUser })
      .then((r) => r?.id)
  }

  private getField(input: GetFieldInput) {
    return this.getFieldService.execute({ input })
  }

  private async createType(request: CreateTypeRequest) {
    const createResponse = await this.createTypeService.execute(request)

    if (!createResponse?.id) {
      throw new Error(
        `Something went wrong while creating type ${request.input.name}`,
      )
    }

    console.debug(`Created type ${request.input.name}`)

    return createResponse.id
  }

  private async createField(request: CreateFieldRequest) {
    const createResponse = await this.createFieldService.execute(request)

    if (!createResponse?.id) {
      throw new Error(
        `Something went wrong while creating field ${request.input.name}`,
      )
    }

    Logger.debug(`Created field ${request.input.name}`)

    return createResponse.id
  }

  private getTypeForApi(
    apiField: AntdDesignApi,
    atomName: string,
  ): TypeRef | undefined {
    if (apiField.isEnum) {
      const enumValues = apiField.type.split('|').map((v) => v.trim())

      return {
        newType: this.createEnumTypeInputForAtomType(
          atomName,
          apiField.property,
          enumValues,
        ),
      }
    }

    const type = apiField.type.trim()

    if (!this.baseTypes) {
      throw new Error("call seedBaseTypes before seeding Atom's API")
    }

    if (isReactNodeTypeRegex.test(type)) {
      return {
        existingTypeId: this.baseTypes.get(BaseTypeName.ReactNode) as string,
      }
    }

    if (isRenderPropType(type)) {
      return {
        existingTypeId: this.baseTypes.get(BaseTypeName.RenderProps) as string,
      }
    }

    switch (type) {
      case 'boolean':
        return {
          existingTypeId: this.baseTypes.get(BaseTypeName.Boolean) as string,
        }
      case 'number':
        return {
          existingTypeId: this.baseTypes.get(BaseTypeName.Float) as string,
        }
      case 'string':
        return {
          existingTypeId: this.baseTypes.get(BaseTypeName.String) as string,
        }
      case 'LambdaType':
        return {
          existingTypeId: this.baseTypes.get(BaseTypeName.Lambda) as string,
        }
      case 'ComponentType':
        return {
          existingTypeId: this.baseTypes.get(BaseTypeName.Component) as string,
        }
      case 'number | string':
      case 'string | number':
        return {
          existingTypeId: this.baseTypes.get(BaseTypeName.String) as string,
        }
    }

    return undefined
  }
}
