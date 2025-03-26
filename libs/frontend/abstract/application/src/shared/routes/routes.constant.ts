import type { SearchParamsContext } from '@codelab/frontend/abstract/types'
import type { IRef } from '@codelab/shared/abstract/core'

import type {
  IActionCreateRouteContext,
  IActionUpdateRouteContext,
} from '../../action'
import type { IFieldUpdateRouteContext } from '../../field'
import type { PageContextParams } from '../../page'
import type { ExtractRouteContextParams, IRouteType } from './route.interface'

// playwright currently imports PageType in tests, and the "query-string"
// is a ESM module that fails to be imported by playwright in CJS environment.
// importing queryString here breaks all E2E tests. Commenting out until no solution.
// import queryString from 'query-string'

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
    update: ({ id }: IRef, queryParams?: Partial<SearchParamsContext>) => {
      const url = `/atoms/atom/${id}/update`
      const params = new URLSearchParams(queryParams as URLSearchParams)

      return `${url}?${params}`
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
        componentId,
        storeId,
      }: ExtractRouteContextParams<
        IActionCreateRouteContext,
        IRouteType.Component
      >) => `/components/${componentId}/builder/action/create/${storeId}`,
      delete: ({
        actionId,
        componentId,
      }: ExtractRouteContextParams<
        IActionUpdateRouteContext,
        IRouteType.Component
      >) => `/components/${componentId}/builder/action/delete/${actionId}`,
      update: ({
        actionId,
        componentId,
      }: ExtractRouteContextParams<
        IActionUpdateRouteContext,
        IRouteType.Component
      >) => `/components/${componentId}/builder/action/update/${actionId}`,
    },
    builderElement: {
      create: ({ componentId }: { componentId: string }) =>
        `/components/${componentId}/builder/create-element`,
    },
    builderField: {
      create: ({
        componentId,
        interfaceId,
      }: {
        componentId: string
        interfaceId: string
      }) =>
        `/components/${componentId}/builder/interface/${interfaceId}/create-field`,
      delete: ({
        componentId,
        fieldId,
      }: {
        componentId: string
        fieldId: string
      }) => `/components/${componentId}/builder/field/${fieldId}/delete`,
      update: ({
        componentId,
        fieldId,
      }: {
        componentId: string
        fieldId: string
      }) => `/components/${componentId}/builder/field/${fieldId}/update`,
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
        appId,
        pageId,
        storeId,
      }: ExtractRouteContextParams<
        IActionCreateRouteContext,
        IRouteType.Page
      >) => `/apps/${appId}/pages/${pageId}/builder/action/create/${storeId}`,
      delete: ({
        actionId,
        appId,
        pageId,
      }: ExtractRouteContextParams<
        IActionUpdateRouteContext,
        IRouteType.Page
      >) => `/apps/${appId}/pages/${pageId}/builder/action/delete/${actionId}`,
      update: ({
        actionId,
        appId,
        pageId,
      }: ExtractRouteContextParams<
        IActionUpdateRouteContext,
        IRouteType.Page
      >) => `/apps/${appId}/pages/${pageId}/builder/action/update/${actionId}`,
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
        appId,
        interfaceId,
        pageId,
      }: PageContextParams & { interfaceId: string }) =>
        `/apps/${appId}/pages/${pageId}/builder/field/create/${interfaceId}`,
      delete: ({
        appId,
        fieldId,
        pageId,
      }: ExtractRouteContextParams<
        IFieldUpdateRouteContext,
        IRouteType.Page
      >) => `/apps/${appId}/pages/${pageId}/builder/field/${fieldId}/delete`,
      update: ({
        appId,
        fieldId,
        pageId,
      }: ExtractRouteContextParams<
        IFieldUpdateRouteContext,
        IRouteType.Page
      >) => `/apps/${appId}/pages/${pageId}/builder/field/update/${fieldId}`,
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
    base: () => '/types' as const,
    create: () => '/types/type/create',
    delete: ({ id }: IRef) => `/types/type/${id}/delete`,
    field: {
      create: (interfaceTypeId: string) =>
        `/types/field/create/${interfaceTypeId}`,
      delete: ({ fieldId }: { fieldId: string }) =>
        `/types/field/${fieldId}/delete`,
      update: ({ fieldId }: { fieldId: string }) =>
        `/types/field/${fieldId}/update`,
    },
    update: ({ id }: IRef) => `/types/type/${id}/update`,
  },
}
