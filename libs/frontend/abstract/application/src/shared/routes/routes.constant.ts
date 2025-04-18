import type { SearchParamsClientProps } from '@codelab/frontend-abstract-types'
import type { IRef } from '@codelab/shared-abstract-core'

import queryString from 'query-string'

import type { IActionCreateRoute, IActionUpdateRoute } from '../../action'
import type { IAtomUpdateRoute } from '../../atom'
import type { IFieldCreateRoute, IFieldUpdateRoute } from '../../field'
import type { PageContextParams } from '../../page'
import type { ITypeUpdateRoute } from '../../type'
import type { ExtractRouteContextParams, IRouteType } from './route.interface'

/**
 * Adds query parameters to a URL path if they exist
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const addSearchParams = <T extends object>(
  basePath: string,
  searchParams: T | undefined,
) => {
  if (!searchParams) {
    return basePath
  }

  const filteredParams = Object.entries(searchParams)
    .filter(([_, value]) => value !== undefined)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})

  const queryStr = queryString.stringify(filteredParams)

  return queryStr ? `${basePath}?${queryStr}` : basePath
}

/**
 * Scope each path by their module, then sub-scope by their action
 *
 * Keep base url as string to make it more readable
 */
export const RoutePaths = {
  Admin: {
    base: () => '/admin',
    export: () => '/admin/export',
    import: () => '/admin/import',
  },

  App: {
    base: () => '/apps',
    build: ({ id }: IRef) => `/apps/${id}/build`,
    create: () => '/apps/create',
    delete: ({ id }: IRef) => `/apps/${id}/delete`,
    detail: ({ appId }: { appId: string }) => `/apps/${appId}`,
    import: () => '/apps/import',
    list: () => '/apps',
    update: ({ id }: IRef) => `/apps/${id}/update`,
  },

  Atom: {
    base: () => '/atoms' as const,
    create: () => '/atoms/atom/create',
    delete: ({ id }: IRef) => `/atoms/atom/${id}/delete`,
    field: {
      create: ({ interfaceId }: { interfaceId: string }) =>
        `/atoms/field/create/${interfaceId}`,
      delete: ({ id }: { id: string }) => `/atoms/field/${id}/delete`,
      update: ({ id }: { id: string }) => `/atoms/field/${id}/update`,
      update_base: () => '/atoms/update/field',
    },
    table: ({
      filter,
      page,
      pageSize,
    }: {
      filter: Array<string>
      page: number
      pageSize: number
    }) =>
      `/atoms/table?page=${page}&pageSize=${pageSize}&filter=${filter.join(
        ',',
      )}`,
    typeList: () => '/atom-types',
    update: ({ params: { atomId }, searchParams }: IAtomUpdateRoute) => {
      return addSearchParams(`/atoms/atom/${atomId}/update`, searchParams)
    },
  },

  AuthGuard: {
    base: () => '/auth-guards',
    create: () => '/auth-guards/create',
    delete: ({ id }: IRef) => `/auth-guards/${id}/delete`,
    update: ({ id }: IRef) => `/auth-guards/${id}/update`,
  },

  Component: {
    base: () => '/components' as const,
    builder: ({ componentId }: { componentId: string }) =>
      `/components/${componentId}/builder`,
    builderAction: {
      create: ({
        params: { componentId, storeId },
      }: ExtractRouteContextParams<IActionCreateRoute, IRouteType.Component>) =>
        `/components/${componentId}/builder/action/create/${storeId}`,
      delete: ({
        params: { actionId, componentId },
      }: ExtractRouteContextParams<IActionUpdateRoute, IRouteType.Component>) =>
        `/components/${componentId}/builder/action/delete/${actionId}`,
      update: ({
        params: { actionId, componentId },
      }: ExtractRouteContextParams<IActionUpdateRoute, IRouteType.Component>) =>
        `/components/${componentId}/builder/action/update/${actionId}`,
    },
    builderElement: {
      create: ({ componentId }: { componentId: string }) =>
        `/components/${componentId}/builder/create-element`,
    },
    builderField: {
      create: ({
        params: { componentId, interfaceId },
      }: ExtractRouteContextParams<IFieldCreateRoute, IRouteType.Component>) =>
        `/components/${componentId}/builder/interface/${interfaceId}/create-field`,
      delete: ({
        params: { componentId, fieldId },
      }: ExtractRouteContextParams<IFieldUpdateRoute, IRouteType.Component>) =>
        `/components/${componentId}/builder/field/${fieldId}/delete`,
      update: (
        props: ExtractRouteContextParams<
          IFieldUpdateRoute,
          IRouteType.Component
        >,
      ) =>
        `/components/${props.params.componentId}/builder/field/${props.params.fieldId}/update`,
    },
    create: () => '/components/create',
    delete: ({ id }: IRef) => `/components/delete/${id}`,
    export: () => '/api/export/component',
    preview: ({ componentId }: { componentId: string }) =>
      `/components/${componentId}`,
  },

  Domain: {
    create: ({ appId }: { appId: string }) => `/apps/${appId}/domains/create`,
    delete: ({ appId, domainId }: { appId: string; domainId: string }) =>
      `/apps/${appId}/domains/${domainId}/delete`,
    list: ({ appId }: { appId: string }) => `/apps/${appId}/domains`,
    update: ({ appId, domainId }: { appId: string; domainId: string }) =>
      `/apps/${appId}/domains/${domainId}/update`,
  },

  Home: () => '/',

  Lambda: {
    list: () => '/lambdas',
  },

  Page: {
    base: ({ appId, pageId }: PageContextParams) =>
      `/apps/${appId}/pages/${pageId}`,
    builder: ({ appId, pageId }: PageContextParams) =>
      `/apps/${appId}/pages/${pageId}/builder`,
    builderAction: {
      create: ({
        params: { appId, pageId, storeId },
      }: ExtractRouteContextParams<IActionCreateRoute, IRouteType.Page>) =>
        `/apps/${appId}/pages/${pageId}/builder/action/create/${storeId}`,
      delete: ({
        params: { actionId, appId, pageId },
      }: ExtractRouteContextParams<IActionUpdateRoute, IRouteType.Page>) =>
        `/apps/${appId}/pages/${pageId}/builder/action/delete/${actionId}`,
      update: ({
        params: { actionId, appId, pageId },
      }: ExtractRouteContextParams<IActionUpdateRoute, IRouteType.Page>) =>
        `/apps/${appId}/pages/${pageId}/builder/action/update/${actionId}`,
    },
    builderComponent: {
      list: ({ appId, pageId }: PageContextParams) =>
        `/apps/${appId}/pages/${pageId}/builder/components`,
    },
    builderElement: {
      create: ({ appId, pageId }: PageContextParams) =>
        `/apps/${appId}/pages/${pageId}/builder/create-element`,
    },
    builderField: {
      create: ({
        params: { appId, interfaceId, pageId },
      }: ExtractRouteContextParams<IFieldCreateRoute, IRouteType.Page>) =>
        `/apps/${appId}/pages/${pageId}/builder/field/create/${interfaceId}`,
      delete: ({
        params: { appId, fieldId, pageId },
      }: ExtractRouteContextParams<IFieldUpdateRoute, IRouteType.Page>) =>
        `/apps/${appId}/pages/${pageId}/builder/field/${fieldId}/delete`,
      update: ({
        params: { appId, fieldId, pageId },
      }: ExtractRouteContextParams<IFieldUpdateRoute, IRouteType.Page>) =>
        `/apps/${appId}/pages/${pageId}/builder/field/update/${fieldId}`,
    },
    create: ({ appId, pageId }: PageContextParams) =>
      `/apps/${appId}/pages/${pageId}/builder/page/create`,
    delete: ({ appId, pageId }: PageContextParams) =>
      `/apps/${appId}/pages/${pageId}/builder/delete/page`,
    error404: ({ appId, pageId }: PageContextParams) =>
      `/apps/${appId}/pages/${pageId}/404`,
    error500: ({ appId, pageId }: PageContextParams) =>
      `/apps/${appId}/pages/${pageId}/500`,
    list: ({ appId, pageId }: PageContextParams) =>
      `/apps/${appId}/pages/${pageId}/builder/pages`,
    redirect: {
      create: ({ appId, pageId }: PageContextParams) =>
        `/apps/${appId}/pages/${pageId}/builder/redirect/create`,
      update: ({
        appId,
        pageId,
        redirectId,
      }: PageContextParams & { redirectId: string }) =>
        `/apps/${appId}/pages/${pageId}/builder/redirect/update/${redirectId}`,
    },
    update: ({ appId, pageId }: PageContextParams) =>
      `/apps/${appId}/pages/${pageId}/builder/page/update`,
  },

  Props: {
    interface: ({ appId }: { appId: string }) => `/apps/${appId}/props`,
  },

  Resource: {
    base: () => '/resources',
    create: () => '/resources/create',
    delete: (id: string) => `/resources/${id}/delete`,
    update: (id: string) => `/resources/${id}/update`,
  },

  Storybook: () => '/storybook',

  Tag: {
    base: () => '/tags' as const,
    create: () => '/tags/create' as const,
    delete: (ids: Array<string>) => `/tags/delete/${ids.join(',')}`,
    update: ({ id }: IRef) => `/tags/update/${id}` as const,
  },

  Type: {
    base: (searchParams?: SearchParamsClientProps) =>
      addSearchParams('/types', searchParams),
    create: (searchParams?: SearchParamsClientProps) =>
      addSearchParams('/types/type/create', searchParams),
    delete: ({ id }: IRef, searchParams?: SearchParamsClientProps) =>
      addSearchParams(`/types/type/${id}/delete`, searchParams),
    field: {
      create: ({
        params: { interfaceId },
        searchParams,
      }: ExtractRouteContextParams<IFieldCreateRoute, IRouteType.Type>) =>
        addSearchParams(`/types/field/create/${interfaceId}`, searchParams),
      delete: ({
        params: { fieldId },
        searchParams,
      }: ExtractRouteContextParams<IFieldUpdateRoute, IRouteType.Type>) =>
        addSearchParams(`/types/field/${fieldId}/delete`, searchParams),
      update: ({
        params: { fieldId },
        searchParams,
      }: ExtractRouteContextParams<IFieldUpdateRoute, IRouteType.Type>) =>
        addSearchParams(`/types/field/${fieldId}/update`, searchParams),
    },
    update: ({ params: { typeId }, searchParams }: ITypeUpdateRoute) =>
      addSearchParams(`/types/type/${typeId}/update`, searchParams),
  },
}
