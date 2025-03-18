import type { SearchParamsContext } from '@codelab/frontend/abstract/types'
import type { IRef } from '@codelab/shared/abstract/core'

import type {
  IActionCreateRouteContext,
  IActionUpdateRouteContext,
} from '../action'
import type { IFieldUpdateRouteContext } from '../field'
import type { PageContextParams } from '../page'
import type { ExtractRouteContextParams, IRouteType } from './route.interface'

// playwright currently imports PageType in tests, and the "query-string"
// is a ESM module that fails to be imported by playwright in CJS environment.
// importing queryString here breaks all E2E tests. Commenting out until no solution.
// import queryString from 'query-string'

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
  AppBuild: ({ id }: IRef) => `/apps/${id}/build`,
  AppCreate: () => '/apps/create',
  AppDelete: ({ id }: IRef) => `/apps/${id}/delete`,
  AppDetail: ({ appId }: { appId: string }) => `/apps/${appId}`,
  AppImport: () => '/apps/import',
  AppList: () => '/apps',
  AppUpdate: ({ id }: IRef) => `/apps/update/${id}`,
  AtomCreate: () => `${PageType.Atoms()}/atom/create`,
  AtomDelete: ({ id }: IRef) => `${PageType.Atoms()}/atom/${id}/delete`,
  AtomFieldCreate: ({ interfaceId }: { interfaceId: string }) =>
    `${PageType.Atoms()}/field/create/${interfaceId}`,
  AtomFieldDelete: ({ id }: { id: string }) =>
    `${PageType.Atoms()}/field/${id}/delete`,
  AtomFieldUpdate: ({ id }: { id: string }) =>
    `${PageType.Atoms()}/field/${id}/update`,
  Atoms: () => '/atoms',
  AtomTypeList: () => '/atom-types',
  AtomUpdate: ({ id }: IRef, queryParams?: Partial<SearchParamsContext>) => {
    const url = `${PageType.Atoms()}/atom/${id}/update`
    const params = new URLSearchParams(queryParams as URLSearchParams)

    return `${url}?${params}`
  },
  AuthGuards: () => '/auth-guards',
  AuthGuardsCreate: () => `${PageType.AuthGuards()}/create`,
  AuthGuardsDelete: ({ id }: IRef) => `${PageType.AuthGuards()}/${id}/delete`,
  AuthGuardsUpdate: ({ id }: IRef) => `${PageType.AuthGuards()}/${id}/update`,
  ComponentBuilder: ({ componentId }: { componentId: string }) =>
    `/components/${componentId}/builder`,
  ComponentBuilderCreateAction: ({
    componentId,
    storeId,
  }: ExtractRouteContextParams<
    IActionCreateRouteContext,
    IRouteType.Component
  >) =>
    `${PageType.ComponentBuilder({ componentId })}/action/create/${storeId}`,
  ComponentBuilderCreateElement: ({ componentId }: { componentId: string }) =>
    `${PageType.ComponentBuilder({ componentId })}/create-element`,
  ComponentBuilderCreateField: ({
    componentId,
    interfaceId,
  }: {
    componentId: string
    interfaceId: string
  }) =>
    `${PageType.ComponentBuilder({
      componentId,
    })}/interface/${interfaceId}/create-field`,
  ComponentBuilderDeleteField: ({
    componentId,
    fieldId,
  }: {
    componentId: string
    fieldId: string
  }) =>
    `${PageType.ComponentBuilder({
      componentId,
    })}/field/${fieldId}/delete`,
  ComponentBuilderUpdateAction: ({
    actionId,
    componentId,
  }: ExtractRouteContextParams<
    IActionUpdateRouteContext,
    IRouteType.Component
  >) =>
    `${PageType.ComponentBuilder({ componentId })}/action/update/${actionId}`,
  ComponentBuilderUpdateField: ({
    componentId,
    fieldId,
  }: {
    componentId: string
    fieldId: string
  }) =>
    `${PageType.ComponentBuilder({
      componentId,
    })}/field/${fieldId}/update`,
  ComponentCreate: () => {
    return `${PageType.Components()}/create`
  },
  ComponentDelete: ({ id }: IRef) => `${PageType.Components()}/delete/${id}`,
  ComponentExport: () => '/api/export/component',
  ComponentPreview: ({ componentId }: { componentId: string }) =>
    `/components/${componentId}`,
  Components: () => '/components' as const,
  DomainCreate: ({ appId }: { appId: string }) =>
    `/apps/${appId}/domains/create`,
  DomainDelete: ({ appId, domainId }: { appId: string; domainId: string }) =>
    `/apps/${appId}/domains/${domainId}/delete`,
  DomainList: ({ appId }: { appId: string }) => `/apps/${appId}/domains`,
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
  PageBuilderCreateAction: (
    {
      appId,
      pageId,
      storeId,
    }: ExtractRouteContextParams<IActionCreateRouteContext, IRouteType.Page>,
    sidebar: PrimarySidebar,
  ) =>
    `${PageType.PageBuilder(
      { appId, pageId },
      sidebar,
    )}/action/create/${storeId}`,
  PageBuilderCreateElement: (
    { appId, pageId }: PageContextParams,
    sidebar: PrimarySidebar,
  ) => `/apps/${appId}/pages/${pageId}/builder${sidebar}/create-element`,
  PageBuilderCreateField: (
    { appId, interfaceId, pageId }: PageContextParams & { interfaceId: string },
    sidebar: PrimarySidebar,
  ) =>
    `${PageType.PageBuilder(
      { appId, pageId },
      sidebar,
    )}/field/create/${interfaceId}`,
  PageBuilderDeleteField: ({
    appId,
    fieldId,
    pageId,
  }: ExtractRouteContextParams<IFieldUpdateRouteContext, IRouteType.Page>) =>
    `${PageType.PageBuilder(
      { appId, pageId },
      PrimarySidebar.PageList,
    )}/field/${fieldId}/delete`,
  PageBuilderUpdateAction: (
    {
      actionId,
      appId,
      pageId,
    }: ExtractRouteContextParams<IActionUpdateRouteContext, IRouteType.Page>,
    sidebar: PrimarySidebar,
  ) =>
    `${PageType.PageBuilder(
      { appId, pageId },
      sidebar,
    )}/action/update/${actionId}`,
  PageBuilderUpdateField: ({
    appId,
    fieldId,
    pageId,
  }: ExtractRouteContextParams<IFieldUpdateRouteContext, IRouteType.Page>) =>
    `${PageType.PageBuilder(
      { appId, pageId },
      PrimarySidebar.PageList,
    )}/field/update/${fieldId}`,
  PageCreate: ({ appId, pageId }: PageContextParams) => {
    const pageBuilder = PageType.PageBuilder(
      { appId, pageId },
      PrimarySidebar.ElementTree,
    )

    return `${pageBuilder}/page/create`
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

    return `${pageBuilder}/page/create-redirect`
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

    return `${pageBuilder}/page/update-redirect/${redirectId}`
  },
  PageUpdate: ({ appId, pageId }: PageContextParams) => {
    const pageBuilder = PageType.PageBuilder(
      { appId, pageId },
      PrimarySidebar.ElementTree,
    )

    return `${pageBuilder}/page/update`
  },
  PropsInterface: ({ appId }: { appId: string }) => `/apps/${appId}/props`,
  Resources: () => '/resources',
  ResourcesCreate: () => `${PageType.Resources()}/create`,
  ResourcesDelete: (id: string) => `${PageType.Resources()}/${id}/delete`,
  ResourcesUpdate: (id: string) => `${PageType.Resources()}/${id}/update`,
  Storybook: () => '/storybook',
  Tags: () => '/tags' as const,
  TagsCreate: () => '/tags/create' as const,
  TagsDelete: (ids: Array<string>) => {
    return `${PageType.Tags()}/${ids.join(',')}/delete`
  },
  TagsUpdate: ({ id }: IRef) => `/tags/${id}/update` as const,
  Type: () => '/types' as const,
  TypeCreate: () => `${PageType.Type()}/type/create`,
  TypeDelete: ({ id }: IRef) => `${PageType.Type()}/type/${id}/delete`,
  TypeDeleteField: ({ fieldId }: { fieldId: string }) =>
    `${PageType.Type()}/field/${fieldId}/delete`,
  TypeFieldCreate: (typeId: string) =>
    `${PageType.Type()}/field/${typeId}/create/field`,
  TypeFieldDelete: ({ id }: IRef) => `${PageType.Type()}/field/${id}/delete`,
  TypeFieldUpdate: ({ id }: IRef) => `${PageType.Type()}/field/${id}/update`,
  TypeUpdate: ({ id }: IRef) => `${PageType.Type()}/type/${id}/update`,
  TypeUpdateField: ({ fieldId }: { fieldId: string }) =>
    `${PageType.Type()}/field/${fieldId}/update`,
}
