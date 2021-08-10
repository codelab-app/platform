import {
  AtomType,
  CreateAtomGql,
  CreateAtomInput,
  CreateAtomMutation,
  CreateAtomMutationVariables,
  GetAtomGql,
  GetAtomQuery,
  GetAtomQueryVariables,
} from '@codelab/codegen/graphql'
import { GraphQLClient } from 'graphql-request'
import { createIfMissing } from '../utils/createIfMissing'

/**
 * Handle seeding of atoms
 */
export class AtomSeeder {
  constructor(private client: GraphQLClient) {}

  /**
   * Checks if an Atom with the same AtomType exists, if not - creates it
   * Returns the id in both cases
   */
  async seedAtomIfMissing(atom: CreateAtomInput): Promise<string> {
    return createIfMissing(
      () => this.getAtomByType(atom.type),
      () => this.createAtom(atom),
    )
  }

  private getAtomByType(atomType: AtomType) {
    return this.client
      .request<GetAtomQuery, GetAtomQueryVariables>(GetAtomGql, {
        input: { byType: { atomType } },
      })
      .then((r) => r?.atom?.id)
  }

  private async createAtom(input: CreateAtomInput) {
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
