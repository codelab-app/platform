import { CreateAppInput } from '@codelab/backend/modules/app'
import { GraphQLClient } from 'graphql-request'

export class AppSeeder {
  constructor(private client: GraphQLClient) {}

  public seedAppIfMissing(app: CreateAppInput) {
    // return createIfMissing(app)
  }

  // private getApp
}
