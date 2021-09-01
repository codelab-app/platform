import { createIfMissing } from '@codelab/backend/shared/utils'
import { GraphQLClient } from 'graphql-request'
import {
  CreateAtomGql,
  CreateAtomMutation,
  CreateAtomMutationVariables,
} from './graphql/CreateAtom.api.graphql'
import {
  GetAtomGql,
  GetAtomQuery,
  GetAtomQueryVariables,
} from './graphql/GetAtom.api.graphql'

export type SeedAtomInput = CreateAtomMutationVariables['input']
export type GetAtomInput = GetAtomQueryVariables['input']

/**
 * Handle seeding of atoms
 */
export class AtomSeeder {
  constructor(private client: GraphQLClient) {}

  /**
   * Checks if an Atom with the same AtomType exists, if not - creates it
   * Returns the id in both cases
   */
  async seedAtomIfMissing(atom: SeedAtomInput): Promise<string> {
    return createIfMissing(
      () =>
        this.getAtom({ where: { type: atom.type } }).then((_atom) => _atom?.id),
      () => this.createAtom(atom),
    )
  }

  async getAtom(input: GetAtomInput) {
    const { atom } = await this.client.request<
      GetAtomQuery,
      GetAtomQueryVariables
    >(GetAtomGql, {
      input,
    })

    return atom
  }

  private async createAtom(input: SeedAtomInput) {
    const createResponse = await this.client.request<
      CreateAtomMutation,
      CreateAtomMutationVariables
    >(CreateAtomGql, { input })

    if (!createResponse?.createAtom) {
      throw new Error(`Something went wrong while creating atom ${input.type}`)
    }

    console.log(`Created atom ${input.type}`)

    return createResponse.createAtom.id
  }
}
