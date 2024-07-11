/* eslint-disable */
import * as types from './graphql'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  'fragment BaseAction on BaseAction {\n  __typename\n  id\n  name\n  store {\n    id\n    name\n  }\n  type\n}':
    types.BaseActionFragmentDoc,
  'fragment Action on BaseAction {\n  ...BaseAction\n  ... on CodeAction {\n    ...CodeAction\n  }\n  ... on ApiAction {\n    ...ApiAction\n  }\n}':
    types.ActionFragmentDoc,
  'fragment ApiAction on ApiAction {\n  ...BaseAction\n  config {\n    data\n    id\n  }\n  errorAction {\n    ...BaseAction\n  }\n  resource {\n    ...Resource\n  }\n  successAction {\n    ...BaseAction\n  }\n}':
    types.ApiActionFragmentDoc,
  'fragment CodeAction on CodeAction {\n  ...BaseAction\n  code\n}':
    types.CodeActionFragmentDoc,
  'fragment AppPreview on App {\n  domains {\n    ...Domain\n  }\n  id\n  name\n  owner {\n    ...Owner\n  }\n  pages {\n    ...PagePreview\n  }\n  slug\n}\n\nfragment App on App {\n  domains {\n    ...Domain\n  }\n  id\n  name\n  owner {\n    ...Owner\n  }\n  pages {\n    ...Page\n  }\n  slug\n}\n\nfragment AppDevelopment on App {\n  id\n  name\n  owner {\n    ...Owner\n  }\n  pages(\n    where: {OR: [{compositeKey_ENDS_WITH: $pageName}, {kind: Provider}, {kind: NotFound}, {kind: InternalServerError}, {kind: Regular}]}\n  ) {\n    ...PageDevelopment\n  }\n  slug\n}\n\nfragment AppProduction on App {\n  id\n  name\n  owner {\n    ...Owner\n  }\n  pages(where: {OR: [{urlPattern: $pageUrlPattern}, {kind: Provider}]}) {\n    ...PageProduction\n  }\n  slug\n}':
    types.AppPreviewFragmentDoc,
  'fragment Atom on Atom {\n  __typename\n  api {\n    ...InterfaceType\n  }\n  externalCssSource\n  externalJsSource\n  externalSourceType\n  icon\n  id\n  name\n  requiredParents {\n    id\n    name\n    type\n  }\n  suggestedChildren {\n    id\n    name\n    type\n  }\n  tags {\n    ...Tag\n  }\n  type\n}\n\nfragment AtomDevelopment on Atom {\n  __typename\n  api {\n    ...InterfaceType\n  }\n  icon\n  id\n  name\n  requiredParents {\n    id\n    name\n    type\n  }\n  suggestedChildren {\n    id\n    name\n    type\n  }\n  tags {\n    ...Tag\n  }\n  type\n}\n\nfragment AtomProduction on Atom {\n  __typename\n  externalCssSource\n  externalJsSource\n  externalSourceType\n  icon\n  id\n  name\n  requiredParents {\n    id\n    name\n    type\n  }\n  suggestedChildren {\n    id\n    name\n    type\n  }\n  type\n}':
    types.AtomFragmentDoc,
  'fragment AuthGuard on AuthGuard {\n  config {\n    ...Prop\n  }\n  id\n  name\n  resource {\n    ...Resource\n  }\n  responseTransformer\n}':
    types.AuthGuardFragmentDoc,
  'fragment Component on Component {\n  __typename\n  api {\n    id\n  }\n  id\n  name\n  owner {\n    ...Owner\n  }\n  props {\n    ...Prop\n  }\n  rootElement {\n    id\n  }\n  store {\n    ...Store\n  }\n}\n\nfragment ComponentDevelopment on Component {\n  __typename\n  api {\n    ...InterfaceType\n  }\n  elements {\n    ...Element\n  }\n  id\n  name\n  owner {\n    ...Owner\n  }\n  props {\n    ...Prop\n  }\n  rootElement {\n    id\n    name\n  }\n  store {\n    ...Store\n  }\n}\n\nfragment ComponentProduction on Component {\n  id\n  name\n  owner {\n    ...Owner\n  }\n  props {\n    ...Prop\n  }\n  rootElement {\n    id\n    name\n  }\n  store {\n    ...Store\n  }\n}':
    types.ComponentFragmentDoc,
  'fragment Domain on Domain {\n  app {\n    id\n  }\n  domainConfig {\n    misconfigured\n  }\n  id\n  name\n}':
    types.DomainFragmentDoc,
  'fragment Element on Element {\n  __typename\n  childMapperComponent {\n    id\n    name\n  }\n  childMapperPreviousSibling {\n    id\n  }\n  childMapperPropKey\n  dependantTypes {\n    ...Type\n  }\n  firstChild {\n    id\n  }\n  id\n  name\n  nextSibling {\n    id\n  }\n  page {\n    id\n  }\n  parentComponent {\n    id\n  }\n  parentElement {\n    id\n  }\n  postRenderAction {\n    id\n    type\n  }\n  preRenderAction {\n    id\n    type\n  }\n  prevSibling {\n    id\n  }\n  props {\n    ...Prop\n  }\n  renderForEachPropKey\n  renderIfExpression\n  renderType {\n    ... on Atom {\n      __typename\n      ...AtomDevelopment\n    }\n    ... on Component {\n      __typename\n      id\n    }\n  }\n  style\n  tailwindClassNames\n}\n\nfragment ElementProduction on Element {\n  __typename\n  childMapperComponent {\n    id\n    name\n  }\n  childMapperPreviousSibling {\n    id\n  }\n  childMapperPropKey\n  dependantTypes {\n    ...Type\n  }\n  firstChild {\n    id\n  }\n  id\n  name\n  nextSibling {\n    id\n  }\n  page {\n    id\n  }\n  parentComponent {\n    id\n  }\n  parentElement {\n    id\n  }\n  postRenderAction {\n    id\n    type\n  }\n  preRenderAction {\n    id\n    type\n  }\n  prevSibling {\n    id\n  }\n  props {\n    ...Prop\n  }\n  renderForEachPropKey\n  renderIfExpression\n  renderType {\n    ... on Atom {\n      __typename\n      ...AtomProduction\n    }\n    ... on Component {\n      __typename\n      id\n    }\n  }\n  style\n  tailwindClassNames\n}':
    types.ElementFragmentDoc,
  'fragment HookProp on Prop {\n  data\n  id\n}\n\nfragment Hook on Hook {\n  config {\n    ...HookProp\n  }\n  element {\n    id\n    name\n  }\n  id\n  type\n}':
    types.HookPropFragmentDoc,
  'fragment PagePreview on Page {\n  app {\n    id\n  }\n  id\n  kind\n  name\n  rootElement {\n    id\n  }\n  elements {\n    id\n  }\n  store {\n    id\n  }\n  urlPattern\n}\n\nfragment Page on Page {\n  app {\n    id\n  }\n  elements {\n    ...Element\n  }\n  id\n  kind\n  name\n  pageContentContainer {\n    id\n  }\n  redirect {\n    id\n  }\n  rootElement {\n    id\n  }\n  store {\n    ...Store\n  }\n  urlPattern\n}\n\nfragment PageDevelopment on Page {\n  app {\n    id\n  }\n  elements {\n    ...Element\n  }\n  id\n  kind\n  name\n  pageContentContainer {\n    id\n  }\n  redirect {\n    id\n  }\n  rootElement {\n    id\n  }\n  store {\n    ...Store\n  }\n  urlPattern\n}\n\nfragment PageProduction on Page {\n  app {\n    id\n  }\n  elements {\n    ...ElementProduction\n  }\n  id\n  kind\n  name\n  pageContentContainer {\n    id\n  }\n  redirect {\n    id\n  }\n  rootElement {\n    id\n  }\n  slug\n  store {\n    ...Store\n  }\n  urlPattern\n}':
    types.PagePreviewFragmentDoc,
  'fragment Prop on Prop {\n  data\n  id\n}': types.PropFragmentDoc,
  'fragment Redirect on Redirect {\n  authGuard {\n    id\n  }\n  id\n  source {\n    id\n  }\n  targetPage {\n    id\n  }\n  targetType\n  targetUrl\n}':
    types.RedirectFragmentDoc,
  'fragment Resource on Resource {\n  config {\n    ...Prop\n  }\n  id\n  name\n  type\n}':
    types.ResourceFragmentDoc,
  'fragment Store on Store {\n  actions {\n    ...Action\n  }\n  api {\n    ...InterfaceType\n  }\n  id\n  name\n}\n\nfragment ProductionStore on Store {\n  actions {\n    ...Action\n  }\n  id\n  name\n}':
    types.StoreFragmentDoc,
  'fragment Tag on Tag {\n  children {\n    id\n    name\n  }\n  descendants {\n    id\n    name\n  }\n  id\n  name\n  owner {\n    ...Owner\n  }\n  parent {\n    id\n  }\n}\n\nfragment TagPreview on Tag {\n  id\n  name\n}':
    types.TagFragmentDoc,
  'fragment ActionType on ActionType {\n  ...BaseType\n}':
    types.ActionTypeFragmentDoc,
  'fragment AppType on AppType {\n  ...BaseType\n}': types.AppTypeFragmentDoc,
  'fragment ArrayType on ArrayType {\n  ...BaseType\n  itemType {\n    ... on IBaseType {\n      id\n      kind\n      name\n    }\n  }\n}':
    types.ArrayTypeFragmentDoc,
  'fragment BaseType on IBaseType {\n  __typename\n  id\n  kind\n  name\n}':
    types.BaseTypeFragmentDoc,
  'fragment CodeMirrorType on CodeMirrorType {\n  ...BaseType\n  language\n}':
    types.CodeMirrorTypeFragmentDoc,
  'fragment ElementType on ElementType {\n  ...BaseType\n  elementKind\n}':
    types.ElementTypeFragmentDoc,
  'fragment EnumTypeValue on EnumTypeValue {\n  id\n  key\n  value\n}':
    types.EnumTypeValueFragmentDoc,
  'fragment EnumType on EnumType {\n  allowedValues {\n    ...EnumTypeValue\n  }\n  ...BaseType\n}':
    types.EnumTypeFragmentDoc,
  'fragment Field on Field {\n  api {\n    ... on InterfaceType {\n      id\n    }\n  }\n  defaultValues\n  description\n  fieldType {\n    ... on IBaseType {\n      __typename\n      id\n      kind\n      name\n    }\n  }\n  id\n  key\n  name\n  nextSibling {\n    id\n  }\n  prevSibling {\n    id\n  }\n  validationRules\n}':
    types.FieldFragmentDoc,
  'fragment InterfaceType on InterfaceType {\n  ...BaseType\n  fields {\n    ...Field\n  }\n}':
    types.InterfaceTypeFragmentDoc,
  'fragment LambdaType on LambdaType {\n  ...BaseType\n}':
    types.LambdaTypeFragmentDoc,
  'fragment PageType on PageType {\n  ...BaseType\n}':
    types.PageTypeFragmentDoc,
  'fragment PrimitiveType on PrimitiveType {\n  ...BaseType\n  primitiveKind\n}':
    types.PrimitiveTypeFragmentDoc,
  'fragment ReactNodeType on ReactNodeType {\n  ...BaseType\n}':
    types.ReactNodeTypeFragmentDoc,
  'fragment RenderPropType on RenderPropType {\n  ...BaseType\n}':
    types.RenderPropTypeFragmentDoc,
  'fragment RichTextType on RichTextType {\n  ...BaseType\n}':
    types.RichTextTypeFragmentDoc,
  'fragment Type on IBaseType {\n  ...ActionType\n  ...AppType\n  ...ArrayType\n  ...CodeMirrorType\n  ...ElementType\n  ...EnumType\n  ...InterfaceType\n  ...LambdaType\n  ...PageType\n  ...PrimitiveType\n  ...ReactNodeType\n  ...RenderPropType\n  ...RichTextType\n  ...UnionType\n}':
    types.TypeFragmentDoc,
  'fragment UnionType on UnionType {\n  ...BaseType\n  typesOfUnionType {\n    ... on IBaseType {\n      ...BaseType\n    }\n  }\n}':
    types.UnionTypeFragmentDoc,
  'fragment Owner on User {\n  id\n}': types.OwnerFragmentDoc,
  'fragment User on User {\n  apps {\n    id\n  }\n  auth0Id\n  email\n  id\n  preferences\n  roles\n  username\n}':
    types.UserFragmentDoc,
  '\n  mutation CreateComponents($input: [ComponentCreateInput!]!) {\n    createComponents(input: $input) {\n      components {\n        id\n      }\n    }\n  }\n':
    types.CreateComponentsDocument,
  '\n  mutation DeleteComponents(\n    $where: ComponentWhere!\n    $delete: ComponentDeleteInput\n  ) {\n    deleteComponents(delete: $delete, where: $where) {\n      nodesDeleted\n    }\n  }\n':
    types.DeleteComponentsDocument,
  '\n  query GetAppsList($options: AppOptions, $where: AppWhere) {\n    apps(options: $options, where: $where) {\n      ...AppPreview\n    }\n    atoms(where: { type: ReactFragment }) {\n      ...AtomDevelopment\n    }\n  }\n':
    types.GetAppsListDocument,
  '\n  mutation CreateApps($input: [AppCreateInput!]!) {\n    createApps(input: $input) {\n      apps {\n        id\n      }\n    }\n  }\n':
    types.CreateAppsDocument,
  '\n  mutation DeleteApps($where: AppWhere!, $delete: AppDeleteInput) {\n    deleteApps(delete: $delete, where: $where) {\n      nodesDeleted\n    }\n  }\n':
    types.DeleteAppsDocument,
  '\n  mutation UpdateApps($where: AppWhere!, $update: AppUpdateInput!) {\n    updateApps(update: $update, where: $where) {\n      apps {\n        id\n      }\n    }\n  }\n':
    types.UpdateAppsDocument,
  '\n  mutation CreateDomains($input: [DomainCreateInput!]!) {\n    createDomains(input: $input) {\n      domains {\n        id\n      }\n    }\n  }\n':
    types.CreateDomainsDocument,
  '\n  mutation DeleteDomains($where: DomainWhere!) {\n    deleteDomains(where: $where) {\n      nodesDeleted\n    }\n  }\n':
    types.DeleteDomainsDocument,
  '\n  query GetDomains($options: DomainOptions, $where: DomainWhere) {\n    aggregate: domainsAggregate(where: $where) {\n      count\n    }\n    items: domains(options: $options, where: $where) {\n      ...Domain\n    }\n  }\n':
    types.GetDomainsDocument,
  '\n  mutation UpdateDomains($where: DomainWhere!, $update: DomainUpdateInput!) {\n    updateDomains(update: $update, where: $where) {\n      domains {\n        id\n      }\n    }\n  }\n':
    types.UpdateDomainsDocument,
  '\n  mutation CreatePages($input: [PageCreateInput!]!) {\n    createPages(input: $input) {\n      pages {\n        id\n      }\n    }\n  }\n':
    types.CreatePagesDocument,
  '\n  mutation UpdatePages($where: PageWhere, $update: PageUpdateInput) {\n    updatePages(update: $update, where: $where) {\n      pages {\n        id\n      }\n    }\n  }\n':
    types.UpdatePagesDocument,
  '\n  mutation CreateResources($input: [ResourceCreateInput!]!) {\n    createResources(input: $input) {\n      resources {\n        id\n      }\n    }\n  }\n':
    types.CreateResourcesDocument,
  '\n  mutation DeleteResources(\n    $where: ResourceWhere\n    $delete: ResourceDeleteInput\n  ) {\n    deleteResources(where: $where, delete: $delete) {\n      nodesDeleted\n    }\n  }\n':
    types.DeleteResourcesDocument,
  '\n  mutation DeleteElements($where: ElementWhere!, $delete: ElementDeleteInput) {\n    deleteElements(delete: $delete, where: $where) {\n      nodesDeleted\n    }\n  }\n':
    types.DeleteElementsDocument,
  '\n  mutation DeletePages($where: PageWhere!, $delete: PageDeleteInput) {\n    deletePages(delete: $delete, where: $where) {\n      nodesDeleted\n    }\n  }\n':
    types.DeletePagesDocument,
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment BaseAction on BaseAction {\n  __typename\n  id\n  name\n  store {\n    id\n    name\n  }\n  type\n}',
): typeof import('./graphql').BaseActionFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment Action on BaseAction {\n  ...BaseAction\n  ... on CodeAction {\n    ...CodeAction\n  }\n  ... on ApiAction {\n    ...ApiAction\n  }\n}',
): typeof import('./graphql').ActionFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment ApiAction on ApiAction {\n  ...BaseAction\n  config {\n    data\n    id\n  }\n  errorAction {\n    ...BaseAction\n  }\n  resource {\n    ...Resource\n  }\n  successAction {\n    ...BaseAction\n  }\n}',
): typeof import('./graphql').ApiActionFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment CodeAction on CodeAction {\n  ...BaseAction\n  code\n}',
): typeof import('./graphql').CodeActionFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment AppPreview on App {\n  domains {\n    ...Domain\n  }\n  id\n  name\n  owner {\n    ...Owner\n  }\n  pages {\n    ...PagePreview\n  }\n  slug\n}\n\nfragment App on App {\n  domains {\n    ...Domain\n  }\n  id\n  name\n  owner {\n    ...Owner\n  }\n  pages {\n    ...Page\n  }\n  slug\n}\n\nfragment AppDevelopment on App {\n  id\n  name\n  owner {\n    ...Owner\n  }\n  pages(\n    where: {OR: [{compositeKey_ENDS_WITH: $pageName}, {kind: Provider}, {kind: NotFound}, {kind: InternalServerError}, {kind: Regular}]}\n  ) {\n    ...PageDevelopment\n  }\n  slug\n}\n\nfragment AppProduction on App {\n  id\n  name\n  owner {\n    ...Owner\n  }\n  pages(where: {OR: [{urlPattern: $pageUrlPattern}, {kind: Provider}]}) {\n    ...PageProduction\n  }\n  slug\n}',
): typeof import('./graphql').AppPreviewFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment Atom on Atom {\n  __typename\n  api {\n    ...InterfaceType\n  }\n  externalCssSource\n  externalJsSource\n  externalSourceType\n  icon\n  id\n  name\n  requiredParents {\n    id\n    name\n    type\n  }\n  suggestedChildren {\n    id\n    name\n    type\n  }\n  tags {\n    ...Tag\n  }\n  type\n}\n\nfragment AtomDevelopment on Atom {\n  __typename\n  api {\n    ...InterfaceType\n  }\n  icon\n  id\n  name\n  requiredParents {\n    id\n    name\n    type\n  }\n  suggestedChildren {\n    id\n    name\n    type\n  }\n  tags {\n    ...Tag\n  }\n  type\n}\n\nfragment AtomProduction on Atom {\n  __typename\n  externalCssSource\n  externalJsSource\n  externalSourceType\n  icon\n  id\n  name\n  requiredParents {\n    id\n    name\n    type\n  }\n  suggestedChildren {\n    id\n    name\n    type\n  }\n  type\n}',
): typeof import('./graphql').AtomFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment AuthGuard on AuthGuard {\n  config {\n    ...Prop\n  }\n  id\n  name\n  resource {\n    ...Resource\n  }\n  responseTransformer\n}',
): typeof import('./graphql').AuthGuardFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment Component on Component {\n  __typename\n  api {\n    id\n  }\n  id\n  name\n  owner {\n    ...Owner\n  }\n  props {\n    ...Prop\n  }\n  rootElement {\n    id\n  }\n  store {\n    ...Store\n  }\n}\n\nfragment ComponentDevelopment on Component {\n  __typename\n  api {\n    ...InterfaceType\n  }\n  elements {\n    ...Element\n  }\n  id\n  name\n  owner {\n    ...Owner\n  }\n  props {\n    ...Prop\n  }\n  rootElement {\n    id\n    name\n  }\n  store {\n    ...Store\n  }\n}\n\nfragment ComponentProduction on Component {\n  id\n  name\n  owner {\n    ...Owner\n  }\n  props {\n    ...Prop\n  }\n  rootElement {\n    id\n    name\n  }\n  store {\n    ...Store\n  }\n}',
): typeof import('./graphql').ComponentFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment Domain on Domain {\n  app {\n    id\n  }\n  domainConfig {\n    misconfigured\n  }\n  id\n  name\n}',
): typeof import('./graphql').DomainFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment Element on Element {\n  __typename\n  childMapperComponent {\n    id\n    name\n  }\n  childMapperPreviousSibling {\n    id\n  }\n  childMapperPropKey\n  dependantTypes {\n    ...Type\n  }\n  firstChild {\n    id\n  }\n  id\n  name\n  nextSibling {\n    id\n  }\n  page {\n    id\n  }\n  parentComponent {\n    id\n  }\n  parentElement {\n    id\n  }\n  postRenderAction {\n    id\n    type\n  }\n  preRenderAction {\n    id\n    type\n  }\n  prevSibling {\n    id\n  }\n  props {\n    ...Prop\n  }\n  renderForEachPropKey\n  renderIfExpression\n  renderType {\n    ... on Atom {\n      __typename\n      ...AtomDevelopment\n    }\n    ... on Component {\n      __typename\n      id\n    }\n  }\n  style\n  tailwindClassNames\n}\n\nfragment ElementProduction on Element {\n  __typename\n  childMapperComponent {\n    id\n    name\n  }\n  childMapperPreviousSibling {\n    id\n  }\n  childMapperPropKey\n  dependantTypes {\n    ...Type\n  }\n  firstChild {\n    id\n  }\n  id\n  name\n  nextSibling {\n    id\n  }\n  page {\n    id\n  }\n  parentComponent {\n    id\n  }\n  parentElement {\n    id\n  }\n  postRenderAction {\n    id\n    type\n  }\n  preRenderAction {\n    id\n    type\n  }\n  prevSibling {\n    id\n  }\n  props {\n    ...Prop\n  }\n  renderForEachPropKey\n  renderIfExpression\n  renderType {\n    ... on Atom {\n      __typename\n      ...AtomProduction\n    }\n    ... on Component {\n      __typename\n      id\n    }\n  }\n  style\n  tailwindClassNames\n}',
): typeof import('./graphql').ElementFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment HookProp on Prop {\n  data\n  id\n}\n\nfragment Hook on Hook {\n  config {\n    ...HookProp\n  }\n  element {\n    id\n    name\n  }\n  id\n  type\n}',
): typeof import('./graphql').HookPropFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment PagePreview on Page {\n  app {\n    id\n  }\n  id\n  kind\n  name\n  rootElement {\n    id\n  }\n  elements {\n    id\n  }\n  store {\n    id\n  }\n  urlPattern\n}\n\nfragment Page on Page {\n  app {\n    id\n  }\n  elements {\n    ...Element\n  }\n  id\n  kind\n  name\n  pageContentContainer {\n    id\n  }\n  redirect {\n    id\n  }\n  rootElement {\n    id\n  }\n  store {\n    ...Store\n  }\n  urlPattern\n}\n\nfragment PageDevelopment on Page {\n  app {\n    id\n  }\n  elements {\n    ...Element\n  }\n  id\n  kind\n  name\n  pageContentContainer {\n    id\n  }\n  redirect {\n    id\n  }\n  rootElement {\n    id\n  }\n  store {\n    ...Store\n  }\n  urlPattern\n}\n\nfragment PageProduction on Page {\n  app {\n    id\n  }\n  elements {\n    ...ElementProduction\n  }\n  id\n  kind\n  name\n  pageContentContainer {\n    id\n  }\n  redirect {\n    id\n  }\n  rootElement {\n    id\n  }\n  slug\n  store {\n    ...Store\n  }\n  urlPattern\n}',
): typeof import('./graphql').PagePreviewFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment Prop on Prop {\n  data\n  id\n}',
): typeof import('./graphql').PropFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment Redirect on Redirect {\n  authGuard {\n    id\n  }\n  id\n  source {\n    id\n  }\n  targetPage {\n    id\n  }\n  targetType\n  targetUrl\n}',
): typeof import('./graphql').RedirectFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment Resource on Resource {\n  config {\n    ...Prop\n  }\n  id\n  name\n  type\n}',
): typeof import('./graphql').ResourceFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment Store on Store {\n  actions {\n    ...Action\n  }\n  api {\n    ...InterfaceType\n  }\n  id\n  name\n}\n\nfragment ProductionStore on Store {\n  actions {\n    ...Action\n  }\n  id\n  name\n}',
): typeof import('./graphql').StoreFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment Tag on Tag {\n  children {\n    id\n    name\n  }\n  descendants {\n    id\n    name\n  }\n  id\n  name\n  owner {\n    ...Owner\n  }\n  parent {\n    id\n  }\n}\n\nfragment TagPreview on Tag {\n  id\n  name\n}',
): typeof import('./graphql').TagFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment ActionType on ActionType {\n  ...BaseType\n}',
): typeof import('./graphql').ActionTypeFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment AppType on AppType {\n  ...BaseType\n}',
): typeof import('./graphql').AppTypeFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment ArrayType on ArrayType {\n  ...BaseType\n  itemType {\n    ... on IBaseType {\n      id\n      kind\n      name\n    }\n  }\n}',
): typeof import('./graphql').ArrayTypeFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment BaseType on IBaseType {\n  __typename\n  id\n  kind\n  name\n}',
): typeof import('./graphql').BaseTypeFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment CodeMirrorType on CodeMirrorType {\n  ...BaseType\n  language\n}',
): typeof import('./graphql').CodeMirrorTypeFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment ElementType on ElementType {\n  ...BaseType\n  elementKind\n}',
): typeof import('./graphql').ElementTypeFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment EnumTypeValue on EnumTypeValue {\n  id\n  key\n  value\n}',
): typeof import('./graphql').EnumTypeValueFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment EnumType on EnumType {\n  allowedValues {\n    ...EnumTypeValue\n  }\n  ...BaseType\n}',
): typeof import('./graphql').EnumTypeFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment Field on Field {\n  api {\n    ... on InterfaceType {\n      id\n    }\n  }\n  defaultValues\n  description\n  fieldType {\n    ... on IBaseType {\n      __typename\n      id\n      kind\n      name\n    }\n  }\n  id\n  key\n  name\n  nextSibling {\n    id\n  }\n  prevSibling {\n    id\n  }\n  validationRules\n}',
): typeof import('./graphql').FieldFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment InterfaceType on InterfaceType {\n  ...BaseType\n  fields {\n    ...Field\n  }\n}',
): typeof import('./graphql').InterfaceTypeFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment LambdaType on LambdaType {\n  ...BaseType\n}',
): typeof import('./graphql').LambdaTypeFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment PageType on PageType {\n  ...BaseType\n}',
): typeof import('./graphql').PageTypeFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment PrimitiveType on PrimitiveType {\n  ...BaseType\n  primitiveKind\n}',
): typeof import('./graphql').PrimitiveTypeFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment ReactNodeType on ReactNodeType {\n  ...BaseType\n}',
): typeof import('./graphql').ReactNodeTypeFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment RenderPropType on RenderPropType {\n  ...BaseType\n}',
): typeof import('./graphql').RenderPropTypeFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment RichTextType on RichTextType {\n  ...BaseType\n}',
): typeof import('./graphql').RichTextTypeFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment Type on IBaseType {\n  ...ActionType\n  ...AppType\n  ...ArrayType\n  ...CodeMirrorType\n  ...ElementType\n  ...EnumType\n  ...InterfaceType\n  ...LambdaType\n  ...PageType\n  ...PrimitiveType\n  ...ReactNodeType\n  ...RenderPropType\n  ...RichTextType\n  ...UnionType\n}',
): typeof import('./graphql').TypeFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment UnionType on UnionType {\n  ...BaseType\n  typesOfUnionType {\n    ... on IBaseType {\n      ...BaseType\n    }\n  }\n}',
): typeof import('./graphql').UnionTypeFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment Owner on User {\n  id\n}',
): typeof import('./graphql').OwnerFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment User on User {\n  apps {\n    id\n  }\n  auth0Id\n  email\n  id\n  preferences\n  roles\n  username\n}',
): typeof import('./graphql').UserFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateComponents($input: [ComponentCreateInput!]!) {\n    createComponents(input: $input) {\n      components {\n        id\n      }\n    }\n  }\n',
): typeof import('./graphql').CreateComponentsDocument
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation DeleteComponents(\n    $where: ComponentWhere!\n    $delete: ComponentDeleteInput\n  ) {\n    deleteComponents(delete: $delete, where: $where) {\n      nodesDeleted\n    }\n  }\n',
): typeof import('./graphql').DeleteComponentsDocument
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetAppsList($options: AppOptions, $where: AppWhere) {\n    apps(options: $options, where: $where) {\n      ...AppPreview\n    }\n    atoms(where: { type: ReactFragment }) {\n      ...AtomDevelopment\n    }\n  }\n',
): typeof import('./graphql').GetAppsListDocument
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateApps($input: [AppCreateInput!]!) {\n    createApps(input: $input) {\n      apps {\n        id\n      }\n    }\n  }\n',
): typeof import('./graphql').CreateAppsDocument
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation DeleteApps($where: AppWhere!, $delete: AppDeleteInput) {\n    deleteApps(delete: $delete, where: $where) {\n      nodesDeleted\n    }\n  }\n',
): typeof import('./graphql').DeleteAppsDocument
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateApps($where: AppWhere!, $update: AppUpdateInput!) {\n    updateApps(update: $update, where: $where) {\n      apps {\n        id\n      }\n    }\n  }\n',
): typeof import('./graphql').UpdateAppsDocument
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateDomains($input: [DomainCreateInput!]!) {\n    createDomains(input: $input) {\n      domains {\n        id\n      }\n    }\n  }\n',
): typeof import('./graphql').CreateDomainsDocument
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation DeleteDomains($where: DomainWhere!) {\n    deleteDomains(where: $where) {\n      nodesDeleted\n    }\n  }\n',
): typeof import('./graphql').DeleteDomainsDocument
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetDomains($options: DomainOptions, $where: DomainWhere) {\n    aggregate: domainsAggregate(where: $where) {\n      count\n    }\n    items: domains(options: $options, where: $where) {\n      ...Domain\n    }\n  }\n',
): typeof import('./graphql').GetDomainsDocument
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdateDomains($where: DomainWhere!, $update: DomainUpdateInput!) {\n    updateDomains(update: $update, where: $where) {\n      domains {\n        id\n      }\n    }\n  }\n',
): typeof import('./graphql').UpdateDomainsDocument
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreatePages($input: [PageCreateInput!]!) {\n    createPages(input: $input) {\n      pages {\n        id\n      }\n    }\n  }\n',
): typeof import('./graphql').CreatePagesDocument
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdatePages($where: PageWhere, $update: PageUpdateInput) {\n    updatePages(update: $update, where: $where) {\n      pages {\n        id\n      }\n    }\n  }\n',
): typeof import('./graphql').UpdatePagesDocument
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateResources($input: [ResourceCreateInput!]!) {\n    createResources(input: $input) {\n      resources {\n        id\n      }\n    }\n  }\n',
): typeof import('./graphql').CreateResourcesDocument
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation DeleteResources(\n    $where: ResourceWhere\n    $delete: ResourceDeleteInput\n  ) {\n    deleteResources(where: $where, delete: $delete) {\n      nodesDeleted\n    }\n  }\n',
): typeof import('./graphql').DeleteResourcesDocument
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation DeleteElements($where: ElementWhere!, $delete: ElementDeleteInput) {\n    deleteElements(delete: $delete, where: $where) {\n      nodesDeleted\n    }\n  }\n',
): typeof import('./graphql').DeleteElementsDocument
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation DeletePages($where: PageWhere!, $delete: PageDeleteInput) {\n    deletePages(delete: $delete, where: $where) {\n      nodesDeleted\n    }\n  }\n',
): typeof import('./graphql').DeletePagesDocument

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}
