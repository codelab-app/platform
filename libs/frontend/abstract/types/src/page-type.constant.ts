import type { IRef } from '@codelab/shared/abstract/core'

import queryString from 'query-string'

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
  AppDetail: ({ appId }: Pick<UrlPathParams, 'appId'>) => `/apps/${appId}`,
  AppList: () => '/apps',
  AtomCreate: () => {
    return `${PageType.Atoms()}/create`
  },
  AtomDelete: ({ id }: IRef) => {
    return `${PageType.Atoms()}/delete/${id}`
  },
  Atoms: () => '/atoms',
  AtomTypeList: () => '/atom-types',
  AtomUpdate: ({ id }: IRef, queryParams?: Partial<UrlQueryParams>) => {
    return queryString.stringifyUrl({
      query: queryParams,
      url: `${PageType.Atoms()}/update/${id}`,
    })
  },
  AuthGuards: () => '/auth-guards',
  ComponentBuilder: ({ componentId }: Pick<UrlPathParams, 'componentId'>) =>
    `/components/${componentId}/builder`,
  ComponentCreate: () => {
    return `${PageType.Components()}/create`
  },
  ComponentExport: () => '/api/export/component',
  ComponentPreview: ({ componentId }: Pick<UrlPathParams, 'componentId'>) =>
    `/components/${componentId}`,
  Components: () => '/components' as const,
  DomainList: ({ appId }: Pick<UrlPathParams, 'appId'>) =>
    `/apps/${appId}/domains`,
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
  PageDetail: ({ appId, pageId }: PageContextParams) =>
    `/apps/${appId}/pages/${pageId}`,
  PageList: ({ appId, pageId }: PageContextParams) =>
    `/apps/${appId}/pages/${pageId}/builder/page`,
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
}
