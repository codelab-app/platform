import { GraphQLClient } from 'graphql-request'
import { SeedAppInput } from './types/app'

export class AppSeeder {
  constructor(private client: GraphQLClient) {}

  public seedAppIfMissing(app: SeedAppInput) {
    // return createIfMissing(app)
  }

  // private getApp
}
