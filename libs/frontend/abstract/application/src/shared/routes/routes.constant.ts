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

export const NewRoutePaths = {
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

// Keep old RoutePaths for backward compatibility during migration
export const RoutePaths = {
  Admin: () => NewRoutePaths.Admin.base(),
  AdminExport: () => NewRoutePaths.Admin.export(),
  AdminImport: () => NewRoutePaths.Admin.import(),
  AppBuild: ({ id }: IRef) => NewRoutePaths.App.build({ id }),
  AppCreate: () => NewRoutePaths.App.create(),
  AppDelete: ({ id }: IRef) => NewRoutePaths.App.delete({ id }),
  AppDetail: ({ appId }: { appId: string }) =>
    NewRoutePaths.App.detail({ appId }),
  AppImport: () => NewRoutePaths.App.import(),
  AppList: () => NewRoutePaths.App.list(),
  AppUpdate: ({ id }: IRef) => NewRoutePaths.App.update({ id }),
  AtomCreate: () => NewRoutePaths.Atom.create(),
  AtomDelete: ({ id }: IRef) => NewRoutePaths.Atom.delete({ id }),
  AtomFieldCreate: ({ interfaceId }: { interfaceId: string }) =>
    NewRoutePaths.Atom.field.create({ interfaceId }),
  AtomFieldDelete: ({ id }: { id: string }) =>
    NewRoutePaths.Atom.field.delete({ id }),
  AtomFieldUpdate: ({ id }: { id: string }) =>
    NewRoutePaths.Atom.field.update({ id }),
  Atoms: () => NewRoutePaths.Atom.base(),
  AtomTable: (params: {
    filter: Array<string>
    page: number
    pageSize: number
  }) => NewRoutePaths.Atom.table(params),
  AtomTypeList: () => NewRoutePaths.Atom.typeList(),
  AtomUpdate: ({ id }: IRef, queryParams?: Partial<SearchParamsContext>) =>
    NewRoutePaths.Atom.update({ id }, queryParams),
  AuthGuards: () => NewRoutePaths.AuthGuard.base(),
  AuthGuardsCreate: () => NewRoutePaths.AuthGuard.create(),
  AuthGuardsDelete: ({ id }: IRef) => NewRoutePaths.AuthGuard.delete({ id }),
  AuthGuardsUpdate: ({ id }: IRef) => NewRoutePaths.AuthGuard.update({ id }),
  ComponentBuilder: ({ componentId }: { componentId: string }) =>
    NewRoutePaths.Component.builder({ componentId }),
  ComponentBuilderActionCreate: (
    params: ExtractRouteContextParams<
      IActionCreateRouteContext,
      IRouteType.Component
    >,
  ) => NewRoutePaths.Component.builderAction.create(params),
  ComponentBuilderActionDelete: (
    params: ExtractRouteContextParams<
      IActionUpdateRouteContext,
      IRouteType.Component
    >,
  ) => NewRoutePaths.Component.builderAction.delete(params),
  ComponentBuilderActionUpdate: (
    params: ExtractRouteContextParams<
      IActionUpdateRouteContext,
      IRouteType.Component
    >,
  ) => NewRoutePaths.Component.builderAction.update(params),
  ComponentBuilderElementCreate: ({ componentId }: { componentId: string }) =>
    NewRoutePaths.Component.builderElement.create({ componentId }),
  ComponentBuilderFieldCreate: (params: {
    componentId: string
    interfaceId: string
  }) => NewRoutePaths.Component.builderField.create(params),
  ComponentBuilderFieldDelete: (params: {
    componentId: string
    fieldId: string
  }) => NewRoutePaths.Component.builderField.delete(params),
  ComponentBuilderFieldUpdate: (params: {
    componentId: string
    fieldId: string
  }) => NewRoutePaths.Component.builderField.update(params),
  ComponentCreate: () => NewRoutePaths.Component.create(),
  ComponentDelete: ({ id }: IRef) => NewRoutePaths.Component.delete({ id }),
  ComponentExport: () => NewRoutePaths.Component.export(),
  ComponentPreview: ({ componentId }: { componentId: string }) =>
    NewRoutePaths.Component.preview({ componentId }),
  Components: () => NewRoutePaths.Component.base(),
  DomainCreate: ({ appId }: { appId: string }) =>
    NewRoutePaths.Domain.create({ appId }),
  DomainDelete: ({ appId, domainId }: { appId: string; domainId: string }) =>
    NewRoutePaths.Domain.delete({ appId, domainId }),
  DomainList: ({ appId }: { appId: string }) =>
    NewRoutePaths.Domain.list({ appId }),
  DomainUpdate: ({ appId, domainId }: { appId: string; domainId: string }) =>
    NewRoutePaths.Domain.update({ appId, domainId }),
  FieldUpdate: () => NewRoutePaths.Atom.field.update_base(),
  Home: () => NewRoutePaths.Home(),
  LambdaList: () => NewRoutePaths.Lambda.list(),
  Page404: ({ appId, pageId }: PageContextParams) =>
    NewRoutePaths.Page.error404({ appId, pageId }),
  Page500: ({ appId, pageId }: PageContextParams) =>
    NewRoutePaths.Page.error500({ appId, pageId }),
  PageBuilder: ({ appId, pageId }: PageContextParams) =>
    NewRoutePaths.Page.builder({ appId, pageId }),
  PageBuilderActionCreate: (
    params: ExtractRouteContextParams<
      IActionCreateRouteContext,
      IRouteType.Page
    >,
  ) => NewRoutePaths.Page.builderAction.create(params),
  PageBuilderActionDelete: (
    params: ExtractRouteContextParams<
      IActionUpdateRouteContext,
      IRouteType.Page
    >,
  ) => NewRoutePaths.Page.builderAction.delete(params),
  PageBuilderActionUpdate: (
    params: ExtractRouteContextParams<
      IActionUpdateRouteContext,
      IRouteType.Page
    >,
  ) => NewRoutePaths.Page.builderAction.update(params),
  PageBuilderComponentList: ({ appId, pageId }: PageContextParams) =>
    NewRoutePaths.Page.builderComponent.list({ appId, pageId }),
  PageBuilderElementCreate: ({ appId, pageId }: PageContextParams) =>
    NewRoutePaths.Page.builderElement.create({ appId, pageId }),
  PageBuilderFieldCreate: (
    params: PageContextParams & { interfaceId: string },
  ) => NewRoutePaths.Page.builderField.create(params),
  PageBuilderFieldDelete: (
    params: ExtractRouteContextParams<
      IFieldUpdateRouteContext,
      IRouteType.Page
    >,
  ) => NewRoutePaths.Page.builderField.delete(params),
  PageBuilderFieldUpdate: (
    params: ExtractRouteContextParams<
      IFieldUpdateRouteContext,
      IRouteType.Page
    >,
  ) => NewRoutePaths.Page.builderField.update(params),
  PageCreate: ({ appId, pageId }: PageContextParams) =>
    NewRoutePaths.Page.create({ appId, pageId }),
  PageDelete: ({ appId, pageId }: PageContextParams) =>
    NewRoutePaths.Page.delete({ appId, pageId }),
  PageDetail_: ({ appId, pageId }: PageContextParams) =>
    NewRoutePaths.Page.base({ appId, pageId }),
  PageList: ({ appId, pageId }: PageContextParams) =>
    NewRoutePaths.Page.list({ appId, pageId }),
  PageRedirectCreate: ({ appId, pageId }: PageContextParams) =>
    NewRoutePaths.Page.redirect.create({ appId, pageId }),
  PageRedirectUpdate: (params: PageContextParams & { redirectId: string }) =>
    NewRoutePaths.Page.redirect.update(params),
  PageUpdate: ({ appId, pageId }: PageContextParams) =>
    NewRoutePaths.Page.update({ appId, pageId }),
  PropsInterface: ({ appId }: { appId: string }) =>
    NewRoutePaths.Props.interface({ appId }),
  Resources: () => NewRoutePaths.Resource.base(),
  ResourcesCreate: () => NewRoutePaths.Resource.create(),
  ResourcesDelete: (id: string) => NewRoutePaths.Resource.delete(id),
  ResourcesUpdate: (id: string) => NewRoutePaths.Resource.update(id),
  Storybook: () => NewRoutePaths.Storybook(),
  TagCreate: () => NewRoutePaths.Tag.create(),
  TagDelete: (ids: Array<string>) => NewRoutePaths.Tag.delete(ids),
  Tags: () => NewRoutePaths.Tag.base(),
  TagUpdate: ({ id }: IRef) => NewRoutePaths.Tag.update({ id }),
  Type: () => NewRoutePaths.Type.base(),
  TypeCreate: () => NewRoutePaths.Type.create(),
  TypeDelete: ({ id }: IRef) => NewRoutePaths.Type.delete({ id }),
  TypeFieldCreate: (interfaceTypeId: string) =>
    NewRoutePaths.Type.field.create(interfaceTypeId),
  TypeFieldDelete: ({ fieldId }: { fieldId: string }) =>
    NewRoutePaths.Type.field.delete({ fieldId }),
  TypeFieldUpdate: ({ fieldId }: { fieldId: string }) =>
    NewRoutePaths.Type.field.update({ fieldId }),
  TypeUpdate: ({ id }: IRef) => NewRoutePaths.Type.update({ id }),
}
