import * as Types from '@codelab/shared/abstract/codegen'

import { AppPreviewFragment } from '../../../../../abstract/domain/src/app/app.fragment.tan.gen'
import {
  AtomDevelopmentFragment,
  AtomProductionFragment,
} from '../../../../../abstract/domain/src/atom/atom.fragment.tan.gen'
import { AppPreviewFragmentDoc } from '../../../../../abstract/domain/src/app/app.fragment.tan.gen'
import {
  AtomDevelopmentFragmentDoc,
  AtomProductionFragmentDoc,
} from '../../../../../abstract/domain/src/atom/atom.fragment.tan.gen'
import {
  useQuery,
  useSuspenseQuery,
  UseQueryOptions,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query'

function fetcher<TData, TVariables>(
  endpoint: string,
  requestInit: RequestInit,
  query: string,
  variables?: TVariables,
) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    })

    const json = await res.json()

    if (json.errors) {
      const { message } = json.errors[0]

      throw new Error(message)
    }

    return json.data
  }
}
export type GetAppsPreviewQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.AppOptions>
  where?: Types.InputMaybe<Types.AppWhere>
}>

export type GetAppsPreviewQuery = {
  apps: Array<AppPreviewFragment>
  atoms: Array<AtomDevelopmentFragment>
}

export const GetAppsPreviewDocument = `
    query GetAppsPreview($options: AppOptions, $where: AppWhere) {
  apps(options: $options, where: $where) {
    ...AppPreview
  }
  atoms(where: {type: ReactFragment}) {
    ...AtomDevelopment
  }
}
    ${AppPreviewFragmentDoc}
${AtomDevelopmentFragmentDoc}`

export const useGetAppsPreviewQuery = <
  TData = GetAppsPreviewQuery,
  TError = unknown,
>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables?: GetAppsPreviewQueryVariables,
  options?: Omit<
    UseQueryOptions<GetAppsPreviewQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseQueryOptions<GetAppsPreviewQuery, TError, TData>['queryKey']
  },
) => {
  return useQuery<GetAppsPreviewQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ['GetAppsPreview']
        : ['GetAppsPreview', variables],
    queryFn: fetcher<GetAppsPreviewQuery, GetAppsPreviewQueryVariables>(
      dataSource.endpoint,
      dataSource.fetchParams || {},
      GetAppsPreviewDocument,
      variables,
    ),
    ...options,
  })
}

useGetAppsPreviewQuery.document = GetAppsPreviewDocument

useGetAppsPreviewQuery.getKey = (variables?: GetAppsPreviewQueryVariables) =>
  variables === undefined ? ['GetAppsPreview'] : ['GetAppsPreview', variables]

export const useSuspenseGetAppsPreviewQuery = <
  TData = GetAppsPreviewQuery,
  TError = unknown,
>(
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables?: GetAppsPreviewQueryVariables,
  options?: Omit<
    UseSuspenseQueryOptions<GetAppsPreviewQuery, TError, TData>,
    'queryKey'
  > & {
    queryKey?: UseSuspenseQueryOptions<
      GetAppsPreviewQuery,
      TError,
      TData
    >['queryKey']
  },
) => {
  return useSuspenseQuery<GetAppsPreviewQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ['GetAppsPreviewSuspense']
        : ['GetAppsPreviewSuspense', variables],
    queryFn: fetcher<GetAppsPreviewQuery, GetAppsPreviewQueryVariables>(
      dataSource.endpoint,
      dataSource.fetchParams || {},
      GetAppsPreviewDocument,
      variables,
    ),
    ...options,
  })
}

useSuspenseGetAppsPreviewQuery.document = GetAppsPreviewDocument

useSuspenseGetAppsPreviewQuery.getKey = (
  variables?: GetAppsPreviewQueryVariables,
) =>
  variables === undefined
    ? ['GetAppsPreviewSuspense']
    : ['GetAppsPreviewSuspense', variables]

useGetAppsPreviewQuery.fetcher = (
  dataSource: { endpoint: string; fetchParams?: RequestInit },
  variables?: GetAppsPreviewQueryVariables,
) =>
  fetcher<GetAppsPreviewQuery, GetAppsPreviewQueryVariables>(
    dataSource.endpoint,
    dataSource.fetchParams || {},
    GetAppsPreviewDocument,
    variables,
  )
