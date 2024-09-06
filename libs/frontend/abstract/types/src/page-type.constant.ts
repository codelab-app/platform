import type {
  PageContextParams,
  UrlPathParams,
  UrlQueryParams,
} from './url-params'

export const PageType = {
  Admin: () => '/admin',
  AppDetail: ({ appId }: Pick<Required<UrlPathParams>, 'appId'>) =>
    `/apps/${appId}`,
  AppList: () => '/apps',
  AtomList: ({ appId }: Pick<Required<UrlPathParams>, 'appId'>) =>
    `/apps/${appId}/atoms`,
  Atoms: () => '/atoms' as const,
  AtomTypeList: () => '/atom-types',
  AuthGuards: () => '/auth-guards',
  ComponentBuilder: (
    { componentId }: Pick<Required<UrlPathParams>, 'componentId'>,
    { primarySidebarKey }: Partial<UrlQueryParams> = {},
  ) =>
    `/components/${componentId}/builder${
      primarySidebarKey ? `?primarySidebarKey=${primarySidebarKey}` : ''
    }`,
  ComponentExport: () => '/api/export/component',
  ComponentPreview: ({
    componentId,
  }: Pick<Required<UrlPathParams>, 'componentId'>) =>
    `/components/${componentId}`,
  Components: () => '/components' as const,
  DomainList: ({ appId }: Pick<Required<UrlPathParams>, 'appId'>) =>
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
    { primarySidebarKey }: Partial<UrlQueryParams> = {},
  ) =>
    `/apps/${appId}/pages/${pageId}/builder${
      primarySidebarKey ? `?primarySidebarKey=${primarySidebarKey}` : ''
    }`,
  PageDetail: ({
    appId,
    pageId,
  }: Pick<Required<PageContextParams>, 'appId' | 'pageId'>) =>
    `/apps/${appId}/pages/${pageId}`,
  PageList: ({ appId }: Pick<Required<UrlPathParams>, 'appId'>) =>
    `/apps/${appId}/pages`,
  // Prop: ({ libraryId }: Pick<UrlParams, 'libraryId'>) =>
  //   `/library/${libraryId}/props`,
  PropsInterface: ({ appId }: Pick<Required<UrlPathParams>, 'appId'>) =>
    `/apps/${appId}/props`,
  Resources: () => '/resources',
  Storybook: () => '/storybook',
  Tags: () => '/tags' as const,
  Type: () => '/types' as const,
}
