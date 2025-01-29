/* eslint-disable */
import * as types from './graphql';



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
    "\n  fragment BaseAction on BaseAction {\n    __typename\n    id\n    name\n    type\n    store {\n      id\n      name\n    }\n  }\n": types.BaseActionFragmentDoc,
    "\n  fragment Action on BaseAction {\n    ...BaseAction\n    ... on CodeAction {\n      ...CodeAction\n    }\n    ... on ApiAction {\n      ...ApiAction\n    }\n  }\n": types.ActionFragmentDoc,
    "\n  fragment ApiAction on ApiAction {\n    ...BaseAction\n    config {\n      data\n      id\n    }\n    errorAction {\n      ...BaseAction\n    }\n    resource {\n      ...Resource\n    }\n    successAction {\n      ...BaseAction\n    }\n  }\n": types.ApiActionFragmentDoc,
    "\n  fragment CodeAction on CodeAction {\n    ...BaseAction\n    code\n  }\n": types.CodeActionFragmentDoc,
    "\n  fragment AppPreview on App {\n    domains {\n      ...Domain\n    }\n    id\n    name\n    owner {\n      ...Owner\n    }\n    pages {\n      ...PagePreview\n    }\n    slug\n  }\n": types.AppPreviewFragmentDoc,
    "\n  fragment App on App {\n    domains {\n      ...Domain\n    }\n    id\n    name\n    owner {\n      ...Owner\n    }\n    pages {\n      ...Page\n    }\n    slug\n  }\n": types.AppFragmentDoc,
    "\n  fragment AppBuilder on App {\n    id\n    name\n    owner {\n      ...Owner\n    }\n    pages(\n      where: {\n        OR: [\n          { id_IN: $pageIds }\n          { kind: Provider }\n          { kind: NotFound }\n          { kind: InternalServerError }\n          { kind: Regular }\n        ]\n      }\n    ) {\n      ...PageDevelopment\n    }\n    slug\n  }\n": types.AppBuilderFragmentDoc,
    "\n  fragment AppProduction on App {\n    id\n    name\n    owner {\n      ...Owner\n    }\n    pages(\n      where: { OR: [{ urlPattern: $pageUrlPattern }, { kind: Provider }] }\n    ) {\n      ...PageProduction\n    }\n    slug\n  }\n": types.AppProductionFragmentDoc,
    "\n  fragment Atom on Atom {\n    __typename\n    api {\n      ...InterfaceType\n    }\n    externalCssSource\n    externalJsSource\n    externalSourceType\n    icon\n    id\n    name\n    requiredParents {\n      id\n      name\n      type\n    }\n    suggestedChildren {\n      id\n      name\n      type\n    }\n    tags {\n      ...TagPreview\n    }\n    type\n    owner {\n      id\n    }\n  }\n": types.AtomFragmentDoc,
    "\n  fragment AtomBuilder on Atom {\n    __typename\n    api {\n      ...InterfaceType\n    }\n    icon\n    id\n    name\n    requiredParents {\n      id\n      name\n      type\n    }\n    suggestedChildren {\n      id\n      name\n      type\n    }\n    tags {\n      ...TagPreview\n    }\n    type\n    owner {\n      id\n    }\n  }\n": types.AtomBuilderFragmentDoc,
    "\n  fragment AtomProduction on Atom {\n    __typename\n    externalCssSource\n    externalJsSource\n    externalSourceType\n    icon\n    id\n    name\n    requiredParents {\n      id\n      name\n      type\n    }\n    suggestedChildren {\n      id\n      name\n      type\n    }\n    type\n  }\n": types.AtomProductionFragmentDoc,
    "\n  fragment AuthGuard on AuthGuard {\n    config {\n      ...Prop\n    }\n    id\n    name\n    resource {\n      ...Resource\n    }\n    responseTransformer\n    owner {\n      id\n    }\n  }\n": types.AuthGuardFragmentDoc,
    "\n  fragment Component on Component {\n    __typename\n    api {\n      __typename\n      id\n    }\n    id\n    name\n    compositeKey\n    owner {\n      ...Owner\n    }\n    props {\n      ...Prop\n    }\n    rootElement {\n      id\n    }\n    store {\n      ...Store\n    }\n  }\n": types.ComponentFragmentDoc,
    "\n  fragment ComponentBuilder on Component {\n    __typename\n    api {\n      ...InterfaceType\n    }\n    elements {\n      ...Element\n    }\n    id\n    name\n    compositeKey\n    owner {\n      ...Owner\n    }\n    props {\n      ...Prop\n    }\n    rootElement {\n      id\n      name\n    }\n    store {\n      ...Store\n    }\n  }\n": types.ComponentBuilderFragmentDoc,
    "\n  fragment ComponentProduction on Component {\n    id\n    name\n    compositeKey\n    owner {\n      ...Owner\n    }\n    props {\n      ...Prop\n    }\n    rootElement {\n      id\n      name\n    }\n    store {\n      ...Store\n    }\n  }\n": types.ComponentProductionFragmentDoc,
    "\n  fragment Domain on Domain {\n    app {\n      id\n    }\n    domainConfig {\n      misconfigured\n    }\n    id\n    name\n  }\n": types.DomainFragmentDoc,
    "\n  fragment ElementRenderType on ElementRenderType {\n    ... on Atom {\n      __typename\n      ...AtomBuilder\n    }\n    ... on Component {\n      __typename\n      id\n    }\n  }\n": types.ElementRenderTypeFragmentDoc,
    "\n  fragment ElementRenderTypeProduction on ElementRenderType {\n    ... on Atom {\n      __typename\n      ...AtomProduction\n    }\n    ... on Component {\n      __typename\n      id\n    }\n  }\n": types.ElementRenderTypeProductionFragmentDoc,
    "\n  fragment Element on Element {\n    __typename\n    compositeKey\n    childMapperComponent {\n      id\n    }\n    childMapperPreviousSibling {\n      id\n    }\n    childMapperPropKey\n    dependantTypes {\n      ...Type\n    }\n    firstChild {\n      id\n    }\n    id\n    name\n    nextSibling {\n      id\n    }\n    page {\n      id\n    }\n    parentComponent {\n      id\n    }\n    parentElement {\n      id\n    }\n    postRenderActions {\n      id\n      type\n    }\n    preRenderActions {\n      id\n      type\n    }\n    prevSibling {\n      id\n    }\n    props {\n      ...Prop\n    }\n    renderForEachPropKey\n    renderIfExpression\n    renderType {\n      ...ElementRenderType\n    }\n    style\n    tailwindClassNames\n    expanded\n  }\n": types.ElementFragmentDoc,
    "\n  fragment ElementProduction on Element {\n    __typename\n    childMapperComponent {\n      id\n      name\n    }\n    childMapperPreviousSibling {\n      id\n    }\n    childMapperPropKey\n    dependantTypes {\n      ...Type\n    }\n    firstChild {\n      id\n    }\n    id\n    name\n    nextSibling {\n      id\n    }\n    page {\n      id\n    }\n    parentComponent {\n      id\n    }\n    parentElement {\n      id\n    }\n    postRenderActions {\n      id\n      type\n    }\n    preRenderActions {\n      id\n      type\n    }\n    prevSibling {\n      id\n    }\n    props {\n      ...Prop\n    }\n    renderForEachPropKey\n    renderIfExpression\n    renderType {\n      ...ElementRenderTypeProduction\n    }\n    style\n    tailwindClassNames\n  }\n": types.ElementProductionFragmentDoc,
    "\n  fragment HookProp on Prop {\n    data\n    id\n  }\n": types.HookPropFragmentDoc,
    "\n  fragment Hook on Hook {\n    config {\n      ...HookProp\n    }\n    element {\n      id\n      name\n    }\n    id\n    type\n  }\n": types.HookFragmentDoc,
    "\n  fragment PagePreview on Page {\n    app {\n      id\n    }\n    id\n    kind\n    name\n    rootElement {\n      id\n    }\n    elements {\n      id\n    }\n    store {\n      id\n    }\n    urlPattern\n  }\n": types.PagePreviewFragmentDoc,
    "\n  fragment Page on Page {\n    app {\n      id\n    }\n    elements {\n      ...Element\n    }\n    id\n    kind\n    name\n    pageContentContainer {\n      id\n    }\n    redirect {\n      id\n    }\n    rootElement {\n      id\n    }\n    store {\n      ...Store\n    }\n    urlPattern\n  }\n": types.PageFragmentDoc,
    "\n  fragment PageDevelopment on Page {\n    app {\n      id\n    }\n    elements {\n      ...Element\n    }\n    id\n    kind\n    name\n    pageContentContainer {\n      id\n    }\n    redirect {\n      id\n    }\n    rootElement {\n      id\n    }\n    store {\n      ...Store\n    }\n    urlPattern\n  }\n": types.PageDevelopmentFragmentDoc,
    "\n  fragment PageProduction on Page {\n    app {\n      id\n    }\n    elements {\n      ...ElementProduction\n    }\n    id\n    kind\n    name\n    pageContentContainer {\n      id\n    }\n    redirect {\n      id\n    }\n    rootElement {\n      id\n    }\n    slug\n    store {\n      ...Store\n    }\n    urlPattern\n  }\n": types.PageProductionFragmentDoc,
    "\n  fragment Preference on Preference {\n    id\n    builderBreakpointType\n    builderWidth\n    owner {\n      id\n    }\n  }\n": types.PreferenceFragmentDoc,
    "\n  fragment Prop on Prop {\n    data\n    id\n  }\n": types.PropFragmentDoc,
    "\n  fragment Redirect on Redirect {\n    authGuard {\n      ...AuthGuard\n    }\n    id\n    source {\n      id\n    }\n    targetPage {\n      ...PagePreview\n    }\n    targetType\n    targetUrl\n  }\n": types.RedirectFragmentDoc,
    "\n  fragment RedirectPreview on Redirect {\n    authGuard {\n      id\n    }\n    id\n    source {\n      id\n    }\n    targetPage {\n      id\n    }\n    targetType\n    targetUrl\n  }\n": types.RedirectPreviewFragmentDoc,
    "\n  fragment Resource on Resource {\n    config {\n      ...Prop\n    }\n    id\n    name\n    type\n    owner {\n      id\n    }\n  }\n": types.ResourceFragmentDoc,
    "\n  fragment Store on Store {\n    actions {\n      ...Action\n    }\n    api {\n      ...InterfaceType\n    }\n    id\n    name\n  }\n": types.StoreFragmentDoc,
    "\n  fragment ProductionStore on Store {\n    actions {\n      ...Action\n    }\n    id\n    name\n  }\n": types.ProductionStoreFragmentDoc,
    "\n  fragment Tag on Tag {\n    children {\n      id\n      name\n      owner {\n        id\n      }\n    }\n    descendants {\n      id\n      name\n    }\n    id\n    name\n    owner {\n      id\n    }\n    parent {\n      id\n      name\n    }\n  }\n": types.TagFragmentDoc,
    "\n  fragment TagPreview on Tag {\n    id\n    name\n    owner {\n      id\n    }\n  }\n": types.TagPreviewFragmentDoc,
    "\n  fragment ActionType on ActionType {\n    ...BaseType\n  }\n": types.ActionTypeFragmentDoc,
    "\n  fragment AppType on AppType {\n    ...BaseType\n  }\n": types.AppTypeFragmentDoc,
    "\n  fragment ArrayType on ArrayType {\n    ...BaseType\n    itemType {\n      ... on IBaseType {\n        ...BaseType\n      }\n    }\n  }\n": types.ArrayTypeFragmentDoc,
    "\n  fragment BaseType on IBaseType {\n    __typename\n    id\n    kind\n    name\n    owner {\n      id\n    }\n  }\n": types.BaseTypeFragmentDoc,
    "\n  fragment CodeMirrorType on CodeMirrorType {\n    ...BaseType\n    language\n  }\n": types.CodeMirrorTypeFragmentDoc,
    "\n  fragment ElementType on ElementType {\n    ...BaseType\n    elementKind\n  }\n": types.ElementTypeFragmentDoc,
    "\n  fragment EnumTypeValue on EnumTypeValue {\n    id\n    key\n    value\n  }\n": types.EnumTypeValueFragmentDoc,
    "\n  fragment EnumType on EnumType {\n    ...BaseType\n    allowedValues {\n      ...EnumTypeValue\n    }\n  }\n": types.EnumTypeFragmentDoc,
    "\n  fragment Field on Field {\n    __typename\n    api {\n      ... on InterfaceType {\n        ...BaseType\n      }\n    }\n    defaultValues\n    description\n    fieldType {\n      ... on IBaseType {\n        ...BaseType\n      }\n    }\n    id\n    key\n    name\n    nextSibling {\n      id\n    }\n    prevSibling {\n      id\n    }\n    validationRules\n  }\n": types.FieldFragmentDoc,
    "\n  fragment InterfaceType on InterfaceType {\n    ...BaseType\n    fields {\n      ...Field\n    }\n  }\n": types.InterfaceTypeFragmentDoc,
    "\n  fragment LambdaType on LambdaType {\n    ...BaseType\n  }\n": types.LambdaTypeFragmentDoc,
    "\n  fragment PageType on PageType {\n    ...BaseType\n  }\n": types.PageTypeFragmentDoc,
    "\n  fragment PrimitiveType on PrimitiveType {\n    ...BaseType\n    primitiveKind\n  }\n": types.PrimitiveTypeFragmentDoc,
    "\n  fragment ReactNodeType on ReactNodeType {\n    ...BaseType\n  }\n": types.ReactNodeTypeFragmentDoc,
    "\n  fragment RenderPropType on RenderPropType {\n    ...BaseType\n  }\n": types.RenderPropTypeFragmentDoc,
    "\n  fragment RichTextType on RichTextType {\n    ...BaseType\n  }\n": types.RichTextTypeFragmentDoc,
    "\n  fragment Type on IBaseType {\n    ...ActionType\n    ...AppType\n    ...ArrayType\n    ...CodeMirrorType\n    ...ElementType\n    ...EnumType\n    ...InterfaceType\n    ...LambdaType\n    ...PageType\n    ...PrimitiveType\n    ...ReactNodeType\n    ...RenderPropType\n    ...RichTextType\n    ...UnionType\n  }\n": types.TypeFragmentDoc,
    "\n  fragment UnionType on UnionType {\n    ...BaseType\n    typesOfUnionType {\n      ... on IBaseType {\n        ...BaseType\n      }\n    }\n  }\n": types.UnionTypeFragmentDoc,
    "\n  fragment Owner on User {\n    id\n  }\n": types.OwnerFragmentDoc,
    "\n  fragment User on User {\n    apps {\n      id\n    }\n    auth0Id\n    email\n    id\n    preferences {\n      ...Preference\n    }\n    roles\n    username\n  }\n": types.UserFragmentDoc,
    "\n  query GetAppBuilder($appId: ID!, $pageIds: [ID!]) {\n    actionTypes {\n      ...ActionType\n    }\n    apps(where: { id: $appId }) {\n      ...AppBuilder\n    }\n    atoms(where: { type: ReactFragment }) {\n      ...AtomBuilder\n    }\n    authGuards {\n      ...AuthGuard\n    }\n    codeMirrorTypes {\n      ...CodeMirrorType\n    }\n    components {\n      ...ComponentBuilder\n    }\n    primitiveTypes {\n      ...PrimitiveType\n    }\n    reactNodeTypes {\n      ...ReactNodeType\n    }\n    redirects(where: { source: { app: { id: $appId } } }) {\n      ...Redirect\n    }\n    renderPropTypes {\n      ...RenderPropType\n    }\n    resources {\n      ...Resource\n    }\n    richTextTypes {\n      ...RichTextType\n    }\n  }\n": types.GetAppBuilderDocument,
    "\n  query GetSelectAtomOptions {\n    atoms {\n      __typename\n      id\n      name\n      requiredParents {\n        id\n        type\n      }\n      type\n    }\n  }\n": types.GetSelectAtomOptionsDocument,
    "\n  query GetComponentBuilder {\n    actionTypes {\n      ...ActionType\n    }\n    atoms(where: { type: ReactFragment }) {\n      ...AtomBuilder\n    }\n    codeMirrorTypes {\n      ...CodeMirrorType\n    }\n    components {\n      ...ComponentBuilder\n    }\n    primitiveTypes {\n      ...PrimitiveType\n    }\n    reactNodeTypes {\n      ...ReactNodeType\n    }\n    renderPropTypes {\n      ...RenderPropType\n    }\n    resources {\n      ...Resource\n    }\n    richTextTypes {\n      ...RichTextType\n    }\n  }\n": types.GetComponentBuilderDocument,
    "\n  mutation CreateApps($input: [AppCreateInput!]!) {\n    createApps(input: $input) {\n      apps {\n        __typename\n        id\n      }\n    }\n  }\n": types.CreateAppsDocument,
    "\n  mutation UpdateApps($where: AppWhere!, $update: AppUpdateInput!) {\n    updateApps(update: $update, where: $where) {\n      apps {\n        __typename\n        id\n      }\n    }\n  }\n": types.UpdateAppsDocument,
    "\n  mutation DeleteApps($where: AppWhere!, $delete: AppDeleteInput) {\n    deleteApps(delete: $delete, where: $where) {\n      nodesDeleted\n    }\n  }\n": types.DeleteAppsDocument,
    "\n  query AppListPreview($options: AppOptions, $where: AppWhere) {\n    aggregate: appsAggregate(where: $where) {\n      count\n    }\n    items: apps(options: $options, where: $where) {\n      ...AppPreview\n    }\n  }\n": types.AppListPreviewDocument,
    "\n  query AppList($options: AppOptions, $where: AppWhere) {\n    items: apps(options: $options, where: $where) {\n      ...App\n    }\n    aggregate: appsAggregate(where: $where) {\n      count\n    }\n    atoms(where: { type: ReactFragment }) {\n      ...AtomBuilder\n    }\n  }\n": types.AppListDocument,
    "\n  query GetAppProduction($domain: String!, $pageUrlPattern: String!) {\n    apps(where: { domains_SOME: { name_IN: [$domain] } }) {\n      ...AppProduction\n    }\n    atoms(where: { type: ReactFragment }) {\n      ...AtomProduction\n    }\n    resources {\n      ...Resource\n    }\n  }\n": types.GetAppProductionDocument,
    "\n  mutation CreateAtoms($input: [AtomCreateInput!]!) {\n    createAtoms(input: $input) {\n      atoms {\n        __typename\n        id\n      }\n      info {\n        nodesCreated\n        relationshipsCreated\n      }\n    }\n  }\n": types.CreateAtomsDocument,
    "\n  mutation DeleteAtoms($where: AtomWhere!, $delete: AtomDeleteInput) {\n    deleteAtoms(where: $where, delete: $delete) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n": types.DeleteAtomsDocument,
    "\n  query AtomList($where: AtomWhere, $options: AtomOptions) {\n    aggregate: atomsAggregate(where: $where) {\n      count\n    }\n    items: atoms(options: $options, where: $where) {\n      ...Atom\n    }\n  }\n": types.AtomListDocument,
    "\n  mutation UpdateAtoms($where: AtomWhere, $update: AtomUpdateInput) {\n    updateAtoms(update: $update, where: $where) {\n      atoms {\n        __typename\n        id\n      }\n    }\n  }\n": types.UpdateAtomsDocument,
    "\n  query GetAuthGuards($options: AuthGuardOptions, $where: AuthGuardWhere) {\n    aggregate: authGuardsAggregate(where: $where) {\n      count\n    }\n    items: authGuards(options: $options, where: $where) {\n      ...AuthGuard\n    }\n  }\n": types.GetAuthGuardsDocument,
    "\n  mutation CreateAuthGuards($input: [AuthGuardCreateInput!]!) {\n    createAuthGuards(input: $input) {\n      authGuards {\n        __typename\n        id\n      }\n    }\n  }\n": types.CreateAuthGuardsDocument,
    "\n  mutation UpdateAuthGuard(\n    $where: AuthGuardWhere\n    $update: AuthGuardUpdateInput\n  ) {\n    updateAuthGuards(update: $update, where: $where) {\n      authGuards {\n        __typename\n        id\n      }\n    }\n  }\n": types.UpdateAuthGuardDocument,
    "\n  mutation DeleteAuthGuards(\n    $where: AuthGuardWhere\n    $delete: AuthGuardDeleteInput\n  ) {\n    deleteAuthGuards(where: $where, delete: $delete) {\n      nodesDeleted\n    }\n  }\n": types.DeleteAuthGuardsDocument,
    "\n  mutation CreateComponents($input: [ComponentCreateInput!]!) {\n    createComponents(input: $input) {\n      components {\n        __typename\n        id\n        store {\n          id\n        }\n        rootElement {\n          id\n        }\n      }\n    }\n  }\n": types.CreateComponentsDocument,
    "\n  mutation DeleteComponents(\n    $where: ComponentWhere\n    $delete: ComponentDeleteInput\n  ) {\n    deleteComponents(delete: $delete, where: $where) {\n      nodesDeleted\n    }\n  }\n": types.DeleteComponentsDocument,
    "\n  mutation UpdateComponents(\n    $where: ComponentWhere\n    $update: ComponentUpdateInput\n  ) {\n    updateComponents(update: $update, where: $where) {\n      components {\n        __typename\n        id\n      }\n    }\n  }\n": types.UpdateComponentsDocument,
    "\n  query ComponentList($options: ComponentOptions, $where: ComponentWhere) {\n    aggregate: componentsAggregate(where: $where) {\n      count\n    }\n    items: components(options: $options, where: $where) {\n      ...Component\n    }\n  }\n": types.ComponentListDocument,
    "\n  query DomainList($options: DomainOptions, $where: DomainWhere) {\n    aggregate: domainsAggregate(where: $where) {\n      count\n    }\n    items: domains(options: $options, where: $where) {\n      ...Domain\n    }\n  }\n": types.DomainListDocument,
    "\n  mutation CreateDomains($input: [DomainCreateInput!]!) {\n    createDomains(input: $input) {\n      domains {\n        __typename\n        id\n      }\n    }\n  }\n": types.CreateDomainsDocument,
    "\n  mutation UpdateDomains($where: DomainWhere!, $update: DomainUpdateInput!) {\n    updateDomains(update: $update, where: $where) {\n      domains {\n        __typename\n        id\n      }\n    }\n  }\n": types.UpdateDomainsDocument,
    "\n  mutation DeleteDomains($where: DomainWhere!) {\n    deleteDomains(where: $where) {\n      nodesDeleted\n    }\n  }\n": types.DeleteDomainsDocument,
    "\n  mutation CreateElements($input: [ElementCreateInput!]!) {\n    createElements(input: $input) {\n      elements {\n        __typename\n        id\n      }\n    }\n  }\n": types.CreateElementsDocument,
    "\n  mutation DeleteElements($where: ElementWhere!, $delete: ElementDeleteInput) {\n    deleteElements(delete: $delete, where: $where) {\n      nodesDeleted\n    }\n  }\n": types.DeleteElementsDocument,
    "\n  mutation UpdateElements($where: ElementWhere, $update: ElementUpdateInput) {\n    updateElements(update: $update, where: $where) {\n      elements {\n        __typename\n        id\n      }\n    }\n  }\n": types.UpdateElementsDocument,
    "\n  query ElementList($options: ElementOptions, $where: ElementWhere) {\n    aggregate: elementsAggregate(where: $where) {\n      count\n    }\n    items: elements(options: $options, where: $where) {\n      ...Element\n    }\n  }\n": types.ElementListDocument,
    "\n  mutation CreateHooks($input: [HookCreateInput!]!) {\n    createHooks(input: $input) {\n      hooks {\n        ...Hook\n      }\n    }\n  }\n": types.CreateHooksDocument,
    "\n  mutation DeleteHooks($where: HookWhere!) {\n    deleteHooks(where: $where) {\n      nodesDeleted\n    }\n  }\n": types.DeleteHooksDocument,
    "\n  mutation CreateFields($input: [FieldCreateInput!]!) {\n    createFields(input: $input) {\n      fields {\n        __typename\n        id\n      }\n    }\n  }\n": types.CreateFieldsDocument,
    "\n  mutation UpdateFields($where: FieldWhere!, $update: FieldUpdateInput!) {\n    updateFields(update: $update, where: $where) {\n      fields {\n        __typename\n        id\n      }\n    }\n  }\n": types.UpdateFieldsDocument,
    "\n  mutation DeleteFields($where: FieldWhere!) {\n    deleteFields(where: $where) {\n      nodesDeleted\n    }\n  }\n": types.DeleteFieldsDocument,
    "\n  query GetFields($where: FieldWhere, $options: FieldOptions) {\n    aggregate: fieldsAggregate(where: $where) {\n      count\n    }\n    items: fields(options: $options, where: $where) {\n      ...Field\n    }\n  }\n": types.GetFieldsDocument,
    "\n  mutation CreatePages($input: [PageCreateInput!]!) {\n    createPages(input: $input) {\n      pages {\n        __typename\n        id\n        rootElement {\n          id\n        }\n      }\n    }\n  }\n": types.CreatePagesDocument,
    "\n  mutation DeletePages($where: PageWhere, $delete: PageDeleteInput) {\n    deletePages(delete: $delete, where: $where) {\n      nodesDeleted\n    }\n  }\n": types.DeletePagesDocument,
    "\n  mutation UpdatePages($where: PageWhere, $update: PageUpdateInput) {\n    updatePages(update: $update, where: $where) {\n      pages {\n        __typename\n        id\n      }\n    }\n  }\n": types.UpdatePagesDocument,
    "\n  query PageList($options: PageOptions, $where: PageWhere) {\n    aggregate: pagesAggregate(where: $where) {\n      count\n    }\n    items: pages(options: $options, where: $where) {\n      ...Page\n    }\n  }\n": types.PageListDocument,
    "\n  query GetRenderedPage($pageId: ID!) {\n    pages(where: { id: $pageId }) {\n      ...PageDevelopment\n    }\n  }\n": types.GetRenderedPageDocument,
    "\n  mutation CreatePreferences($input: [PreferenceCreateInput!]!) {\n    createPreferences(input: $input) {\n      info {\n        nodesCreated\n        relationshipsCreated\n      }\n      preferences {\n        __typename\n        id\n      }\n    }\n  }\n": types.CreatePreferencesDocument,
    "\n  mutation DeletePreferences(\n    $where: PreferenceWhere\n    $delete: PreferenceDeleteInput\n  ) {\n    deletePreferences(delete: $delete, where: $where) {\n      nodesDeleted\n    }\n  }\n": types.DeletePreferencesDocument,
    "\n  query GetPreferences($where: PreferenceWhere, $options: PreferenceOptions) {\n    aggregate: preferencesAggregate(where: $where) {\n      count\n    }\n    items: preferences(options: $options, where: $where) {\n      ...Preference\n    }\n  }\n": types.GetPreferencesDocument,
    "\n  mutation UpdatePreferences(\n    $where: PreferenceWhere\n    $update: PreferenceUpdateInput\n  ) {\n    updatePreferences(update: $update, where: $where) {\n      preferences {\n        __typename\n        id\n      }\n    }\n  }\n": types.UpdatePreferencesDocument,
    "\n  mutation CreateProps($input: [PropCreateInput!]!) {\n    createProps(input: $input) {\n      props {\n        __typename\n        id\n      }\n    }\n  }\n": types.CreatePropsDocument,
    "\n  mutation UpdateProps($where: PropWhere, $update: PropUpdateInput) {\n    updateProps(update: $update, where: $where) {\n      props {\n        __typename\n        id\n      }\n    }\n  }\n": types.UpdatePropsDocument,
    "\n  mutation DeleteProps($where: PropWhere!) {\n    deleteProps(where: $where) {\n      nodesDeleted\n    }\n  }\n": types.DeletePropsDocument,
    "\n  query GetProps($options: PropOptions, $where: PropWhere) {\n    aggregate: propsAggregate(where: $where) {\n      count\n    }\n    items: props(options: $options, where: $where) {\n      ...Prop\n    }\n  }\n": types.GetPropsDocument,
    "\n  mutation CreateRedirects($input: [RedirectCreateInput!]!) {\n    createRedirects(input: $input) {\n      redirects {\n        __typename\n        id\n      }\n    }\n  }\n": types.CreateRedirectsDocument,
    "\n  mutation DeleteRedirects(\n    $where: RedirectWhere\n    $delete: RedirectDeleteInput\n  ) {\n    deleteRedirects(delete: $delete, where: $where) {\n      nodesDeleted\n    }\n  }\n": types.DeleteRedirectsDocument,
    "\n  mutation UpdateRedirects(\n    $where: RedirectWhere\n    $update: RedirectUpdateInput\n  ) {\n    updateRedirects(update: $update, where: $where) {\n      redirects {\n        __typename\n        id\n      }\n    }\n  }\n": types.UpdateRedirectsDocument,
    "\n  query GetRedirects($options: RedirectOptions, $where: RedirectWhere) {\n    aggregate: redirectsAggregate(where: $where) {\n      count\n    }\n    items: redirects(options: $options, where: $where) {\n      ...Redirect\n    }\n  }\n": types.GetRedirectsDocument,
    "\n  query GetRedirectsPreview($options: RedirectOptions, $where: RedirectWhere) {\n    aggregate: redirectsAggregate(where: $where) {\n      count\n    }\n    items: redirects(options: $options, where: $where) {\n      ...RedirectPreview\n    }\n  }\n": types.GetRedirectsPreviewDocument,
    "\n  query ResourceList($options: ResourceOptions, $where: ResourceWhere) {\n    aggregate: resourcesAggregate(where: $where) {\n      count\n    }\n    items: resources(options: $options, where: $where) {\n      ...Resource\n    }\n  }\n": types.ResourceListDocument,
    "\n  mutation CreateResources($input: [ResourceCreateInput!]!) {\n    createResources(input: $input) {\n      resources {\n        __typename\n        id\n      }\n    }\n  }\n": types.CreateResourcesDocument,
    "\n  mutation UpdateResources(\n    $where: ResourceWhere\n    $update: ResourceUpdateInput\n  ) {\n    updateResources(update: $update, where: $where) {\n      resources {\n        __typename\n        id\n      }\n    }\n  }\n": types.UpdateResourcesDocument,
    "\n  mutation DeleteResources(\n    $where: ResourceWhere\n    $delete: ResourceDeleteInput\n  ) {\n    deleteResources(where: $where, delete: $delete) {\n      nodesDeleted\n    }\n  }\n": types.DeleteResourcesDocument,
    "\n  mutation CreateCodeActions($input: [CodeActionCreateInput!]!) {\n    createCodeActions(input: $input) {\n      codeActions {\n        __typename\n        id\n      }\n    }\n  }\n": types.CreateCodeActionsDocument,
    "\n  mutation CreateApiActions($input: [ApiActionCreateInput!]!) {\n    createApiActions(input: $input) {\n      apiActions {\n        __typename\n        id\n      }\n    }\n  }\n": types.CreateApiActionsDocument,
    "\n  mutation DeleteCodeActions(\n    $where: CodeActionWhere!\n    $delete: CodeActionDeleteInput\n  ) {\n    deleteCodeActions(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n": types.DeleteCodeActionsDocument,
    "\n  mutation DeleteApiActions(\n    $where: ApiActionWhere!\n    $delete: ApiActionDeleteInput\n  ) {\n    deleteApiActions(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n": types.DeleteApiActionsDocument,
    "\n  query GetActions(\n    $codeActionWhere: CodeActionWhere\n    $apiActionWhere: ApiActionWhere\n  ) {\n    apiActions(where: $apiActionWhere) {\n      ...Action\n    }\n    codeActions(where: $codeActionWhere) {\n      ...Action\n    }\n  }\n": types.GetActionsDocument,
    "\n  mutation CreateStores($input: [StoreCreateInput!]!) {\n    createStores(input: $input) {\n      info {\n        nodesCreated\n        relationshipsCreated\n      }\n      stores {\n        __typename\n        id\n      }\n    }\n  }\n": types.CreateStoresDocument,
    "\n  mutation DeleteStores($where: StoreWhere, $delete: StoreDeleteInput) {\n    deleteStores(delete: $delete, where: $where) {\n      nodesDeleted\n    }\n  }\n": types.DeleteStoresDocument,
    "\n  query GetStores($where: StoreWhere, $options: StoreOptions) {\n    aggregate: storesAggregate(where: $where) {\n      count\n    }\n    items: stores(options: $options, where: $where) {\n      ...Store\n    }\n  }\n": types.GetStoresDocument,
    "\n  mutation UpdateStores($where: StoreWhere, $update: StoreUpdateInput) {\n    updateStores(update: $update, where: $where) {\n      stores {\n        __typename\n        id\n      }\n    }\n  }\n": types.UpdateStoresDocument,
    "\n  mutation UpdateCodeActions(\n    $update: CodeActionUpdateInput\n    $where: CodeActionWhere\n  ) {\n    updateCodeActions(update: $update, where: $where) {\n      codeActions {\n        __typename\n        id\n      }\n    }\n  }\n": types.UpdateCodeActionsDocument,
    "\n  mutation UpdateApiActions(\n    $update: ApiActionUpdateInput\n    $where: ApiActionWhere\n  ) {\n    updateApiActions(update: $update, where: $where) {\n      apiActions {\n        __typename\n        id\n      }\n    }\n  }\n": types.UpdateApiActionsDocument,
    "\n  mutation CreateTags($input: [TagCreateInput!]!) {\n    createTags(input: $input) {\n      tags {\n        __typename\n        id\n      }\n    }\n  }\n": types.CreateTagsDocument,
    "\n  mutation UpdateTags($where: TagWhere!, $update: TagUpdateInput!) {\n    updateTags(update: $update, where: $where) {\n      tags {\n        __typename\n        id\n      }\n    }\n  }\n": types.UpdateTagsDocument,
    "\n  mutation DeleteTags($where: TagWhere!) {\n    deleteTags(where: $where) {\n      nodesDeleted\n    }\n  }\n": types.DeleteTagsDocument,
    "\n  query GetTags($options: TagOptions, $where: TagWhere) {\n    aggregate: tagsAggregate(where: $where) {\n      count\n    }\n    items: tags(options: $options, where: $where) {\n      ...Tag\n    }\n  }\n": types.GetTagsDocument,
    "\n  mutation CreatePrimitiveTypes($input: [PrimitiveTypeCreateInput!]!) {\n    types: createPrimitiveTypes(input: $input) {\n      types: primitiveTypes {\n        __typename\n        id\n      }\n    }\n  }\n": types.CreatePrimitiveTypesDocument,
    "\n  mutation CreateArrayTypes($input: [ArrayTypeCreateInput!]!) {\n    types: createArrayTypes(input: $input) {\n      types: arrayTypes {\n        __typename\n        id\n      }\n    }\n  }\n": types.CreateArrayTypesDocument,
    "\n  mutation CreateUnionTypes($input: [UnionTypeCreateInput!]!) {\n    types: createUnionTypes(input: $input) {\n      types: unionTypes {\n        __typename\n        id\n      }\n    }\n  }\n": types.CreateUnionTypesDocument,
    "\n  mutation CreateInterfaceTypes($input: [InterfaceTypeCreateInput!]!) {\n    types: createInterfaceTypes(input: $input) {\n      types: interfaceTypes {\n        __typename\n        id\n      }\n    }\n  }\n": types.CreateInterfaceTypesDocument,
    "\n  mutation CreateElementTypes($input: [ElementTypeCreateInput!]!) {\n    types: createElementTypes(input: $input) {\n      types: elementTypes {\n        __typename\n        id\n      }\n    }\n  }\n": types.CreateElementTypesDocument,
    "\n  mutation CreateRenderPropTypes($input: [RenderPropTypeCreateInput!]!) {\n    types: createRenderPropTypes(input: $input) {\n      types: renderPropTypes {\n        __typename\n        id\n      }\n    }\n  }\n": types.CreateRenderPropTypesDocument,
    "\n  mutation CreateReactNodeTypes($input: [ReactNodeTypeCreateInput!]!) {\n    types: createReactNodeTypes(input: $input) {\n      types: reactNodeTypes {\n        __typename\n        id\n      }\n    }\n  }\n": types.CreateReactNodeTypesDocument,
    "\n  mutation CreateEnumTypes($input: [EnumTypeCreateInput!]!) {\n    types: createEnumTypes(input: $input) {\n      types: enumTypes {\n        __typename\n        id\n      }\n    }\n  }\n": types.CreateEnumTypesDocument,
    "\n  mutation CreateLambdaTypes($input: [LambdaTypeCreateInput!]!) {\n    types: createLambdaTypes(input: $input) {\n      types: lambdaTypes {\n        __typename\n        id\n      }\n    }\n  }\n": types.CreateLambdaTypesDocument,
    "\n  mutation CreatePageTypes($input: [PageTypeCreateInput!]!) {\n    types: createPageTypes(input: $input) {\n      types: pageTypes {\n        __typename\n        id\n      }\n    }\n  }\n": types.CreatePageTypesDocument,
    "\n  mutation CreateAppTypes($input: [AppTypeCreateInput!]!) {\n    types: createAppTypes(input: $input) {\n      types: appTypes {\n        __typename\n        id\n      }\n    }\n  }\n": types.CreateAppTypesDocument,
    "\n  mutation CreateRichTextTypes($input: [RichTextTypeCreateInput!]!) {\n    types: createRichTextTypes(input: $input) {\n      types: richTextTypes {\n        __typename\n        id\n      }\n    }\n  }\n": types.CreateRichTextTypesDocument,
    "\n  mutation CreateActionTypes($input: [ActionTypeCreateInput!]!) {\n    types: createActionTypes(input: $input) {\n      types: actionTypes {\n        __typename\n        id\n      }\n    }\n  }\n": types.CreateActionTypesDocument,
    "\n  mutation CreateCodeMirrorTypes($input: [CodeMirrorTypeCreateInput!]!) {\n    types: createCodeMirrorTypes(input: $input) {\n      types: codeMirrorTypes {\n        __typename\n        id\n      }\n    }\n  }\n": types.CreateCodeMirrorTypesDocument,
    "\n  mutation DeletePrimitiveTypes(\n    $delete: PrimitiveTypeDeleteInput\n    $where: PrimitiveTypeWhere\n  ) {\n    deletePrimitiveTypes(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n": types.DeletePrimitiveTypesDocument,
    "\n  mutation DeleteArrayTypes(\n    $delete: ArrayTypeDeleteInput\n    $where: ArrayTypeWhere\n  ) {\n    deleteArrayTypes(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n": types.DeleteArrayTypesDocument,
    "\n  mutation DeleteReactNodeTypes(\n    $delete: ReactNodeTypeDeleteInput\n    $where: ReactNodeTypeWhere\n  ) {\n    deleteReactNodeTypes(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n": types.DeleteReactNodeTypesDocument,
    "\n  mutation DeleteUnionTypes(\n    $delete: UnionTypeDeleteInput\n    $where: UnionTypeWhere\n  ) {\n    deleteUnionTypes(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n": types.DeleteUnionTypesDocument,
    "\n  mutation DeleteInterfaceTypes(\n    $delete: InterfaceTypeDeleteInput\n    $where: InterfaceTypeWhere\n  ) {\n    deleteInterfaceTypes(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n": types.DeleteInterfaceTypesDocument,
    "\n  mutation DeleteElementTypes(\n    $delete: ElementTypeDeleteInput\n    $where: ElementTypeWhere\n  ) {\n    deleteElementTypes(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n": types.DeleteElementTypesDocument,
    "\n  mutation DeleteRenderPropTypes(\n    $delete: RenderPropTypeDeleteInput\n    $where: RenderPropTypeWhere\n  ) {\n    deleteRenderPropTypes(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n": types.DeleteRenderPropTypesDocument,
    "\n  mutation DeleteRichTextTypes(\n    $delete: RichTextTypeDeleteInput\n    $where: RichTextTypeWhere\n  ) {\n    deleteRichTextTypes(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n": types.DeleteRichTextTypesDocument,
    "\n  mutation DeleteEnumTypes(\n    $delete: EnumTypeDeleteInput\n    $where: EnumTypeWhere\n  ) {\n    deleteEnumTypes(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n    deleteEnumTypeValues(where: { enumTypeConnection: { node: $where } }) {\n      nodesDeleted\n    }\n  }\n": types.DeleteEnumTypesDocument,
    "\n  mutation DeleteLambdaTypes(\n    $delete: LambdaTypeDeleteInput\n    $where: LambdaTypeWhere\n  ) {\n    deleteLambdaTypes(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n": types.DeleteLambdaTypesDocument,
    "\n  mutation DeletePageTypes(\n    $delete: PageTypeDeleteInput\n    $where: PageTypeWhere\n  ) {\n    deletePageTypes(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n": types.DeletePageTypesDocument,
    "\n  mutation DeleteAppTypes($delete: AppTypeDeleteInput, $where: AppTypeWhere) {\n    deleteAppTypes(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n": types.DeleteAppTypesDocument,
    "\n  mutation DeleteActionTypes(\n    $delete: ActionTypeDeleteInput\n    $where: ActionTypeWhere\n  ) {\n    deleteActionTypes(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n": types.DeleteActionTypesDocument,
    "\n  mutation DeleteCodeMirrorTypes(\n    $delete: CodeMirrorTypeDeleteInput\n    $where: CodeMirrorTypeWhere\n  ) {\n    deleteCodeMirrorTypes(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n": types.DeleteCodeMirrorTypesDocument,
    "\n  query GetBaseTypes($where: IBaseTypeWhere, $options: IBaseTypeOptions) {\n    iBaseTypes(where: $where, options: $options) {\n      ...BaseType\n    }\n    aggregate: iBaseTypesAggregate(where: $where) {\n      count\n    }\n  }\n": types.GetBaseTypesDocument,
    "\n  query GetTypes($ids: [ID!]) {\n    actionTypes(where: { id_IN: $ids }) {\n      ...Type\n    }\n    appTypes(where: { id_IN: $ids }) {\n      ...Type\n    }\n    arrayTypes(where: { id_IN: $ids }) {\n      ...Type\n    }\n    codeMirrorTypes(where: { id_IN: $ids }) {\n      ...Type\n    }\n    elementTypes(where: { id_IN: $ids }) {\n      ...Type\n    }\n    enumTypes(where: { id_IN: $ids }) {\n      ...Type\n    }\n    interfaceTypes(where: { id_IN: $ids }) {\n      ...Type\n    }\n    lambdaTypes(where: { id_IN: $ids }) {\n      ...Type\n    }\n    pageTypes(where: { id_IN: $ids }) {\n      ...Type\n    }\n    primitiveTypes(where: { id_IN: $ids }) {\n      ...Type\n    }\n    reactNodeTypes(where: { id_IN: $ids }) {\n      ...Type\n    }\n    renderPropTypes(where: { id_IN: $ids }) {\n      ...Type\n    }\n    richTextTypes(where: { id_IN: $ids }) {\n      ...Type\n    }\n    unionTypes(where: { id_IN: $ids }) {\n      ...Type\n    }\n  }\n": types.GetTypesDocument,
    "\n  query GetDescendants($ids: [ID!]) {\n    arrayTypes(where: { id_IN: $ids }) {\n      descendantTypesIds\n    }\n    interfaceTypes(where: { id_IN: $ids }) {\n      descendantTypesIds\n    }\n    unionTypes(where: { id_IN: $ids }) {\n      descendantTypesIds\n    }\n  }\n": types.GetDescendantsDocument,
    "\n  query GetPrimitiveTypes(\n    $options: PrimitiveTypeOptions\n    $where: PrimitiveTypeWhere\n  ) {\n    types: primitiveTypes(options: $options, where: $where) {\n      ...Type\n    }\n  }\n": types.GetPrimitiveTypesDocument,
    "\n  query GetArrayTypes($options: ArrayTypeOptions, $where: ArrayTypeWhere) {\n    types: arrayTypes(options: $options, where: $where) {\n      ...Type\n    }\n  }\n": types.GetArrayTypesDocument,
    "\n  query GetUnionTypes($options: UnionTypeOptions, $where: UnionTypeWhere) {\n    types: unionTypes(options: $options, where: $where) {\n      ...Type\n    }\n  }\n": types.GetUnionTypesDocument,
    "\n  query GetInterfaceTypes(\n    $options: InterfaceTypeOptions\n    $where: InterfaceTypeWhere\n  ) {\n    types: interfaceTypes(options: $options, where: $where) {\n      ...Type\n    }\n  }\n": types.GetInterfaceTypesDocument,
    "\n  query GetElementTypes(\n    $options: ElementTypeOptions\n    $where: ElementTypeWhere\n  ) {\n    types: elementTypes(options: $options, where: $where) {\n      ...Type\n    }\n  }\n": types.GetElementTypesDocument,
    "\n  query GetRenderPropTypes(\n    $options: RenderPropTypeOptions\n    $where: RenderPropTypeWhere\n  ) {\n    types: renderPropTypes(options: $options, where: $where) {\n      ...Type\n    }\n  }\n": types.GetRenderPropTypesDocument,
    "\n  query GetReactNodeTypes(\n    $options: ReactNodeTypeOptions\n    $where: ReactNodeTypeWhere\n  ) {\n    types: reactNodeTypes(options: $options, where: $where) {\n      ...ReactNodeType\n    }\n  }\n": types.GetReactNodeTypesDocument,
    "\n  query GetRichTextTypes(\n    $options: RichTextTypeOptions\n    $where: RichTextTypeWhere\n  ) {\n    types: richTextTypes(options: $options, where: $where) {\n      ...RichTextType\n    }\n  }\n": types.GetRichTextTypesDocument,
    "\n  query GetEnumTypes($options: EnumTypeOptions, $where: EnumTypeWhere) {\n    types: enumTypes(options: $options, where: $where) {\n      ...Type\n    }\n  }\n": types.GetEnumTypesDocument,
    "\n  query GetLambdaTypes($options: LambdaTypeOptions, $where: LambdaTypeWhere) {\n    types: lambdaTypes(options: $options, where: $where) {\n      ...Type\n    }\n  }\n": types.GetLambdaTypesDocument,
    "\n  query GetPageTypes($options: PageTypeOptions, $where: PageTypeWhere) {\n    types: pageTypes(options: $options, where: $where) {\n      ...Type\n    }\n  }\n": types.GetPageTypesDocument,
    "\n  query GetAppTypes($options: AppTypeOptions, $where: AppTypeWhere) {\n    types: appTypes(options: $options, where: $where) {\n      ...Type\n    }\n  }\n": types.GetAppTypesDocument,
    "\n  query GetActionTypes($options: ActionTypeOptions, $where: ActionTypeWhere) {\n    types: actionTypes(options: $options, where: $where) {\n      ...Type\n    }\n  }\n": types.GetActionTypesDocument,
    "\n  query GetCodeMirrorTypes(\n    $options: CodeMirrorTypeOptions\n    $where: CodeMirrorTypeWhere\n  ) {\n    types: codeMirrorTypes(options: $options, where: $where) {\n      ...Type\n    }\n  }\n": types.GetCodeMirrorTypesDocument,
    "\n  query InterfaceForm_GetApps($options: AppOptions, $where: AppWhere) {\n    apps(options: $options, where: $where) {\n      id\n      name\n    }\n  }\n": types.InterfaceForm_GetAppsDocument,
    "\n  query InterfaceForm_GetAtoms($options: AtomOptions, $where: AtomWhere) {\n    atoms(options: $options, where: $where) {\n      id\n      name\n      type\n    }\n  }\n": types.InterfaceForm_GetAtomsDocument,
    "\n  query InterfaceForm_GetActions($appId: ID) {\n    apiActions {\n      id\n      name\n    }\n    codeActions {\n      id\n      name\n    }\n  }\n": types.InterfaceForm_GetActionsDocument,
    "\n  query InterfaceForm_GetStores($options: StoreOptions, $where: StoreWhere) {\n    stores(options: $options, where: $where) {\n      id\n      name\n    }\n  }\n": types.InterfaceForm_GetStoresDocument,
    "\n  query InterfaceForm_GetResource(\n    $options: ResourceOptions\n    $where: ResourceWhere\n  ) {\n    resources(options: $options, where: $where) {\n      id\n      name\n    }\n  }\n": types.InterfaceForm_GetResourceDocument,
    "\n  query InterfaceForm_GetPages($options: PageOptions, $where: PageWhere) {\n    pages(options: $options, where: $where) {\n      id\n      name\n    }\n  }\n": types.InterfaceForm_GetPagesDocument,
    "\n  query IsTypeDescendantOf($descendantTypeId: ID!, $parentTypeId: ID!) {\n    isTypeDescendantOf(\n      descendantTypeId: $descendantTypeId\n      parentTypeId: $parentTypeId\n    )\n  }\n": types.IsTypeDescendantOfDocument,
    "\n  query GetTypeReferences($typeId: ID!) {\n    getTypeReferences(typeId: $typeId) {\n      label\n      name\n    }\n  }\n": types.GetTypeReferencesDocument,
    "\n  mutation UpdatePrimitiveTypes(\n    $update: PrimitiveTypeUpdateInput\n    $where: PrimitiveTypeWhere\n  ) {\n    types: updatePrimitiveTypes(update: $update, where: $where) {\n      types: primitiveTypes {\n        __typename\n        id\n      }\n    }\n  }\n": types.UpdatePrimitiveTypesDocument,
    "\n  mutation UpdateArrayTypes(\n    $update: ArrayTypeUpdateInput\n    $where: ArrayTypeWhere\n  ) {\n    types: updateArrayTypes(update: $update, where: $where) {\n      types: arrayTypes {\n        __typename\n        id\n      }\n    }\n  }\n": types.UpdateArrayTypesDocument,
    "\n  mutation UpdateUnionTypes(\n    $update: UnionTypeUpdateInput\n    $where: UnionTypeWhere\n  ) {\n    types: updateUnionTypes(update: $update, where: $where) {\n      types: unionTypes {\n        __typename\n        id\n      }\n    }\n  }\n": types.UpdateUnionTypesDocument,
    "\n  mutation UpdateInterfaceTypes(\n    $update: InterfaceTypeUpdateInput\n    $where: InterfaceTypeWhere\n  ) {\n    types: updateInterfaceTypes(update: $update, where: $where) {\n      types: interfaceTypes {\n        __typename\n        id\n      }\n    }\n  }\n": types.UpdateInterfaceTypesDocument,
    "\n  mutation UpdateReactNodeTypes(\n    $update: ReactNodeTypeUpdateInput\n    $where: ReactNodeTypeWhere\n  ) {\n    types: updateReactNodeTypes(update: $update, where: $where) {\n      types: reactNodeTypes {\n        __typename\n        id\n      }\n    }\n  }\n": types.UpdateReactNodeTypesDocument,
    "\n  mutation UpdateElementTypes(\n    $update: ElementTypeUpdateInput\n    $where: ElementTypeWhere\n  ) {\n    types: updateElementTypes(update: $update, where: $where) {\n      types: elementTypes {\n        __typename\n        id\n      }\n    }\n  }\n": types.UpdateElementTypesDocument,
    "\n  mutation UpdateRenderPropTypes(\n    $update: RenderPropTypeUpdateInput\n    $where: RenderPropTypeWhere\n  ) {\n    types: updateRenderPropTypes(update: $update, where: $where) {\n      types: renderPropTypes {\n        __typename\n        id\n      }\n    }\n  }\n": types.UpdateRenderPropTypesDocument,
    "\n  mutation UpdateEnumTypes(\n    $update: EnumTypeUpdateInput\n    $where: EnumTypeWhere\n  ) {\n    types: updateEnumTypes(update: $update, where: $where) {\n      types: enumTypes {\n        __typename\n        id\n      }\n    }\n  }\n": types.UpdateEnumTypesDocument,
    "\n  mutation UpdateLambdaTypes(\n    $update: LambdaTypeUpdateInput\n    $where: LambdaTypeWhere\n  ) {\n    types: updateLambdaTypes(update: $update, where: $where) {\n      types: lambdaTypes {\n        __typename\n        id\n      }\n    }\n  }\n": types.UpdateLambdaTypesDocument,
    "\n  mutation UpdatePageTypes(\n    $update: PageTypeUpdateInput\n    $where: PageTypeWhere\n  ) {\n    types: updatePageTypes(update: $update, where: $where) {\n      types: pageTypes {\n        __typename\n        id\n      }\n    }\n  }\n": types.UpdatePageTypesDocument,
    "\n  mutation UpdateAppTypes($update: AppTypeUpdateInput, $where: AppTypeWhere) {\n    types: updateAppTypes(update: $update, where: $where) {\n      types: appTypes {\n        __typename\n        id\n      }\n    }\n  }\n": types.UpdateAppTypesDocument,
    "\n  mutation UpdateRichTextTypes(\n    $update: RichTextTypeUpdateInput\n    $where: RichTextTypeWhere\n  ) {\n    types: updateRichTextTypes(update: $update, where: $where) {\n      types: richTextTypes {\n        __typename\n        id\n      }\n    }\n  }\n": types.UpdateRichTextTypesDocument,
    "\n  mutation UpdateActionTypes(\n    $update: ActionTypeUpdateInput\n    $where: ActionTypeWhere\n  ) {\n    types: updateActionTypes(update: $update, where: $where) {\n      types: actionTypes {\n        __typename\n        id\n      }\n    }\n  }\n": types.UpdateActionTypesDocument,
    "\n  mutation UpdateCodeMirrorTypes(\n    $update: CodeMirrorTypeUpdateInput\n    $where: CodeMirrorTypeWhere\n  ) {\n    types: updateCodeMirrorTypes(update: $update, where: $where) {\n      types: codeMirrorTypes {\n        __typename\n        id\n      }\n    }\n  }\n": types.UpdateCodeMirrorTypesDocument,
    "\n  query GetUsers($where: UserWhere) {\n    aggregate: usersAggregate(where: $where) {\n      count\n    }\n    items: users(where: $where) {\n      ...User\n    }\n  }\n": types.GetUsersDocument,
    "\n  mutation CreateUser($input: [UserCreateInput!]!) {\n    createUsers(input: $input) {\n      users {\n        email\n        __typename\n        id\n      }\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation DeleteUsers($where: UserWhere!) {\n    deleteUsers(where: $where) {\n      nodesDeleted\n    }\n  }\n": types.DeleteUsersDocument,
    "\n  mutation UpdateUsers($where: UserWhere!, $update: UserUpdateInput!) {\n    updateUsers(update: $update, where: $where) {\n      users {\n        __typename\n        id\n      }\n    }\n  }\n": types.UpdateUsersDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment BaseAction on BaseAction {\n    __typename\n    id\n    name\n    type\n    store {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  fragment BaseAction on BaseAction {\n    __typename\n    id\n    name\n    type\n    store {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Action on BaseAction {\n    ...BaseAction\n    ... on CodeAction {\n      ...CodeAction\n    }\n    ... on ApiAction {\n      ...ApiAction\n    }\n  }\n"): (typeof documents)["\n  fragment Action on BaseAction {\n    ...BaseAction\n    ... on CodeAction {\n      ...CodeAction\n    }\n    ... on ApiAction {\n      ...ApiAction\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ApiAction on ApiAction {\n    ...BaseAction\n    config {\n      data\n      id\n    }\n    errorAction {\n      ...BaseAction\n    }\n    resource {\n      ...Resource\n    }\n    successAction {\n      ...BaseAction\n    }\n  }\n"): (typeof documents)["\n  fragment ApiAction on ApiAction {\n    ...BaseAction\n    config {\n      data\n      id\n    }\n    errorAction {\n      ...BaseAction\n    }\n    resource {\n      ...Resource\n    }\n    successAction {\n      ...BaseAction\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CodeAction on CodeAction {\n    ...BaseAction\n    code\n  }\n"): (typeof documents)["\n  fragment CodeAction on CodeAction {\n    ...BaseAction\n    code\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment AppPreview on App {\n    domains {\n      ...Domain\n    }\n    id\n    name\n    owner {\n      ...Owner\n    }\n    pages {\n      ...PagePreview\n    }\n    slug\n  }\n"): (typeof documents)["\n  fragment AppPreview on App {\n    domains {\n      ...Domain\n    }\n    id\n    name\n    owner {\n      ...Owner\n    }\n    pages {\n      ...PagePreview\n    }\n    slug\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment App on App {\n    domains {\n      ...Domain\n    }\n    id\n    name\n    owner {\n      ...Owner\n    }\n    pages {\n      ...Page\n    }\n    slug\n  }\n"): (typeof documents)["\n  fragment App on App {\n    domains {\n      ...Domain\n    }\n    id\n    name\n    owner {\n      ...Owner\n    }\n    pages {\n      ...Page\n    }\n    slug\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment AppBuilder on App {\n    id\n    name\n    owner {\n      ...Owner\n    }\n    pages(\n      where: {\n        OR: [\n          { id_IN: $pageIds }\n          { kind: Provider }\n          { kind: NotFound }\n          { kind: InternalServerError }\n          { kind: Regular }\n        ]\n      }\n    ) {\n      ...PageDevelopment\n    }\n    slug\n  }\n"): (typeof documents)["\n  fragment AppBuilder on App {\n    id\n    name\n    owner {\n      ...Owner\n    }\n    pages(\n      where: {\n        OR: [\n          { id_IN: $pageIds }\n          { kind: Provider }\n          { kind: NotFound }\n          { kind: InternalServerError }\n          { kind: Regular }\n        ]\n      }\n    ) {\n      ...PageDevelopment\n    }\n    slug\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment AppProduction on App {\n    id\n    name\n    owner {\n      ...Owner\n    }\n    pages(\n      where: { OR: [{ urlPattern: $pageUrlPattern }, { kind: Provider }] }\n    ) {\n      ...PageProduction\n    }\n    slug\n  }\n"): (typeof documents)["\n  fragment AppProduction on App {\n    id\n    name\n    owner {\n      ...Owner\n    }\n    pages(\n      where: { OR: [{ urlPattern: $pageUrlPattern }, { kind: Provider }] }\n    ) {\n      ...PageProduction\n    }\n    slug\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Atom on Atom {\n    __typename\n    api {\n      ...InterfaceType\n    }\n    externalCssSource\n    externalJsSource\n    externalSourceType\n    icon\n    id\n    name\n    requiredParents {\n      id\n      name\n      type\n    }\n    suggestedChildren {\n      id\n      name\n      type\n    }\n    tags {\n      ...TagPreview\n    }\n    type\n    owner {\n      id\n    }\n  }\n"): (typeof documents)["\n  fragment Atom on Atom {\n    __typename\n    api {\n      ...InterfaceType\n    }\n    externalCssSource\n    externalJsSource\n    externalSourceType\n    icon\n    id\n    name\n    requiredParents {\n      id\n      name\n      type\n    }\n    suggestedChildren {\n      id\n      name\n      type\n    }\n    tags {\n      ...TagPreview\n    }\n    type\n    owner {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment AtomBuilder on Atom {\n    __typename\n    api {\n      ...InterfaceType\n    }\n    icon\n    id\n    name\n    requiredParents {\n      id\n      name\n      type\n    }\n    suggestedChildren {\n      id\n      name\n      type\n    }\n    tags {\n      ...TagPreview\n    }\n    type\n    owner {\n      id\n    }\n  }\n"): (typeof documents)["\n  fragment AtomBuilder on Atom {\n    __typename\n    api {\n      ...InterfaceType\n    }\n    icon\n    id\n    name\n    requiredParents {\n      id\n      name\n      type\n    }\n    suggestedChildren {\n      id\n      name\n      type\n    }\n    tags {\n      ...TagPreview\n    }\n    type\n    owner {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment AtomProduction on Atom {\n    __typename\n    externalCssSource\n    externalJsSource\n    externalSourceType\n    icon\n    id\n    name\n    requiredParents {\n      id\n      name\n      type\n    }\n    suggestedChildren {\n      id\n      name\n      type\n    }\n    type\n  }\n"): (typeof documents)["\n  fragment AtomProduction on Atom {\n    __typename\n    externalCssSource\n    externalJsSource\n    externalSourceType\n    icon\n    id\n    name\n    requiredParents {\n      id\n      name\n      type\n    }\n    suggestedChildren {\n      id\n      name\n      type\n    }\n    type\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment AuthGuard on AuthGuard {\n    config {\n      ...Prop\n    }\n    id\n    name\n    resource {\n      ...Resource\n    }\n    responseTransformer\n    owner {\n      id\n    }\n  }\n"): (typeof documents)["\n  fragment AuthGuard on AuthGuard {\n    config {\n      ...Prop\n    }\n    id\n    name\n    resource {\n      ...Resource\n    }\n    responseTransformer\n    owner {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Component on Component {\n    __typename\n    api {\n      __typename\n      id\n    }\n    id\n    name\n    compositeKey\n    owner {\n      ...Owner\n    }\n    props {\n      ...Prop\n    }\n    rootElement {\n      id\n    }\n    store {\n      ...Store\n    }\n  }\n"): (typeof documents)["\n  fragment Component on Component {\n    __typename\n    api {\n      __typename\n      id\n    }\n    id\n    name\n    compositeKey\n    owner {\n      ...Owner\n    }\n    props {\n      ...Prop\n    }\n    rootElement {\n      id\n    }\n    store {\n      ...Store\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ComponentBuilder on Component {\n    __typename\n    api {\n      ...InterfaceType\n    }\n    elements {\n      ...Element\n    }\n    id\n    name\n    compositeKey\n    owner {\n      ...Owner\n    }\n    props {\n      ...Prop\n    }\n    rootElement {\n      id\n      name\n    }\n    store {\n      ...Store\n    }\n  }\n"): (typeof documents)["\n  fragment ComponentBuilder on Component {\n    __typename\n    api {\n      ...InterfaceType\n    }\n    elements {\n      ...Element\n    }\n    id\n    name\n    compositeKey\n    owner {\n      ...Owner\n    }\n    props {\n      ...Prop\n    }\n    rootElement {\n      id\n      name\n    }\n    store {\n      ...Store\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ComponentProduction on Component {\n    id\n    name\n    compositeKey\n    owner {\n      ...Owner\n    }\n    props {\n      ...Prop\n    }\n    rootElement {\n      id\n      name\n    }\n    store {\n      ...Store\n    }\n  }\n"): (typeof documents)["\n  fragment ComponentProduction on Component {\n    id\n    name\n    compositeKey\n    owner {\n      ...Owner\n    }\n    props {\n      ...Prop\n    }\n    rootElement {\n      id\n      name\n    }\n    store {\n      ...Store\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Domain on Domain {\n    app {\n      id\n    }\n    domainConfig {\n      misconfigured\n    }\n    id\n    name\n  }\n"): (typeof documents)["\n  fragment Domain on Domain {\n    app {\n      id\n    }\n    domainConfig {\n      misconfigured\n    }\n    id\n    name\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ElementRenderType on ElementRenderType {\n    ... on Atom {\n      __typename\n      ...AtomBuilder\n    }\n    ... on Component {\n      __typename\n      id\n    }\n  }\n"): (typeof documents)["\n  fragment ElementRenderType on ElementRenderType {\n    ... on Atom {\n      __typename\n      ...AtomBuilder\n    }\n    ... on Component {\n      __typename\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ElementRenderTypeProduction on ElementRenderType {\n    ... on Atom {\n      __typename\n      ...AtomProduction\n    }\n    ... on Component {\n      __typename\n      id\n    }\n  }\n"): (typeof documents)["\n  fragment ElementRenderTypeProduction on ElementRenderType {\n    ... on Atom {\n      __typename\n      ...AtomProduction\n    }\n    ... on Component {\n      __typename\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Element on Element {\n    __typename\n    compositeKey\n    childMapperComponent {\n      id\n    }\n    childMapperPreviousSibling {\n      id\n    }\n    childMapperPropKey\n    dependantTypes {\n      ...Type\n    }\n    firstChild {\n      id\n    }\n    id\n    name\n    nextSibling {\n      id\n    }\n    page {\n      id\n    }\n    parentComponent {\n      id\n    }\n    parentElement {\n      id\n    }\n    postRenderActions {\n      id\n      type\n    }\n    preRenderActions {\n      id\n      type\n    }\n    prevSibling {\n      id\n    }\n    props {\n      ...Prop\n    }\n    renderForEachPropKey\n    renderIfExpression\n    renderType {\n      ...ElementRenderType\n    }\n    style\n    tailwindClassNames\n    expanded\n  }\n"): (typeof documents)["\n  fragment Element on Element {\n    __typename\n    compositeKey\n    childMapperComponent {\n      id\n    }\n    childMapperPreviousSibling {\n      id\n    }\n    childMapperPropKey\n    dependantTypes {\n      ...Type\n    }\n    firstChild {\n      id\n    }\n    id\n    name\n    nextSibling {\n      id\n    }\n    page {\n      id\n    }\n    parentComponent {\n      id\n    }\n    parentElement {\n      id\n    }\n    postRenderActions {\n      id\n      type\n    }\n    preRenderActions {\n      id\n      type\n    }\n    prevSibling {\n      id\n    }\n    props {\n      ...Prop\n    }\n    renderForEachPropKey\n    renderIfExpression\n    renderType {\n      ...ElementRenderType\n    }\n    style\n    tailwindClassNames\n    expanded\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ElementProduction on Element {\n    __typename\n    childMapperComponent {\n      id\n      name\n    }\n    childMapperPreviousSibling {\n      id\n    }\n    childMapperPropKey\n    dependantTypes {\n      ...Type\n    }\n    firstChild {\n      id\n    }\n    id\n    name\n    nextSibling {\n      id\n    }\n    page {\n      id\n    }\n    parentComponent {\n      id\n    }\n    parentElement {\n      id\n    }\n    postRenderActions {\n      id\n      type\n    }\n    preRenderActions {\n      id\n      type\n    }\n    prevSibling {\n      id\n    }\n    props {\n      ...Prop\n    }\n    renderForEachPropKey\n    renderIfExpression\n    renderType {\n      ...ElementRenderTypeProduction\n    }\n    style\n    tailwindClassNames\n  }\n"): (typeof documents)["\n  fragment ElementProduction on Element {\n    __typename\n    childMapperComponent {\n      id\n      name\n    }\n    childMapperPreviousSibling {\n      id\n    }\n    childMapperPropKey\n    dependantTypes {\n      ...Type\n    }\n    firstChild {\n      id\n    }\n    id\n    name\n    nextSibling {\n      id\n    }\n    page {\n      id\n    }\n    parentComponent {\n      id\n    }\n    parentElement {\n      id\n    }\n    postRenderActions {\n      id\n      type\n    }\n    preRenderActions {\n      id\n      type\n    }\n    prevSibling {\n      id\n    }\n    props {\n      ...Prop\n    }\n    renderForEachPropKey\n    renderIfExpression\n    renderType {\n      ...ElementRenderTypeProduction\n    }\n    style\n    tailwindClassNames\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment HookProp on Prop {\n    data\n    id\n  }\n"): (typeof documents)["\n  fragment HookProp on Prop {\n    data\n    id\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Hook on Hook {\n    config {\n      ...HookProp\n    }\n    element {\n      id\n      name\n    }\n    id\n    type\n  }\n"): (typeof documents)["\n  fragment Hook on Hook {\n    config {\n      ...HookProp\n    }\n    element {\n      id\n      name\n    }\n    id\n    type\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PagePreview on Page {\n    app {\n      id\n    }\n    id\n    kind\n    name\n    rootElement {\n      id\n    }\n    elements {\n      id\n    }\n    store {\n      id\n    }\n    urlPattern\n  }\n"): (typeof documents)["\n  fragment PagePreview on Page {\n    app {\n      id\n    }\n    id\n    kind\n    name\n    rootElement {\n      id\n    }\n    elements {\n      id\n    }\n    store {\n      id\n    }\n    urlPattern\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Page on Page {\n    app {\n      id\n    }\n    elements {\n      ...Element\n    }\n    id\n    kind\n    name\n    pageContentContainer {\n      id\n    }\n    redirect {\n      id\n    }\n    rootElement {\n      id\n    }\n    store {\n      ...Store\n    }\n    urlPattern\n  }\n"): (typeof documents)["\n  fragment Page on Page {\n    app {\n      id\n    }\n    elements {\n      ...Element\n    }\n    id\n    kind\n    name\n    pageContentContainer {\n      id\n    }\n    redirect {\n      id\n    }\n    rootElement {\n      id\n    }\n    store {\n      ...Store\n    }\n    urlPattern\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PageDevelopment on Page {\n    app {\n      id\n    }\n    elements {\n      ...Element\n    }\n    id\n    kind\n    name\n    pageContentContainer {\n      id\n    }\n    redirect {\n      id\n    }\n    rootElement {\n      id\n    }\n    store {\n      ...Store\n    }\n    urlPattern\n  }\n"): (typeof documents)["\n  fragment PageDevelopment on Page {\n    app {\n      id\n    }\n    elements {\n      ...Element\n    }\n    id\n    kind\n    name\n    pageContentContainer {\n      id\n    }\n    redirect {\n      id\n    }\n    rootElement {\n      id\n    }\n    store {\n      ...Store\n    }\n    urlPattern\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PageProduction on Page {\n    app {\n      id\n    }\n    elements {\n      ...ElementProduction\n    }\n    id\n    kind\n    name\n    pageContentContainer {\n      id\n    }\n    redirect {\n      id\n    }\n    rootElement {\n      id\n    }\n    slug\n    store {\n      ...Store\n    }\n    urlPattern\n  }\n"): (typeof documents)["\n  fragment PageProduction on Page {\n    app {\n      id\n    }\n    elements {\n      ...ElementProduction\n    }\n    id\n    kind\n    name\n    pageContentContainer {\n      id\n    }\n    redirect {\n      id\n    }\n    rootElement {\n      id\n    }\n    slug\n    store {\n      ...Store\n    }\n    urlPattern\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Preference on Preference {\n    id\n    builderBreakpointType\n    builderWidth\n    owner {\n      id\n    }\n  }\n"): (typeof documents)["\n  fragment Preference on Preference {\n    id\n    builderBreakpointType\n    builderWidth\n    owner {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Prop on Prop {\n    data\n    id\n  }\n"): (typeof documents)["\n  fragment Prop on Prop {\n    data\n    id\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Redirect on Redirect {\n    authGuard {\n      ...AuthGuard\n    }\n    id\n    source {\n      id\n    }\n    targetPage {\n      ...PagePreview\n    }\n    targetType\n    targetUrl\n  }\n"): (typeof documents)["\n  fragment Redirect on Redirect {\n    authGuard {\n      ...AuthGuard\n    }\n    id\n    source {\n      id\n    }\n    targetPage {\n      ...PagePreview\n    }\n    targetType\n    targetUrl\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment RedirectPreview on Redirect {\n    authGuard {\n      id\n    }\n    id\n    source {\n      id\n    }\n    targetPage {\n      id\n    }\n    targetType\n    targetUrl\n  }\n"): (typeof documents)["\n  fragment RedirectPreview on Redirect {\n    authGuard {\n      id\n    }\n    id\n    source {\n      id\n    }\n    targetPage {\n      id\n    }\n    targetType\n    targetUrl\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Resource on Resource {\n    config {\n      ...Prop\n    }\n    id\n    name\n    type\n    owner {\n      id\n    }\n  }\n"): (typeof documents)["\n  fragment Resource on Resource {\n    config {\n      ...Prop\n    }\n    id\n    name\n    type\n    owner {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Store on Store {\n    actions {\n      ...Action\n    }\n    api {\n      ...InterfaceType\n    }\n    id\n    name\n  }\n"): (typeof documents)["\n  fragment Store on Store {\n    actions {\n      ...Action\n    }\n    api {\n      ...InterfaceType\n    }\n    id\n    name\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProductionStore on Store {\n    actions {\n      ...Action\n    }\n    id\n    name\n  }\n"): (typeof documents)["\n  fragment ProductionStore on Store {\n    actions {\n      ...Action\n    }\n    id\n    name\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Tag on Tag {\n    children {\n      id\n      name\n      owner {\n        id\n      }\n    }\n    descendants {\n      id\n      name\n    }\n    id\n    name\n    owner {\n      id\n    }\n    parent {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  fragment Tag on Tag {\n    children {\n      id\n      name\n      owner {\n        id\n      }\n    }\n    descendants {\n      id\n      name\n    }\n    id\n    name\n    owner {\n      id\n    }\n    parent {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TagPreview on Tag {\n    id\n    name\n    owner {\n      id\n    }\n  }\n"): (typeof documents)["\n  fragment TagPreview on Tag {\n    id\n    name\n    owner {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ActionType on ActionType {\n    ...BaseType\n  }\n"): (typeof documents)["\n  fragment ActionType on ActionType {\n    ...BaseType\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment AppType on AppType {\n    ...BaseType\n  }\n"): (typeof documents)["\n  fragment AppType on AppType {\n    ...BaseType\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ArrayType on ArrayType {\n    ...BaseType\n    itemType {\n      ... on IBaseType {\n        ...BaseType\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment ArrayType on ArrayType {\n    ...BaseType\n    itemType {\n      ... on IBaseType {\n        ...BaseType\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment BaseType on IBaseType {\n    __typename\n    id\n    kind\n    name\n    owner {\n      id\n    }\n  }\n"): (typeof documents)["\n  fragment BaseType on IBaseType {\n    __typename\n    id\n    kind\n    name\n    owner {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CodeMirrorType on CodeMirrorType {\n    ...BaseType\n    language\n  }\n"): (typeof documents)["\n  fragment CodeMirrorType on CodeMirrorType {\n    ...BaseType\n    language\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ElementType on ElementType {\n    ...BaseType\n    elementKind\n  }\n"): (typeof documents)["\n  fragment ElementType on ElementType {\n    ...BaseType\n    elementKind\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment EnumTypeValue on EnumTypeValue {\n    id\n    key\n    value\n  }\n"): (typeof documents)["\n  fragment EnumTypeValue on EnumTypeValue {\n    id\n    key\n    value\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment EnumType on EnumType {\n    ...BaseType\n    allowedValues {\n      ...EnumTypeValue\n    }\n  }\n"): (typeof documents)["\n  fragment EnumType on EnumType {\n    ...BaseType\n    allowedValues {\n      ...EnumTypeValue\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Field on Field {\n    __typename\n    api {\n      ... on InterfaceType {\n        ...BaseType\n      }\n    }\n    defaultValues\n    description\n    fieldType {\n      ... on IBaseType {\n        ...BaseType\n      }\n    }\n    id\n    key\n    name\n    nextSibling {\n      id\n    }\n    prevSibling {\n      id\n    }\n    validationRules\n  }\n"): (typeof documents)["\n  fragment Field on Field {\n    __typename\n    api {\n      ... on InterfaceType {\n        ...BaseType\n      }\n    }\n    defaultValues\n    description\n    fieldType {\n      ... on IBaseType {\n        ...BaseType\n      }\n    }\n    id\n    key\n    name\n    nextSibling {\n      id\n    }\n    prevSibling {\n      id\n    }\n    validationRules\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment InterfaceType on InterfaceType {\n    ...BaseType\n    fields {\n      ...Field\n    }\n  }\n"): (typeof documents)["\n  fragment InterfaceType on InterfaceType {\n    ...BaseType\n    fields {\n      ...Field\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment LambdaType on LambdaType {\n    ...BaseType\n  }\n"): (typeof documents)["\n  fragment LambdaType on LambdaType {\n    ...BaseType\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PageType on PageType {\n    ...BaseType\n  }\n"): (typeof documents)["\n  fragment PageType on PageType {\n    ...BaseType\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PrimitiveType on PrimitiveType {\n    ...BaseType\n    primitiveKind\n  }\n"): (typeof documents)["\n  fragment PrimitiveType on PrimitiveType {\n    ...BaseType\n    primitiveKind\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ReactNodeType on ReactNodeType {\n    ...BaseType\n  }\n"): (typeof documents)["\n  fragment ReactNodeType on ReactNodeType {\n    ...BaseType\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment RenderPropType on RenderPropType {\n    ...BaseType\n  }\n"): (typeof documents)["\n  fragment RenderPropType on RenderPropType {\n    ...BaseType\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment RichTextType on RichTextType {\n    ...BaseType\n  }\n"): (typeof documents)["\n  fragment RichTextType on RichTextType {\n    ...BaseType\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Type on IBaseType {\n    ...ActionType\n    ...AppType\n    ...ArrayType\n    ...CodeMirrorType\n    ...ElementType\n    ...EnumType\n    ...InterfaceType\n    ...LambdaType\n    ...PageType\n    ...PrimitiveType\n    ...ReactNodeType\n    ...RenderPropType\n    ...RichTextType\n    ...UnionType\n  }\n"): (typeof documents)["\n  fragment Type on IBaseType {\n    ...ActionType\n    ...AppType\n    ...ArrayType\n    ...CodeMirrorType\n    ...ElementType\n    ...EnumType\n    ...InterfaceType\n    ...LambdaType\n    ...PageType\n    ...PrimitiveType\n    ...ReactNodeType\n    ...RenderPropType\n    ...RichTextType\n    ...UnionType\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UnionType on UnionType {\n    ...BaseType\n    typesOfUnionType {\n      ... on IBaseType {\n        ...BaseType\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment UnionType on UnionType {\n    ...BaseType\n    typesOfUnionType {\n      ... on IBaseType {\n        ...BaseType\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Owner on User {\n    id\n  }\n"): (typeof documents)["\n  fragment Owner on User {\n    id\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment User on User {\n    apps {\n      id\n    }\n    auth0Id\n    email\n    id\n    preferences {\n      ...Preference\n    }\n    roles\n    username\n  }\n"): (typeof documents)["\n  fragment User on User {\n    apps {\n      id\n    }\n    auth0Id\n    email\n    id\n    preferences {\n      ...Preference\n    }\n    roles\n    username\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAppBuilder($appId: ID!, $pageIds: [ID!]) {\n    actionTypes {\n      ...ActionType\n    }\n    apps(where: { id: $appId }) {\n      ...AppBuilder\n    }\n    atoms(where: { type: ReactFragment }) {\n      ...AtomBuilder\n    }\n    authGuards {\n      ...AuthGuard\n    }\n    codeMirrorTypes {\n      ...CodeMirrorType\n    }\n    components {\n      ...ComponentBuilder\n    }\n    primitiveTypes {\n      ...PrimitiveType\n    }\n    reactNodeTypes {\n      ...ReactNodeType\n    }\n    redirects(where: { source: { app: { id: $appId } } }) {\n      ...Redirect\n    }\n    renderPropTypes {\n      ...RenderPropType\n    }\n    resources {\n      ...Resource\n    }\n    richTextTypes {\n      ...RichTextType\n    }\n  }\n"): (typeof documents)["\n  query GetAppBuilder($appId: ID!, $pageIds: [ID!]) {\n    actionTypes {\n      ...ActionType\n    }\n    apps(where: { id: $appId }) {\n      ...AppBuilder\n    }\n    atoms(where: { type: ReactFragment }) {\n      ...AtomBuilder\n    }\n    authGuards {\n      ...AuthGuard\n    }\n    codeMirrorTypes {\n      ...CodeMirrorType\n    }\n    components {\n      ...ComponentBuilder\n    }\n    primitiveTypes {\n      ...PrimitiveType\n    }\n    reactNodeTypes {\n      ...ReactNodeType\n    }\n    redirects(where: { source: { app: { id: $appId } } }) {\n      ...Redirect\n    }\n    renderPropTypes {\n      ...RenderPropType\n    }\n    resources {\n      ...Resource\n    }\n    richTextTypes {\n      ...RichTextType\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetSelectAtomOptions {\n    atoms {\n      __typename\n      id\n      name\n      requiredParents {\n        id\n        type\n      }\n      type\n    }\n  }\n"): (typeof documents)["\n  query GetSelectAtomOptions {\n    atoms {\n      __typename\n      id\n      name\n      requiredParents {\n        id\n        type\n      }\n      type\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetComponentBuilder {\n    actionTypes {\n      ...ActionType\n    }\n    atoms(where: { type: ReactFragment }) {\n      ...AtomBuilder\n    }\n    codeMirrorTypes {\n      ...CodeMirrorType\n    }\n    components {\n      ...ComponentBuilder\n    }\n    primitiveTypes {\n      ...PrimitiveType\n    }\n    reactNodeTypes {\n      ...ReactNodeType\n    }\n    renderPropTypes {\n      ...RenderPropType\n    }\n    resources {\n      ...Resource\n    }\n    richTextTypes {\n      ...RichTextType\n    }\n  }\n"): (typeof documents)["\n  query GetComponentBuilder {\n    actionTypes {\n      ...ActionType\n    }\n    atoms(where: { type: ReactFragment }) {\n      ...AtomBuilder\n    }\n    codeMirrorTypes {\n      ...CodeMirrorType\n    }\n    components {\n      ...ComponentBuilder\n    }\n    primitiveTypes {\n      ...PrimitiveType\n    }\n    reactNodeTypes {\n      ...ReactNodeType\n    }\n    renderPropTypes {\n      ...RenderPropType\n    }\n    resources {\n      ...Resource\n    }\n    richTextTypes {\n      ...RichTextType\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateApps($input: [AppCreateInput!]!) {\n    createApps(input: $input) {\n      apps {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateApps($input: [AppCreateInput!]!) {\n    createApps(input: $input) {\n      apps {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateApps($where: AppWhere!, $update: AppUpdateInput!) {\n    updateApps(update: $update, where: $where) {\n      apps {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateApps($where: AppWhere!, $update: AppUpdateInput!) {\n    updateApps(update: $update, where: $where) {\n      apps {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteApps($where: AppWhere!, $delete: AppDeleteInput) {\n    deleteApps(delete: $delete, where: $where) {\n      nodesDeleted\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteApps($where: AppWhere!, $delete: AppDeleteInput) {\n    deleteApps(delete: $delete, where: $where) {\n      nodesDeleted\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AppListPreview($options: AppOptions, $where: AppWhere) {\n    aggregate: appsAggregate(where: $where) {\n      count\n    }\n    items: apps(options: $options, where: $where) {\n      ...AppPreview\n    }\n  }\n"): (typeof documents)["\n  query AppListPreview($options: AppOptions, $where: AppWhere) {\n    aggregate: appsAggregate(where: $where) {\n      count\n    }\n    items: apps(options: $options, where: $where) {\n      ...AppPreview\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AppList($options: AppOptions, $where: AppWhere) {\n    items: apps(options: $options, where: $where) {\n      ...App\n    }\n    aggregate: appsAggregate(where: $where) {\n      count\n    }\n    atoms(where: { type: ReactFragment }) {\n      ...AtomBuilder\n    }\n  }\n"): (typeof documents)["\n  query AppList($options: AppOptions, $where: AppWhere) {\n    items: apps(options: $options, where: $where) {\n      ...App\n    }\n    aggregate: appsAggregate(where: $where) {\n      count\n    }\n    atoms(where: { type: ReactFragment }) {\n      ...AtomBuilder\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAppProduction($domain: String!, $pageUrlPattern: String!) {\n    apps(where: { domains_SOME: { name_IN: [$domain] } }) {\n      ...AppProduction\n    }\n    atoms(where: { type: ReactFragment }) {\n      ...AtomProduction\n    }\n    resources {\n      ...Resource\n    }\n  }\n"): (typeof documents)["\n  query GetAppProduction($domain: String!, $pageUrlPattern: String!) {\n    apps(where: { domains_SOME: { name_IN: [$domain] } }) {\n      ...AppProduction\n    }\n    atoms(where: { type: ReactFragment }) {\n      ...AtomProduction\n    }\n    resources {\n      ...Resource\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateAtoms($input: [AtomCreateInput!]!) {\n    createAtoms(input: $input) {\n      atoms {\n        __typename\n        id\n      }\n      info {\n        nodesCreated\n        relationshipsCreated\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateAtoms($input: [AtomCreateInput!]!) {\n    createAtoms(input: $input) {\n      atoms {\n        __typename\n        id\n      }\n      info {\n        nodesCreated\n        relationshipsCreated\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteAtoms($where: AtomWhere!, $delete: AtomDeleteInput) {\n    deleteAtoms(where: $where, delete: $delete) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteAtoms($where: AtomWhere!, $delete: AtomDeleteInput) {\n    deleteAtoms(where: $where, delete: $delete) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AtomList($where: AtomWhere, $options: AtomOptions) {\n    aggregate: atomsAggregate(where: $where) {\n      count\n    }\n    items: atoms(options: $options, where: $where) {\n      ...Atom\n    }\n  }\n"): (typeof documents)["\n  query AtomList($where: AtomWhere, $options: AtomOptions) {\n    aggregate: atomsAggregate(where: $where) {\n      count\n    }\n    items: atoms(options: $options, where: $where) {\n      ...Atom\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateAtoms($where: AtomWhere, $update: AtomUpdateInput) {\n    updateAtoms(update: $update, where: $where) {\n      atoms {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateAtoms($where: AtomWhere, $update: AtomUpdateInput) {\n    updateAtoms(update: $update, where: $where) {\n      atoms {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAuthGuards($options: AuthGuardOptions, $where: AuthGuardWhere) {\n    aggregate: authGuardsAggregate(where: $where) {\n      count\n    }\n    items: authGuards(options: $options, where: $where) {\n      ...AuthGuard\n    }\n  }\n"): (typeof documents)["\n  query GetAuthGuards($options: AuthGuardOptions, $where: AuthGuardWhere) {\n    aggregate: authGuardsAggregate(where: $where) {\n      count\n    }\n    items: authGuards(options: $options, where: $where) {\n      ...AuthGuard\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateAuthGuards($input: [AuthGuardCreateInput!]!) {\n    createAuthGuards(input: $input) {\n      authGuards {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateAuthGuards($input: [AuthGuardCreateInput!]!) {\n    createAuthGuards(input: $input) {\n      authGuards {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateAuthGuard(\n    $where: AuthGuardWhere\n    $update: AuthGuardUpdateInput\n  ) {\n    updateAuthGuards(update: $update, where: $where) {\n      authGuards {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateAuthGuard(\n    $where: AuthGuardWhere\n    $update: AuthGuardUpdateInput\n  ) {\n    updateAuthGuards(update: $update, where: $where) {\n      authGuards {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteAuthGuards(\n    $where: AuthGuardWhere\n    $delete: AuthGuardDeleteInput\n  ) {\n    deleteAuthGuards(where: $where, delete: $delete) {\n      nodesDeleted\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteAuthGuards(\n    $where: AuthGuardWhere\n    $delete: AuthGuardDeleteInput\n  ) {\n    deleteAuthGuards(where: $where, delete: $delete) {\n      nodesDeleted\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateComponents($input: [ComponentCreateInput!]!) {\n    createComponents(input: $input) {\n      components {\n        __typename\n        id\n        store {\n          id\n        }\n        rootElement {\n          id\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateComponents($input: [ComponentCreateInput!]!) {\n    createComponents(input: $input) {\n      components {\n        __typename\n        id\n        store {\n          id\n        }\n        rootElement {\n          id\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteComponents(\n    $where: ComponentWhere\n    $delete: ComponentDeleteInput\n  ) {\n    deleteComponents(delete: $delete, where: $where) {\n      nodesDeleted\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteComponents(\n    $where: ComponentWhere\n    $delete: ComponentDeleteInput\n  ) {\n    deleteComponents(delete: $delete, where: $where) {\n      nodesDeleted\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateComponents(\n    $where: ComponentWhere\n    $update: ComponentUpdateInput\n  ) {\n    updateComponents(update: $update, where: $where) {\n      components {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateComponents(\n    $where: ComponentWhere\n    $update: ComponentUpdateInput\n  ) {\n    updateComponents(update: $update, where: $where) {\n      components {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ComponentList($options: ComponentOptions, $where: ComponentWhere) {\n    aggregate: componentsAggregate(where: $where) {\n      count\n    }\n    items: components(options: $options, where: $where) {\n      ...Component\n    }\n  }\n"): (typeof documents)["\n  query ComponentList($options: ComponentOptions, $where: ComponentWhere) {\n    aggregate: componentsAggregate(where: $where) {\n      count\n    }\n    items: components(options: $options, where: $where) {\n      ...Component\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query DomainList($options: DomainOptions, $where: DomainWhere) {\n    aggregate: domainsAggregate(where: $where) {\n      count\n    }\n    items: domains(options: $options, where: $where) {\n      ...Domain\n    }\n  }\n"): (typeof documents)["\n  query DomainList($options: DomainOptions, $where: DomainWhere) {\n    aggregate: domainsAggregate(where: $where) {\n      count\n    }\n    items: domains(options: $options, where: $where) {\n      ...Domain\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateDomains($input: [DomainCreateInput!]!) {\n    createDomains(input: $input) {\n      domains {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateDomains($input: [DomainCreateInput!]!) {\n    createDomains(input: $input) {\n      domains {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateDomains($where: DomainWhere!, $update: DomainUpdateInput!) {\n    updateDomains(update: $update, where: $where) {\n      domains {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateDomains($where: DomainWhere!, $update: DomainUpdateInput!) {\n    updateDomains(update: $update, where: $where) {\n      domains {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteDomains($where: DomainWhere!) {\n    deleteDomains(where: $where) {\n      nodesDeleted\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteDomains($where: DomainWhere!) {\n    deleteDomains(where: $where) {\n      nodesDeleted\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateElements($input: [ElementCreateInput!]!) {\n    createElements(input: $input) {\n      elements {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateElements($input: [ElementCreateInput!]!) {\n    createElements(input: $input) {\n      elements {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteElements($where: ElementWhere!, $delete: ElementDeleteInput) {\n    deleteElements(delete: $delete, where: $where) {\n      nodesDeleted\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteElements($where: ElementWhere!, $delete: ElementDeleteInput) {\n    deleteElements(delete: $delete, where: $where) {\n      nodesDeleted\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateElements($where: ElementWhere, $update: ElementUpdateInput) {\n    updateElements(update: $update, where: $where) {\n      elements {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateElements($where: ElementWhere, $update: ElementUpdateInput) {\n    updateElements(update: $update, where: $where) {\n      elements {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ElementList($options: ElementOptions, $where: ElementWhere) {\n    aggregate: elementsAggregate(where: $where) {\n      count\n    }\n    items: elements(options: $options, where: $where) {\n      ...Element\n    }\n  }\n"): (typeof documents)["\n  query ElementList($options: ElementOptions, $where: ElementWhere) {\n    aggregate: elementsAggregate(where: $where) {\n      count\n    }\n    items: elements(options: $options, where: $where) {\n      ...Element\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateHooks($input: [HookCreateInput!]!) {\n    createHooks(input: $input) {\n      hooks {\n        ...Hook\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateHooks($input: [HookCreateInput!]!) {\n    createHooks(input: $input) {\n      hooks {\n        ...Hook\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteHooks($where: HookWhere!) {\n    deleteHooks(where: $where) {\n      nodesDeleted\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteHooks($where: HookWhere!) {\n    deleteHooks(where: $where) {\n      nodesDeleted\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateFields($input: [FieldCreateInput!]!) {\n    createFields(input: $input) {\n      fields {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateFields($input: [FieldCreateInput!]!) {\n    createFields(input: $input) {\n      fields {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateFields($where: FieldWhere!, $update: FieldUpdateInput!) {\n    updateFields(update: $update, where: $where) {\n      fields {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateFields($where: FieldWhere!, $update: FieldUpdateInput!) {\n    updateFields(update: $update, where: $where) {\n      fields {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteFields($where: FieldWhere!) {\n    deleteFields(where: $where) {\n      nodesDeleted\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteFields($where: FieldWhere!) {\n    deleteFields(where: $where) {\n      nodesDeleted\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFields($where: FieldWhere, $options: FieldOptions) {\n    aggregate: fieldsAggregate(where: $where) {\n      count\n    }\n    items: fields(options: $options, where: $where) {\n      ...Field\n    }\n  }\n"): (typeof documents)["\n  query GetFields($where: FieldWhere, $options: FieldOptions) {\n    aggregate: fieldsAggregate(where: $where) {\n      count\n    }\n    items: fields(options: $options, where: $where) {\n      ...Field\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePages($input: [PageCreateInput!]!) {\n    createPages(input: $input) {\n      pages {\n        __typename\n        id\n        rootElement {\n          id\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePages($input: [PageCreateInput!]!) {\n    createPages(input: $input) {\n      pages {\n        __typename\n        id\n        rootElement {\n          id\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeletePages($where: PageWhere, $delete: PageDeleteInput) {\n    deletePages(delete: $delete, where: $where) {\n      nodesDeleted\n    }\n  }\n"): (typeof documents)["\n  mutation DeletePages($where: PageWhere, $delete: PageDeleteInput) {\n    deletePages(delete: $delete, where: $where) {\n      nodesDeleted\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdatePages($where: PageWhere, $update: PageUpdateInput) {\n    updatePages(update: $update, where: $where) {\n      pages {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdatePages($where: PageWhere, $update: PageUpdateInput) {\n    updatePages(update: $update, where: $where) {\n      pages {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PageList($options: PageOptions, $where: PageWhere) {\n    aggregate: pagesAggregate(where: $where) {\n      count\n    }\n    items: pages(options: $options, where: $where) {\n      ...Page\n    }\n  }\n"): (typeof documents)["\n  query PageList($options: PageOptions, $where: PageWhere) {\n    aggregate: pagesAggregate(where: $where) {\n      count\n    }\n    items: pages(options: $options, where: $where) {\n      ...Page\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetRenderedPage($pageId: ID!) {\n    pages(where: { id: $pageId }) {\n      ...PageDevelopment\n    }\n  }\n"): (typeof documents)["\n  query GetRenderedPage($pageId: ID!) {\n    pages(where: { id: $pageId }) {\n      ...PageDevelopment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePreferences($input: [PreferenceCreateInput!]!) {\n    createPreferences(input: $input) {\n      info {\n        nodesCreated\n        relationshipsCreated\n      }\n      preferences {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePreferences($input: [PreferenceCreateInput!]!) {\n    createPreferences(input: $input) {\n      info {\n        nodesCreated\n        relationshipsCreated\n      }\n      preferences {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeletePreferences(\n    $where: PreferenceWhere\n    $delete: PreferenceDeleteInput\n  ) {\n    deletePreferences(delete: $delete, where: $where) {\n      nodesDeleted\n    }\n  }\n"): (typeof documents)["\n  mutation DeletePreferences(\n    $where: PreferenceWhere\n    $delete: PreferenceDeleteInput\n  ) {\n    deletePreferences(delete: $delete, where: $where) {\n      nodesDeleted\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPreferences($where: PreferenceWhere, $options: PreferenceOptions) {\n    aggregate: preferencesAggregate(where: $where) {\n      count\n    }\n    items: preferences(options: $options, where: $where) {\n      ...Preference\n    }\n  }\n"): (typeof documents)["\n  query GetPreferences($where: PreferenceWhere, $options: PreferenceOptions) {\n    aggregate: preferencesAggregate(where: $where) {\n      count\n    }\n    items: preferences(options: $options, where: $where) {\n      ...Preference\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdatePreferences(\n    $where: PreferenceWhere\n    $update: PreferenceUpdateInput\n  ) {\n    updatePreferences(update: $update, where: $where) {\n      preferences {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdatePreferences(\n    $where: PreferenceWhere\n    $update: PreferenceUpdateInput\n  ) {\n    updatePreferences(update: $update, where: $where) {\n      preferences {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateProps($input: [PropCreateInput!]!) {\n    createProps(input: $input) {\n      props {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateProps($input: [PropCreateInput!]!) {\n    createProps(input: $input) {\n      props {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateProps($where: PropWhere, $update: PropUpdateInput) {\n    updateProps(update: $update, where: $where) {\n      props {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateProps($where: PropWhere, $update: PropUpdateInput) {\n    updateProps(update: $update, where: $where) {\n      props {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteProps($where: PropWhere!) {\n    deleteProps(where: $where) {\n      nodesDeleted\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteProps($where: PropWhere!) {\n    deleteProps(where: $where) {\n      nodesDeleted\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProps($options: PropOptions, $where: PropWhere) {\n    aggregate: propsAggregate(where: $where) {\n      count\n    }\n    items: props(options: $options, where: $where) {\n      ...Prop\n    }\n  }\n"): (typeof documents)["\n  query GetProps($options: PropOptions, $where: PropWhere) {\n    aggregate: propsAggregate(where: $where) {\n      count\n    }\n    items: props(options: $options, where: $where) {\n      ...Prop\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateRedirects($input: [RedirectCreateInput!]!) {\n    createRedirects(input: $input) {\n      redirects {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateRedirects($input: [RedirectCreateInput!]!) {\n    createRedirects(input: $input) {\n      redirects {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteRedirects(\n    $where: RedirectWhere\n    $delete: RedirectDeleteInput\n  ) {\n    deleteRedirects(delete: $delete, where: $where) {\n      nodesDeleted\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteRedirects(\n    $where: RedirectWhere\n    $delete: RedirectDeleteInput\n  ) {\n    deleteRedirects(delete: $delete, where: $where) {\n      nodesDeleted\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateRedirects(\n    $where: RedirectWhere\n    $update: RedirectUpdateInput\n  ) {\n    updateRedirects(update: $update, where: $where) {\n      redirects {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateRedirects(\n    $where: RedirectWhere\n    $update: RedirectUpdateInput\n  ) {\n    updateRedirects(update: $update, where: $where) {\n      redirects {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetRedirects($options: RedirectOptions, $where: RedirectWhere) {\n    aggregate: redirectsAggregate(where: $where) {\n      count\n    }\n    items: redirects(options: $options, where: $where) {\n      ...Redirect\n    }\n  }\n"): (typeof documents)["\n  query GetRedirects($options: RedirectOptions, $where: RedirectWhere) {\n    aggregate: redirectsAggregate(where: $where) {\n      count\n    }\n    items: redirects(options: $options, where: $where) {\n      ...Redirect\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetRedirectsPreview($options: RedirectOptions, $where: RedirectWhere) {\n    aggregate: redirectsAggregate(where: $where) {\n      count\n    }\n    items: redirects(options: $options, where: $where) {\n      ...RedirectPreview\n    }\n  }\n"): (typeof documents)["\n  query GetRedirectsPreview($options: RedirectOptions, $where: RedirectWhere) {\n    aggregate: redirectsAggregate(where: $where) {\n      count\n    }\n    items: redirects(options: $options, where: $where) {\n      ...RedirectPreview\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ResourceList($options: ResourceOptions, $where: ResourceWhere) {\n    aggregate: resourcesAggregate(where: $where) {\n      count\n    }\n    items: resources(options: $options, where: $where) {\n      ...Resource\n    }\n  }\n"): (typeof documents)["\n  query ResourceList($options: ResourceOptions, $where: ResourceWhere) {\n    aggregate: resourcesAggregate(where: $where) {\n      count\n    }\n    items: resources(options: $options, where: $where) {\n      ...Resource\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateResources($input: [ResourceCreateInput!]!) {\n    createResources(input: $input) {\n      resources {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateResources($input: [ResourceCreateInput!]!) {\n    createResources(input: $input) {\n      resources {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateResources(\n    $where: ResourceWhere\n    $update: ResourceUpdateInput\n  ) {\n    updateResources(update: $update, where: $where) {\n      resources {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateResources(\n    $where: ResourceWhere\n    $update: ResourceUpdateInput\n  ) {\n    updateResources(update: $update, where: $where) {\n      resources {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteResources(\n    $where: ResourceWhere\n    $delete: ResourceDeleteInput\n  ) {\n    deleteResources(where: $where, delete: $delete) {\n      nodesDeleted\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteResources(\n    $where: ResourceWhere\n    $delete: ResourceDeleteInput\n  ) {\n    deleteResources(where: $where, delete: $delete) {\n      nodesDeleted\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateCodeActions($input: [CodeActionCreateInput!]!) {\n    createCodeActions(input: $input) {\n      codeActions {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCodeActions($input: [CodeActionCreateInput!]!) {\n    createCodeActions(input: $input) {\n      codeActions {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateApiActions($input: [ApiActionCreateInput!]!) {\n    createApiActions(input: $input) {\n      apiActions {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateApiActions($input: [ApiActionCreateInput!]!) {\n    createApiActions(input: $input) {\n      apiActions {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteCodeActions(\n    $where: CodeActionWhere!\n    $delete: CodeActionDeleteInput\n  ) {\n    deleteCodeActions(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteCodeActions(\n    $where: CodeActionWhere!\n    $delete: CodeActionDeleteInput\n  ) {\n    deleteCodeActions(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteApiActions(\n    $where: ApiActionWhere!\n    $delete: ApiActionDeleteInput\n  ) {\n    deleteApiActions(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteApiActions(\n    $where: ApiActionWhere!\n    $delete: ApiActionDeleteInput\n  ) {\n    deleteApiActions(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetActions(\n    $codeActionWhere: CodeActionWhere\n    $apiActionWhere: ApiActionWhere\n  ) {\n    apiActions(where: $apiActionWhere) {\n      ...Action\n    }\n    codeActions(where: $codeActionWhere) {\n      ...Action\n    }\n  }\n"): (typeof documents)["\n  query GetActions(\n    $codeActionWhere: CodeActionWhere\n    $apiActionWhere: ApiActionWhere\n  ) {\n    apiActions(where: $apiActionWhere) {\n      ...Action\n    }\n    codeActions(where: $codeActionWhere) {\n      ...Action\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateStores($input: [StoreCreateInput!]!) {\n    createStores(input: $input) {\n      info {\n        nodesCreated\n        relationshipsCreated\n      }\n      stores {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateStores($input: [StoreCreateInput!]!) {\n    createStores(input: $input) {\n      info {\n        nodesCreated\n        relationshipsCreated\n      }\n      stores {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteStores($where: StoreWhere, $delete: StoreDeleteInput) {\n    deleteStores(delete: $delete, where: $where) {\n      nodesDeleted\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteStores($where: StoreWhere, $delete: StoreDeleteInput) {\n    deleteStores(delete: $delete, where: $where) {\n      nodesDeleted\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetStores($where: StoreWhere, $options: StoreOptions) {\n    aggregate: storesAggregate(where: $where) {\n      count\n    }\n    items: stores(options: $options, where: $where) {\n      ...Store\n    }\n  }\n"): (typeof documents)["\n  query GetStores($where: StoreWhere, $options: StoreOptions) {\n    aggregate: storesAggregate(where: $where) {\n      count\n    }\n    items: stores(options: $options, where: $where) {\n      ...Store\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateStores($where: StoreWhere, $update: StoreUpdateInput) {\n    updateStores(update: $update, where: $where) {\n      stores {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateStores($where: StoreWhere, $update: StoreUpdateInput) {\n    updateStores(update: $update, where: $where) {\n      stores {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateCodeActions(\n    $update: CodeActionUpdateInput\n    $where: CodeActionWhere\n  ) {\n    updateCodeActions(update: $update, where: $where) {\n      codeActions {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateCodeActions(\n    $update: CodeActionUpdateInput\n    $where: CodeActionWhere\n  ) {\n    updateCodeActions(update: $update, where: $where) {\n      codeActions {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateApiActions(\n    $update: ApiActionUpdateInput\n    $where: ApiActionWhere\n  ) {\n    updateApiActions(update: $update, where: $where) {\n      apiActions {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateApiActions(\n    $update: ApiActionUpdateInput\n    $where: ApiActionWhere\n  ) {\n    updateApiActions(update: $update, where: $where) {\n      apiActions {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateTags($input: [TagCreateInput!]!) {\n    createTags(input: $input) {\n      tags {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateTags($input: [TagCreateInput!]!) {\n    createTags(input: $input) {\n      tags {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateTags($where: TagWhere!, $update: TagUpdateInput!) {\n    updateTags(update: $update, where: $where) {\n      tags {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateTags($where: TagWhere!, $update: TagUpdateInput!) {\n    updateTags(update: $update, where: $where) {\n      tags {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteTags($where: TagWhere!) {\n    deleteTags(where: $where) {\n      nodesDeleted\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteTags($where: TagWhere!) {\n    deleteTags(where: $where) {\n      nodesDeleted\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTags($options: TagOptions, $where: TagWhere) {\n    aggregate: tagsAggregate(where: $where) {\n      count\n    }\n    items: tags(options: $options, where: $where) {\n      ...Tag\n    }\n  }\n"): (typeof documents)["\n  query GetTags($options: TagOptions, $where: TagWhere) {\n    aggregate: tagsAggregate(where: $where) {\n      count\n    }\n    items: tags(options: $options, where: $where) {\n      ...Tag\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePrimitiveTypes($input: [PrimitiveTypeCreateInput!]!) {\n    types: createPrimitiveTypes(input: $input) {\n      types: primitiveTypes {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePrimitiveTypes($input: [PrimitiveTypeCreateInput!]!) {\n    types: createPrimitiveTypes(input: $input) {\n      types: primitiveTypes {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateArrayTypes($input: [ArrayTypeCreateInput!]!) {\n    types: createArrayTypes(input: $input) {\n      types: arrayTypes {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateArrayTypes($input: [ArrayTypeCreateInput!]!) {\n    types: createArrayTypes(input: $input) {\n      types: arrayTypes {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateUnionTypes($input: [UnionTypeCreateInput!]!) {\n    types: createUnionTypes(input: $input) {\n      types: unionTypes {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUnionTypes($input: [UnionTypeCreateInput!]!) {\n    types: createUnionTypes(input: $input) {\n      types: unionTypes {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateInterfaceTypes($input: [InterfaceTypeCreateInput!]!) {\n    types: createInterfaceTypes(input: $input) {\n      types: interfaceTypes {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateInterfaceTypes($input: [InterfaceTypeCreateInput!]!) {\n    types: createInterfaceTypes(input: $input) {\n      types: interfaceTypes {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateElementTypes($input: [ElementTypeCreateInput!]!) {\n    types: createElementTypes(input: $input) {\n      types: elementTypes {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateElementTypes($input: [ElementTypeCreateInput!]!) {\n    types: createElementTypes(input: $input) {\n      types: elementTypes {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateRenderPropTypes($input: [RenderPropTypeCreateInput!]!) {\n    types: createRenderPropTypes(input: $input) {\n      types: renderPropTypes {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateRenderPropTypes($input: [RenderPropTypeCreateInput!]!) {\n    types: createRenderPropTypes(input: $input) {\n      types: renderPropTypes {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateReactNodeTypes($input: [ReactNodeTypeCreateInput!]!) {\n    types: createReactNodeTypes(input: $input) {\n      types: reactNodeTypes {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateReactNodeTypes($input: [ReactNodeTypeCreateInput!]!) {\n    types: createReactNodeTypes(input: $input) {\n      types: reactNodeTypes {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateEnumTypes($input: [EnumTypeCreateInput!]!) {\n    types: createEnumTypes(input: $input) {\n      types: enumTypes {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateEnumTypes($input: [EnumTypeCreateInput!]!) {\n    types: createEnumTypes(input: $input) {\n      types: enumTypes {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateLambdaTypes($input: [LambdaTypeCreateInput!]!) {\n    types: createLambdaTypes(input: $input) {\n      types: lambdaTypes {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateLambdaTypes($input: [LambdaTypeCreateInput!]!) {\n    types: createLambdaTypes(input: $input) {\n      types: lambdaTypes {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePageTypes($input: [PageTypeCreateInput!]!) {\n    types: createPageTypes(input: $input) {\n      types: pageTypes {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePageTypes($input: [PageTypeCreateInput!]!) {\n    types: createPageTypes(input: $input) {\n      types: pageTypes {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateAppTypes($input: [AppTypeCreateInput!]!) {\n    types: createAppTypes(input: $input) {\n      types: appTypes {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateAppTypes($input: [AppTypeCreateInput!]!) {\n    types: createAppTypes(input: $input) {\n      types: appTypes {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateRichTextTypes($input: [RichTextTypeCreateInput!]!) {\n    types: createRichTextTypes(input: $input) {\n      types: richTextTypes {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateRichTextTypes($input: [RichTextTypeCreateInput!]!) {\n    types: createRichTextTypes(input: $input) {\n      types: richTextTypes {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateActionTypes($input: [ActionTypeCreateInput!]!) {\n    types: createActionTypes(input: $input) {\n      types: actionTypes {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateActionTypes($input: [ActionTypeCreateInput!]!) {\n    types: createActionTypes(input: $input) {\n      types: actionTypes {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateCodeMirrorTypes($input: [CodeMirrorTypeCreateInput!]!) {\n    types: createCodeMirrorTypes(input: $input) {\n      types: codeMirrorTypes {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCodeMirrorTypes($input: [CodeMirrorTypeCreateInput!]!) {\n    types: createCodeMirrorTypes(input: $input) {\n      types: codeMirrorTypes {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeletePrimitiveTypes(\n    $delete: PrimitiveTypeDeleteInput\n    $where: PrimitiveTypeWhere\n  ) {\n    deletePrimitiveTypes(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n"): (typeof documents)["\n  mutation DeletePrimitiveTypes(\n    $delete: PrimitiveTypeDeleteInput\n    $where: PrimitiveTypeWhere\n  ) {\n    deletePrimitiveTypes(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteArrayTypes(\n    $delete: ArrayTypeDeleteInput\n    $where: ArrayTypeWhere\n  ) {\n    deleteArrayTypes(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteArrayTypes(\n    $delete: ArrayTypeDeleteInput\n    $where: ArrayTypeWhere\n  ) {\n    deleteArrayTypes(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteReactNodeTypes(\n    $delete: ReactNodeTypeDeleteInput\n    $where: ReactNodeTypeWhere\n  ) {\n    deleteReactNodeTypes(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteReactNodeTypes(\n    $delete: ReactNodeTypeDeleteInput\n    $where: ReactNodeTypeWhere\n  ) {\n    deleteReactNodeTypes(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteUnionTypes(\n    $delete: UnionTypeDeleteInput\n    $where: UnionTypeWhere\n  ) {\n    deleteUnionTypes(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteUnionTypes(\n    $delete: UnionTypeDeleteInput\n    $where: UnionTypeWhere\n  ) {\n    deleteUnionTypes(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteInterfaceTypes(\n    $delete: InterfaceTypeDeleteInput\n    $where: InterfaceTypeWhere\n  ) {\n    deleteInterfaceTypes(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteInterfaceTypes(\n    $delete: InterfaceTypeDeleteInput\n    $where: InterfaceTypeWhere\n  ) {\n    deleteInterfaceTypes(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteElementTypes(\n    $delete: ElementTypeDeleteInput\n    $where: ElementTypeWhere\n  ) {\n    deleteElementTypes(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteElementTypes(\n    $delete: ElementTypeDeleteInput\n    $where: ElementTypeWhere\n  ) {\n    deleteElementTypes(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteRenderPropTypes(\n    $delete: RenderPropTypeDeleteInput\n    $where: RenderPropTypeWhere\n  ) {\n    deleteRenderPropTypes(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteRenderPropTypes(\n    $delete: RenderPropTypeDeleteInput\n    $where: RenderPropTypeWhere\n  ) {\n    deleteRenderPropTypes(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteRichTextTypes(\n    $delete: RichTextTypeDeleteInput\n    $where: RichTextTypeWhere\n  ) {\n    deleteRichTextTypes(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteRichTextTypes(\n    $delete: RichTextTypeDeleteInput\n    $where: RichTextTypeWhere\n  ) {\n    deleteRichTextTypes(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteEnumTypes(\n    $delete: EnumTypeDeleteInput\n    $where: EnumTypeWhere\n  ) {\n    deleteEnumTypes(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n    deleteEnumTypeValues(where: { enumTypeConnection: { node: $where } }) {\n      nodesDeleted\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteEnumTypes(\n    $delete: EnumTypeDeleteInput\n    $where: EnumTypeWhere\n  ) {\n    deleteEnumTypes(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n    deleteEnumTypeValues(where: { enumTypeConnection: { node: $where } }) {\n      nodesDeleted\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteLambdaTypes(\n    $delete: LambdaTypeDeleteInput\n    $where: LambdaTypeWhere\n  ) {\n    deleteLambdaTypes(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteLambdaTypes(\n    $delete: LambdaTypeDeleteInput\n    $where: LambdaTypeWhere\n  ) {\n    deleteLambdaTypes(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeletePageTypes(\n    $delete: PageTypeDeleteInput\n    $where: PageTypeWhere\n  ) {\n    deletePageTypes(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n"): (typeof documents)["\n  mutation DeletePageTypes(\n    $delete: PageTypeDeleteInput\n    $where: PageTypeWhere\n  ) {\n    deletePageTypes(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteAppTypes($delete: AppTypeDeleteInput, $where: AppTypeWhere) {\n    deleteAppTypes(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteAppTypes($delete: AppTypeDeleteInput, $where: AppTypeWhere) {\n    deleteAppTypes(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteActionTypes(\n    $delete: ActionTypeDeleteInput\n    $where: ActionTypeWhere\n  ) {\n    deleteActionTypes(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteActionTypes(\n    $delete: ActionTypeDeleteInput\n    $where: ActionTypeWhere\n  ) {\n    deleteActionTypes(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteCodeMirrorTypes(\n    $delete: CodeMirrorTypeDeleteInput\n    $where: CodeMirrorTypeWhere\n  ) {\n    deleteCodeMirrorTypes(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteCodeMirrorTypes(\n    $delete: CodeMirrorTypeDeleteInput\n    $where: CodeMirrorTypeWhere\n  ) {\n    deleteCodeMirrorTypes(delete: $delete, where: $where) {\n      nodesDeleted\n      relationshipsDeleted\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBaseTypes($where: IBaseTypeWhere, $options: IBaseTypeOptions) {\n    iBaseTypes(where: $where, options: $options) {\n      ...BaseType\n    }\n    aggregate: iBaseTypesAggregate(where: $where) {\n      count\n    }\n  }\n"): (typeof documents)["\n  query GetBaseTypes($where: IBaseTypeWhere, $options: IBaseTypeOptions) {\n    iBaseTypes(where: $where, options: $options) {\n      ...BaseType\n    }\n    aggregate: iBaseTypesAggregate(where: $where) {\n      count\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTypes($ids: [ID!]) {\n    actionTypes(where: { id_IN: $ids }) {\n      ...Type\n    }\n    appTypes(where: { id_IN: $ids }) {\n      ...Type\n    }\n    arrayTypes(where: { id_IN: $ids }) {\n      ...Type\n    }\n    codeMirrorTypes(where: { id_IN: $ids }) {\n      ...Type\n    }\n    elementTypes(where: { id_IN: $ids }) {\n      ...Type\n    }\n    enumTypes(where: { id_IN: $ids }) {\n      ...Type\n    }\n    interfaceTypes(where: { id_IN: $ids }) {\n      ...Type\n    }\n    lambdaTypes(where: { id_IN: $ids }) {\n      ...Type\n    }\n    pageTypes(where: { id_IN: $ids }) {\n      ...Type\n    }\n    primitiveTypes(where: { id_IN: $ids }) {\n      ...Type\n    }\n    reactNodeTypes(where: { id_IN: $ids }) {\n      ...Type\n    }\n    renderPropTypes(where: { id_IN: $ids }) {\n      ...Type\n    }\n    richTextTypes(where: { id_IN: $ids }) {\n      ...Type\n    }\n    unionTypes(where: { id_IN: $ids }) {\n      ...Type\n    }\n  }\n"): (typeof documents)["\n  query GetTypes($ids: [ID!]) {\n    actionTypes(where: { id_IN: $ids }) {\n      ...Type\n    }\n    appTypes(where: { id_IN: $ids }) {\n      ...Type\n    }\n    arrayTypes(where: { id_IN: $ids }) {\n      ...Type\n    }\n    codeMirrorTypes(where: { id_IN: $ids }) {\n      ...Type\n    }\n    elementTypes(where: { id_IN: $ids }) {\n      ...Type\n    }\n    enumTypes(where: { id_IN: $ids }) {\n      ...Type\n    }\n    interfaceTypes(where: { id_IN: $ids }) {\n      ...Type\n    }\n    lambdaTypes(where: { id_IN: $ids }) {\n      ...Type\n    }\n    pageTypes(where: { id_IN: $ids }) {\n      ...Type\n    }\n    primitiveTypes(where: { id_IN: $ids }) {\n      ...Type\n    }\n    reactNodeTypes(where: { id_IN: $ids }) {\n      ...Type\n    }\n    renderPropTypes(where: { id_IN: $ids }) {\n      ...Type\n    }\n    richTextTypes(where: { id_IN: $ids }) {\n      ...Type\n    }\n    unionTypes(where: { id_IN: $ids }) {\n      ...Type\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetDescendants($ids: [ID!]) {\n    arrayTypes(where: { id_IN: $ids }) {\n      descendantTypesIds\n    }\n    interfaceTypes(where: { id_IN: $ids }) {\n      descendantTypesIds\n    }\n    unionTypes(where: { id_IN: $ids }) {\n      descendantTypesIds\n    }\n  }\n"): (typeof documents)["\n  query GetDescendants($ids: [ID!]) {\n    arrayTypes(where: { id_IN: $ids }) {\n      descendantTypesIds\n    }\n    interfaceTypes(where: { id_IN: $ids }) {\n      descendantTypesIds\n    }\n    unionTypes(where: { id_IN: $ids }) {\n      descendantTypesIds\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPrimitiveTypes(\n    $options: PrimitiveTypeOptions\n    $where: PrimitiveTypeWhere\n  ) {\n    types: primitiveTypes(options: $options, where: $where) {\n      ...Type\n    }\n  }\n"): (typeof documents)["\n  query GetPrimitiveTypes(\n    $options: PrimitiveTypeOptions\n    $where: PrimitiveTypeWhere\n  ) {\n    types: primitiveTypes(options: $options, where: $where) {\n      ...Type\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetArrayTypes($options: ArrayTypeOptions, $where: ArrayTypeWhere) {\n    types: arrayTypes(options: $options, where: $where) {\n      ...Type\n    }\n  }\n"): (typeof documents)["\n  query GetArrayTypes($options: ArrayTypeOptions, $where: ArrayTypeWhere) {\n    types: arrayTypes(options: $options, where: $where) {\n      ...Type\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUnionTypes($options: UnionTypeOptions, $where: UnionTypeWhere) {\n    types: unionTypes(options: $options, where: $where) {\n      ...Type\n    }\n  }\n"): (typeof documents)["\n  query GetUnionTypes($options: UnionTypeOptions, $where: UnionTypeWhere) {\n    types: unionTypes(options: $options, where: $where) {\n      ...Type\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetInterfaceTypes(\n    $options: InterfaceTypeOptions\n    $where: InterfaceTypeWhere\n  ) {\n    types: interfaceTypes(options: $options, where: $where) {\n      ...Type\n    }\n  }\n"): (typeof documents)["\n  query GetInterfaceTypes(\n    $options: InterfaceTypeOptions\n    $where: InterfaceTypeWhere\n  ) {\n    types: interfaceTypes(options: $options, where: $where) {\n      ...Type\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetElementTypes(\n    $options: ElementTypeOptions\n    $where: ElementTypeWhere\n  ) {\n    types: elementTypes(options: $options, where: $where) {\n      ...Type\n    }\n  }\n"): (typeof documents)["\n  query GetElementTypes(\n    $options: ElementTypeOptions\n    $where: ElementTypeWhere\n  ) {\n    types: elementTypes(options: $options, where: $where) {\n      ...Type\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetRenderPropTypes(\n    $options: RenderPropTypeOptions\n    $where: RenderPropTypeWhere\n  ) {\n    types: renderPropTypes(options: $options, where: $where) {\n      ...Type\n    }\n  }\n"): (typeof documents)["\n  query GetRenderPropTypes(\n    $options: RenderPropTypeOptions\n    $where: RenderPropTypeWhere\n  ) {\n    types: renderPropTypes(options: $options, where: $where) {\n      ...Type\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetReactNodeTypes(\n    $options: ReactNodeTypeOptions\n    $where: ReactNodeTypeWhere\n  ) {\n    types: reactNodeTypes(options: $options, where: $where) {\n      ...ReactNodeType\n    }\n  }\n"): (typeof documents)["\n  query GetReactNodeTypes(\n    $options: ReactNodeTypeOptions\n    $where: ReactNodeTypeWhere\n  ) {\n    types: reactNodeTypes(options: $options, where: $where) {\n      ...ReactNodeType\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetRichTextTypes(\n    $options: RichTextTypeOptions\n    $where: RichTextTypeWhere\n  ) {\n    types: richTextTypes(options: $options, where: $where) {\n      ...RichTextType\n    }\n  }\n"): (typeof documents)["\n  query GetRichTextTypes(\n    $options: RichTextTypeOptions\n    $where: RichTextTypeWhere\n  ) {\n    types: richTextTypes(options: $options, where: $where) {\n      ...RichTextType\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetEnumTypes($options: EnumTypeOptions, $where: EnumTypeWhere) {\n    types: enumTypes(options: $options, where: $where) {\n      ...Type\n    }\n  }\n"): (typeof documents)["\n  query GetEnumTypes($options: EnumTypeOptions, $where: EnumTypeWhere) {\n    types: enumTypes(options: $options, where: $where) {\n      ...Type\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetLambdaTypes($options: LambdaTypeOptions, $where: LambdaTypeWhere) {\n    types: lambdaTypes(options: $options, where: $where) {\n      ...Type\n    }\n  }\n"): (typeof documents)["\n  query GetLambdaTypes($options: LambdaTypeOptions, $where: LambdaTypeWhere) {\n    types: lambdaTypes(options: $options, where: $where) {\n      ...Type\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPageTypes($options: PageTypeOptions, $where: PageTypeWhere) {\n    types: pageTypes(options: $options, where: $where) {\n      ...Type\n    }\n  }\n"): (typeof documents)["\n  query GetPageTypes($options: PageTypeOptions, $where: PageTypeWhere) {\n    types: pageTypes(options: $options, where: $where) {\n      ...Type\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAppTypes($options: AppTypeOptions, $where: AppTypeWhere) {\n    types: appTypes(options: $options, where: $where) {\n      ...Type\n    }\n  }\n"): (typeof documents)["\n  query GetAppTypes($options: AppTypeOptions, $where: AppTypeWhere) {\n    types: appTypes(options: $options, where: $where) {\n      ...Type\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetActionTypes($options: ActionTypeOptions, $where: ActionTypeWhere) {\n    types: actionTypes(options: $options, where: $where) {\n      ...Type\n    }\n  }\n"): (typeof documents)["\n  query GetActionTypes($options: ActionTypeOptions, $where: ActionTypeWhere) {\n    types: actionTypes(options: $options, where: $where) {\n      ...Type\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCodeMirrorTypes(\n    $options: CodeMirrorTypeOptions\n    $where: CodeMirrorTypeWhere\n  ) {\n    types: codeMirrorTypes(options: $options, where: $where) {\n      ...Type\n    }\n  }\n"): (typeof documents)["\n  query GetCodeMirrorTypes(\n    $options: CodeMirrorTypeOptions\n    $where: CodeMirrorTypeWhere\n  ) {\n    types: codeMirrorTypes(options: $options, where: $where) {\n      ...Type\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query InterfaceForm_GetApps($options: AppOptions, $where: AppWhere) {\n    apps(options: $options, where: $where) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query InterfaceForm_GetApps($options: AppOptions, $where: AppWhere) {\n    apps(options: $options, where: $where) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query InterfaceForm_GetAtoms($options: AtomOptions, $where: AtomWhere) {\n    atoms(options: $options, where: $where) {\n      id\n      name\n      type\n    }\n  }\n"): (typeof documents)["\n  query InterfaceForm_GetAtoms($options: AtomOptions, $where: AtomWhere) {\n    atoms(options: $options, where: $where) {\n      id\n      name\n      type\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query InterfaceForm_GetActions($appId: ID) {\n    apiActions {\n      id\n      name\n    }\n    codeActions {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query InterfaceForm_GetActions($appId: ID) {\n    apiActions {\n      id\n      name\n    }\n    codeActions {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query InterfaceForm_GetStores($options: StoreOptions, $where: StoreWhere) {\n    stores(options: $options, where: $where) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query InterfaceForm_GetStores($options: StoreOptions, $where: StoreWhere) {\n    stores(options: $options, where: $where) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query InterfaceForm_GetResource(\n    $options: ResourceOptions\n    $where: ResourceWhere\n  ) {\n    resources(options: $options, where: $where) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query InterfaceForm_GetResource(\n    $options: ResourceOptions\n    $where: ResourceWhere\n  ) {\n    resources(options: $options, where: $where) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query InterfaceForm_GetPages($options: PageOptions, $where: PageWhere) {\n    pages(options: $options, where: $where) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query InterfaceForm_GetPages($options: PageOptions, $where: PageWhere) {\n    pages(options: $options, where: $where) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query IsTypeDescendantOf($descendantTypeId: ID!, $parentTypeId: ID!) {\n    isTypeDescendantOf(\n      descendantTypeId: $descendantTypeId\n      parentTypeId: $parentTypeId\n    )\n  }\n"): (typeof documents)["\n  query IsTypeDescendantOf($descendantTypeId: ID!, $parentTypeId: ID!) {\n    isTypeDescendantOf(\n      descendantTypeId: $descendantTypeId\n      parentTypeId: $parentTypeId\n    )\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTypeReferences($typeId: ID!) {\n    getTypeReferences(typeId: $typeId) {\n      label\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetTypeReferences($typeId: ID!) {\n    getTypeReferences(typeId: $typeId) {\n      label\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdatePrimitiveTypes(\n    $update: PrimitiveTypeUpdateInput\n    $where: PrimitiveTypeWhere\n  ) {\n    types: updatePrimitiveTypes(update: $update, where: $where) {\n      types: primitiveTypes {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdatePrimitiveTypes(\n    $update: PrimitiveTypeUpdateInput\n    $where: PrimitiveTypeWhere\n  ) {\n    types: updatePrimitiveTypes(update: $update, where: $where) {\n      types: primitiveTypes {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateArrayTypes(\n    $update: ArrayTypeUpdateInput\n    $where: ArrayTypeWhere\n  ) {\n    types: updateArrayTypes(update: $update, where: $where) {\n      types: arrayTypes {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateArrayTypes(\n    $update: ArrayTypeUpdateInput\n    $where: ArrayTypeWhere\n  ) {\n    types: updateArrayTypes(update: $update, where: $where) {\n      types: arrayTypes {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateUnionTypes(\n    $update: UnionTypeUpdateInput\n    $where: UnionTypeWhere\n  ) {\n    types: updateUnionTypes(update: $update, where: $where) {\n      types: unionTypes {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUnionTypes(\n    $update: UnionTypeUpdateInput\n    $where: UnionTypeWhere\n  ) {\n    types: updateUnionTypes(update: $update, where: $where) {\n      types: unionTypes {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateInterfaceTypes(\n    $update: InterfaceTypeUpdateInput\n    $where: InterfaceTypeWhere\n  ) {\n    types: updateInterfaceTypes(update: $update, where: $where) {\n      types: interfaceTypes {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateInterfaceTypes(\n    $update: InterfaceTypeUpdateInput\n    $where: InterfaceTypeWhere\n  ) {\n    types: updateInterfaceTypes(update: $update, where: $where) {\n      types: interfaceTypes {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateReactNodeTypes(\n    $update: ReactNodeTypeUpdateInput\n    $where: ReactNodeTypeWhere\n  ) {\n    types: updateReactNodeTypes(update: $update, where: $where) {\n      types: reactNodeTypes {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateReactNodeTypes(\n    $update: ReactNodeTypeUpdateInput\n    $where: ReactNodeTypeWhere\n  ) {\n    types: updateReactNodeTypes(update: $update, where: $where) {\n      types: reactNodeTypes {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateElementTypes(\n    $update: ElementTypeUpdateInput\n    $where: ElementTypeWhere\n  ) {\n    types: updateElementTypes(update: $update, where: $where) {\n      types: elementTypes {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateElementTypes(\n    $update: ElementTypeUpdateInput\n    $where: ElementTypeWhere\n  ) {\n    types: updateElementTypes(update: $update, where: $where) {\n      types: elementTypes {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateRenderPropTypes(\n    $update: RenderPropTypeUpdateInput\n    $where: RenderPropTypeWhere\n  ) {\n    types: updateRenderPropTypes(update: $update, where: $where) {\n      types: renderPropTypes {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateRenderPropTypes(\n    $update: RenderPropTypeUpdateInput\n    $where: RenderPropTypeWhere\n  ) {\n    types: updateRenderPropTypes(update: $update, where: $where) {\n      types: renderPropTypes {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateEnumTypes(\n    $update: EnumTypeUpdateInput\n    $where: EnumTypeWhere\n  ) {\n    types: updateEnumTypes(update: $update, where: $where) {\n      types: enumTypes {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateEnumTypes(\n    $update: EnumTypeUpdateInput\n    $where: EnumTypeWhere\n  ) {\n    types: updateEnumTypes(update: $update, where: $where) {\n      types: enumTypes {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateLambdaTypes(\n    $update: LambdaTypeUpdateInput\n    $where: LambdaTypeWhere\n  ) {\n    types: updateLambdaTypes(update: $update, where: $where) {\n      types: lambdaTypes {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateLambdaTypes(\n    $update: LambdaTypeUpdateInput\n    $where: LambdaTypeWhere\n  ) {\n    types: updateLambdaTypes(update: $update, where: $where) {\n      types: lambdaTypes {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdatePageTypes(\n    $update: PageTypeUpdateInput\n    $where: PageTypeWhere\n  ) {\n    types: updatePageTypes(update: $update, where: $where) {\n      types: pageTypes {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdatePageTypes(\n    $update: PageTypeUpdateInput\n    $where: PageTypeWhere\n  ) {\n    types: updatePageTypes(update: $update, where: $where) {\n      types: pageTypes {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateAppTypes($update: AppTypeUpdateInput, $where: AppTypeWhere) {\n    types: updateAppTypes(update: $update, where: $where) {\n      types: appTypes {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateAppTypes($update: AppTypeUpdateInput, $where: AppTypeWhere) {\n    types: updateAppTypes(update: $update, where: $where) {\n      types: appTypes {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateRichTextTypes(\n    $update: RichTextTypeUpdateInput\n    $where: RichTextTypeWhere\n  ) {\n    types: updateRichTextTypes(update: $update, where: $where) {\n      types: richTextTypes {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateRichTextTypes(\n    $update: RichTextTypeUpdateInput\n    $where: RichTextTypeWhere\n  ) {\n    types: updateRichTextTypes(update: $update, where: $where) {\n      types: richTextTypes {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateActionTypes(\n    $update: ActionTypeUpdateInput\n    $where: ActionTypeWhere\n  ) {\n    types: updateActionTypes(update: $update, where: $where) {\n      types: actionTypes {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateActionTypes(\n    $update: ActionTypeUpdateInput\n    $where: ActionTypeWhere\n  ) {\n    types: updateActionTypes(update: $update, where: $where) {\n      types: actionTypes {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateCodeMirrorTypes(\n    $update: CodeMirrorTypeUpdateInput\n    $where: CodeMirrorTypeWhere\n  ) {\n    types: updateCodeMirrorTypes(update: $update, where: $where) {\n      types: codeMirrorTypes {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateCodeMirrorTypes(\n    $update: CodeMirrorTypeUpdateInput\n    $where: CodeMirrorTypeWhere\n  ) {\n    types: updateCodeMirrorTypes(update: $update, where: $where) {\n      types: codeMirrorTypes {\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUsers($where: UserWhere) {\n    aggregate: usersAggregate(where: $where) {\n      count\n    }\n    items: users(where: $where) {\n      ...User\n    }\n  }\n"): (typeof documents)["\n  query GetUsers($where: UserWhere) {\n    aggregate: usersAggregate(where: $where) {\n      count\n    }\n    items: users(where: $where) {\n      ...User\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateUser($input: [UserCreateInput!]!) {\n    createUsers(input: $input) {\n      users {\n        email\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser($input: [UserCreateInput!]!) {\n    createUsers(input: $input) {\n      users {\n        email\n        __typename\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteUsers($where: UserWhere!) {\n    deleteUsers(where: $where) {\n      nodesDeleted\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteUsers($where: UserWhere!) {\n    deleteUsers(where: $where) {\n      nodesDeleted\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateUsers($where: UserWhere!, $update: UserUpdateInput!) {\n    updateUsers(update: $update, where: $where) {\n      users {\n        __typename\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUsers($where: UserWhere!, $update: UserUpdateInput!) {\n    updateUsers(update: $update, where: $where) {\n      users {\n        __typename\n        id\n      }\n    }\n  }\n"];


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
