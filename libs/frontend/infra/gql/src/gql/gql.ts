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
  '\n  fragment BaseAction on BaseAction {\n    __typename\n    id\n    name\n    store {\n      id\n      name\n    }\n    type\n  }\n':
    types.BaseActionFragmentDoc,
  '\n  fragment Action on BaseAction {\n    ...BaseAction\n    ... on CodeAction {\n      ...CodeAction\n    }\n    ... on ApiAction {\n      ...ApiAction\n    }\n  }\n':
    types.ActionFragmentDoc,
  '\n  fragment ApiAction on ApiAction {\n    ...BaseAction\n    config {\n      data\n      id\n    }\n    errorAction {\n      ...BaseAction\n    }\n    resource {\n      ...Resource\n    }\n    successAction {\n      ...BaseAction\n    }\n  }\n':
    types.ApiActionFragmentDoc,
  '\n  fragment CodeAction on CodeAction {\n    ...BaseAction\n    code\n  }\n':
    types.CodeActionFragmentDoc,
  '\n  fragment AppPreview on App {\n    domains {\n      ...Domain\n    }\n    id\n    name\n    owner {\n      ...Owner\n    }\n    pages {\n      ...PagePreview\n    }\n    slug\n  }\n':
    types.AppPreviewFragmentDoc,
  '\n  fragment App on App {\n    domains {\n      ...Domain\n    }\n    id\n    name\n    owner {\n      ...Owner\n    }\n    pages {\n      ...Page\n    }\n    slug\n  }\n':
    types.AppFragmentDoc,
  '\n  fragment AppDevelopment on App {\n    id\n    name\n    owner {\n      ...Owner\n    }\n    pages(\n      where: {\n        OR: [\n          { compositeKey_ENDS_WITH: $pageName }\n          { kind: Provider }\n          { kind: NotFound }\n          { kind: InternalServerError }\n          { kind: Regular }\n        ]\n      }\n    ) {\n      ...PageDevelopment\n    }\n    slug\n  }\n':
    types.AppDevelopmentFragmentDoc,
  '\n  fragment AppProduction on App {\n    id\n    name\n    owner {\n      ...Owner\n    }\n    pages(where: { OR: [{ urlPattern: $pageUrlPattern }, { kind: Provider }] }) {\n      ...PageProduction\n    }\n    slug\n  }\n':
    types.AppProductionFragmentDoc,
  '\n  fragment Atom on Atom {\n    __typename\n    api {\n      ...InterfaceType\n    }\n    externalCssSource\n    externalJsSource\n    externalSourceType\n    icon\n    id\n    name\n    requiredParents {\n      id\n      name\n      type\n    }\n    suggestedChildren {\n      id\n      name\n      type\n    }\n    tags {\n      ...Tag\n    }\n    type\n  }\n':
    types.AtomFragmentDoc,
  '\n  fragment AtomDevelopment on Atom {\n    __typename\n    api {\n      ...InterfaceType\n    }\n    icon\n    id\n    name\n    requiredParents {\n      id\n      name\n      type\n    }\n    suggestedChildren {\n      id\n      name\n      type\n    }\n    tags {\n      ...Tag\n    }\n    type\n  }\n':
    types.AtomDevelopmentFragmentDoc,
  '\n  fragment AtomProduction on Atom {\n    __typename\n    externalCssSource\n    externalJsSource\n    externalSourceType\n    icon\n    id\n    name\n    requiredParents {\n      id\n      name\n      type\n    }\n    suggestedChildren {\n      id\n      name\n      type\n    }\n    type\n  }\n':
    types.AtomProductionFragmentDoc,
  '\n  fragment AuthGuard on AuthGuard {\n    config {\n      ...Prop\n    }\n    id\n    name\n    resource {\n      ...Resource\n    }\n    responseTransformer\n  }\n':
    types.AuthGuardFragmentDoc,
  '\n  fragment Component on Component {\n    __typename\n    api {\n      id\n    }\n    id\n    name\n    owner {\n      ...Owner\n    }\n    props {\n      ...Prop\n    }\n    rootElement {\n      id\n    }\n    store {\n      ...Store\n    }\n  }\n':
    types.ComponentFragmentDoc,
  '\n  fragment ComponentDevelopment on Component {\n    __typename\n    api {\n      ...InterfaceType\n    }\n    elements {\n      ...Element\n    }\n    id\n    name\n    owner {\n      ...Owner\n    }\n    props {\n      ...Prop\n    }\n    rootElement {\n      id\n      name\n    }\n    store {\n      ...Store\n    }\n  }\n':
    types.ComponentDevelopmentFragmentDoc,
  '\n  fragment ComponentProduction on Component {\n    id\n    name\n    owner {\n      ...Owner\n    }\n    props {\n      ...Prop\n    }\n    rootElement {\n      id\n      name\n    }\n    store {\n      ...Store\n    }\n  }\n':
    types.ComponentProductionFragmentDoc,
  '\n  fragment Domain on Domain {\n    app {\n      id\n    }\n    domainConfig {\n      misconfigured\n    }\n    id\n    name\n  }\n':
    types.DomainFragmentDoc,
  '\n  fragment Element on Element {\n    __typename\n    childMapperComponent {\n      id\n      name\n    }\n    childMapperPreviousSibling {\n      id\n    }\n    childMapperPropKey\n    dependantTypes {\n      ...Type\n    }\n    firstChild {\n      id\n    }\n    id\n    name\n    nextSibling {\n      id\n    }\n    page {\n      id\n    }\n    parentComponent {\n      id\n    }\n    parentElement {\n      id\n    }\n    postRenderAction {\n      id\n      type\n    }\n    preRenderAction {\n      id\n      type\n    }\n    prevSibling {\n      id\n    }\n    props {\n      ...Prop\n    }\n    renderForEachPropKey\n    renderIfExpression\n    renderType {\n      ... on Atom {\n        __typename\n        ...AtomDevelopment\n      }\n      ... on Component {\n        __typename\n        id\n      }\n    }\n    style\n    tailwindClassNames\n  }\n':
    types.ElementFragmentDoc,
  '\n  fragment ElementProduction on Element {\n    __typename\n    childMapperComponent {\n      id\n      name\n    }\n    childMapperPreviousSibling {\n      id\n    }\n    childMapperPropKey\n    dependantTypes {\n      ...Type\n    }\n    firstChild {\n      id\n    }\n    id\n    name\n    nextSibling {\n      id\n    }\n    page {\n      id\n    }\n    parentComponent {\n      id\n    }\n    parentElement {\n      id\n    }\n    postRenderAction {\n      id\n      type\n    }\n    preRenderAction {\n      id\n      type\n    }\n    prevSibling {\n      id\n    }\n    props {\n      ...Prop\n    }\n    renderForEachPropKey\n    renderIfExpression\n    renderType {\n      ... on Atom {\n        __typename\n        ...AtomProduction\n      }\n      ... on Component {\n        __typename\n        id\n      }\n    }\n    style\n    tailwindClassNames\n  }\n':
    types.ElementProductionFragmentDoc,
  '\n  fragment HookProp on Prop {\n    data\n    id\n  }\n':
    types.HookPropFragmentDoc,
  '\n  fragment Hook on Hook {\n    config {\n      ...HookProp\n    }\n    element {\n      id\n      name\n    }\n    id\n    type\n  }\n':
    types.HookFragmentDoc,
  '\n  fragment PagePreview on Page {\n    app {\n      id\n    }\n    id\n    kind\n    name\n    rootElement {\n      id\n    }\n    elements {\n      id\n    }\n    store {\n      id\n    }\n    urlPattern\n  }\n':
    types.PagePreviewFragmentDoc,
  '\n  fragment Page on Page {\n    app {\n      id\n    }\n    elements {\n      ...Element\n    }\n    id\n    kind\n    name\n    pageContentContainer {\n      id\n    }\n    redirect {\n      id\n    }\n    rootElement {\n      id\n    }\n    store {\n      ...Store\n    }\n    urlPattern\n  }\n':
    types.PageFragmentDoc,
  '\n  fragment PageDevelopment on Page {\n    app {\n      id\n    }\n    elements {\n      ...Element\n    }\n    id\n    kind\n    name\n    pageContentContainer {\n      id\n    }\n    redirect {\n      id\n    }\n    rootElement {\n      id\n    }\n    store {\n      ...Store\n    }\n    urlPattern\n  }\n':
    types.PageDevelopmentFragmentDoc,
  '\n  fragment PageProduction on Page {\n    app {\n      id\n    }\n    elements {\n      ...ElementProduction\n    }\n    id\n    kind\n    name\n    pageContentContainer {\n      id\n    }\n    redirect {\n      id\n    }\n    rootElement {\n      id\n    }\n    slug\n    store {\n      ...Store\n    }\n    urlPattern\n  }\n':
    types.PageProductionFragmentDoc,
  '\n  fragment Prop on Prop {\n    data\n    id\n  }\n': types.PropFragmentDoc,
  '\n  fragment Redirect on Redirect {\n    authGuard {\n      id\n    }\n    id\n    source {\n      id\n    }\n    targetPage {\n      id\n    }\n    targetType\n    targetUrl\n  }\n':
    types.RedirectFragmentDoc,
  '\n  fragment Resource on Resource {\n    config {\n      ...Prop\n    }\n    id\n    name\n    type\n  }\n':
    types.ResourceFragmentDoc,
  '\n  fragment Store on Store {\n    actions {\n      ...Action\n    }\n    api {\n      ...InterfaceType\n    }\n    id\n    name\n  }\n':
    types.StoreFragmentDoc,
  '\n  fragment ProductionStore on Store {\n    actions {\n      ...Action\n    }\n    id\n    name\n  }\n':
    types.ProductionStoreFragmentDoc,
  '\n  fragment Tag on Tag {\n    children {\n      id\n      name\n    }\n    descendants {\n      id\n      name\n    }\n    id\n    name\n    owner {\n      ...Owner\n    }\n    parent {\n      id\n    }\n  }\n':
    types.TagFragmentDoc,
  '\n  fragment TagPreview on Tag {\n    id\n    name\n  }\n':
    types.TagPreviewFragmentDoc,
  '\n  fragment ActionType on ActionType {\n    ...BaseType\n  }\n':
    types.ActionTypeFragmentDoc,
  '\n  fragment AppType on AppType {\n    ...BaseType\n  }\n':
    types.AppTypeFragmentDoc,
  '\n  fragment ArrayType on ArrayType {\n    ...BaseType\n    itemType {\n      ... on IBaseType {\n        id\n        kind\n        name\n      }\n    }\n  }\n':
    types.ArrayTypeFragmentDoc,
  '\n  fragment BaseType on IBaseType {\n    __typename\n    id\n    kind\n    name\n  }\n':
    types.BaseTypeFragmentDoc,
  '\n  fragment CodeMirrorType on CodeMirrorType {\n    ...BaseType\n    language\n  }\n':
    types.CodeMirrorTypeFragmentDoc,
  '\n  fragment ElementType on ElementType {\n    ...BaseType\n    elementKind\n  }\n':
    types.ElementTypeFragmentDoc,
  '\n  fragment EnumTypeValue on EnumTypeValue {\n    id\n    key\n    value\n  }\n':
    types.EnumTypeValueFragmentDoc,
  '\n  fragment EnumType on EnumType {\n    allowedValues {\n      ...EnumTypeValue\n    }\n    ...BaseType\n  }\n':
    types.EnumTypeFragmentDoc,
  '\n  fragment Field on Field {\n    api {\n      ... on InterfaceType {\n        id\n      }\n    }\n    defaultValues\n    description\n    fieldType {\n      ... on IBaseType {\n        __typename\n        id\n        kind\n        name\n      }\n    }\n    id\n    key\n    name\n    nextSibling {\n      id\n    }\n    prevSibling {\n      id\n    }\n    validationRules\n  }\n':
    types.FieldFragmentDoc,
  '\n  fragment InterfaceType on InterfaceType {\n    ...BaseType\n    fields {\n      ...Field\n    }\n  }\n':
    types.InterfaceTypeFragmentDoc,
  '\n  fragment LambdaType on LambdaType {\n    ...BaseType\n  }\n':
    types.LambdaTypeFragmentDoc,
  '\n  fragment PageType on PageType {\n    ...BaseType\n  }\n':
    types.PageTypeFragmentDoc,
  '\n  fragment PrimitiveType on PrimitiveType {\n    ...BaseType\n    primitiveKind\n  }\n':
    types.PrimitiveTypeFragmentDoc,
  '\n  fragment ReactNodeType on ReactNodeType {\n    ...BaseType\n  }\n':
    types.ReactNodeTypeFragmentDoc,
  '\n  fragment RenderPropType on RenderPropType {\n    ...BaseType\n  }\n':
    types.RenderPropTypeFragmentDoc,
  '\n  fragment RichTextType on RichTextType {\n    ...BaseType\n  }\n':
    types.RichTextTypeFragmentDoc,
  '\n  fragment Type on IBaseType {\n    ...ActionType\n    ...AppType\n    ...ArrayType\n    ...CodeMirrorType\n    ...ElementType\n    ...EnumType\n    ...InterfaceType\n    ...LambdaType\n    ...PageType\n    ...PrimitiveType\n    ...ReactNodeType\n    ...RenderPropType\n    ...RichTextType\n    ...UnionType\n  }\n':
    types.TypeFragmentDoc,
  '\n  fragment UnionType on UnionType {\n    ...BaseType\n    typesOfUnionType {\n      ... on IBaseType {\n        ...BaseType\n      }\n    }\n  }\n':
    types.UnionTypeFragmentDoc,
  '\n  fragment Owner on User {\n    id\n  }\n': types.OwnerFragmentDoc,
  '\n  fragment User on User {\n    apps {\n      id\n    }\n    auth0Id\n    email\n    id\n    preferences\n    roles\n    username\n  }\n':
    types.UserFragmentDoc,
  '\n  mutation CreateApps($input: [AppCreateInput!]!) {\n    createApps(input: $input) {\n      apps {\n        id\n      }\n    }\n  }\n':
    types.CreateAppsDocument,
  '\n  mutation UpdateApps($where: AppWhere!, $update: AppUpdateInput!) {\n    updateApps(update: $update, where: $where) {\n      apps {\n        id\n      }\n    }\n  }\n':
    types.UpdateAppsDocument,
  '\n  mutation DeleteApps($where: AppWhere!, $delete: AppDeleteInput) {\n    deleteApps(delete: $delete, where: $where) {\n      nodesDeleted\n    }\n  }\n':
    types.DeleteAppsDocument,
  '\n  query GetApps($options: AppOptions, $where: AppWhere) {\n    aggregate: appsAggregate(where: $where) {\n      count\n    }\n    items: apps(options: $options, where: $where) {\n      ...App\n    }\n  }\n':
    types.GetAppsDocument,
  '\n  query GetAppsList($options: AppOptions, $where: AppWhere) {\n    apps(options: $options, where: $where) {\n      ...AppPreview\n    }\n    atoms(where: { type: ReactFragment }) {\n      ...AtomDevelopment\n    }\n  }\n':
    types.GetAppsListDocument,
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment BaseAction on BaseAction {\n    __typename\n    id\n    name\n    store {\n      id\n      name\n    }\n    type\n  }\n',
): typeof import('./graphql').BaseActionFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment Action on BaseAction {\n    ...BaseAction\n    ... on CodeAction {\n      ...CodeAction\n    }\n    ... on ApiAction {\n      ...ApiAction\n    }\n  }\n',
): typeof import('./graphql').ActionFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment ApiAction on ApiAction {\n    ...BaseAction\n    config {\n      data\n      id\n    }\n    errorAction {\n      ...BaseAction\n    }\n    resource {\n      ...Resource\n    }\n    successAction {\n      ...BaseAction\n    }\n  }\n',
): typeof import('./graphql').ApiActionFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CodeAction on CodeAction {\n    ...BaseAction\n    code\n  }\n',
): typeof import('./graphql').CodeActionFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment AppPreview on App {\n    domains {\n      ...Domain\n    }\n    id\n    name\n    owner {\n      ...Owner\n    }\n    pages {\n      ...PagePreview\n    }\n    slug\n  }\n',
): typeof import('./graphql').AppPreviewFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment App on App {\n    domains {\n      ...Domain\n    }\n    id\n    name\n    owner {\n      ...Owner\n    }\n    pages {\n      ...Page\n    }\n    slug\n  }\n',
): typeof import('./graphql').AppPreviewFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment AppDevelopment on App {\n    id\n    name\n    owner {\n      ...Owner\n    }\n    pages(\n      where: {\n        OR: [\n          { compositeKey_ENDS_WITH: $pageName }\n          { kind: Provider }\n          { kind: NotFound }\n          { kind: InternalServerError }\n          { kind: Regular }\n        ]\n      }\n    ) {\n      ...PageDevelopment\n    }\n    slug\n  }\n',
): typeof import('./graphql').AppPreviewFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment AppProduction on App {\n    id\n    name\n    owner {\n      ...Owner\n    }\n    pages(where: { OR: [{ urlPattern: $pageUrlPattern }, { kind: Provider }] }) {\n      ...PageProduction\n    }\n    slug\n  }\n',
): typeof import('./graphql').AppPreviewFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment Atom on Atom {\n    __typename\n    api {\n      ...InterfaceType\n    }\n    externalCssSource\n    externalJsSource\n    externalSourceType\n    icon\n    id\n    name\n    requiredParents {\n      id\n      name\n      type\n    }\n    suggestedChildren {\n      id\n      name\n      type\n    }\n    tags {\n      ...Tag\n    }\n    type\n  }\n',
): typeof import('./graphql').AtomFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment AtomDevelopment on Atom {\n    __typename\n    api {\n      ...InterfaceType\n    }\n    icon\n    id\n    name\n    requiredParents {\n      id\n      name\n      type\n    }\n    suggestedChildren {\n      id\n      name\n      type\n    }\n    tags {\n      ...Tag\n    }\n    type\n  }\n',
): typeof import('./graphql').AtomFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment AtomProduction on Atom {\n    __typename\n    externalCssSource\n    externalJsSource\n    externalSourceType\n    icon\n    id\n    name\n    requiredParents {\n      id\n      name\n      type\n    }\n    suggestedChildren {\n      id\n      name\n      type\n    }\n    type\n  }\n',
): typeof import('./graphql').AtomFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment AuthGuard on AuthGuard {\n    config {\n      ...Prop\n    }\n    id\n    name\n    resource {\n      ...Resource\n    }\n    responseTransformer\n  }\n',
): typeof import('./graphql').AuthGuardFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment Component on Component {\n    __typename\n    api {\n      id\n    }\n    id\n    name\n    owner {\n      ...Owner\n    }\n    props {\n      ...Prop\n    }\n    rootElement {\n      id\n    }\n    store {\n      ...Store\n    }\n  }\n',
): typeof import('./graphql').ComponentFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment ComponentDevelopment on Component {\n    __typename\n    api {\n      ...InterfaceType\n    }\n    elements {\n      ...Element\n    }\n    id\n    name\n    owner {\n      ...Owner\n    }\n    props {\n      ...Prop\n    }\n    rootElement {\n      id\n      name\n    }\n    store {\n      ...Store\n    }\n  }\n',
): typeof import('./graphql').ComponentFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment ComponentProduction on Component {\n    id\n    name\n    owner {\n      ...Owner\n    }\n    props {\n      ...Prop\n    }\n    rootElement {\n      id\n      name\n    }\n    store {\n      ...Store\n    }\n  }\n',
): typeof import('./graphql').ComponentFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment Domain on Domain {\n    app {\n      id\n    }\n    domainConfig {\n      misconfigured\n    }\n    id\n    name\n  }\n',
): typeof import('./graphql').DomainFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment Element on Element {\n    __typename\n    childMapperComponent {\n      id\n      name\n    }\n    childMapperPreviousSibling {\n      id\n    }\n    childMapperPropKey\n    dependantTypes {\n      ...Type\n    }\n    firstChild {\n      id\n    }\n    id\n    name\n    nextSibling {\n      id\n    }\n    page {\n      id\n    }\n    parentComponent {\n      id\n    }\n    parentElement {\n      id\n    }\n    postRenderAction {\n      id\n      type\n    }\n    preRenderAction {\n      id\n      type\n    }\n    prevSibling {\n      id\n    }\n    props {\n      ...Prop\n    }\n    renderForEachPropKey\n    renderIfExpression\n    renderType {\n      ... on Atom {\n        __typename\n        ...AtomDevelopment\n      }\n      ... on Component {\n        __typename\n        id\n      }\n    }\n    style\n    tailwindClassNames\n  }\n',
): typeof import('./graphql').ElementFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment ElementProduction on Element {\n    __typename\n    childMapperComponent {\n      id\n      name\n    }\n    childMapperPreviousSibling {\n      id\n    }\n    childMapperPropKey\n    dependantTypes {\n      ...Type\n    }\n    firstChild {\n      id\n    }\n    id\n    name\n    nextSibling {\n      id\n    }\n    page {\n      id\n    }\n    parentComponent {\n      id\n    }\n    parentElement {\n      id\n    }\n    postRenderAction {\n      id\n      type\n    }\n    preRenderAction {\n      id\n      type\n    }\n    prevSibling {\n      id\n    }\n    props {\n      ...Prop\n    }\n    renderForEachPropKey\n    renderIfExpression\n    renderType {\n      ... on Atom {\n        __typename\n        ...AtomProduction\n      }\n      ... on Component {\n        __typename\n        id\n      }\n    }\n    style\n    tailwindClassNames\n  }\n',
): typeof import('./graphql').ElementFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment HookProp on Prop {\n    data\n    id\n  }\n',
): typeof import('./graphql').HookPropFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment Hook on Hook {\n    config {\n      ...HookProp\n    }\n    element {\n      id\n      name\n    }\n    id\n    type\n  }\n',
): typeof import('./graphql').HookPropFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment PagePreview on Page {\n    app {\n      id\n    }\n    id\n    kind\n    name\n    rootElement {\n      id\n    }\n    elements {\n      id\n    }\n    store {\n      id\n    }\n    urlPattern\n  }\n',
): typeof import('./graphql').PagePreviewFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment Page on Page {\n    app {\n      id\n    }\n    elements {\n      ...Element\n    }\n    id\n    kind\n    name\n    pageContentContainer {\n      id\n    }\n    redirect {\n      id\n    }\n    rootElement {\n      id\n    }\n    store {\n      ...Store\n    }\n    urlPattern\n  }\n',
): typeof import('./graphql').PagePreviewFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment PageDevelopment on Page {\n    app {\n      id\n    }\n    elements {\n      ...Element\n    }\n    id\n    kind\n    name\n    pageContentContainer {\n      id\n    }\n    redirect {\n      id\n    }\n    rootElement {\n      id\n    }\n    store {\n      ...Store\n    }\n    urlPattern\n  }\n',
): typeof import('./graphql').PagePreviewFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment PageProduction on Page {\n    app {\n      id\n    }\n    elements {\n      ...ElementProduction\n    }\n    id\n    kind\n    name\n    pageContentContainer {\n      id\n    }\n    redirect {\n      id\n    }\n    rootElement {\n      id\n    }\n    slug\n    store {\n      ...Store\n    }\n    urlPattern\n  }\n',
): typeof import('./graphql').PagePreviewFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment Prop on Prop {\n    data\n    id\n  }\n',
): typeof import('./graphql').PropFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment Redirect on Redirect {\n    authGuard {\n      id\n    }\n    id\n    source {\n      id\n    }\n    targetPage {\n      id\n    }\n    targetType\n    targetUrl\n  }\n',
): typeof import('./graphql').RedirectFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment Resource on Resource {\n    config {\n      ...Prop\n    }\n    id\n    name\n    type\n  }\n',
): typeof import('./graphql').ResourceFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment Store on Store {\n    actions {\n      ...Action\n    }\n    api {\n      ...InterfaceType\n    }\n    id\n    name\n  }\n',
): typeof import('./graphql').StoreFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment ProductionStore on Store {\n    actions {\n      ...Action\n    }\n    id\n    name\n  }\n',
): typeof import('./graphql').StoreFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment Tag on Tag {\n    children {\n      id\n      name\n    }\n    descendants {\n      id\n      name\n    }\n    id\n    name\n    owner {\n      ...Owner\n    }\n    parent {\n      id\n    }\n  }\n',
): typeof import('./graphql').TagFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment TagPreview on Tag {\n    id\n    name\n  }\n',
): typeof import('./graphql').TagFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment ActionType on ActionType {\n    ...BaseType\n  }\n',
): typeof import('./graphql').ActionTypeFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment AppType on AppType {\n    ...BaseType\n  }\n',
): typeof import('./graphql').AppTypeFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment ArrayType on ArrayType {\n    ...BaseType\n    itemType {\n      ... on IBaseType {\n        id\n        kind\n        name\n      }\n    }\n  }\n',
): typeof import('./graphql').ArrayTypeFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment BaseType on IBaseType {\n    __typename\n    id\n    kind\n    name\n  }\n',
): typeof import('./graphql').BaseTypeFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CodeMirrorType on CodeMirrorType {\n    ...BaseType\n    language\n  }\n',
): typeof import('./graphql').CodeMirrorTypeFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment ElementType on ElementType {\n    ...BaseType\n    elementKind\n  }\n',
): typeof import('./graphql').ElementTypeFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment EnumTypeValue on EnumTypeValue {\n    id\n    key\n    value\n  }\n',
): typeof import('./graphql').EnumTypeValueFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment EnumType on EnumType {\n    allowedValues {\n      ...EnumTypeValue\n    }\n    ...BaseType\n  }\n',
): typeof import('./graphql').EnumTypeFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment Field on Field {\n    api {\n      ... on InterfaceType {\n        id\n      }\n    }\n    defaultValues\n    description\n    fieldType {\n      ... on IBaseType {\n        __typename\n        id\n        kind\n        name\n      }\n    }\n    id\n    key\n    name\n    nextSibling {\n      id\n    }\n    prevSibling {\n      id\n    }\n    validationRules\n  }\n',
): typeof import('./graphql').FieldFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment InterfaceType on InterfaceType {\n    ...BaseType\n    fields {\n      ...Field\n    }\n  }\n',
): typeof import('./graphql').InterfaceTypeFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment LambdaType on LambdaType {\n    ...BaseType\n  }\n',
): typeof import('./graphql').LambdaTypeFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment PageType on PageType {\n    ...BaseType\n  }\n',
): typeof import('./graphql').PageTypeFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment PrimitiveType on PrimitiveType {\n    ...BaseType\n    primitiveKind\n  }\n',
): typeof import('./graphql').PrimitiveTypeFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment ReactNodeType on ReactNodeType {\n    ...BaseType\n  }\n',
): typeof import('./graphql').ReactNodeTypeFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment RenderPropType on RenderPropType {\n    ...BaseType\n  }\n',
): typeof import('./graphql').RenderPropTypeFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment RichTextType on RichTextType {\n    ...BaseType\n  }\n',
): typeof import('./graphql').RichTextTypeFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment Type on IBaseType {\n    ...ActionType\n    ...AppType\n    ...ArrayType\n    ...CodeMirrorType\n    ...ElementType\n    ...EnumType\n    ...InterfaceType\n    ...LambdaType\n    ...PageType\n    ...PrimitiveType\n    ...ReactNodeType\n    ...RenderPropType\n    ...RichTextType\n    ...UnionType\n  }\n',
): typeof import('./graphql').TypeFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment UnionType on UnionType {\n    ...BaseType\n    typesOfUnionType {\n      ... on IBaseType {\n        ...BaseType\n      }\n    }\n  }\n',
): typeof import('./graphql').UnionTypeFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment Owner on User {\n    id\n  }\n',
): typeof import('./graphql').OwnerFragmentDoc
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment User on User {\n    apps {\n      id\n    }\n    auth0Id\n    email\n    id\n    preferences\n    roles\n    username\n  }\n',
): typeof import('./graphql').UserFragmentDoc
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
  source: '\n  mutation UpdateApps($where: AppWhere!, $update: AppUpdateInput!) {\n    updateApps(update: $update, where: $where) {\n      apps {\n        id\n      }\n    }\n  }\n',
): typeof import('./graphql').CreateAppsDocument
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation DeleteApps($where: AppWhere!, $delete: AppDeleteInput) {\n    deleteApps(delete: $delete, where: $where) {\n      nodesDeleted\n    }\n  }\n',
): typeof import('./graphql').CreateAppsDocument
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetApps($options: AppOptions, $where: AppWhere) {\n    aggregate: appsAggregate(where: $where) {\n      count\n    }\n    items: apps(options: $options, where: $where) {\n      ...App\n    }\n  }\n',
): typeof import('./graphql').CreateAppsDocument
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetAppsList($options: AppOptions, $where: AppWhere) {\n    apps(options: $options, where: $where) {\n      ...AppPreview\n    }\n    atoms(where: { type: ReactFragment }) {\n      ...AtomDevelopment\n    }\n  }\n',
): typeof import('./graphql').CreateAppsDocument

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}
