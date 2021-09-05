import { createIfMissing } from '@codelab/backend/shared/utils'
import { GraphQLClient } from 'graphql-request'
import {
  Seeder_CreateAtomGql,
  Seeder_CreateAtomMutation,
  Seeder_CreateAtomMutationVariables,
} from './graphql/CreateAtom.api.graphql.gen'
import {
  Seeder_GetAtomGql,
  Seeder_GetAtomQuery,
  Seeder_GetAtomQueryVariables,
} from './graphql/GetAtom.api.graphql.gen'

export type SeedAtomInput = Seeder_CreateAtomMutationVariables['input']
export type GetAtomInput = Seeder_GetAtomQueryVariables['input']

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
      Seeder_GetAtomQuery,
      Seeder_GetAtomQueryVariables
    >(Seeder_GetAtomGql, {
      input,
    })

    return atom
  }

  private async createAtom(input: SeedAtomInput) {
    const createResponse = await this.client.request<
      Seeder_CreateAtomMutation,
      Seeder_CreateAtomMutationVariables
    >(Seeder_CreateAtomGql, { input })

    if (!createResponse?.createAtom) {
      throw new Error(`Something went wrong while creating atom ${input.type}`)
    }

    console.log(`Created atom ${input.type}`)

    return createResponse.createAtom.id
  }
}
