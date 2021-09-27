export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Void: void;
};

/** Provide exactly one of the config fields */
export type AddHookToElementInput = {
  elementId: Scalars['String'];
  graphqlMutationHook?: Maybe<GraphqlHookConfigInput>;
  graphqlQueryHook?: Maybe<GraphqlHookConfigInput>;
  queryHook?: Maybe<QueryHookConfigInput>;
  queryPageHook?: Maybe<QueryPageHookConfigInput>;
  queryPagesHook?: Maybe<QueryPagesHookConfigInput>;
  recoilStateHook?: Maybe<RecoilStateHookConfigInput>;
};

export type App = {
  __typename?: 'App';
  id: Scalars['ID'];
  name: Scalars['String'];
  ownerId: Scalars['String'];
  pages: Array<Page>;
};

export type AppByIdFilter = {
  appId: Scalars['String'];
};

export type AppByPageFilter = {
  pageId: Scalars['String'];
};

export type ArrayType = Type & {
  __typename?: 'ArrayType';
  id: Scalars['ID'];
  name: Scalars['String'];
  typeGraph: TypeGraph;
  typeKind: TypeKind;
};

export type Atom = {
  __typename?: 'Atom';
  api: InterfaceType;
  id: Scalars['ID'];
  /** This is a unique ID suitable for seeders to lookup, will rename to value */
  name: Scalars['String'];
  type: AtomType;
};

export enum AtomType {
  AntDesignAffix = 'AntDesignAffix',
  AntDesignAlert = 'AntDesignAlert',
  AntDesignAnchor = 'AntDesignAnchor',
  AntDesignAnchorLink = 'AntDesignAnchorLink',
  AntDesignAutoComplete = 'AntDesignAutoComplete',
  AntDesignAvatar = 'AntDesignAvatar',
  AntDesignBackTop = 'AntDesignBackTop',
  AntDesignBadge = 'AntDesignBadge',
  AntDesignBreadcrumb = 'AntDesignBreadcrumb',
  AntDesignBreadcrumbItem = 'AntDesignBreadcrumbItem',
  AntDesignButton = 'AntDesignButton',
  AntDesignCalendar = 'AntDesignCalendar',
  AntDesignCard = 'AntDesignCard',
  AntDesignCardGrid = 'AntDesignCardGrid',
  AntDesignCardMeta = 'AntDesignCardMeta',
  AntDesignCarousel = 'AntDesignCarousel',
  AntDesignCascader = 'AntDesignCascader',
  AntDesignCheckbox = 'AntDesignCheckbox',
  AntDesignCollapse = 'AntDesignCollapse',
  AntDesignCollapsePanel = 'AntDesignCollapsePanel',
  AntDesignComment = 'AntDesignComment',
  AntDesignConfigProvider = 'AntDesignConfigProvider',
  AntDesignDatePicker = 'AntDesignDatePicker',
  AntDesignDescriptions = 'AntDesignDescriptions',
  AntDesignDescriptionsItem = 'AntDesignDescriptionsItem',
  AntDesignDivider = 'AntDesignDivider',
  AntDesignDrawer = 'AntDesignDrawer',
  AntDesignDropdown = 'AntDesignDropdown',
  AntDesignEmpty = 'AntDesignEmpty',
  AntDesignForm = 'AntDesignForm',
  AntDesignFormItem = 'AntDesignFormItem',
  AntDesignFormItemHook = 'AntDesignFormItemHook',
  AntDesignFormList = 'AntDesignFormList',
  AntDesignGridCol = 'AntDesignGridCol',
  AntDesignGridRow = 'AntDesignGridRow',
  AntDesignIcon = 'AntDesignIcon',
  AntDesignImage = 'AntDesignImage',
  AntDesignInput = 'AntDesignInput',
  AntDesignInputNumber = 'AntDesignInputNumber',
  AntDesignLayout = 'AntDesignLayout',
  AntDesignLayoutContent = 'AntDesignLayoutContent',
  AntDesignLayoutFooter = 'AntDesignLayoutFooter',
  AntDesignLayoutHeader = 'AntDesignLayoutHeader',
  AntDesignLayoutSider = 'AntDesignLayoutSider',
  AntDesignList = 'AntDesignList',
  AntDesignListItem = 'AntDesignListItem',
  AntDesignListItemMeta = 'AntDesignListItemMeta',
  AntDesignMapper = 'AntDesignMapper',
  AntDesignMentions = 'AntDesignMentions',
  AntDesignMentionsOption = 'AntDesignMentionsOption',
  AntDesignMenu = 'AntDesignMenu',
  AntDesignMenuItem = 'AntDesignMenuItem',
  AntDesignMenuItemGroup = 'AntDesignMenuItemGroup',
  AntDesignMenuSubMenu = 'AntDesignMenuSubMenu',
  AntDesignModal = 'AntDesignModal',
  AntDesignPageContainer = 'AntDesignPageContainer',
  AntDesignPageHeader = 'AntDesignPageHeader',
  AntDesignPagination = 'AntDesignPagination',
  AntDesignPopconfirm = 'AntDesignPopconfirm',
  AntDesignPopover = 'AntDesignPopover',
  AntDesignProgress = 'AntDesignProgress',
  AntDesignProvider = 'AntDesignProvider',
  AntDesignRadio = 'AntDesignRadio',
  AntDesignRadioGroup = 'AntDesignRadioGroup',
  AntDesignRate = 'AntDesignRate',
  AntDesignRenderComponent = 'AntDesignRenderComponent',
  AntDesignRenderContainer = 'AntDesignRenderContainer',
  AntDesignResult = 'AntDesignResult',
  AntDesignRglContainer = 'AntDesignRglContainer',
  AntDesignRglItem = 'AntDesignRglItem',
  AntDesignRglResponsiveContainer = 'AntDesignRglResponsiveContainer',
  AntDesignSelect = 'AntDesignSelect',
  AntDesignSelectOption = 'AntDesignSelectOption',
  AntDesignSkeleton = 'AntDesignSkeleton',
  AntDesignSlider = 'AntDesignSlider',
  AntDesignSpace = 'AntDesignSpace',
  AntDesignSpin = 'AntDesignSpin',
  AntDesignStatistic = 'AntDesignStatistic',
  AntDesignSteps = 'AntDesignSteps',
  AntDesignStepsStep = 'AntDesignStepsStep',
  AntDesignSwitch = 'AntDesignSwitch',
  AntDesignTable = 'AntDesignTable',
  AntDesignTabs = 'AntDesignTabs',
  AntDesignTabsTabPane = 'AntDesignTabsTabPane',
  AntDesignTag = 'AntDesignTag',
  AntDesignTimePicker = 'AntDesignTimePicker',
  AntDesignTimeline = 'AntDesignTimeline',
  AntDesignTimelineItem = 'AntDesignTimelineItem',
  AntDesignTooltip = 'AntDesignTooltip',
  AntDesignTransfer = 'AntDesignTransfer',
  AntDesignTree = 'AntDesignTree',
  AntDesignTreeNode = 'AntDesignTreeNode',
  AntDesignTreeSelect = 'AntDesignTreeSelect',
  AntDesignTypography = 'AntDesignTypography',
  AntDesignTypographyParagraph = 'AntDesignTypographyParagraph',
  AntDesignTypographyText = 'AntDesignTypographyText',
  AntDesignTypographyTitle = 'AntDesignTypographyTitle',
  AntDesignUpload = 'AntDesignUpload',
  HtmlA = 'HtmlA',
  HtmlArea = 'HtmlArea',
  HtmlAside = 'HtmlAside',
  HtmlAudio = 'HtmlAudio',
  HtmlBase = 'HtmlBase',
  HtmlBr = 'HtmlBr',
  HtmlButton = 'HtmlButton',
  HtmlCanvas = 'HtmlCanvas',
  HtmlCode = 'HtmlCode',
  HtmlDList = 'HtmlDList',
  HtmlData = 'HtmlData',
  HtmlDatalist = 'HtmlDatalist',
  HtmlDetails = 'HtmlDetails',
  HtmlDialog = 'HtmlDialog',
  HtmlDiv = 'HtmlDiv',
  HtmlEm = 'HtmlEm',
  HtmlEmbed = 'HtmlEmbed',
  HtmlFieldset = 'HtmlFieldset',
  HtmlFont = 'HtmlFont',
  HtmlFooter = 'HtmlFooter',
  HtmlForm = 'HtmlForm',
  HtmlFrame = 'HtmlFrame',
  HtmlFrameset = 'HtmlFrameset',
  HtmlH1 = 'HtmlH1',
  HtmlH2 = 'HtmlH2',
  HtmlH3 = 'HtmlH3',
  HtmlH4 = 'HtmlH4',
  HtmlH5 = 'HtmlH5',
  HtmlH6 = 'HtmlH6',
  HtmlHead = 'HtmlHead',
  HtmlHeader = 'HtmlHeader',
  HtmlHr = 'HtmlHr',
  HtmlI = 'HtmlI',
  HtmlIframe = 'HtmlIframe',
  HtmlImage = 'HtmlImage',
  HtmlInput = 'HtmlInput',
  HtmlLabel = 'HtmlLabel',
  HtmlLegend = 'HtmlLegend',
  HtmlLi = 'HtmlLi',
  HtmlLink = 'HtmlLink',
  HtmlMain = 'HtmlMain',
  HtmlMap = 'HtmlMap',
  HtmlMeta = 'HtmlMeta',
  HtmlMeter = 'HtmlMeter',
  HtmlNav = 'HtmlNav',
  HtmlOList = 'HtmlOList',
  HtmlObject = 'HtmlObject',
  HtmlOptgroup = 'HtmlOptgroup',
  HtmlOption = 'HtmlOption',
  HtmlOutput = 'HtmlOutput',
  HtmlP = 'HtmlP',
  HtmlParam = 'HtmlParam',
  HtmlPicture = 'HtmlPicture',
  HtmlPre = 'HtmlPre',
  HtmlProgress = 'HtmlProgress',
  HtmlQuote = 'HtmlQuote',
  HtmlS = 'HtmlS',
  HtmlSection = 'HtmlSection',
  HtmlSelect = 'HtmlSelect',
  HtmlSmall = 'HtmlSmall',
  HtmlSource = 'HtmlSource',
  HtmlSpan = 'HtmlSpan',
  HtmlStrong = 'HtmlStrong',
  HtmlStyle = 'HtmlStyle',
  HtmlSub = 'HtmlSub',
  HtmlSup = 'HtmlSup',
  HtmlTable = 'HtmlTable',
  HtmlTableCaption = 'HtmlTableCaption',
  HtmlTableCell = 'HtmlTableCell',
  HtmlTableCol = 'HtmlTableCol',
  HtmlTableRow = 'HtmlTableRow',
  HtmlTemplate = 'HtmlTemplate',
  HtmlTextarea = 'HtmlTextarea',
  HtmlTime = 'HtmlTime',
  HtmlTitle = 'HtmlTitle',
  HtmlTrack = 'HtmlTrack',
  HtmlUList = 'HtmlUList',
  HtmlVideo = 'HtmlVideo',
  Query = 'Query',
  ReactFragment = 'ReactFragment',
  State = 'State',
  Text = 'Text',
  TextList = 'TextList'
}

export type AtomWhereUniqueInput = {
  element?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  type?: Maybe<AtomType>;
};

export type AtomsWhereInput = {
  ids?: Maybe<Array<Scalars['String']>>;
};

export type Component = {
  __typename?: 'Component';
  id: Scalars['ID'];
  name: Scalars['String'];
};

/** The ComponentType allows selecting a Component in the props form. The value is stored as the componentId  */
export type ComponentType = Type & {
  __typename?: 'ComponentType';
  id: Scalars['ID'];
  name: Scalars['String'];
  typeGraph: TypeGraph;
  typeKind: TypeKind;
};

export type CreateAppInput = {
  name: Scalars['String'];
};

export type CreateArrayTypeInput = {
  itemTypeId: Scalars['String'];
};

export type CreateAtomInput = {
  /** Pass in an existing interface ID to assign it to the atom */
  api?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  type: AtomType;
};

export type CreateComponentInput = {
  name: Scalars['String'];
};

export type CreateElementInput = {
  atomId?: Maybe<Scalars['String']>;
  componentId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  /** Leave it out to automatically set it as the last order of all the children */
  order?: Maybe<Scalars['Int']>;
  parentElementId?: Maybe<Scalars['String']>;
};

export type CreateElementTypeInput = {
  kind: ElementTypeKind;
};

export type CreateEnumTypeInput = {
  allowedValues: Array<CreateEnumTypeValueInput>;
};

export type CreateEnumTypeValueInput = {
  name?: Maybe<Scalars['String']>;
  value: Scalars['String'];
};

export type CreateFieldInput = {
  description?: Maybe<Scalars['String']>;
  /** The interface to add fields to */
  interfaceId: Scalars['String'];
  key: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  type: TypeRef;
};

export type CreateLambdaInput = {
  /** Content of the Lambda function */
  body: Scalars['String'];
  /** Name of the Lambda function to be executed */
  name: Scalars['String'];
};

export type CreatePageInput = {
  appId: Scalars['String'];
  name: Scalars['String'];
};

export type CreatePrimitiveTypeInput = {
  primitiveKind: PrimitiveKind;
};

export type CreatePropMapBindingInput = {
  elementId: Scalars['String'];
  /** The key of the prop, as received in the source element */
  sourceKey: Scalars['String'];
  /** The ID of the target element, if omitted, the current element will be the target */
  targetElementId?: Maybe<Scalars['String']>;
  /** The key of the prop, that the target Element will receive */
  targetKey: Scalars['String'];
};

export type CreateResponse = {
  __typename?: 'CreateResponse';
  id: Scalars['String'];
};

export type CreateTagInput = {
  name: Scalars['String'];
  /** Parent tag id, empty parent means it's root */
  parentTagId?: Maybe<Scalars['String']>;
};

/** Provide one of the properties */
export type CreateTypeInput = {
  arrayType?: Maybe<CreateArrayTypeInput>;
  componentType?: Maybe<Scalars['Boolean']>;
  elementType?: Maybe<CreateElementTypeInput>;
  enumType?: Maybe<CreateEnumTypeInput>;
  interfaceType?: Maybe<Scalars['Boolean']>;
  lambdaType?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  primitiveType?: Maybe<CreatePrimitiveTypeInput>;
  typeKind: TypeKind;
};

export type DeleteAppInput = {
  appId: Scalars['String'];
};

export type DeleteAtomInput = {
  atomId: Scalars['String'];
};

export type DeleteComponentInput = {
  componentId: Scalars['String'];
};

export type DeleteElementInput = {
  elementId: Scalars['String'];
};

export type DeleteFieldInput = {
  fieldId: Scalars['String'];
};

export type DeleteLambdaInput = {
  lambdaId: Scalars['String'];
};

export type DeletePageInput = {
  pageId: Scalars['String'];
};

export type DeletePropMapBindingInput = {
  propMapBindingIds: Array<Scalars['String']>;
};

export type DeleteTagsInput = {
  ids: Array<Scalars['String']>;
};

export type DeleteTypeInput = {
  typeId: Scalars['String'];
};

export type DeleteUserInput = {
  id: Scalars['String'];
};

export type Element = {
  __typename?: 'Element';
  atom?: Maybe<Atom>;
  css?: Maybe<Scalars['String']>;
  hooks: Array<Hook>;
  id: Scalars['ID'];
  /** Due to union nullability issue, we have to make this non-nullable. Defaults to atom type */
  name: Scalars['String'];
  propMapBindings: Array<PropMapBinding>;
  propTransformationJs?: Maybe<Scalars['String']>;
  /** Props in a json format */
  props: Scalars['String'];
  /** If set, the element will get rendered for each item in the array found in its props by the given key, if it exists */
  renderForEachPropKey?: Maybe<Scalars['String']>;
  /** If set, the element will get rendered only if the prop with the given key exists and is evaluated as truthy (exception - the string "false" will evaluate to falsy) */
  renderIfPropKey?: Maybe<Scalars['String']>;
};

/** An edge between two element nodes */
export type ElementEdge = {
  __typename?: 'ElementEdge';
  order?: Maybe<Scalars['Int']>;
  /** The id of the source Element/Component */
  source: Scalars['String'];
  /** The id of the target Element/Component */
  target: Scalars['String'];
};

export type ElementGraph = {
  __typename?: 'ElementGraph';
  /** All the links connecting the descendant elements/components */
  edges: Array<ElementEdge>;
  /** All descendant Elements or Components, at any level */
  vertices: Array<ElementVertex>;
};

/** The ElementType allows selecting an Element in the props form. The value is stored as the elementId  */
export type ElementType = Type & {
  __typename?: 'ElementType';
  id: Scalars['ID'];
  kind: ElementTypeKind;
  name: Scalars['String'];
  typeGraph: TypeGraph;
  typeKind: TypeKind;
};

export enum ElementTypeKind {
  AllElements = 'AllElements',
  ChildrenOnly = 'ChildrenOnly',
  DescendantsOnly = 'DescendantsOnly'
}

export type ElementVertex = Component | Element;

export type EnumType = Type & {
  __typename?: 'EnumType';
  allowedValues: Array<EnumTypeValue>;
  id: Scalars['ID'];
  name: Scalars['String'];
  typeGraph: TypeGraph;
  typeKind: TypeKind;
};

export type EnumTypeValue = {
  __typename?: 'EnumTypeValue';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  value: Scalars['String'];
};

export type ExecuteLambdaInput = {
  lambdaId: Scalars['String'];
  payload?: Maybe<Scalars['String']>;
};

export type Field = {
  __typename?: 'Field';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  key: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};

export type FieldByIdFilter = {
  fieldId: Scalars['String'];
};

export type FieldByInterfaceFilter = {
  fieldKey: Scalars['String'];
  interfaceId: Scalars['String'];
};

export type GetAppInput = {
  byId?: Maybe<AppByIdFilter>;
  byPage?: Maybe<AppByPageFilter>;
};

export type GetAtomInput = {
  where: AtomWhereUniqueInput;
};

export type GetAtomsInput = {
  where?: Maybe<AtomsWhereInput>;
};

export type GetComponentInput = {
  componentId: Scalars['String'];
};

export type GetComponentsInput = {
  componentIds?: Maybe<Array<Scalars['String']>>;
};

export type GetElementGraphInput = {
  elementId: Scalars['String'];
};

export type GetElementInput = {
  elementId: Scalars['String'];
};

export type GetFieldInput = {
  byId?: Maybe<FieldByIdFilter>;
  byInterface?: Maybe<FieldByInterfaceFilter>;
};

export type GetLambdaInput = {
  lambdaId: Scalars['String'];
};

export type GetPageInput = {
  pageId: Scalars['String'];
};

export type GetPagesInput = {
  byApp: PageByAppFilter;
};

export type GetTagGraphsInput = {
  where?: Maybe<TagsWhereInput>;
};

export type GetTagInput = {
  where: WhereUniqueTag;
};

export type GetTypeInput = {
  where: WhereUniqueType;
};

/** Filters are optional and you can provide all three of them together */
export type GetTypesInput = {
  byIds?: Maybe<TypesByIdsFilter>;
  byKind?: Maybe<TypesByKindFilter>;
  byName?: Maybe<TypesByNameFilter>;
};

export type GetUserInput = {
  auth0Id?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

export type GetUsersInput = {
  page: Scalars['Int'];
  perPage: Scalars['Int'];
  query: Scalars['String'];
  sort: Scalars['String'];
};

export type GraphqlHookConfig = {
  __typename?: 'GraphqlHookConfig';
  body: Scalars['String'];
  dataKey?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export type GraphqlHookConfigInput = {
  body: Scalars['String'];
  dataKey?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export type Hook = {
  __typename?: 'Hook';
  config: HookConfig;
  id: Scalars['ID'];
  type: HookType;
};

export type HookConfig = GraphqlHookConfig | QueryHookConfig | QueryPageHookConfig | QueryPagesHookConfig | RecoilStateHookConfig;

export enum HookType {
  GraphqlMutation = 'GraphqlMutation',
  GraphqlQuery = 'GraphqlQuery',
  Query = 'Query',
  QueryPage = 'QueryPage',
  QueryPages = 'QueryPages',
  RecoilState = 'RecoilState'
}

export type ImportAtomsInput = {
  payload: Scalars['String'];
};

export type ImportTagsInput = {
  payload: Scalars['String'];
};

export type InterfaceType = Type & {
  __typename?: 'InterfaceType';
  fields: Array<Field>;
  id: Scalars['ID'];
  name: Scalars['String'];
  typeGraph: TypeGraph;
  typeKind: TypeKind;
};

export type Lambda = {
  __typename?: 'Lambda';
  body: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  ownerId: Scalars['String'];
};

export type LambdaPayload = {
  __typename?: 'LambdaPayload';
  payload: Scalars['String'];
};

/** The LambdaType allows selecting a Lambda in the props form. The value is stored as the lambdaId  */
export type LambdaType = Type & {
  __typename?: 'LambdaType';
  id: Scalars['ID'];
  name: Scalars['String'];
  typeGraph: TypeGraph;
  typeKind: TypeKind;
};

export type MoveData = {
  order: Scalars['Int'];
  parentElementId: Scalars['String'];
};

export type MoveElementInput = {
  elementId: Scalars['String'];
  moveData: MoveData;
};

export type Mutation = {
  __typename?: 'Mutation';
  addHookToElement: CreateResponse;
  createApp: App;
  createAtom: CreateResponse;
  createComponent: CreateResponse;
  createElement: CreateResponse;
  createField: CreateResponse;
  createLambda: CreateResponse;
  createPage: Page;
  createPropMapBinding: CreateResponse;
  createTag: CreateResponse;
  createType: CreateResponse;
  deleteApp?: Maybe<App>;
  deleteAtom?: Maybe<Scalars['Void']>;
  deleteComponent?: Maybe<Scalars['Void']>;
  /** Deletes an element and all the descending elements */
  deleteElement?: Maybe<Scalars['Void']>;
  deleteField?: Maybe<Scalars['Void']>;
  deleteLambda?: Maybe<Scalars['Void']>;
  deletePage?: Maybe<Page>;
  deletePropMapBinding?: Maybe<Scalars['Void']>;
  deleteTags?: Maybe<Scalars['Void']>;
  deleteType?: Maybe<Scalars['Void']>;
  deleteUser: Scalars['Boolean'];
  executeLambda?: Maybe<LambdaPayload>;
  importAtoms?: Maybe<Scalars['Void']>;
  importTags?: Maybe<Scalars['Void']>;
  moveElement?: Maybe<Scalars['Void']>;
  removeHookFromElement?: Maybe<Scalars['Void']>;
  resetData?: Maybe<Scalars['Void']>;
  seedBaseTypes?: Maybe<Scalars['Void']>;
  updateApp?: Maybe<App>;
  updateAtom?: Maybe<Scalars['Void']>;
  updateComponent?: Maybe<Scalars['Void']>;
  updateElement?: Maybe<Scalars['Void']>;
  updateElementProps?: Maybe<Scalars['Void']>;
  updateEnumType?: Maybe<Scalars['Void']>;
  updateField?: Maybe<Scalars['Void']>;
  updateLambda?: Maybe<Scalars['Void']>;
  updatePage?: Maybe<Scalars['Void']>;
  updatePrimitiveType?: Maybe<Scalars['Void']>;
  updatePropMapBinding?: Maybe<Scalars['Void']>;
  updateTag?: Maybe<Scalars['Void']>;
  updateType?: Maybe<Scalars['Void']>;
  upsertTag: Scalars['Void'];
  upsertUser: CreateResponse;
};


export type MutationAddHookToElementArgs = {
  input: AddHookToElementInput;
};


export type MutationCreateAppArgs = {
  input: CreateAppInput;
};


export type MutationCreateAtomArgs = {
  input: CreateAtomInput;
};


export type MutationCreateComponentArgs = {
  input: CreateComponentInput;
};


export type MutationCreateElementArgs = {
  input: CreateElementInput;
};


export type MutationCreateFieldArgs = {
  input: CreateFieldInput;
};


export type MutationCreateLambdaArgs = {
  input: CreateLambdaInput;
};


export type MutationCreatePageArgs = {
  input: CreatePageInput;
};


export type MutationCreatePropMapBindingArgs = {
  input: CreatePropMapBindingInput;
};


export type MutationCreateTagArgs = {
  input: CreateTagInput;
};


export type MutationCreateTypeArgs = {
  input: CreateTypeInput;
};


export type MutationDeleteAppArgs = {
  input: DeleteAppInput;
};


export type MutationDeleteAtomArgs = {
  input: DeleteAtomInput;
};


export type MutationDeleteComponentArgs = {
  input: DeleteComponentInput;
};


export type MutationDeleteElementArgs = {
  input: DeleteElementInput;
};


export type MutationDeleteFieldArgs = {
  input: DeleteFieldInput;
};


export type MutationDeleteLambdaArgs = {
  input: DeleteLambdaInput;
};


export type MutationDeletePageArgs = {
  input: DeletePageInput;
};


export type MutationDeletePropMapBindingArgs = {
  input: DeletePropMapBindingInput;
};


export type MutationDeleteTagsArgs = {
  input: DeleteTagsInput;
};


export type MutationDeleteTypeArgs = {
  input: DeleteTypeInput;
};


export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


export type MutationExecuteLambdaArgs = {
  input: ExecuteLambdaInput;
};


export type MutationImportAtomsArgs = {
  input: ImportAtomsInput;
};


export type MutationImportTagsArgs = {
  input: ImportTagsInput;
};


export type MutationMoveElementArgs = {
  input: MoveElementInput;
};


export type MutationRemoveHookFromElementArgs = {
  input: RemoveHookFromElementInput;
};


export type MutationUpdateAppArgs = {
  input: UpdateAppInput;
};


export type MutationUpdateAtomArgs = {
  input: UpdateAtomInput;
};


export type MutationUpdateComponentArgs = {
  input: UpdateComponentInput;
};


export type MutationUpdateElementArgs = {
  input: UpdateElementInput;
};


export type MutationUpdateElementPropsArgs = {
  input: UpdateElementPropsInput;
};


export type MutationUpdateEnumTypeArgs = {
  input: UpdateEnumTypeInput;
};


export type MutationUpdateFieldArgs = {
  input: UpdateFieldInput;
};


export type MutationUpdateLambdaArgs = {
  input: UpdateLambdaInput;
};


export type MutationUpdatePageArgs = {
  input: UpdatePageInput;
};


export type MutationUpdatePrimitiveTypeArgs = {
  input: UpdatePrimitiveTypeInput;
};


export type MutationUpdatePropMapBindingArgs = {
  input: UpdatePropMapBindingInput;
};


export type MutationUpdateTagArgs = {
  input: UpdateTagInput;
};


export type MutationUpdateTypeArgs = {
  input: UpdateTypeInput;
};


export type MutationUpsertTagArgs = {
  input: UpsertTagInput;
};


export type MutationUpsertUserArgs = {
  input: UpsertUserInput;
};

export type Page = {
  __typename?: 'Page';
  elements?: Maybe<ElementGraph>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type PageByAppFilter = {
  appId: Scalars['String'];
};

export enum PersistenceType {
  LocalStorage = 'LocalStorage',
  NotPersisted = 'NotPersisted',
  SessionStorage = 'SessionStorage'
}

export enum PrimitiveKind {
  Boolean = 'Boolean',
  Float = 'Float',
  Integer = 'Integer',
  String = 'String'
}

export type PrimitiveType = Type & {
  __typename?: 'PrimitiveType';
  id: Scalars['ID'];
  name: Scalars['String'];
  primitiveKind: PrimitiveKind;
  typeGraph: TypeGraph;
  typeKind: TypeKind;
};

export type PropMapBinding = {
  __typename?: 'PropMapBinding';
  id: Scalars['ID'];
  /** The key of the prop, as received in the source element */
  sourceKey: Scalars['String'];
  /** The ID of the target element, if omitted, the current element will be the target */
  targetElementId?: Maybe<Scalars['String']>;
  /** The key of the prop, that the target Element will receive */
  targetKey: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getApp?: Maybe<App>;
  getApps: Array<App>;
  getAtom?: Maybe<Atom>;
  getAtoms?: Maybe<Array<Atom>>;
  getComponent?: Maybe<Component>;
  getComponentElements?: Maybe<ElementGraph>;
  getComponents: Array<Component>;
  /** Get a single element. */
  getElement?: Maybe<Element>;
  /** Aggregates the requested element and all of its descendant elements (infinitely deep) in the form of a flat array of Element and array of ElementEdge */
  getElementGraph?: Maybe<ElementGraph>;
  getField?: Maybe<Field>;
  getLambda?: Maybe<Lambda>;
  getLambdas: Array<Lambda>;
  getMe?: Maybe<User>;
  getPage?: Maybe<Page>;
  getPages: Array<Page>;
  getTag?: Maybe<Tag>;
  /** Aggregates the requested tags and all of its descendant tags (infinitely deep) in the form of a flat array of TagVertex (alias of Tag) and array of TagEdge */
  getTagGraph?: Maybe<TagGraph>;
  /** Aggregates the requested tags and all of its descendant tags (infinitely deep) in the form of a flat array of TagVertex (alias of Tag) and array of TagEdge */
  getTagGraphs: Array<TagGraph>;
  /** Get all Tag graphs */
  getTags: Array<Tag>;
  getType?: Maybe<Type>;
  getTypeGraph?: Maybe<TypeGraph>;
  getTypes: Array<Type>;
  getUser?: Maybe<User>;
  getUsers: Array<User>;
};


export type QueryGetAppArgs = {
  input: GetAppInput;
};


export type QueryGetAtomArgs = {
  input: GetAtomInput;
};


export type QueryGetAtomsArgs = {
  input?: Maybe<GetAtomsInput>;
};


export type QueryGetComponentArgs = {
  input: GetComponentInput;
};


export type QueryGetComponentElementsArgs = {
  input: GetComponentInput;
};


export type QueryGetComponentsArgs = {
  input?: Maybe<GetComponentsInput>;
};


export type QueryGetElementArgs = {
  input: GetElementInput;
};


export type QueryGetElementGraphArgs = {
  input: GetElementGraphInput;
};


export type QueryGetFieldArgs = {
  input: GetFieldInput;
};


export type QueryGetLambdaArgs = {
  input: GetLambdaInput;
};


export type QueryGetPageArgs = {
  input: GetPageInput;
};


export type QueryGetPagesArgs = {
  input: GetPagesInput;
};


export type QueryGetTagArgs = {
  input: GetTagInput;
};


export type QueryGetTagGraphsArgs = {
  input?: Maybe<GetTagGraphsInput>;
};


export type QueryGetTypeArgs = {
  input: GetTypeInput;
};


export type QueryGetTypeGraphArgs = {
  input: GetTypeInput;
};


export type QueryGetTypesArgs = {
  input?: Maybe<GetTypesInput>;
};


export type QueryGetUserArgs = {
  input: GetUserInput;
};


export type QueryGetUsersArgs = {
  input?: Maybe<GetUsersInput>;
};

export type QueryHookConfig = {
  __typename?: 'QueryHookConfig';
  body?: Maybe<Scalars['String']>;
  lambdaId?: Maybe<Scalars['String']>;
  method?: Maybe<QueryMethod>;
  queryKey: Scalars['String'];
  url?: Maybe<Scalars['String']>;
};

/** Provide either a lambdaId, or body/method/url */
export type QueryHookConfigInput = {
  body?: Maybe<Scalars['String']>;
  lambdaId?: Maybe<Scalars['String']>;
  method?: Maybe<QueryMethod>;
  queryKey: Scalars['String'];
  url?: Maybe<Scalars['String']>;
};

export enum QueryMethod {
  Delete = 'DELETE',
  Get = 'GET',
  Head = 'HEAD',
  Link = 'LINK',
  Options = 'OPTIONS',
  Patch = 'PATCH',
  Post = 'POST',
  Purge = 'PURGE',
  Put = 'PUT',
  Unlink = 'UNLINK'
}

export type QueryPageHookConfig = {
  __typename?: 'QueryPageHookConfig';
  pageId: Scalars['String'];
};

export type QueryPageHookConfigInput = {
  pageId: Scalars['String'];
};

export type QueryPagesHookConfig = {
  __typename?: 'QueryPagesHookConfig';
  appId: Scalars['String'];
};

export type QueryPagesHookConfigInput = {
  appId: Scalars['String'];
};

export type RecoilStateHookConfig = {
  __typename?: 'RecoilStateHookConfig';
  defaultValue?: Maybe<Scalars['String']>;
  persisted: PersistenceType;
  stateKey: Scalars['String'];
};

export type RecoilStateHookConfigInput = {
  defaultValue?: Maybe<Scalars['String']>;
  persisted: PersistenceType;
  stateKey: Scalars['String'];
};

export type RemoveHookFromElementInput = {
  elementId: Scalars['String'];
  hookId: Scalars['String'];
};

export enum Role {
  Admin = 'Admin',
  Guest = 'Guest',
  User = 'User'
}

export type Tag = {
  __typename?: 'Tag';
  children: Array<Scalars['String']>;
  id: Scalars['String'];
  isRoot: Scalars['Boolean'];
  name: Scalars['String'];
  parent?: Maybe<Scalars['String']>;
};

/** An edge between two element nodes */
export type TagEdge = {
  __typename?: 'TagEdge';
  order?: Maybe<Scalars['Int']>;
  /** The id of the source Tag */
  source: Scalars['String'];
  /** The id of the target Tag */
  target: Scalars['String'];
};

export type TagGraph = {
  __typename?: 'TagGraph';
  /** All the links connecting the descendant elements/components */
  edges: Array<TagEdge>;
  /** All descendant Elements or Components, at any level */
  vertices: Array<TagVertex>;
};

export type TagVertex = Tag;

export type TagWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type TagsWhereInput = {
  ids?: Maybe<Array<Scalars['String']>>;
};

export type Type = {
  id: Scalars['ID'];
  name: Scalars['String'];
  typeGraph: TypeGraph;
  typeKind: TypeKind;
};

/**
 * A edge between types. Depending on the kind can mean a couple of things:
 *   TypeEdgeKind.Field - it represents a Field object, the field property will contain the metadata;
 *   TypeEdgeKind.ArrayItem - it represents the generic array item type of an array type. The field property will be empty
 */
export type TypeEdge = {
  __typename?: 'TypeEdge';
  /** Empty if kind is not TypeEdgeKind.Field */
  field?: Maybe<Field>;
  kind: TypeEdgeKind;
  source: Scalars['String'];
  target: Scalars['String'];
};

export enum TypeEdgeKind {
  ArrayItem = 'ArrayItem',
  Field = 'Field'
}

export type TypeGraph = {
  __typename?: 'TypeGraph';
  edges: Array<TypeEdge>;
  vertices: Array<TypeVertex>;
};

export enum TypeKind {
  ArrayType = 'ArrayType',
  ComponentType = 'ComponentType',
  ElementType = 'ElementType',
  EnumType = 'EnumType',
  InterfaceType = 'InterfaceType',
  LambdaType = 'LambdaType',
  PrimitiveType = 'PrimitiveType'
}

export type TypeRef = {
  existingTypeId?: Maybe<Scalars['String']>;
  newType?: Maybe<CreateTypeInput>;
};

export type TypeVertex = ArrayType | ComponentType | ElementType | EnumType | InterfaceType | LambdaType | PrimitiveType;

export type TypesByIdsFilter = {
  typeIds: Array<Scalars['String']>;
};

export type TypesByKindFilter = {
  kind: TypeKind;
};

export type TypesByNameFilter = {
  name: Scalars['String'];
};

export type UpdateAppData = {
  name: Scalars['String'];
};

export type UpdateAppInput = {
  data: UpdateAppData;
  id: Scalars['String'];
};

export type UpdateAtomInput = {
  data: CreateAtomInput;
  id: Scalars['String'];
};

export type UpdateComponentData = {
  name: Scalars['String'];
};

export type UpdateComponentInput = {
  componentId: Scalars['String'];
  updateData: UpdateComponentData;
};

export type UpdateElementData = {
  atomId?: Maybe<Scalars['String']>;
  componentId?: Maybe<Scalars['String']>;
  css?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  propTransformationJs?: Maybe<Scalars['String']>;
  /** If set, the element will get rendered for each item in the array found in its props by the given key, if it exists */
  renderForEachPropKey?: Maybe<Scalars['String']>;
  /** If set, the element will get rendered only if the prop with the given key exists and is evaluated as truthy (exception - the string "false" will evaluate to falsy) */
  renderIfPropKey?: Maybe<Scalars['String']>;
};

export type UpdateElementInput = {
  data: UpdateElementData;
  id: Scalars['String'];
};

export type UpdateElementPropsInput = {
  elementId: Scalars['String'];
  props: Scalars['String'];
};

export type UpdateEnumTypeData = {
  allowedValues: Array<UpdateEnumTypeValueData>;
  name: Scalars['String'];
};

export type UpdateEnumTypeInput = {
  typeId: Scalars['String'];
  updateData: UpdateEnumTypeData;
};

export type UpdateEnumTypeValueData = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  value: Scalars['String'];
};

export type UpdateFieldData = {
  description?: Maybe<Scalars['String']>;
  key: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  type: TypeRef;
};

export type UpdateFieldInput = {
  fieldId: Scalars['String'];
  updateData: UpdateFieldData;
};

export type UpdateLambdaInput = {
  /** Content of the Lambda function */
  body: Scalars['String'];
  id: Scalars['String'];
  /** Name of the Lambda function to be executed */
  name: Scalars['String'];
};

export type UpdatePageData = {
  appId: Scalars['String'];
  name: Scalars['String'];
};

export type UpdatePageInput = {
  pageId: Scalars['String'];
  updateData: UpdatePageData;
};

export type UpdatePrimitiveKindData = {
  name: Scalars['String'];
  primitiveKind: PrimitiveKind;
};

export type UpdatePrimitiveTypeInput = {
  typeId: Scalars['String'];
  updateData: UpdatePrimitiveKindData;
};

export type UpdatePropMapBindingData = {
  /** The key of the prop, as received in the source element */
  sourceKey: Scalars['String'];
  /** The ID of the target element, if omitted, the current element will be the target */
  targetElementId?: Maybe<Scalars['String']>;
  /** The key of the prop, that the target Element will receive */
  targetKey: Scalars['String'];
};

export type UpdatePropMapBindingInput = {
  data: UpdatePropMapBindingData;
  propMapBindingId: Scalars['String'];
};

export type UpdateTagData = {
  name: Scalars['String'];
};

export type UpdateTagInput = {
  data: UpdateTagData;
  id: Scalars['String'];
};

export type UpdateTypeData = {
  name: Scalars['String'];
};

export type UpdateTypeInput = {
  typeId: Scalars['String'];
  updateData: UpdateTypeData;
};

export type UpsertTagInput = {
  data: CreateTagInput;
  where?: Maybe<TagWhereUniqueInput>;
};

export type UpsertUserDataInput = {
  auth0Id: Scalars['String'];
  roles: Array<Role>;
};

export type UpsertUserInput = {
  data: UpsertUserDataInput;
  where?: Maybe<UserWhereUniqueInput>;
};

export type User = {
  __typename?: 'User';
  auth0Id: Scalars['String'];
  id: Scalars['String'];
  roles: Array<Role>;
};

export type UserWhereUniqueInput = {
  auth0Id?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

export type WhereUniqueTag = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type WhereUniqueType = {
  atomId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};
