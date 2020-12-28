import { ApolloClient, OperationVariables, QueryOptions } from '@apollo/client'

export const query = async <TData = any, TVariables = OperationVariables>(
  client: ApolloClient<any>,
  options: QueryOptions<TVariables, TData>,
) => {
  return {
    data: await client.query(options).then((reponse) => {
      return reponse.data
    }),
  }
}
