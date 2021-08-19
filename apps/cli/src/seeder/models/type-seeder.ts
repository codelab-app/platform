import { AntdDesignApi } from '@codelab/backend/infra'
import {
  CreateFieldGql,
  CreateFieldInput,
  CreateFieldMutation,
  CreateFieldMutationVariables,
  CreateTypeGql,
  CreateTypeInput,
  CreateTypeMutation,
  CreateTypeMutationVariables,
  GetFieldGql,
  GetFieldInput,
  GetFieldQuery,
  GetFieldQueryVariables,
  GetTypeGql,
  GetTypeQuery,
  GetTypeQueryVariables,
  TypeRef,
} from '@codelab/shared/codegen/graphql'
import { pascalCaseToWords } from '@codelab/shared/utils'
import { GraphQLClient } from 'graphql-request'
import { BaseTypeName, baseTypes } from '../data/baseTypes'
import { createIfMissing } from '../utils/createIfMissing'
import {
  CustomAtomApiFactory,
  CustomAtomApiFactoryInput,
} from '../utils/customAtomApi'
import { AtomSeeder } from './atom-seeder'

/**
 * Handle seeding of types
 */
export class TypeSeeder {
  private baseTypes: Map<BaseTypeName, string> | undefined

  constructor(private client: GraphQLClient, private atomSeeder: AtomSeeder) {}

  public async seedBaseTypes() {
    this.baseTypes = await this.seedAllIfMissing(baseTypes)

    return this.baseTypes
  }

  /**
   * Checks which of those types exists by the same name
   * Those that are missing are created
   * Returns a map of all input type names and their ids
   */
  private async seedAllIfMissing(
    inputs: Array<CreateTypeInput>,
  ): Promise<Map<BaseTypeName, string>> {
    const results = await Promise.all(
      inputs.map((input) =>
        this.seedTypeIfNotExisting(input).then((id) => ({
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
  private async seedTypeIfNotExisting(input: CreateTypeInput): Promise<string> {
    return createIfMissing(
      () => this.getTypeByName(input.name),
      () => this.createType(input),
    )
  }

  public async seedAtomApi(atomId: string, data: Array<AntdDesignApi>) {
    const atom = await this.atomSeeder.getAtom({ where: { id: atomId } })

    if (!atom) {
      throw new Error(`Atom ${atomId} doesn't exist`)
    }

    const atomApiId = atom.api.id

    for (const apiField of data) {
      const type = this.getTypeForApi(apiField, atom.name)

      if (!type) {
        continue
      }

      await this.createFieldIfMissing({
        key: apiField.property,
        name: pascalCaseToWords(apiField.property),
        interfaceId: atomApiId,
        description: apiField.description,
        type,
      })
    }
  }

  private async createFieldIfMissing(input: CreateFieldInput): Promise<string> {
    try {
      return await this.createField(input)
    } catch (e) {
      if (!e.toString().includes('already exists')) {
        throw e
      }

      // field already exists with this key
      const foundField = await this.getField({
        byInterface: { interfaceId: input.interfaceId, fieldKey: input.key },
      })

      return foundField?.id as string
    }
  }

  public async seedCustomAtomApis(
    allCustomAtomApiFactories: Array<CustomAtomApiFactory>,
  ) {
    if (!this.baseTypes) {
      throw new Error("call seedBaseTypes before seeding Atom's API")
    }

    const factoryInput: CustomAtomApiFactoryInput = {
      baseTypeIdsByName: this.baseTypes,
      createTypeIfMissing: (typeInput) => this.seedTypeIfNotExisting(typeInput),
      createFieldIfMissing: (fieldInput) =>
        this.createFieldIfMissing(fieldInput),
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
          ...field,
          interfaceId: atom.api.id,
        })
      }
    }
  }

  private getTypeByName(name: string) {
    return this.client
      .request<GetTypeQuery, GetTypeQueryVariables>(GetTypeGql, {
        input: { where: { name } },
      })
      .then((r) => r?.getType?.id)
  }

  private getField(input: GetFieldInput) {
    return this.client
      .request<GetFieldQuery, GetFieldQueryVariables>(GetFieldGql, {
        input,
      })
      .then((r) => r?.getField)
  }

  private async createType(typeInput: CreateTypeInput) {
    const createResponse = await this.client.request<
      CreateTypeMutation,
      CreateTypeMutationVariables
    >(CreateTypeGql, {
      input: typeInput,
    })

    if (!createResponse?.createType) {
      throw new Error(
        `Something went wrong while creating type ${typeInput.name}`,
      )
    }

    console.log(`Created type ${typeInput.name}`)

    return createResponse.createType.id
  }

  private async createField(input: CreateFieldInput) {
    const createResponse = await this.client.request<
      CreateFieldMutation,
      CreateFieldMutationVariables
    >(CreateFieldGql, { input })

    if (!createResponse?.createField) {
      throw new Error(`Something went wrong while creating field ${input.name}`)
    }

    console.log(`Created field ${input.name}`)

    return createResponse.createField.id
  }

  private getTypeForApi(
    apiField: AntdDesignApi,
    atomName: string,
  ): TypeRef | undefined {
    if (apiField.isEnum) {
      const enumValues = apiField.type.split('|').map((v) => v.trim())

      return {
        newType: {
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
