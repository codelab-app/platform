import type { IRef } from '@codelab/shared/abstract/core'

// playwright currently imports PageType in tests, and the "query-string"
// is a ESM module that fails to be imported by playwright in CJS environment.
// importing queryString here breaks all E2E tests. Commenting out until no solution.
// import queryString from 'query-string'

import type {
  PageContextParams,
  UrlPathParams,
  UrlQueryParams,
} from './url-params'

/**
 * The values are the path
 */
export enum PrimarySidebar {
  ComponentList = '/component',
  /**
   * This doesn't change the path
   */
  ElementTree = '',
  PageList = '/page',
}

export const PageType = {
  Admin: () => '/admin',
  AdminExport: () => '/admin/export',
  AdminImport: () => '/admin/import',
  AppBuild: ({ id }: IRef) => `/apps/build/${id}`,
  AppCreate: () => '/apps/create',
  AppDelete: ({ id }: IRef) => `/apps/delete/${id}`,
  AppDetail: ({ appId }: Pick<UrlPathParams, 'appId'>) => `/apps/${appId}`,
  AppList: () => '/apps',
  AppUpdate: ({ id }: IRef) => `/apps/update/${id}`,
  AtomCreate: () => `${PageType.Atoms()}/create`,
  AtomDelete: ({ id }: IRef) => `${PageType.Atoms()}/delete/${id}`,
  AtomFieldCreate: (interfaceId: string) =>
    `${PageType.Atoms()}/interface/${interfaceId}/create/field`,
  AtomFieldDelete: ({ id }: IRef) => `${PageType.Atoms()}/delete/field/${id}`,
  AtomFieldUpdate: ({ id }: IRef) => `${PageType.Atoms()}/update/field/${id}`,
  Atoms: () => '/atoms',
  AtomTypeList: () => '/atom-types',
  AtomUpdate: ({ id }: IRef, queryParams?: Partial<UrlQueryParams>) => {
    // return queryString.stringifyUrl({
    //   query: queryParams,
    //   url: `${PageType.Atoms()}/update/${id}`,
    // })

    const url = `${PageType.Atoms()}/update/${id}`
    const params = new URLSearchParams(queryParams as URLSearchParams)

    return `${url}?${params}`
  },
  AuthGuards: () => '/auth-guards',
  AuthGuardsCreate: () => `${PageType.AuthGuards()}/create`,
  AuthGuardsDelete: ({ id }: IRef) => `${PageType.AuthGuards()}/delete/${id}`,
  AuthGuardsUpdate: ({ id }: IRef) => `${PageType.AuthGuards()}/update/${id}`,
  ComponentBuilder: ({ componentId }: Pick<UrlPathParams, 'componentId'>) =>
    `/components/${componentId}/builder`,
  ComponentCreate: () => {
    return `${PageType.Components()}/create`
  },
  ComponentDelete: ({ id }: IRef) => `${PageType.Components()}/delete/${id}`,
  ComponentExport: () => '/api/export/component',
  ComponentPreview: ({ componentId }: Pick<UrlPathParams, 'componentId'>) =>
    `/components/${componentId}`,
  Components: () => '/components' as const,
  DomainCreate: ({ appId }: Pick<UrlPathParams, 'appId'>) =>
    `/apps/${appId}/domains/create`,
  DomainDelete: ({ appId, domainId }: { appId: string; domainId: string }) =>
    `/apps/${appId}/domains/${domainId}/delete`,
  DomainList: ({ appId }: Pick<UrlPathParams, 'appId'>) =>
    `/apps/${appId}/domains`,
  DomainUpdate: ({ appId, domainId }: { appId: string; domainId: string }) =>
    `/apps/${appId}/domains/${domainId}/update`,
  FieldUpdate: () => {
    return `${PageType.Atoms()}/update/field`
  },
  Home: () => '/',
  LambdaList: () => '/lambdas',
  Page404: ({ appId, pageId }: PageContextParams) =>
    `/apps/${appId}/pages/${pageId}/404`,
  Page500: ({ appId, pageId }: PageContextParams) =>
    `/apps/${appId}/pages/${pageId}/500`,
  PageBuilder: (
    { appId, pageId }: PageContextParams,
    sidebar: PrimarySidebar,
  ) => `/apps/${appId}/pages/${pageId}/builder${sidebar}`,
  PageCreate: ({ appId, pageId }: PageContextParams) => {
    const pageBuilder = PageType.PageBuilder(
      { appId, pageId },
      PrimarySidebar.ElementTree,
    )

    return `${pageBuilder}/create-page`
  },
  PageDelete: ({ appId, pageId }: PageContextParams) => {
    const pageBuilder = PageType.PageBuilder(
      { appId, pageId },
      PrimarySidebar.ElementTree,
    )

    return `${pageBuilder}/delete/page`
  },
  PageDetail: ({ appId, pageId }: PageContextParams) =>
    `/apps/${appId}/pages/${pageId}`,
  PageList: ({ appId, pageId }: PageContextParams) =>
    `/apps/${appId}/pages/${pageId}/builder/page`,
  PageRedirectCreate: ({ appId, pageId }: PageContextParams) => {
    const pageBuilder = PageType.PageBuilder(
      { appId, pageId },
      PrimarySidebar.ElementTree,
    )

    return `${pageBuilder}/create-redirect`
  },
  PageRedirectUpdate: ({
    appId,
    pageId,
    redirectId,
  }: PageContextParams & { redirectId: string }) => {
    const pageBuilder = PageType.PageBuilder(
      { appId, pageId },
      PrimarySidebar.ElementTree,
    )

    return `${pageBuilder}/update-redirect/${redirectId}`
  },
  PageUpdate: ({ appId, pageId }: PageContextParams) => {
    const pageBuilder = PageType.PageBuilder(
      { appId, pageId },
      PrimarySidebar.ElementTree,
    )

    return `${pageBuilder}/update-page`
  },
  PropsInterface: ({ appId }: Pick<UrlPathParams, 'appId'>) =>
    `/apps/${appId}/props`,
  Resources: () => '/resources',
  ResourcesCreate: () => `${PageType.Resources()}/create`,
  ResourcesDelete: (id: string) => `${PageType.Resources()}/delete/${id}`,
  ResourcesUpdate: (id: string) => `${PageType.Resources()}/update/${id}`,
  Storybook: () => '/storybook',
  Tags: () => '/tags' as const,
  TagsCreate: () => '/tags/create' as const,
  TagsDelete: (ids: Array<string>) => {
    return `${PageType.Tags()}/delete/${ids.join(',')}`
  },
  TagsUpdate: ({ id }: IRef) => `/tags/update/${id}` as const,
  Type: () => '/types' as const,
  TypeCreate: () => `${PageType.Type()}/create`,
  TypeDelete: ({ id }: IRef) => `${PageType.Type()}/delete/${id}`,
  TypeFieldCreate: (typeId: string) =>
    `${PageType.Type()}/${typeId}/create/field`,
  TypeFieldDelete: ({ id }: IRef) => `${PageType.Type()}/delete/field/${id}`,
  TypeFieldUpdate: ({ id }: IRef) => `${PageType.Type()}/update/field/${id}`,
  TypeUpdate: ({ id }: IRef) => `${PageType.Type()}/update/${id}`,
}
