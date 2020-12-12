import { get } from 'env-var'

export class HasuraConfig {
  public static readonly HASURA_GRAPHQL_URI: string = get('HASURA_GRAPHQL_URI')
    .required()
    .asUrlString()

  public static readonly HASURA_GRAPHQL_ADMIN_SECRET: string = get(
    'HASURA_GRAPHQL_ADMIN_SECRET',
  )
    .required()
    .asString()
}
