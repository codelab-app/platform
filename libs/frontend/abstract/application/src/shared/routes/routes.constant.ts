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

export const RoutePaths = {
  Admin: () => '/admin',
  AdminExport: () => '/admin/export',
  AdminImport: () => '/admin/import',
  AppBuild: ({ id }: IRef) => `/apps/${id}/build`,
  AppCreate: () => '/apps/create',
  AppDelete: ({ id }: IRef) => `/apps/${id}/delete`,
  AppDetail: ({ appId }: { appId: string }) => `/apps/${appId}`,
  AppImport: () => '/apps/import',
  AppList: () => '/apps',
  AppUpdate: ({ id }: IRef) => `/apps/${id}/update`,
  AtomCreate: () => `${RoutePaths.Atoms()}/atom/create`,
  AtomDelete: ({ id }: IRef) => `${RoutePaths.Atoms()}/atom/${id}/delete`,
  AtomFieldCreate: ({ interfaceId }: { interfaceId: string }) =>
    `${RoutePaths.Atoms()}/field/create/${interfaceId}`,
  AtomFieldDelete: ({ id }: { id: string }) =>
    `${RoutePaths.Atoms()}/field/${id}/delete`,
  AtomFieldUpdate: ({ id }: { id: string }) =>
    `${RoutePaths.Atoms()}/field/${id}/update`,
  Atoms: () => '/atoms' as const,
  AtomTable: ({
    filter,
    page,
    pageSize,
  }: {
    filter: Array<string>
    page: number
    pageSize: number
  }) =>
    `/atoms/table?page=${page}&pageSize=${pageSize}&filter=${filter.join(',')}`,
  AtomTypeList: () => '/atom-types',
  AtomUpdate: ({ id }: IRef, queryParams?: Partial<SearchParamsContext>) => {
    const url = `${RoutePaths.Atoms()}/atom/${id}/update`
    const params = new URLSearchParams(queryParams as URLSearchParams)

    return `${url}?${params}`
  },
  AuthGuards: () => '/auth-guards',
  AuthGuardsCreate: () => `${RoutePaths.AuthGuards()}/create`,
  AuthGuardsDelete: ({ id }: IRef) => `${RoutePaths.AuthGuards()}/${id}/delete`,
  AuthGuardsUpdate: ({ id }: IRef) => `${RoutePaths.AuthGuards()}/${id}/update`,
  ComponentBuilder: ({ componentId }: { componentId: string }) =>
    `/components/${componentId}/builder`,
  ComponentBuilderActionCreate: ({
    componentId,
    storeId,
  }: ExtractRouteContextParams<
    IActionCreateRouteContext,
    IRouteType.Component
  >) =>
    `${RoutePaths.ComponentBuilder({ componentId })}/action/create/${storeId}`,
  ComponentBuilderActionDelete: ({
    actionId,
    componentId,
  }: ExtractRouteContextParams<
    IActionUpdateRouteContext,
    IRouteType.Component
  >) =>
    `${RoutePaths.ComponentBuilder({ componentId })}/action/delete/${actionId}`,
  ComponentBuilderActionUpdate: ({
    actionId,
    componentId,
  }: ExtractRouteContextParams<
    IActionUpdateRouteContext,
    IRouteType.Component
  >) =>
    `${RoutePaths.ComponentBuilder({ componentId })}/action/update/${actionId}`,
  ComponentBuilderElementCreate: ({ componentId }: { componentId: string }) =>
    `${RoutePaths.ComponentBuilder({ componentId })}/create-element`,
  ComponentBuilderFieldCreate: ({
    componentId,
    interfaceId,
  }: {
    componentId: string
    interfaceId: string
  }) =>
    `${RoutePaths.ComponentBuilder({
      componentId,
    })}/interface/${interfaceId}/create-field`,
  ComponentBuilderFieldDelete: ({
    componentId,
    fieldId,
  }: {
    componentId: string
    fieldId: string
  }) =>
    `${RoutePaths.ComponentBuilder({
      componentId,
    })}/field/${fieldId}/delete`,
  ComponentBuilderFieldUpdate: ({
    componentId,
    fieldId,
  }: {
    componentId: string
    fieldId: string
  }) =>
    `${RoutePaths.ComponentBuilder({
      componentId,
    })}/field/${fieldId}/update`,
  ComponentCreate: () => {
    return `${RoutePaths.Components()}/create`
  },
  ComponentDelete: ({ id }: IRef) => `${RoutePaths.Components()}/delete/${id}`,
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
    return `${RoutePaths.Atoms()}/update/field`
  },
  Home: () => '/',
  LambdaList: () => '/lambdas',
  Page404: ({ appId, pageId }: PageContextParams) =>
    `${RoutePaths.PageDetail_({ appId, pageId })}/404`,
  Page500: ({ appId, pageId }: PageContextParams) =>
    `${RoutePaths.PageDetail_({ appId, pageId })}/500`,
  PageBuilder: ({ appId, pageId }: PageContextParams) =>
    `${RoutePaths.PageDetail_({ appId, pageId })}/builder`,
  PageBuilderActionCreate: ({
    appId,
    pageId,
    storeId,
  }: ExtractRouteContextParams<IActionCreateRouteContext, IRouteType.Page>) =>
    `${RoutePaths.PageBuilder({ appId, pageId })}/action/create/${storeId}`,
  PageBuilderActionDelete: ({
    actionId,
    appId,
    pageId,
  }: ExtractRouteContextParams<IActionUpdateRouteContext, IRouteType.Page>) =>
    `${RoutePaths.PageBuilder({ appId, pageId })}/action/delete/${actionId}`,
  PageBuilderActionUpdate: ({
    actionId,
    appId,
    pageId,
  }: ExtractRouteContextParams<IActionUpdateRouteContext, IRouteType.Page>) =>
    `${RoutePaths.PageBuilder({ appId, pageId })}/action/update/${actionId}`,
  PageBuilderComponentList: ({ appId, pageId }: PageContextParams) =>
    `${RoutePaths.PageBuilder({ appId, pageId })}/components`,
  PageBuilderElementCreate: ({ appId, pageId }: PageContextParams) =>
    `${RoutePaths.PageBuilder({ appId, pageId })}/create-element`,
  PageBuilderFieldCreate: ({
    appId,
    interfaceId,
    pageId,
  }: PageContextParams & { interfaceId: string }) =>
    `${RoutePaths.PageBuilder({ appId, pageId })}/field/create/${interfaceId}`,
  PageBuilderFieldDelete: ({
    appId,
    fieldId,
    pageId,
  }: ExtractRouteContextParams<IFieldUpdateRouteContext, IRouteType.Page>) =>
    `${RoutePaths.PageBuilder({ appId, pageId })}/field/${fieldId}/delete`,
  PageBuilderFieldUpdate: ({
    appId,
    fieldId,
    pageId,
  }: ExtractRouteContextParams<IFieldUpdateRouteContext, IRouteType.Page>) =>
    `${RoutePaths.PageBuilder({ appId, pageId })}/field/update/${fieldId}`,
  PageCreate: ({ appId, pageId }: PageContextParams) => {
    const pageBuilder = RoutePaths.PageBuilder({ appId, pageId })

    return `${pageBuilder}/page/create`
  },
  PageDelete: ({ appId, pageId }: PageContextParams) => {
    const pageBuilder = RoutePaths.PageBuilder({ appId, pageId })

    return `${pageBuilder}/delete/page`
  },
  PageDetail_: ({ appId, pageId }: PageContextParams) =>
    `/apps/${appId}/pages/${pageId}`,
  PageList: ({ appId, pageId }: PageContextParams) =>
    `${RoutePaths.PageDetail_({ appId, pageId })}/builder/pages`,
  PageRedirectCreate: ({ appId, pageId }: PageContextParams) => {
    const pageBuilder = RoutePaths.PageBuilder({ appId, pageId })

    return `${pageBuilder}/redirect/create`
  },
  PageRedirectUpdate: ({
    appId,
    pageId,
    redirectId,
  }: PageContextParams & { redirectId: string }) => {
    const pageBuilder = RoutePaths.PageBuilder({ appId, pageId })

    return `${pageBuilder}/redirect/update/${redirectId}`
  },
  PageUpdate: ({ appId, pageId }: PageContextParams) => {
    const pageBuilder = RoutePaths.PageBuilder({ appId, pageId })

    return `${pageBuilder}/page/update`
  },
  PropsInterface: ({ appId }: { appId: string }) => `/apps/${appId}/props`,
  Resources: () => '/resources',
  ResourcesCreate: () => `${RoutePaths.Resources()}/create`,
  ResourcesDelete: (id: string) => `${RoutePaths.Resources()}/${id}/delete`,
  ResourcesUpdate: (id: string) => `${RoutePaths.Resources()}/${id}/update`,
  Storybook: () => '/storybook',
  TagCreate: () => '/tags/create' as const,
  TagDelete: (ids: Array<string>) => {
    return `${RoutePaths.Tags()}/delete/${ids.join(',')}`
  },
  Tags: () => '/tags' as const,
  TagUpdate: ({ id }: IRef) => `/tags/update/${id}` as const,
  Type: () => '/types' as const,
  TypeCreate: () => `${RoutePaths.Type()}/type/create`,
  TypeDelete: ({ id }: IRef) => `${RoutePaths.Type()}/type/${id}/delete`,
  TypeFieldCreate: (typeId: string) =>
    `${RoutePaths.Type()}/field/${typeId}/create/field`,
  TypeFieldDelete: ({ fieldId }: { fieldId: string }) =>
    `${RoutePaths.Type()}/field/${fieldId}/delete`,
  TypeFieldUpdate: ({ fieldId }: { fieldId: string }) =>
    `${RoutePaths.Type()}/field/${fieldId}/update`,
  TypeUpdate: ({ id }: IRef) => `${RoutePaths.Type()}/type/${id}/update`,
}
