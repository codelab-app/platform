import type { PageContextParams, UrlParams, UrlQuery } from './url'

export const PageType = {
  Admin: () => '/admin',
  AppDetail: ({ appId }: Pick<UrlParams, 'appId'>) => `/apps/${appId}`,
  AppList: () => '/apps',
  AtomList: ({ appId }: Pick<UrlParams, 'appId'>) => `/apps/${appId}/atoms`,
  Atoms: () => '/atoms' as const,
  AtomTypeList: () => '/atom-types',
  AuthGuards: () => '/auth-guards',
  ComponentBuilder: (
    { componentId }: Pick<UrlParams, 'componentId'>,
    { primarySidebarKey }: Partial<UrlQuery> = {},
  ) =>
    `/components/${componentId}/builder${
      primarySidebarKey ? `?primarySidebarKey=${primarySidebarKey}` : ''
    }`,
  ComponentExport: () => '/api/export/component',
  ComponentPreview: ({ componentId }: Pick<UrlParams, 'componentId'>) =>
    `/components/${componentId}`,
  Components: () => '/components',
  DomainList: ({ appId }: Pick<UrlParams, 'appId'>) => `/apps/${appId}/domains`,
  Home: () => '/',
  LambdaList: () => '/lambdas',
  Page404: ({ appId, pageId }: PageContextParams) =>
    `/apps/${appId}/pages/${pageId}/404`,
  Page500: ({ appId, pageId }: PageContextParams) =>
    `/apps/${appId}/pages/${pageId}/500`,
  PageBuilder: (
    { appId, pageId }: PageContextParams,
    { primarySidebarKey }: Partial<UrlQuery> = {},
  ) =>
    `/apps/${appId}/pages/${pageId}/builder${
      primarySidebarKey ? `?primarySidebarKey=${primarySidebarKey}` : ''
    }`,
  PageDetail: ({ appId, pageId }: PageContextParams) =>
    `/apps/${appId}/pages/${pageId}`,
  PageList: ({ appId }: Pick<UrlParams, 'appId'>) => `/apps/${appId}/pages`,
  Prop: ({ libraryId }: Pick<UrlParams, 'libraryId'>) =>
    `/library/${libraryId}/props`,
  PropsInterface: ({ appId }: Pick<UrlParams, 'appId'>) =>
    `/apps/${appId}/props`,
  Resources: () => '/resources',
  Storybook: () => '/storybook',
  Tags: () => '/tags',
  Type: () => '/types',
}
