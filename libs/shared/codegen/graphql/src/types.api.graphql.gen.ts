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
  queryHook?: Maybe<QueryHookConfigInput>;
  graphqlQueryHook?: Maybe<GraphqlQueryHookConfigInput>;
};

export type App = {
  id: Scalars['ID'];
  ownerId: Scalars['String'];
  name: Scalars['String'];
  pages: App;
};

export type AppByIdFilter = {
  appId: Scalars['String'];
};

export type AppByPageFilter = {
  pageId: Scalars['String'];
};

export type ArrayType = Type & {
  typeKind: TypeKind;
  id: Scalars['ID'];
  name: Scalars['String'];
  typeGraph: TypeGraph;
};

export type Atom = {
  id: Scalars['ID'];
  type: AtomType;
  /** This is a unique ID suitable for seeders to lookup, will rename to value */
  name: Scalars['String'];
  api: InterfaceType;
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
  AntDesignPageHeader = 'AntDesignPageHeader',
  AntDesignPageContainer = 'AntDesignPageContainer',
  AntDesignPagination = 'AntDesignPagination',
  AntDesignPopconfirm = 'AntDesignPopconfirm',
  AntDesignPopover = 'AntDesignPopover',
  AntDesignProgress = 'AntDesignProgress',
  AntDesignProvider = 'AntDesignProvider',
  AntDesignRglContainer = 'AntDesignRglContainer',
  AntDesignRglItem = 'AntDesignRglItem',
  AntDesignRglResponsiveContainer = 'AntDesignRglResponsiveContainer',
  AntDesignRadio = 'AntDesignRadio',
  AntDesignRadioGroup = 'AntDesignRadioGroup',
  AntDesignRate = 'AntDesignRate',
  AntDesignRenderComponent = 'AntDesignRenderComponent',
  AntDesignRenderContainer = 'AntDesignRenderContainer',
  AntDesignResult = 'AntDesignResult',
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
  AntDesignImage = 'AntDesignImage',
  Query = 'Query',
  TextList = 'TextList',
  Text = 'Text',
  State = 'State',
  PropMapper = 'PropMapper',
  Mapper = 'Mapper',
  ReactFragment = 'ReactFragment',
  HtmlA = 'HtmlA',
  HtmlP = 'HtmlP',
  HtmlVideo = 'HtmlVideo',
  HtmlUList = 'HtmlUList',
  HtmlTrack = 'HtmlTrack',
  HtmlTitle = 'HtmlTitle',
  HtmlTime = 'HtmlTime',
  HtmlTextarea = 'HtmlTextarea',
  HtmlTemplate = 'HtmlTemplate',
  HtmlTableRow = 'HtmlTableRow',
  HtmlTable = 'HtmlTable',
  HtmlTableCol = 'HtmlTableCol',
  HtmlTableCell = 'HtmlTableCell',
  HtmlTableCaption = 'HtmlTableCaption',
  HtmlStyle = 'HtmlStyle',
  HtmlSpan = 'HtmlSpan',
  HtmlSource = 'HtmlSource',
  HtmlSelect = 'HtmlSelect',
  HtmlQuote = 'HtmlQuote',
  HtmlProgress = 'HtmlProgress',
  HtmlPre = 'HtmlPre',
  HtmlPicture = 'HtmlPicture',
  HtmlParam = 'HtmlParam',
  HtmlOutput = 'HtmlOutput',
  HtmlOption = 'HtmlOption',
  HtmlOptgroup = 'HtmlOptgroup',
  HtmlObject = 'HtmlObject',
  HtmlOList = 'HtmlOList',
  HtmlMeter = 'HtmlMeter',
  HtmlMeta = 'HtmlMeta',
  HtmlMap = 'HtmlMap',
  HtmlLink = 'HtmlLink',
  HtmlLegend = 'HtmlLegend',
  HtmlLabel = 'HtmlLabel',
  HtmlLi = 'HtmlLi',
  HtmlInput = 'HtmlInput',
  HtmlImage = 'HtmlImage',
  HtmlIframe = 'HtmlIframe',
  HtmlH1 = 'HtmlH1',
  HtmlH2 = 'HtmlH2',
  HtmlH3 = 'HtmlH3',
  HtmlH4 = 'HtmlH4',
  HtmlH5 = 'HtmlH5',
  HtmlH6 = 'HtmlH6',
  HtmlHead = 'HtmlHead',
  HtmlHr = 'HtmlHr',
  HtmlFrameset = 'HtmlFrameset',
  HtmlFrame = 'HtmlFrame',
  HtmlForm = 'HtmlForm',
  HtmlFont = 'HtmlFont',
  HtmlFieldset = 'HtmlFieldset',
  HtmlEmbed = 'HtmlEmbed',
  HtmlDiv = 'HtmlDiv',
  HtmlDialog = 'HtmlDialog',
  HtmlDetails = 'HtmlDetails',
  HtmlDatalist = 'HtmlDatalist',
  HtmlData = 'HtmlData',
  HtmlDList = 'HtmlDList',
  HtmlCanvas = 'HtmlCanvas',
  HtmlButton = 'HtmlButton',
  HtmlBase = 'HtmlBase',
  HtmlBr = 'HtmlBr',
  HtmlAudio = 'HtmlAudio',
  HtmlArea = 'HtmlArea',
  HtmlFooter = 'HtmlFooter',
  HtmlAside = 'HtmlAside',
  HtmlHeader = 'HtmlHeader',
  HtmlMain = 'HtmlMain',
  HtmlNav = 'HtmlNav',
  HtmlSection = 'HtmlSection',
  HtmlCode = 'HtmlCode',
  HtmlEm = 'HtmlEm',
  HtmlI = 'HtmlI',
  HtmlS = 'HtmlS',
  HtmlSmall = 'HtmlSmall',
  HtmlStrong = 'HtmlStrong',
  HtmlSub = 'HtmlSub',
  HtmlSup = 'HtmlSup'
}

export type AtomWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
  type?: Maybe<AtomType>;
  element?: Maybe<Scalars['String']>;
};

export type AtomsWhereInput = {
  ids?: Maybe<Array<Scalars['String']>>;
};

export type Component = {
  id: Scalars['ID'];
  name: Scalars['String'];
};

/** The ComponentType allows selecting a Component in the props form. The value is stored as the componentId  */
export type ComponentType = Type & {
  typeKind: TypeKind;
  id: Scalars['ID'];
  name: Scalars['String'];
  typeGraph: TypeGraph;
};

export type CreateAppInput = {
  name: Scalars['String'];
};

export type CreateArrayTypeInput = {
  itemTypeId: Scalars['String'];
};

export type CreateAtomInput = {
  name: Scalars['String'];
  type: AtomType;
  /** Pass in an existing interface ID to assign it to the atom */
  api?: Maybe<Scalars['String']>;
};

export type CreateComponentInput = {
  name: Scalars['String'];
};

export type CreateElementInput = {
  name?: Maybe<Scalars['String']>;
  atomId?: Maybe<Scalars['String']>;
  componentId?: Maybe<Scalars['String']>;
  parentElementId?: Maybe<Scalars['String']>;
  /** Leave it out to automatically set it as the last order of all the children */
  order?: Maybe<Scalars['Int']>;
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
  key: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  /** The interface to add fields to */
  interfaceId: Scalars['String'];
  type: TypeRef;
};

export type CreateLambdaInput = {
  /** Name of the Lambda function to be executed */
  name: Scalars['String'];
  /** Content of the Lambda function */
  body: Scalars['String'];
};

export type CreatePageInput = {
  name: Scalars['String'];
  appId: Scalars['String'];
};

export type CreatePrimitiveTypeInput = {
  primitiveKind: PrimitiveKind;
};

export type CreateResponse = {
  id: Scalars['String'];
};

export type CreateTagInput = {
  name: Scalars['String'];
  parentTagId?: Maybe<Scalars['String']>;
  /** We can create multiple tag trees, the root tells us whether this is a separate tree */
  isRoot?: Maybe<Scalars['Boolean']>;
};

/** Provide one of the properties */
export type CreateTypeInput = {
  name: Scalars['String'];
  typeKind: TypeKind;
  primitiveType?: Maybe<CreatePrimitiveTypeInput>;
  arrayType?: Maybe<CreateArrayTypeInput>;
  enumType?: Maybe<CreateEnumTypeInput>;
  interfaceType?: Maybe<Scalars['Boolean']>;
  lambdaType?: Maybe<Scalars['Boolean']>;
  componentType?: Maybe<Scalars['Boolean']>;
  elementType?: Maybe<CreateElementTypeInput>;
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

export type DeleteTagsInput = {
  ids: Array<Scalars['String']>;
};

export type DeleteTypeInput = {
  typeId: Scalars['String'];
};

export type DeleteUserInput = {
  userId: Scalars['String'];
};

export type Element = {
  id: Scalars['ID'];
  /** Due to union nullability issue, we have to make this non-nullable. Defaults to atom type */
  name: Scalars['String'];
  css?: Maybe<Scalars['String']>;
  /** Props in a json format */
  props: Scalars['String'];
  hooks: Array<Hook>;
  atom?: Maybe<Atom>;
};

/** An edge between two element nodes */
export type ElementEdge = {
  /** The id of the source Element/Component */
  source: Scalars['String'];
  /** The id of the target Element/Component */
  target: Scalars['String'];
  order?: Maybe<Scalars['Int']>;
};

export type ElementGraph = {
  /** All descendant Elements or Components, at any level */
  vertices: Array<ElementVertex>;
  /** All the links connecting the descendant elements/components */
  edges: Array<ElementEdge>;
};

/** The ElementType allows selecting an Element in the props form. The value is stored as the elementId  */
export type ElementType = Type & {
  typeKind: TypeKind;
  id: Scalars['ID'];
  name: Scalars['String'];
  typeGraph: TypeGraph;
  kind: ElementTypeKind;
};

export enum ElementTypeKind {
  AllElements = 'AllElements',
  DescendantsOnly = 'DescendantsOnly',
  ChildrenOnly = 'ChildrenOnly'
}

export type ElementVertex = Element | Component;

export type EnumType = Type & {
  typeKind: TypeKind;
  id: Scalars['ID'];
  name: Scalars['String'];
  typeGraph: TypeGraph;
  allowedValues: Array<EnumTypeValue>;
};

export type EnumTypeValue = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  value: Scalars['String'];
};

export type ExecuteLambdaInput = {
  lambdaId: Scalars['String'];
  payload?: Maybe<Scalars['String']>;
};

export type Field = {
  id: Scalars['ID'];
  key: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type FieldByIdFilter = {
  fieldId: Scalars['String'];
};

export type FieldByInterfaceFilter = {
  interfaceId: Scalars['String'];
  fieldKey: Scalars['String'];
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
  byInterface?: Maybe<FieldByInterfaceFilter>;
  byId?: Maybe<FieldByIdFilter>;
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

export type GetUsersInput = {
  page: Scalars['Int'];
  perPage: Scalars['Int'];
  query: Scalars['String'];
  sort: Scalars['String'];
};

export type GraphqlQueryHookConfig = {
  body: Scalars['String'];
  url: Scalars['String'];
  dataKey?: Maybe<Scalars['String']>;
};

export type GraphqlQueryHookConfigInput = {
  url: Scalars['String'];
  body: Scalars['String'];
  dataKey?: Maybe<Scalars['String']>;
};

export type Hook = {
  id: Scalars['ID'];
  type: HookType;
  config: HookConfig;
};

export type HookConfig = QueryHookConfig | GraphqlQueryHookConfig;

export enum HookType {
  Query = 'Query',
  GraphqlQuery = 'GraphqlQuery'
}

export type ImportAtomsInput = {
  payload: Scalars['String'];
};

export type InterfaceType = Type & {
  typeKind: TypeKind;
  id: Scalars['ID'];
  name: Scalars['String'];
  typeGraph: TypeGraph;
  fields: Array<Field>;
};

export type Lambda = {
  id: Scalars['ID'];
  ownerId: Scalars['String'];
  name: Scalars['String'];
  body: Scalars['String'];
};

export type LambdaPayload = {
  payload: Scalars['String'];
};

/** The LambdaType allows selecting a Lambda in the props form. The value is stored as the lambdaId  */
export type LambdaType = Type & {
  typeKind: TypeKind;
  id: Scalars['ID'];
  name: Scalars['String'];
  typeGraph: TypeGraph;
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
  createApp: CreateResponse;
  updateApp?: Maybe<Scalars['Void']>;
  deleteApp?: Maybe<Scalars['Void']>;
  updateUser: User;
  deleteUser: Scalars['Boolean'];
  resetData?: Maybe<Scalars['Void']>;
  createPage: CreateResponse;
  deletePage?: Maybe<Scalars['Void']>;
  updatePage?: Maybe<Scalars['Void']>;
  createElement: CreateResponse;
  updateElement?: Maybe<Scalars['Void']>;
  moveElement?: Maybe<Scalars['Void']>;
  updateElementProps?: Maybe<Scalars['Void']>;
  /** Deletes an element and all the descending elements */
  deleteElement?: Maybe<Scalars['Void']>;
  addHookToElement: CreateResponse;
  removeHookFromElement?: Maybe<Scalars['Void']>;
  createComponent: CreateResponse;
  updateComponent?: Maybe<Scalars['Void']>;
  deleteComponent?: Maybe<Scalars['Void']>;
  createAtom: CreateResponse;
  deleteAtom?: Maybe<Scalars['Void']>;
  importAtoms?: Maybe<Scalars['Void']>;
  updateAtom?: Maybe<Scalars['Void']>;
  seedBaseTypes?: Maybe<Scalars['Void']>;
  createType: CreateResponse;
  updateEnumType?: Maybe<Scalars['Void']>;
  updatePrimitiveType?: Maybe<Scalars['Void']>;
  updateType?: Maybe<Scalars['Void']>;
  deleteType?: Maybe<Scalars['Void']>;
  createField: CreateResponse;
  updateField?: Maybe<Scalars['Void']>;
  deleteField?: Maybe<Scalars['Void']>;
  createLambda: CreateResponse;
  deleteLambda?: Maybe<Scalars['Void']>;
  updateLambda?: Maybe<Scalars['Void']>;
  executeLambda?: Maybe<LambdaPayload>;
  createTag: CreateResponse;
  updateTag?: Maybe<Scalars['Void']>;
  deleteTags?: Maybe<Scalars['Void']>;
};


export type MutationCreateAppArgs = {
  input: CreateAppInput;
};


export type MutationUpdateAppArgs = {
  input: UpdateAppInput;
};


export type MutationDeleteAppArgs = {
  input: DeleteAppInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


export type MutationCreatePageArgs = {
  input: CreatePageInput;
};


export type MutationDeletePageArgs = {
  input: DeletePageInput;
};


export type MutationUpdatePageArgs = {
  input: UpdatePageInput;
};


export type MutationCreateElementArgs = {
  input: CreateElementInput;
};


export type MutationUpdateElementArgs = {
  input: UpdateElementInput;
};


export type MutationMoveElementArgs = {
  input: MoveElementInput;
};


export type MutationUpdateElementPropsArgs = {
  input: UpdateElementPropsInput;
};


export type MutationDeleteElementArgs = {
  input: DeleteElementInput;
};


export type MutationAddHookToElementArgs = {
  input: AddHookToElementInput;
};


export type MutationRemoveHookFromElementArgs = {
  input: RemoveHookFromElementInput;
};


export type MutationCreateComponentArgs = {
  input: CreateComponentInput;
};


export type MutationUpdateComponentArgs = {
  input: UpdateComponentInput;
};


export type MutationDeleteComponentArgs = {
  input: DeleteComponentInput;
};


export type MutationCreateAtomArgs = {
  input: CreateAtomInput;
};


export type MutationDeleteAtomArgs = {
  input: DeleteAtomInput;
};


export type MutationImportAtomsArgs = {
  input: ImportAtomsInput;
};


export type MutationUpdateAtomArgs = {
  input: UpdateAtomInput;
};


export type MutationCreateTypeArgs = {
  input: CreateTypeInput;
};


export type MutationUpdateEnumTypeArgs = {
  input: UpdateEnumTypeInput;
};


export type MutationUpdatePrimitiveTypeArgs = {
  input: UpdatePrimitiveTypeInput;
};


export type MutationUpdateTypeArgs = {
  input: UpdateTypeInput;
};


export type MutationDeleteTypeArgs = {
  input: DeleteTypeInput;
};


export type MutationCreateFieldArgs = {
  input: CreateFieldInput;
};


export type MutationUpdateFieldArgs = {
  input: UpdateFieldInput;
};


export type MutationDeleteFieldArgs = {
  input: DeleteFieldInput;
};


export type MutationCreateLambdaArgs = {
  input: CreateLambdaInput;
};


export type MutationDeleteLambdaArgs = {
  input: DeleteLambdaInput;
};


export type MutationUpdateLambdaArgs = {
  input: UpdateLambdaInput;
};


export type MutationExecuteLambdaArgs = {
  input: ExecuteLambdaInput;
};


export type MutationCreateTagArgs = {
  input: CreateTagInput;
};


export type MutationUpdateTagArgs = {
  input: UpdateTagInput;
};


export type MutationDeleteTagsArgs = {
  input: DeleteTagsInput;
};

export type Page = {
  id: Scalars['ID'];
  name: Scalars['String'];
  elements?: Maybe<ElementGraph>;
};

export type PageByAppFilter = {
  appId: Scalars['String'];
};

export enum PrimitiveKind {
  String = 'String',
  Integer = 'Integer',
  Float = 'Float',
  Boolean = 'Boolean'
}

export type PrimitiveType = Type & {
  typeKind: TypeKind;
  id: Scalars['ID'];
  name: Scalars['String'];
  typeGraph: TypeGraph;
  primitiveKind: PrimitiveKind;
};

export type Query = {
  getApp?: Maybe<App>;
  getApps: Array<App>;
  getMe: User;
  getUsers: Array<User>;
  getPages: Array<Page>;
  getPage?: Maybe<Page>;
  /** Aggregates the requested element and all of its descendant elements (infinitely deep) in the form of a flat array of Element and array of ElementEdge */
  getElementGraph?: Maybe<ElementGraph>;
  /** Get a single element. */
  getElement?: Maybe<Element>;
  getComponent?: Maybe<Component>;
  getComponentElements?: Maybe<ElementGraph>;
  getComponents: Array<Component>;
  getAtoms?: Maybe<Array<Atom>>;
  getAtom?: Maybe<Atom>;
  getType?: Maybe<Type>;
  getTypeGraph?: Maybe<TypeGraph>;
  getTypes: Array<Type>;
  getField?: Maybe<Field>;
  getLambda?: Maybe<Lambda>;
  getLambdas: Array<Lambda>;
  getTag?: Maybe<Tag>;
  /** Get all Tag graphs */
  getTags: Array<Tag>;
  /** Aggregates the requested tags and all of its descendant tags (infinitely deep) in the form of a flat array of TagVertex (alias of Tag) and array of TagEdge */
  getTagGraph?: Maybe<TagGraph>;
};


export type QueryGetAppArgs = {
  input: GetAppInput;
};


export type QueryGetUsersArgs = {
  input?: Maybe<GetUsersInput>;
};


export type QueryGetPagesArgs = {
  input: GetPagesInput;
};


export type QueryGetPageArgs = {
  input: GetPageInput;
};


export type QueryGetElementGraphArgs = {
  input: GetElementGraphInput;
};


export type QueryGetElementArgs = {
  input: GetElementInput;
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


export type QueryGetAtomsArgs = {
  input?: Maybe<GetAtomsInput>;
};


export type QueryGetAtomArgs = {
  input: GetAtomInput;
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


export type QueryGetFieldArgs = {
  input: GetFieldInput;
};


export type QueryGetLambdaArgs = {
  input: GetLambdaInput;
};


export type QueryGetTagArgs = {
  input: GetTagInput;
};

export type QueryHookConfig = {
  queryKey: Scalars['String'];
  url?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
  method?: Maybe<QueryMethod>;
  lambdaId?: Maybe<Scalars['String']>;
};

/** Provide either a lambdaId, or body/method/url */
export type QueryHookConfigInput = {
  queryKey: Scalars['String'];
  url?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
  method?: Maybe<QueryMethod>;
  lambdaId?: Maybe<Scalars['String']>;
};

export enum QueryMethod {
  Get = 'GET',
  Delete = 'DELETE',
  Head = 'HEAD',
  Options = 'OPTIONS',
  Post = 'POST',
  Put = 'PUT',
  Patch = 'PATCH',
  Purge = 'PURGE',
  Link = 'LINK',
  Unlink = 'UNLINK'
}

export type RemoveHookFromElementInput = {
  elementId: Scalars['String'];
  hookId: Scalars['String'];
};

export type Tag = {
  id: Scalars['String'];
  name: Scalars['String'];
  isRoot: Scalars['Boolean'];
};

/** An edge between two element nodes */
export type TagEdge = {
  /** The id of the source Tag */
  source: Scalars['String'];
  /** The id of the target Tag */
  target: Scalars['String'];
  order?: Maybe<Scalars['Int']>;
};

export type TagGraph = {
  /** All descendant Elements or Components, at any level */
  vertices: Array<TagVertex>;
  /** All the links connecting the descendant elements/components */
  edges: Array<TagEdge>;
};

export type TagVertex = Tag;

export type Type = {
  typeKind: TypeKind;
  id: Scalars['ID'];
  name: Scalars['String'];
  typeGraph: TypeGraph;
};

/**
 * A edge between types. Depending on the kind can mean a couple of things:
 *   TypeEdgeKind.Field - it represents a Field object, the field property will contain the metadata;
 *   TypeEdgeKind.ArrayItem - it represents the generic array item type of an array type. The field property will be empty
 */
export type TypeEdge = {
  source: Scalars['String'];
  target: Scalars['String'];
  kind: TypeEdgeKind;
  /** Empty if kind is not TypeEdgeKind.Field */
  field?: Maybe<Field>;
};

export enum TypeEdgeKind {
  Field = 'Field',
  ArrayItem = 'ArrayItem'
}

export type TypeGraph = {
  vertices: Array<TypeVertex>;
  edges: Array<TypeEdge>;
};

export enum TypeKind {
  PrimitiveType = 'PrimitiveType',
  ArrayType = 'ArrayType',
  InterfaceType = 'InterfaceType',
  EnumType = 'EnumType',
  LambdaType = 'LambdaType',
  ElementType = 'ElementType',
  ComponentType = 'ComponentType'
}

export type TypeRef = {
  existingTypeId?: Maybe<Scalars['String']>;
  newType?: Maybe<CreateTypeInput>;
};

export type TypeVertex = EnumType | PrimitiveType | ArrayType | ComponentType | ElementType | InterfaceType | LambdaType;

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
  id: Scalars['String'];
  data: UpdateAppData;
};

export type UpdateAtomInput = {
  id: Scalars['String'];
  data: CreateAtomInput;
};

export type UpdateComponentData = {
  name: Scalars['String'];
};

export type UpdateComponentInput = {
  componentId: Scalars['String'];
  updateData: UpdateComponentData;
};

export type UpdateElementData = {
  name?: Maybe<Scalars['String']>;
  atomId?: Maybe<Scalars['String']>;
  componentId?: Maybe<Scalars['String']>;
  css?: Maybe<Scalars['String']>;
};

export type UpdateElementInput = {
  data: UpdateElementData;
  id: Scalars['String'];
};

export type UpdateElementPropsInput = {
  props: Scalars['String'];
  elementId: Scalars['String'];
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
  key: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  type: TypeRef;
};

export type UpdateFieldInput = {
  fieldId: Scalars['String'];
  updateData: UpdateFieldData;
};

export type UpdateLambdaInput = {
  /** Name of the Lambda function to be executed */
  name: Scalars['String'];
  /** Content of the Lambda function */
  body: Scalars['String'];
  id: Scalars['String'];
};

export type UpdatePageData = {
  name: Scalars['String'];
  appId: Scalars['String'];
};

export type UpdatePageInput = {
  pageId: Scalars['String'];
  updateData: UpdatePageData;
};

export type UpdatePrimitiveKindData = {
  primitiveKind: PrimitiveKind;
  name: Scalars['String'];
};

export type UpdatePrimitiveTypeInput = {
  typeId: Scalars['String'];
  updateData: UpdatePrimitiveKindData;
};

export type UpdateTagData = {
  name: Scalars['String'];
};

export type UpdateTagInput = {
  id: Scalars['String'];
  data: UpdateTagData;
};

export type UpdateTypeData = {
  name: Scalars['String'];
};

export type UpdateTypeInput = {
  updateData: UpdateTypeData;
  typeId: Scalars['String'];
};

export type UpdateUserData = {
  family_name?: Maybe<Scalars['String']>;
  given_name?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  phone_number?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type UpdateUserInput = {
  userId: Scalars['String'];
  updateData: UpdateUserData;
};

export type User = {
  blocked?: Maybe<Scalars['Boolean']>;
  created_at?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  email_verified?: Maybe<Scalars['Boolean']>;
  family_name?: Maybe<Scalars['String']>;
  given_name?: Maybe<Scalars['String']>;
  last_ip?: Maybe<Scalars['String']>;
  last_login?: Maybe<Scalars['String']>;
  last_password_reset?: Maybe<Scalars['String']>;
  logins_count?: Maybe<Scalars['Float']>;
  multifactor?: Maybe<Array<Scalars['String']>>;
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  phone_number?: Maybe<Scalars['String']>;
  phone_verified?: Maybe<Scalars['Boolean']>;
  picture?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type WhereUniqueTag = {
  name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

export type WhereUniqueType = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  atomId?: Maybe<Scalars['String']>;
};
