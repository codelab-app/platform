import type { PageContextParams, SearchParamsString, UrlParams } from './url'

export const PageType = {
  Admin: () => '/admin',
  AppDetail: ({ appId }: Pick<Required<UrlParams>, 'appId'>) =>
    `/apps/${appId}`,
  AppList: () => '/apps',
  AtomList: ({ appId }: Pick<Required<UrlParams>, 'appId'>) =>
    `/apps/${appId}/atoms`,
  Atoms: () => '/atoms' as const,
  AtomTypeList: () => '/atom-types',
  AuthGuards: () => '/auth-guards',
  ComponentBuilder: (
    { componentId }: Pick<Required<UrlParams>, 'componentId'>,
    { primarySidebarKey }: Partial<SearchParamsString> = {},
  ) =>
    `/components/${componentId}/builder${
      primarySidebarKey ? `?primarySidebarKey=${primarySidebarKey}` : ''
    }`,
  ComponentExport: () => '/api/export/component',
  ComponentPreview: ({
    componentId,
  }: Pick<Required<UrlParams>, 'componentId'>) => `/components/${componentId}`,
  Components: () => '/components' as const,
  DomainList: ({ appId }: Pick<Required<UrlParams>, 'appId'>) =>
    `/apps/${appId}/domains`,
  Home: () => '/',
  LambdaList: () => '/lambdas',
  Page404: ({
    appId,
    pageId,
  }: Pick<Required<PageContextParams>, 'appId' | 'pageId'>) =>
    `/apps/${appId}/pages/${pageId}/404`,
  Page500: ({
    appId,
    pageId,
  }: Pick<Required<PageContextParams>, 'appId' | 'pageId'>) =>
    `/apps/${appId}/pages/${pageId}/500`,
  PageBuilder: (
    { appId, pageId }: Pick<Required<PageContextParams>, 'appId' | 'pageId'>,
    { primarySidebarKey }: Partial<SearchParamsString> = {},
  ) =>
    `/apps/${appId}/pages/${pageId}/builder${
      primarySidebarKey ? `?primarySidebarKey=${primarySidebarKey}` : ''
    }`,
  PageDetail: ({
    appId,
    pageId,
  }: Pick<Required<PageContextParams>, 'appId' | 'pageId'>) =>
    `/apps/${appId}/pages/${pageId}`,
  PageList: ({ appId }: Pick<Required<UrlParams>, 'appId'>) =>
    `/apps/${appId}/pages`,
  // Prop: ({ libraryId }: Pick<UrlParams, 'libraryId'>) =>
  //   `/library/${libraryId}/props`,
  PropsInterface: ({ appId }: Pick<Required<UrlParams>, 'appId'>) =>
    `/apps/${appId}/props`,
  Resources: () => '/resources',
  Storybook: () => '/storybook',
  Tags: () => '/tags' as const,
  Type: () => '/types' as const,
}
