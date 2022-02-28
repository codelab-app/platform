import { getSdk } from '@codelab/shared/abstract/codegen-v2'
import { GraphQLClient } from 'graphql-request'

const endpoint = `${process.env.NEXT_PUBLIC_API_ORIGIN}/api/graphql`

export const client = new GraphQLClient(endpoint)
export const graphqlSdk = getSdk(client)
