import { QueryHookOptions, useQuery } from '@apollo/client'
import * as Apollo from '@apollo/client'
import { NextRouter, useRouter } from 'next/router'
import type React from 'react'
import * as Types from './types.generated'
import * as Operations from './types.generated'
import { getApolloClient } from '@codelab/frontend'

export async function getServerPageGetMe(
  options: Omit<Apollo.QueryOptions<Types.GetMeQueryVariables>, 'query'>,
  ctx?: any,
) {
  const apolloClient = getApolloClient(ctx)

  const data = await apolloClient.query<Types.GetMeQuery>({
    ...options,
    query: Operations.GetMeDocument,
  })

  const apolloState = apolloClient.cache.extract()

  return {
    props: {
      apolloState,
      data: data?.data,
      error: data?.error ?? data?.errors ?? null,
    },
  }
}
export const useGetMe = (
  optionsFunc?: (
    router: NextRouter,
  ) => QueryHookOptions<Types.GetMeQuery, Types.GetMeQueryVariables>,
) => {
  const router = useRouter()
  const options = optionsFunc ? optionsFunc(router) : {}

  return useQuery(Operations.GetMeDocument, options)
}
export type PageGetMeComp = React.FC<{
  data?: Types.GetMeQuery
  error?: Apollo.ApolloError
}>
export const ssrGetMe = {
  getServerPage: getServerPageGetMe,

  usePage: useGetMe,
}
