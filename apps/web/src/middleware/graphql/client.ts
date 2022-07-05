// specific graphql-request bundled by esbuild, ignores node code, utilizes web api only
// for edge run time: https://nextjs.org/docs/api-reference/edge-runtime
import { GraphQLClient } from './node_modules/graphql-request'

const endpoint = `${process.env.NEXT_PUBLIC_API_ORIGIN}/api/graphql`
export const client = new GraphQLClient(endpoint)
