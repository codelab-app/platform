import { GraphQLClient } from 'graphql-request'
import { CreateAppMutationVariables } from './graphql/CreateApp.api.graphql'

export type SeedAppInput = CreateAppMutationVariables['input']

export class AppSeeder {
  constructor(private client: GraphQLClient) {}

  public seedAppIfMissing(app: SeedAppInput) {
    // return createIfMissing(app)
  }

  // private getApp
}
