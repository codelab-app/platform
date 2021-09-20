import { AntdDesignApi } from '@codelab/backend/infra'
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
import { createIfMissing } from '@codelab/backend/shared/utils'
import { TypeKind, User } from '@codelab/shared/abstract/core'
import { pascalCaseToWords } from '@codelab/shared/utils'
import { Injectable, Logger } from '@nestjs/common'
import { BaseTypeName, baseTypes } from '../data/baseTypes'
import {
  CustomAtomApiFactory,
  CustomAtomApiFactoryInput,
} from '../utils/customAtomApi'
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
  ) {}

  public async seedBaseTypes(currentUser: User) {
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
    currentUser: User,
  ): Promise<Map<BaseTypeName, string>> {
    const results = await Promise.all(
      inputs.map((input) =>
        this.seedTypeIfNotExisting({ input, currentUser }).then((id) => ({
          key: input.name,
          id,
        })),
      ),
    )

    return new Map(results.map(({ key, id }) => [key as BaseTypeName, id]))
  }

  /**
   * Checks if a type with the same name exists, if not - creates it
   * Returns the id in both cases
   */
  private async seedTypeIfNotExisting(
    request: CreateTypeRequest,
  ): Promise<string> {
    const { input, currentUser } = request

    return await createIfMissing(
      () => this.getTypeByName(input.name, currentUser),
      () => this.createType(request),
    )
  }

  public async seedAtomApi(
    atomId: string,
    data: Array<AntdDesignApi>,
    currentUser: User,
  ) {
    const atom = await this.atomSeeder.getAtom({ where: { id: atomId } })

    if (!atom) {
      throw new Error(`Atom ${atomId} doesn't exist`)
    }

    const atomApiId = atom.api.uid

    for (const apiField of data) {
      const type = this.getTypeForApi(apiField, atom.name)

      if (!type) {
        // console.log(`${apiField.type} is not valid`)
        continue
      }

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

      return foundField?.uid as string
    }
  }

  public async seedCustomAtomApis(
    allCustomAtomApiFactories: Array<CustomAtomApiFactory>,
    currentUser: User,
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

      for (const field of api.fields) {
        await this.createFieldIfMissing({
          input: {
            ...field,
            interfaceId: atom.api.uid,
          },
          currentUser,
        })
      }
    }
  }

  private getTypeByName(name: string, currentUser: User) {
    return this.getTypeService
      .execute({ input: { where: { name } }, currentUser })
      .then((r) => r?.uid)
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
        newType: {
          typeKind: TypeKind.EnumType,
          name: `${atomName} ${pascalCaseToWords(apiField.property)} Enum`,
          enumType: {
            allowedValues: enumValues.map((value) => ({
              value,
              name: pascalCaseToWords(value),
            })),
          },
        },
      }
    }

    const type = apiField.type.trim()

    if (!this.baseTypes) {
      throw new Error("call seedBaseTypes before seeding Atom's API")
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
