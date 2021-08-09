import { AntdDesignApi } from '@codelab/backend'
import {
  CreateFieldGql,
  CreateFieldInput,
  CreateFieldMutation,
  CreateFieldMutationVariables,
  CreateTypeGql,
  CreateTypeInput,
  CreateTypeMutation,
  CreateTypeMutationVariables,
  GetAtomGql,
  GetAtomQuery,
  GetAtomQueryVariables,
  GetFieldGql,
  GetFieldInput,
  GetFieldQuery,
  GetFieldQueryVariables,
  GetTypeGql,
  GetTypeQuery,
  GetTypeQueryVariables,
  PrimitiveKind,
  TypeRef,
} from '@codelab/codegen/graphql'
import { GraphQLClient } from 'graphql-request'
import { baseTypeCreateInputs } from '../data/baseTypeCreateInputs'
import { primitiveTypeCreateInputs } from '../data/primitiveTypeCreateInputs'
import { createIfNotExisting } from './createIfNotExisting'
import { snakeCaseToWords } from './snakeCaseToWords'

/**
 * Handle seeding of types
 */
export class TypeSeeder {
  private primitiveTypes: Map<string, string> | undefined

  private baseTypes: Map<string, string> | undefined

  constructor(private client: GraphQLClient) {}

  //
  // Public methods:
  //

  async seedBaseTypes() {
    this.baseTypes = await this.seedAllIfNotExisting(baseTypeCreateInputs)

    return this.baseTypes
  }

  async seedPrimitiveTypes() {
    this.primitiveTypes = await this.seedAllIfNotExisting(
      primitiveTypeCreateInputs,
    )

    return this.primitiveTypes
  }

  /**
   * Checks which of those types exists by the same name
   * Those that are missing are created
   * Returns a map of all input type names and their ids
   */
  async seedAllIfNotExisting(
    inputs: Array<CreateTypeInput>,
  ): Promise<Map<string, string>> {
    const results = await Promise.all(
      inputs.map((input) =>
        this.seedTypeIfNotExisting(input).then((id) => ({
          key: input.name,
          id,
        })),
      ),
    )

    return new Map(results.map(({ key, id }) => [key, id]))
  }

  /**
   * Checks if a type with the same name exists, if not - creates it
   * Returns the id in both cases
   */
  async seedTypeIfNotExisting(input: CreateTypeInput): Promise<string> {
    return createIfNotExisting(
      input,
      () => this.getTypeByName(input.name),
      () => this.createType(input),
    )
  }

  async seedAtomApi(atomId: string, data: Array<AntdDesignApi>) {
    const atom = await this.getAtomById(atomId)

    if (!atom) {
      throw new Error(`Atom ${atomId} doesn't exist`)
    }

    const atomApiId = atom.api.id

    for (const apiField of data) {
      const type = this.getTypeForApi(apiField, atom.name)

      if (!type) {
        continue
      }

      try {
        await this.createField({
          key: apiField.property,
          name: snakeCaseToWords(apiField.property),
          interfaceId: atomApiId,
          description: apiField.description,
          type,
        })
      } catch (e) {
        if (!e.toString().includes('already exists')) {
          throw e
        }
        // field already exists with this key
      }
    }
  }

  //
  // Private methods:
  //

  private getAtomById(atomId: string) {
    return this.client
      .request<GetAtomQuery, GetAtomQueryVariables>(GetAtomGql, {
        input: { byId: { atomId } },
      })
      .then((r) => r?.atom)
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
          name: `${atomName} ${snakeCaseToWords(apiField.property)} Enum`,
          enumType: {
            allowedValues: enumValues.map((value) => ({
              value,
              name: snakeCaseToWords(value),
            })),
          },
        },
      }
    }

    const type = apiField.type.trim()

    if (!this.primitiveTypes) {
      throw new Error("call seedPrimitiveTypes before seeding Atom's API")
    }

    if (!this.baseTypes) {
      throw new Error("call seedBaseTypes before seeding Atom's API")
    }

    switch (type) {
      case 'boolean':
        return {
          existingTypeId: this.primitiveTypes.get(
            PrimitiveKind.Boolean,
          ) as string,
        }
      case 'number':
        return {
          existingTypeId: this.primitiveTypes.get(
            PrimitiveKind.Float,
          ) as string,
        }
      case 'string':
        return {
          existingTypeId: this.primitiveTypes.get(
            PrimitiveKind.String,
          ) as string,
        }
      case 'LambdaType':
        return {
          existingTypeId: this.baseTypes.get('Lambda') as string,
        }
      case 'number | string':
      case 'string | number':
        return {
          existingTypeId: this.primitiveTypes.get(
            PrimitiveKind.String,
          ) as string,
        }
    }

    return undefined
  }
}
