import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
const defaultOptions = { operationName: 'api' }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type App = {
  id: Scalars['ID']
  ownerId: Scalars['String']
  name: Scalars['String']
}

export type ArrayLengthValidator = {
  id: Scalars['ID']
  minLength?: Maybe<Scalars['Int']>
  maxLength?: Maybe<Scalars['Int']>
}

export type ArrayType = {
  id: Scalars['ID']
  typeId: Scalars['String']
}

export type Atom = {
  id: Scalars['ID']
  type: AtomType
  label: Scalars['String']
  interfaceId: Scalars['String']
}

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
  ReactFragment = 'ReactFragment',
  HtmlA = 'HtmlA',
  HtmlDiv = 'HtmlDiv',
  HtmlP = 'HtmlP',
  HtmlSpan = 'HtmlSpan',
  HtmlText = 'HtmlText',
}

export type CreateAppInput = {
  name: Scalars['String']
}

export type CreateArrayTypeInput = {
  type: CreateTypeInput
}

export type CreateAtomInput = {
  label: Scalars['String']
  type: AtomType
}

export type CreateEnumTypeInput = {
  allowedValues: Array<Scalars['String']>
}

export type CreateFieldInput = {
  key: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  interfaceId: Scalars['String']
  type: CreateTypeInput
}

export type CreateInterfaceInput = {
  name: Scalars['String']
}

export type CreateInterfaceTypeInput = {
  interfaceId: Scalars['String']
}

export type CreatePageElementInput = {
  name: Scalars['String']
  atomId?: Maybe<Scalars['String']>
  parentPageElementId: Scalars['String']
  /** Leave it out to automatically set it as the last order of all the children */
  order?: Maybe<Scalars['Int']>
}

export type CreatePageInput = {
  name: Scalars['String']
  appId: Scalars['String']
}

export type CreateSimpleTypeInput = {
  primitiveType: PrimitiveType
}

/** Provide one of the properties */
export type CreateTypeInput = {
  simpleType?: Maybe<CreateSimpleTypeInput>
  interfaceType?: Maybe<CreateInterfaceTypeInput>
  arrayType?: Maybe<CreateArrayTypeInput>
  enumType?: Maybe<CreateEnumTypeInput>
  unitType?: Maybe<CreateUnitTypeInput>
}

export type CreateUnitTypeInput = {
  /** Pass null to allow all */
  allowedUnits?: Maybe<Array<Unit>>
}

export type Decorator =
  | ArrayLengthValidator
  | MinMaxValidator
  | RequiredValidator

export type DeleteAppInput = {
  appId: Scalars['String']
}

export type DeleteAtomInput = {
  atomId: Scalars['String']
}

export type DeleteFieldInput = {
  fieldId: Scalars['String']
}

export type DeleteInterfaceInput = {
  interfaceId: Scalars['String']
}

export type DeletePageElementInput = {
  pageElementId: Scalars['String']
}

export type DeletePageInput = {
  pageId: Scalars['String']
}

export type DeleteResponse = {
  affected: Scalars['Int']
}

export type DeleteUserInput = {
  userId: Scalars['String']
}

export type EnumType = {
  id: Scalars['ID']
  allowedValues: Array<EnumTypeValue>
}

export type EnumTypeValue = {
  id: Scalars['ID']
  name: Scalars['String']
}

export type Field = {
  id: Scalars['ID']
  key: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  typeId: Scalars['String']
  decorators: Array<Decorator>
}

export type FieldByIdFilter = {
  fieldId: Scalars['String']
}

export type FieldByInterfaceFilter = {
  interfaceId: Scalars['String']
  fieldKey: Scalars['String']
}

export type GetAppInput = {
  appId: Scalars['String']
}

export type GetAtomInput = {
  atomId: Scalars['String']
}

export type GetFieldInput = {
  byInterface?: Maybe<FieldByInterfaceFilter>
  byId?: Maybe<FieldByIdFilter>
}

export type GetInterfaceInput = {
  interfaceId: Scalars['String']
}

export type GetPageElementInput = {
  pageElementId: Scalars['String']
}

export type GetPageElementRootInput = {
  pageElementId: Scalars['String']
}

export type GetPageInput = {
  pageId: Scalars['String']
}

export type GetPagesInput = {
  appId: Scalars['String']
}

export type GetTypeInput = {
  typeId: Scalars['String']
}

export type GetUsersInput = {
  page: Scalars['Int']
  perPage: Scalars['Int']
  query: Scalars['String']
  sort: Scalars['String']
}

export type Interface = {
  id: Scalars['ID']
  name: Scalars['String']
  fields: Array<Field>
  /** Flattened array of all types that are used inside this interface */
  types: Array<Type>
}

export type InterfaceType = {
  interfaceId: Scalars['String']
}

export type MinMaxValidator = {
  id: Scalars['ID']
  min?: Maybe<Scalars['Int']>
  max?: Maybe<Scalars['Int']>
}

export type MoveData = {
  order: Scalars['Int']
  parentElementId: Scalars['String']
}

export type MovePageElementInput = {
  pageElementId: Scalars['String']
  moveData: MoveData
}

export type Mutation = {
  createApp: App
  updateApp: App
  deleteApp: App
  updateUser: User
  deleteUser: Scalars['Boolean']
  createPage: Page
  deletePage: Page
  updatePage: Page
  createPageElement: PageElement
  updatePageElement: PageElement
  movePageElement: PageElement
  /** Deletes a page element and all the descending page elements */
  deletePageElement: DeleteResponse
  createAtom: Atom
  deleteAtom: Atom
  updateAtom: Atom
  createInterface: Interface
  updateInterface: Interface
  deleteInterface: DeleteResponse
  createField: Field
  updateField: Field
  deleteField: DeleteResponse
}

export type MutationCreateAppArgs = {
  input: CreateAppInput
}

export type MutationUpdateAppArgs = {
  input: UpdateAppInput
}

export type MutationDeleteAppArgs = {
  input: DeleteAppInput
}

export type MutationUpdateUserArgs = {
  input: UpdateUserInput
}

export type MutationDeleteUserArgs = {
  input: DeleteUserInput
}

export type MutationCreatePageArgs = {
  input: CreatePageInput
}

export type MutationDeletePageArgs = {
  input: DeletePageInput
}

export type MutationUpdatePageArgs = {
  input: UpdatePageInput
}

export type MutationCreatePageElementArgs = {
  input: CreatePageElementInput
}

export type MutationUpdatePageElementArgs = {
  input: UpdatePageElementInput
}

export type MutationMovePageElementArgs = {
  input: MovePageElementInput
}

export type MutationDeletePageElementArgs = {
  input: DeletePageElementInput
}

export type MutationCreateAtomArgs = {
  input: CreateAtomInput
}

export type MutationDeleteAtomArgs = {
  input: DeleteAtomInput
}

export type MutationUpdateAtomArgs = {
  input: UpdateAtomInput
}

export type MutationCreateInterfaceArgs = {
  input: CreateInterfaceInput
}

export type MutationUpdateInterfaceArgs = {
  input: UpdateInterfaceInput
}

export type MutationDeleteInterfaceArgs = {
  input: DeleteInterfaceInput
}

export type MutationCreateFieldArgs = {
  input: CreateFieldInput
}

export type MutationUpdateFieldArgs = {
  input: UpdateFieldInput
}

export type MutationDeleteFieldArgs = {
  input: DeleteFieldInput
}

export type Page = {
  id: Scalars['ID']
  name: Scalars['String']
  app: App
  rootElement: PageElementRoot
}

export type PageElement = {
  id: Scalars['ID']
  name: Scalars['String']
  atom?: Maybe<Atom>
}

export type PageElementLink = {
  /** The id of the source PageElement */
  from: Scalars['String']
  /** The id of the target PageElement */
  to: Scalars['String']
  order: Scalars['Int']
}

export type PageElementRoot = {
  id: Scalars['ID']
  name: Scalars['String']
  atom?: Maybe<Atom>
  /** All descendant PageElements that are under this root, at any level */
  descendants: Array<PageElement>
  /** All the links connecting the descendant page elements */
  links: Array<PageElementLink>
}

export enum PrimitiveType {
  String = 'String',
  Integer = 'Integer',
  Float = 'Float',
  Boolean = 'Boolean',
}

export type Prop = {
  id: Scalars['ID']
  key?: Maybe<Scalars['String']>
  type: ValueType
  description?: Maybe<Scalars['String']>
  props?: Maybe<Array<Prop>>
}

export type Query = {
  getApp?: Maybe<App>
  getApps: Array<App>
  getMe: User
  getUsers: Array<User>
  getPages: Array<Page>
  getPage?: Maybe<Page>
  getPageElement?: Maybe<PageElement>
  /** Aggregates the requested page element and all of its descendant elements (infinitely deep) in the form of array of PageElement and array of PageElementLink */
  getPageElementRoot?: Maybe<PageElementRoot>
  getAtoms: Array<Atom>
  getAtom?: Maybe<Atom>
  getValueTypes: Array<ValueType>
  getProps: Array<Prop>
  getInterface?: Maybe<Interface>
  getField?: Maybe<Field>
  getType?: Maybe<Type>
}

export type QueryGetAppArgs = {
  input: GetAppInput
}

export type QueryGetUsersArgs = {
  input?: Maybe<GetUsersInput>
}

export type QueryGetPagesArgs = {
  input: GetPagesInput
}

export type QueryGetPageArgs = {
  input: GetPageInput
}

export type QueryGetPageElementArgs = {
  input: GetPageElementInput
}

export type QueryGetPageElementRootArgs = {
  input: GetPageElementRootInput
}

export type QueryGetAtomArgs = {
  input: GetAtomInput
}

export type QueryGetInterfaceArgs = {
  input: GetInterfaceInput
}

export type QueryGetFieldArgs = {
  input: GetFieldInput
}

export type QueryGetTypeArgs = {
  input: GetTypeInput
}

export type RequiredValidator = {
  id: Scalars['ID']
  isRequired: Scalars['Boolean']
}

export type SimpleType = {
  id: Scalars['ID']
  primitiveType: PrimitiveType
}

export type Type = SimpleType | ArrayType | EnumType | UnitType | InterfaceType

export enum Unit {
  Px = 'Px',
  Pt = 'Pt',
  Em = 'Em',
  Rem = 'Rem',
  Percent = 'Percent',
  Vw = 'Vw',
  Vh = 'Vh',
}

export type UnitType = {
  id: Scalars['ID']
  allowedUnits: Array<Unit>
}

export type UpdateAppData = {
  name: Scalars['String']
}

export type UpdateAppInput = {
  id: Scalars['String']
  data: UpdateAppData
}

export type UpdateAtomInput = {
  id: Scalars['String']
  data: CreateAtomInput
}

export type UpdateFieldData = {
  key: Scalars['String']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  interfaceId: Scalars['String']
  type: CreateTypeInput
}

export type UpdateFieldInput = {
  fieldId: Scalars['String']
  updateData: UpdateFieldData
}

export type UpdateInterfaceData = {
  name: Scalars['String']
}

export type UpdateInterfaceInput = {
  interfaceId: Scalars['String']
  updateData: UpdateInterfaceData
}

export type UpdatePageData = {
  name: Scalars['String']
  appId: Scalars['String']
}

export type UpdatePageElementData = {
  name: Scalars['String']
  atomId?: Maybe<Scalars['String']>
}

export type UpdatePageElementInput = {
  updateData: UpdatePageElementData
  pageElementId: Scalars['String']
}

export type UpdatePageInput = {
  pageId: Scalars['String']
  updateData: UpdatePageData
}

export type UpdateUserData = {
  family_name?: Maybe<Scalars['String']>
  given_name?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  nickname?: Maybe<Scalars['String']>
  phone_number?: Maybe<Scalars['String']>
  picture?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
}

export type UpdateUserInput = {
  userId: Scalars['String']
  updateData: UpdateUserData
}

export type User = {
  blocked?: Maybe<Scalars['Boolean']>
  created_at?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  email_verified?: Maybe<Scalars['Boolean']>
  family_name?: Maybe<Scalars['String']>
  given_name?: Maybe<Scalars['String']>
  last_ip?: Maybe<Scalars['String']>
  last_login?: Maybe<Scalars['String']>
  last_password_reset?: Maybe<Scalars['String']>
  logins_count?: Maybe<Scalars['Float']>
  multifactor?: Maybe<Array<Scalars['String']>>
  name?: Maybe<Scalars['String']>
  nickname?: Maybe<Scalars['String']>
  phone_number?: Maybe<Scalars['String']>
  phone_verified?: Maybe<Scalars['Boolean']>
  picture?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['String']>
  user_id?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
}

export type ValueType = {
  id: Scalars['ID']
  label: Scalars['String']
  type: Scalars['String']
}

export type CreateAppMutationVariables = Exact<{
  input: CreateAppInput
}>

export type CreateAppMutation = { createApp: __AppFragment }

export type DeleteAppMutationVariables = Exact<{
  input: DeleteAppInput
}>

export type DeleteAppMutation = { deleteApp: Pick<App, 'id'> }

export type GetAppQueryVariables = Exact<{
  input: GetAppInput
}>

export type GetAppQuery = { app?: Maybe<__AppFragment> }

export type GetAppsQueryVariables = Exact<{ [key: string]: never }>

export type GetAppsQuery = { apps: Array<__AppFragment> }

export type UpdateAppMutationVariables = Exact<{
  input: UpdateAppInput
}>

export type UpdateAppMutation = { app: __AppFragment }

export type __AppFragment = Pick<App, 'id' | 'name'>

export type CreateTestAtomMutationVariables = Exact<{
  input: CreateAtomInput
}>

export type CreateTestAtomMutation = { createAtom: Pick<Atom, 'id' | 'label'> }

export type __AtomFragment = Pick<Atom, 'id' | 'label' | 'type'>

export type CreateAtomMutationVariables = Exact<{
  input: CreateAtomInput
}>

export type CreateAtomMutation = { createAtom: __AtomFragment }

export type DeleteAtomMutationVariables = Exact<{
  input: DeleteAtomInput
}>

export type DeleteAtomMutation = { deleteAtom: __AtomFragment }

export type GetAtomQueryVariables = Exact<{
  input: GetAtomInput
}>

export type GetAtomQuery = { atom?: Maybe<__AtomFragment> }

export type GetAtomsQueryVariables = Exact<{ [key: string]: never }>

export type GetAtomsQuery = { atoms: Array<__AtomFragment> }

export type UpdateAtomMutationVariables = Exact<{
  input: UpdateAtomInput
}>

export type UpdateAtomMutation = { atom: __AtomFragment }

export type PageBaseFragment = Pick<Page, 'id' | 'name'> & {
  app: Pick<App, 'id' | 'name' | 'ownerId'>
}

export type PageFullFragment = {
  rootElement: PageElementRootFragment
} & PageBaseFragment

export type PageElementFragment = Pick<PageElement, 'id' | 'name'> & {
  atom?: Maybe<__AtomFragment>
}

export type PageElementRootFragment = Pick<PageElementRoot, 'id' | 'name'> & {
  atom?: Maybe<__AtomFragment>
  descendants: Array<PageElementFragment>
  links: Array<PageElementLinkFragment>
}

export type PageElementLinkFragment = Pick<
  PageElementLink,
  'from' | 'order' | 'to'
>

export type CreatePageMutationVariables = Exact<{
  input: CreatePageInput
}>

export type CreatePageMutation = { createPage: PageBaseFragment }

export type DeletePageMutationVariables = Exact<{
  input: DeletePageInput
}>

export type DeletePageMutation = { deletePage: Pick<Page, 'id'> }

export type GetPageQueryVariables = Exact<{
  input: GetPageInput
}>

export type GetPageQuery = { page?: Maybe<PageFullFragment> }

export type GetPagesQueryVariables = Exact<{
  input: GetPagesInput
}>

export type GetPagesQuery = { pages: Array<PageBaseFragment> }

export type CreatePageElementMutationVariables = Exact<{
  input: CreatePageElementInput
}>

export type CreatePageElementMutation = {
  createPageElement: PageElementFragment
}

export type DeletePageElementMutationVariables = Exact<{
  input: DeletePageElementInput
}>

export type DeletePageElementMutation = {
  deletePageElement: Pick<DeleteResponse, 'affected'>
}

export type GetPageElementQueryVariables = Exact<{
  input: GetPageElementInput
}>

export type GetPageElementQuery = {
  getPageElement?: Maybe<PageElementFragment>
}

export type GetPageElementRootQueryVariables = Exact<{
  input: GetPageElementRootInput
}>

export type GetPageElementRootQuery = {
  getPageElementRoot?: Maybe<PageElementRootFragment>
}

export type MovePageElementMutationVariables = Exact<{
  input: MovePageElementInput
}>

export type MovePageElementMutation = { movePageElement: PageElementFragment }

export type UpdatePageElementMutationVariables = Exact<{
  input: UpdatePageElementInput
}>

export type UpdatePageElementMutation = {
  updatePageElement: PageElementFragment
}

export type UpdatePageMutationVariables = Exact<{
  input: UpdatePageInput
}>

export type UpdatePageMutation = { updatePage: PageBaseFragment }

export type __PropFragment = Pick<Prop, 'description' | 'id' | 'key'> & {
  type: Pick<ValueType, 'id' | 'type' | 'label'>
  props?: Maybe<
    Array<
      Pick<Prop, 'description' | 'id' | 'key'> & {
        type: Pick<ValueType, 'id' | 'type' | 'label'>
      }
    >
  >
}

export type GetPropsQueryVariables = Exact<{ [key: string]: never }>

export type GetPropsQuery = { props: Array<__PropFragment> }

export type TestCreateFieldMutationVariables = Exact<{
  input: CreateFieldInput
}>

export type TestCreateFieldMutation = { createField: Test__FieldFragment }

export type TestCreateInterfaceMutationVariables = Exact<{
  input: CreateInterfaceInput
}>

export type TestCreateInterfaceMutation = {
  createInterface: Test__InterfaceFragment
}

export type TestDeleteFieldMutationVariables = Exact<{
  input: DeleteFieldInput
}>

export type TestDeleteFieldMutation = {
  deleteField: Pick<DeleteResponse, 'affected'>
}

export type TestDeleteInterfaceMutationVariables = Exact<{
  input: DeleteInterfaceInput
}>

export type TestDeleteInterfaceMutation = {
  deleteInterface: Pick<DeleteResponse, 'affected'>
}

export type TestGetFieldQueryVariables = Exact<{
  input: GetFieldInput
}>

export type TestGetFieldQuery = { getField?: Maybe<Test__FieldFragment> }

export type TestGetInterfaceQueryVariables = Exact<{
  input: GetInterfaceInput
}>

export type TestGetInterfaceQuery = {
  getInterface?: Maybe<Test__InterfaceFragment>
}

export type TestGetTypeQueryVariables = Exact<{
  input: GetTypeInput
}>

export type TestGetTypeQuery = {
  getType?: Maybe<
    | Test__Type_SimpleType_Fragment
    | Test__Type_ArrayType_Fragment
    | Test__Type_EnumType_Fragment
    | Test__Type_UnitType_Fragment
    | Test__Type_InterfaceType_Fragment
  >
}

export type Test__ArrayLengthValidatorFragment = Pick<
  ArrayLengthValidator,
  'id' | 'maxLength' | 'minLength'
>

export type Test__MinMaxValidatorFragment = Pick<
  MinMaxValidator,
  'id' | 'max' | 'min'
>

export type Test__RequiredValidatorFragment = Pick<
  RequiredValidator,
  'id' | 'isRequired'
>

type Test__Decorator_ArrayLengthValidator_Fragment = {
  __typename: 'ArrayLengthValidator'
} & Test__ArrayLengthValidatorFragment

type Test__Decorator_MinMaxValidator_Fragment = {
  __typename: 'MinMaxValidator'
} & Test__MinMaxValidatorFragment

type Test__Decorator_RequiredValidator_Fragment = {
  __typename: 'RequiredValidator'
} & Test__RequiredValidatorFragment

export type Test__DecoratorFragment =
  | Test__Decorator_ArrayLengthValidator_Fragment
  | Test__Decorator_MinMaxValidator_Fragment
  | Test__Decorator_RequiredValidator_Fragment

export type Test__FieldFragment = Pick<
  Field,
  'id' | 'key' | 'name' | 'typeId' | 'description'
> & {
  decorators: Array<
    | Test__Decorator_ArrayLengthValidator_Fragment
    | Test__Decorator_MinMaxValidator_Fragment
    | Test__Decorator_RequiredValidator_Fragment
  >
}

export type Test__ArrayTypeFragment = Pick<ArrayType, 'id' | 'typeId'>

export type Test__EnumTypeValueFragment = Pick<EnumTypeValue, 'id' | 'name'>

export type Test__EnumTypeFragment = Pick<EnumType, 'id'> & {
  allowedValues: Array<Test__EnumTypeValueFragment>
}

export type Test__InterfaceTypeFragment = Pick<InterfaceType, 'interfaceId'>

export type Test__SimpleTypeFragment = Pick<SimpleType, 'id' | 'primitiveType'>

export type Test__UnitTypeFragment = Pick<UnitType, 'id' | 'allowedUnits'>

type Test__Type_SimpleType_Fragment = {
  __typename: 'SimpleType'
} & Test__SimpleTypeFragment

type Test__Type_ArrayType_Fragment = {
  __typename: 'ArrayType'
} & Test__ArrayTypeFragment

type Test__Type_EnumType_Fragment = {
  __typename: 'EnumType'
} & Test__EnumTypeFragment

type Test__Type_UnitType_Fragment = {
  __typename: 'UnitType'
} & Test__UnitTypeFragment

type Test__Type_InterfaceType_Fragment = {
  __typename: 'InterfaceType'
} & Test__InterfaceTypeFragment

export type Test__TypeFragment =
  | Test__Type_SimpleType_Fragment
  | Test__Type_ArrayType_Fragment
  | Test__Type_EnumType_Fragment
  | Test__Type_UnitType_Fragment
  | Test__Type_InterfaceType_Fragment

export type Test__InterfaceFragment = Pick<Interface, 'id' | 'name'> & {
  fields: Array<Test__FieldFragment>
  types: Array<
    | Test__Type_SimpleType_Fragment
    | Test__Type_ArrayType_Fragment
    | Test__Type_EnumType_Fragment
    | Test__Type_UnitType_Fragment
    | Test__Type_InterfaceType_Fragment
  >
}

export type TestUpdateFieldMutationVariables = Exact<{
  input: UpdateFieldInput
}>

export type TestUpdateFieldMutation = { updateField: Test__FieldFragment }

export type TestUpdateInterfaceMutationVariables = Exact<{
  input: UpdateInterfaceInput
}>

export type TestUpdateInterfaceMutation = {
  updateInterface: Test__InterfaceFragment
}

export type __UserFragment = Pick<User, 'email' | 'name'> & {
  id: User['user_id']
}

export type DeleteUserMutationVariables = Exact<{
  input: DeleteUserInput
}>

export type DeleteUserMutation = Pick<Mutation, 'deleteUser'>

export type GetUsersQueryVariables = Exact<{
  input?: Maybe<GetUsersInput>
}>

export type GetUsersQuery = { users: Array<__UserFragment> }

export type GetValueTypesQueryVariables = Exact<{ [key: string]: never }>

export type GetValueTypesQuery = { valueTypes: Array<__ValueTypeFragment> }

export type __ValueTypeFragment = Pick<ValueType, 'id' | 'type' | 'label'>

export const __AppFragmentDoc = gql`
  fragment __App on App {
    id
    name
  }
`
export const PageBaseFragmentDoc = gql`
  fragment PageBase on Page {
    id
    name
    app {
      id
      name
      ownerId
    }
  }
`
export const __AtomFragmentDoc = gql`
  fragment __Atom on Atom {
    id
    label
    type
  }
`
export const PageElementFragmentDoc = gql`
  fragment PageElement on PageElement {
    id
    name
    atom {
      ...__Atom
    }
  }
  ${__AtomFragmentDoc}
`
export const PageElementLinkFragmentDoc = gql`
  fragment PageElementLink on PageElementLink {
    from
    order
    to
  }
`
export const PageElementRootFragmentDoc = gql`
  fragment PageElementRoot on PageElementRoot {
    id
    name
    atom {
      ...__Atom
    }
    descendants {
      ...PageElement
    }
    links {
      ...PageElementLink
    }
  }
  ${__AtomFragmentDoc}
  ${PageElementFragmentDoc}
  ${PageElementLinkFragmentDoc}
`
export const PageFullFragmentDoc = gql`
  fragment PageFull on Page {
    ...PageBase
    rootElement {
      ...PageElementRoot
    }
  }
  ${PageBaseFragmentDoc}
  ${PageElementRootFragmentDoc}
`
export const __PropFragmentDoc = gql`
  fragment __Prop on Prop {
    description
    id
    key
    type {
      id
      type
      label
    }
    props {
      description
      id
      key
      type {
        id
        type
        label
      }
    }
  }
`
export const Test__ArrayLengthValidatorFragmentDoc = gql`
  fragment Test__ArrayLengthValidator on ArrayLengthValidator {
    id
    maxLength
    minLength
  }
`
export const Test__MinMaxValidatorFragmentDoc = gql`
  fragment Test__MinMaxValidator on MinMaxValidator {
    id
    max
    min
  }
`
export const Test__RequiredValidatorFragmentDoc = gql`
  fragment Test__RequiredValidator on RequiredValidator {
    id
    isRequired
  }
`
export const Test__DecoratorFragmentDoc = gql`
  fragment Test__Decorator on Decorator {
    __typename
    ... on ArrayLengthValidator {
      ...Test__ArrayLengthValidator
    }
    ... on MinMaxValidator {
      ...Test__MinMaxValidator
    }
    ... on RequiredValidator {
      ...Test__RequiredValidator
    }
  }
  ${Test__ArrayLengthValidatorFragmentDoc}
  ${Test__MinMaxValidatorFragmentDoc}
  ${Test__RequiredValidatorFragmentDoc}
`
export const Test__FieldFragmentDoc = gql`
  fragment Test__Field on Field {
    id
    key
    name
    typeId
    description
    decorators {
      ...Test__Decorator
    }
  }
  ${Test__DecoratorFragmentDoc}
`
export const Test__ArrayTypeFragmentDoc = gql`
  fragment Test__ArrayType on ArrayType {
    id
    typeId
  }
`
export const Test__EnumTypeValueFragmentDoc = gql`
  fragment Test__EnumTypeValue on EnumTypeValue {
    id
    name
  }
`
export const Test__EnumTypeFragmentDoc = gql`
  fragment Test__EnumType on EnumType {
    id
    allowedValues {
      ...Test__EnumTypeValue
    }
  }
  ${Test__EnumTypeValueFragmentDoc}
`
export const Test__InterfaceTypeFragmentDoc = gql`
  fragment Test__InterfaceType on InterfaceType {
    interfaceId
  }
`
export const Test__SimpleTypeFragmentDoc = gql`
  fragment Test__SimpleType on SimpleType {
    id
    primitiveType
  }
`
export const Test__UnitTypeFragmentDoc = gql`
  fragment Test__UnitType on UnitType {
    id
    allowedUnits
  }
`
export const Test__TypeFragmentDoc = gql`
  fragment Test__Type on Type {
    __typename
    ... on ArrayType {
      ...Test__ArrayType
    }
    ... on EnumType {
      ...Test__EnumType
    }
    ... on InterfaceType {
      ...Test__InterfaceType
    }
    ... on SimpleType {
      ...Test__SimpleType
    }
    ... on UnitType {
      ...Test__UnitType
    }
  }
  ${Test__ArrayTypeFragmentDoc}
  ${Test__EnumTypeFragmentDoc}
  ${Test__InterfaceTypeFragmentDoc}
  ${Test__SimpleTypeFragmentDoc}
  ${Test__UnitTypeFragmentDoc}
`
export const Test__InterfaceFragmentDoc = gql`
  fragment Test__Interface on Interface {
    id
    name
    fields {
      ...Test__Field
    }
    types {
      ...Test__Type
    }
  }
  ${Test__FieldFragmentDoc}
  ${Test__TypeFragmentDoc}
`
export const __UserFragmentDoc = gql`
  fragment __User on User {
    id: user_id
    email
    name
  }
`
export const __ValueTypeFragmentDoc = gql`
  fragment __ValueType on ValueType {
    id
    type
    label
  }
`
export const CreateAppGql = gql`
  mutation CreateApp($input: CreateAppInput!) {
    createApp(input: $input) {
      ...__App
    }
  }
  ${__AppFragmentDoc}
`
export type CreateAppMutationFn = Apollo.MutationFunction<
  CreateAppMutation,
  CreateAppMutationVariables
>

/**
 * __useCreateAppMutation__
 *
 * To run a mutation, you first call `useCreateAppMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAppMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAppMutation, { data, loading, error }] = useCreateAppMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAppMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateAppMutation,
    CreateAppMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateAppMutation, CreateAppMutationVariables>(
    CreateAppGql,
    options,
  )
}
export type CreateAppMutationHookResult = ReturnType<
  typeof useCreateAppMutation
>
export type CreateAppMutationResult = Apollo.MutationResult<CreateAppMutation>
export type CreateAppMutationOptions = Apollo.BaseMutationOptions<
  CreateAppMutation,
  CreateAppMutationVariables
>
export const DeleteAppGql = gql`
  mutation DeleteApp($input: DeleteAppInput!) {
    deleteApp(input: $input) {
      id
    }
  }
`
export type DeleteAppMutationFn = Apollo.MutationFunction<
  DeleteAppMutation,
  DeleteAppMutationVariables
>

/**
 * __useDeleteAppMutation__
 *
 * To run a mutation, you first call `useDeleteAppMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAppMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAppMutation, { data, loading, error }] = useDeleteAppMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteAppMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteAppMutation,
    DeleteAppMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteAppMutation, DeleteAppMutationVariables>(
    DeleteAppGql,
    options,
  )
}
export type DeleteAppMutationHookResult = ReturnType<
  typeof useDeleteAppMutation
>
export type DeleteAppMutationResult = Apollo.MutationResult<DeleteAppMutation>
export type DeleteAppMutationOptions = Apollo.BaseMutationOptions<
  DeleteAppMutation,
  DeleteAppMutationVariables
>
export const GetAppGql = gql`
  query GetApp($input: GetAppInput!) {
    app: getApp(input: $input) {
      ...__App
    }
  }
  ${__AppFragmentDoc}
`

/**
 * __useGetAppQuery__
 *
 * To run a query within a React component, call `useGetAppQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAppQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAppQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetAppQuery(
  baseOptions: Apollo.QueryHookOptions<GetAppQuery, GetAppQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetAppQuery, GetAppQueryVariables>(GetAppGql, options)
}
export function useGetAppLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetAppQuery, GetAppQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetAppQuery, GetAppQueryVariables>(
    GetAppGql,
    options,
  )
}
export type GetAppQueryHookResult = ReturnType<typeof useGetAppQuery>
export type GetAppLazyQueryHookResult = ReturnType<typeof useGetAppLazyQuery>
export type GetAppQueryResult = Apollo.QueryResult<
  GetAppQuery,
  GetAppQueryVariables
>
export function refetchGetAppQuery(variables?: GetAppQueryVariables) {
  return { query: GetAppGql, variables: variables }
}
export const GetAppsGql = gql`
  query GetApps {
    apps: getApps {
      ...__App
    }
  }
  ${__AppFragmentDoc}
`

/**
 * __useGetAppsQuery__
 *
 * To run a query within a React component, call `useGetAppsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAppsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAppsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAppsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetAppsQuery, GetAppsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetAppsQuery, GetAppsQueryVariables>(
    GetAppsGql,
    options,
  )
}
export function useGetAppsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAppsQuery,
    GetAppsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetAppsQuery, GetAppsQueryVariables>(
    GetAppsGql,
    options,
  )
}
export type GetAppsQueryHookResult = ReturnType<typeof useGetAppsQuery>
export type GetAppsLazyQueryHookResult = ReturnType<typeof useGetAppsLazyQuery>
export type GetAppsQueryResult = Apollo.QueryResult<
  GetAppsQuery,
  GetAppsQueryVariables
>
export function refetchGetAppsQuery(variables?: GetAppsQueryVariables) {
  return { query: GetAppsGql, variables: variables }
}
export const UpdateAppGql = gql`
  mutation UpdateApp($input: UpdateAppInput!) {
    app: updateApp(input: $input) {
      ...__App
    }
  }
  ${__AppFragmentDoc}
`
export type UpdateAppMutationFn = Apollo.MutationFunction<
  UpdateAppMutation,
  UpdateAppMutationVariables
>

/**
 * __useUpdateAppMutation__
 *
 * To run a mutation, you first call `useUpdateAppMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAppMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAppMutation, { data, loading, error }] = useUpdateAppMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAppMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateAppMutation,
    UpdateAppMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateAppMutation, UpdateAppMutationVariables>(
    UpdateAppGql,
    options,
  )
}
export type UpdateAppMutationHookResult = ReturnType<
  typeof useUpdateAppMutation
>
export type UpdateAppMutationResult = Apollo.MutationResult<UpdateAppMutation>
export type UpdateAppMutationOptions = Apollo.BaseMutationOptions<
  UpdateAppMutation,
  UpdateAppMutationVariables
>
export const CreateTestAtomGql = gql`
  mutation CreateTestAtom($input: CreateAtomInput!) {
    createAtom(input: $input) {
      id
      label
    }
  }
`
export type CreateTestAtomMutationFn = Apollo.MutationFunction<
  CreateTestAtomMutation,
  CreateTestAtomMutationVariables
>

/**
 * __useCreateTestAtomMutation__
 *
 * To run a mutation, you first call `useCreateTestAtomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTestAtomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTestAtomMutation, { data, loading, error }] = useCreateTestAtomMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTestAtomMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateTestAtomMutation,
    CreateTestAtomMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateTestAtomMutation,
    CreateTestAtomMutationVariables
  >(CreateTestAtomGql, options)
}
export type CreateTestAtomMutationHookResult = ReturnType<
  typeof useCreateTestAtomMutation
>
export type CreateTestAtomMutationResult =
  Apollo.MutationResult<CreateTestAtomMutation>
export type CreateTestAtomMutationOptions = Apollo.BaseMutationOptions<
  CreateTestAtomMutation,
  CreateTestAtomMutationVariables
>
export const CreateAtomGql = gql`
  mutation CreateAtom($input: CreateAtomInput!) {
    createAtom(input: $input) {
      ...__Atom
    }
  }
  ${__AtomFragmentDoc}
`
export type CreateAtomMutationFn = Apollo.MutationFunction<
  CreateAtomMutation,
  CreateAtomMutationVariables
>

/**
 * __useCreateAtomMutation__
 *
 * To run a mutation, you first call `useCreateAtomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAtomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAtomMutation, { data, loading, error }] = useCreateAtomMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAtomMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateAtomMutation,
    CreateAtomMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateAtomMutation, CreateAtomMutationVariables>(
    CreateAtomGql,
    options,
  )
}
export type CreateAtomMutationHookResult = ReturnType<
  typeof useCreateAtomMutation
>
export type CreateAtomMutationResult = Apollo.MutationResult<CreateAtomMutation>
export type CreateAtomMutationOptions = Apollo.BaseMutationOptions<
  CreateAtomMutation,
  CreateAtomMutationVariables
>
export const DeleteAtomGql = gql`
  mutation DeleteAtom($input: DeleteAtomInput!) {
    deleteAtom(input: $input) {
      ...__Atom
    }
  }
  ${__AtomFragmentDoc}
`
export type DeleteAtomMutationFn = Apollo.MutationFunction<
  DeleteAtomMutation,
  DeleteAtomMutationVariables
>

/**
 * __useDeleteAtomMutation__
 *
 * To run a mutation, you first call `useDeleteAtomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAtomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAtomMutation, { data, loading, error }] = useDeleteAtomMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteAtomMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteAtomMutation,
    DeleteAtomMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteAtomMutation, DeleteAtomMutationVariables>(
    DeleteAtomGql,
    options,
  )
}
export type DeleteAtomMutationHookResult = ReturnType<
  typeof useDeleteAtomMutation
>
export type DeleteAtomMutationResult = Apollo.MutationResult<DeleteAtomMutation>
export type DeleteAtomMutationOptions = Apollo.BaseMutationOptions<
  DeleteAtomMutation,
  DeleteAtomMutationVariables
>
export const GetAtomGql = gql`
  query GetAtom($input: GetAtomInput!) {
    atom: getAtom(input: $input) {
      ...__Atom
    }
  }
  ${__AtomFragmentDoc}
`

/**
 * __useGetAtomQuery__
 *
 * To run a query within a React component, call `useGetAtomQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAtomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAtomQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetAtomQuery(
  baseOptions: Apollo.QueryHookOptions<GetAtomQuery, GetAtomQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetAtomQuery, GetAtomQueryVariables>(
    GetAtomGql,
    options,
  )
}
export function useGetAtomLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAtomQuery,
    GetAtomQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetAtomQuery, GetAtomQueryVariables>(
    GetAtomGql,
    options,
  )
}
export type GetAtomQueryHookResult = ReturnType<typeof useGetAtomQuery>
export type GetAtomLazyQueryHookResult = ReturnType<typeof useGetAtomLazyQuery>
export type GetAtomQueryResult = Apollo.QueryResult<
  GetAtomQuery,
  GetAtomQueryVariables
>
export function refetchGetAtomQuery(variables?: GetAtomQueryVariables) {
  return { query: GetAtomGql, variables: variables }
}
export const GetAtomsGql = gql`
  query GetAtoms {
    atoms: getAtoms {
      ...__Atom
    }
  }
  ${__AtomFragmentDoc}
`

/**
 * __useGetAtomsQuery__
 *
 * To run a query within a React component, call `useGetAtomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAtomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAtomsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAtomsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetAtomsQuery, GetAtomsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetAtomsQuery, GetAtomsQueryVariables>(
    GetAtomsGql,
    options,
  )
}
export function useGetAtomsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAtomsQuery,
    GetAtomsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetAtomsQuery, GetAtomsQueryVariables>(
    GetAtomsGql,
    options,
  )
}
export type GetAtomsQueryHookResult = ReturnType<typeof useGetAtomsQuery>
export type GetAtomsLazyQueryHookResult = ReturnType<
  typeof useGetAtomsLazyQuery
>
export type GetAtomsQueryResult = Apollo.QueryResult<
  GetAtomsQuery,
  GetAtomsQueryVariables
>
export function refetchGetAtomsQuery(variables?: GetAtomsQueryVariables) {
  return { query: GetAtomsGql, variables: variables }
}
export const UpdateAtomGql = gql`
  mutation UpdateAtom($input: UpdateAtomInput!) {
    atom: updateAtom(input: $input) {
      ...__Atom
    }
  }
  ${__AtomFragmentDoc}
`
export type UpdateAtomMutationFn = Apollo.MutationFunction<
  UpdateAtomMutation,
  UpdateAtomMutationVariables
>

/**
 * __useUpdateAtomMutation__
 *
 * To run a mutation, you first call `useUpdateAtomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAtomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAtomMutation, { data, loading, error }] = useUpdateAtomMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAtomMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateAtomMutation,
    UpdateAtomMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateAtomMutation, UpdateAtomMutationVariables>(
    UpdateAtomGql,
    options,
  )
}
export type UpdateAtomMutationHookResult = ReturnType<
  typeof useUpdateAtomMutation
>
export type UpdateAtomMutationResult = Apollo.MutationResult<UpdateAtomMutation>
export type UpdateAtomMutationOptions = Apollo.BaseMutationOptions<
  UpdateAtomMutation,
  UpdateAtomMutationVariables
>
export const CreatePageGql = gql`
  mutation CreatePage($input: CreatePageInput!) {
    createPage(input: $input) {
      ...PageBase
    }
  }
  ${PageBaseFragmentDoc}
`
export type CreatePageMutationFn = Apollo.MutationFunction<
  CreatePageMutation,
  CreatePageMutationVariables
>

/**
 * __useCreatePageMutation__
 *
 * To run a mutation, you first call `useCreatePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPageMutation, { data, loading, error }] = useCreatePageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreatePageMutation,
    CreatePageMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreatePageMutation, CreatePageMutationVariables>(
    CreatePageGql,
    options,
  )
}
export type CreatePageMutationHookResult = ReturnType<
  typeof useCreatePageMutation
>
export type CreatePageMutationResult = Apollo.MutationResult<CreatePageMutation>
export type CreatePageMutationOptions = Apollo.BaseMutationOptions<
  CreatePageMutation,
  CreatePageMutationVariables
>
export const DeletePageGql = gql`
  mutation DeletePage($input: DeletePageInput!) {
    deletePage(input: $input) {
      id
    }
  }
`
export type DeletePageMutationFn = Apollo.MutationFunction<
  DeletePageMutation,
  DeletePageMutationVariables
>

/**
 * __useDeletePageMutation__
 *
 * To run a mutation, you first call `useDeletePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePageMutation, { data, loading, error }] = useDeletePageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeletePageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeletePageMutation,
    DeletePageMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeletePageMutation, DeletePageMutationVariables>(
    DeletePageGql,
    options,
  )
}
export type DeletePageMutationHookResult = ReturnType<
  typeof useDeletePageMutation
>
export type DeletePageMutationResult = Apollo.MutationResult<DeletePageMutation>
export type DeletePageMutationOptions = Apollo.BaseMutationOptions<
  DeletePageMutation,
  DeletePageMutationVariables
>
export const GetPageGql = gql`
  query GetPage($input: GetPageInput!) {
    page: getPage(input: $input) {
      ...PageFull
    }
  }
  ${PageFullFragmentDoc}
`

/**
 * __useGetPageQuery__
 *
 * To run a query within a React component, call `useGetPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPageQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetPageQuery(
  baseOptions: Apollo.QueryHookOptions<GetPageQuery, GetPageQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPageQuery, GetPageQueryVariables>(
    GetPageGql,
    options,
  )
}
export function useGetPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPageQuery,
    GetPageQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPageQuery, GetPageQueryVariables>(
    GetPageGql,
    options,
  )
}
export type GetPageQueryHookResult = ReturnType<typeof useGetPageQuery>
export type GetPageLazyQueryHookResult = ReturnType<typeof useGetPageLazyQuery>
export type GetPageQueryResult = Apollo.QueryResult<
  GetPageQuery,
  GetPageQueryVariables
>
export function refetchGetPageQuery(variables?: GetPageQueryVariables) {
  return { query: GetPageGql, variables: variables }
}
export const GetPagesGql = gql`
  query GetPages($input: GetPagesInput!) {
    pages: getPages(input: $input) {
      ...PageBase
    }
  }
  ${PageBaseFragmentDoc}
`

/**
 * __useGetPagesQuery__
 *
 * To run a query within a React component, call `useGetPagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPagesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetPagesQuery(
  baseOptions: Apollo.QueryHookOptions<GetPagesQuery, GetPagesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPagesQuery, GetPagesQueryVariables>(
    GetPagesGql,
    options,
  )
}
export function useGetPagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPagesQuery,
    GetPagesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPagesQuery, GetPagesQueryVariables>(
    GetPagesGql,
    options,
  )
}
export type GetPagesQueryHookResult = ReturnType<typeof useGetPagesQuery>
export type GetPagesLazyQueryHookResult = ReturnType<
  typeof useGetPagesLazyQuery
>
export type GetPagesQueryResult = Apollo.QueryResult<
  GetPagesQuery,
  GetPagesQueryVariables
>
export function refetchGetPagesQuery(variables?: GetPagesQueryVariables) {
  return { query: GetPagesGql, variables: variables }
}
export const CreatePageElementGql = gql`
  mutation CreatePageElement($input: CreatePageElementInput!) {
    createPageElement(input: $input) {
      ...PageElement
    }
  }
  ${PageElementFragmentDoc}
`
export type CreatePageElementMutationFn = Apollo.MutationFunction<
  CreatePageElementMutation,
  CreatePageElementMutationVariables
>

/**
 * __useCreatePageElementMutation__
 *
 * To run a mutation, you first call `useCreatePageElementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePageElementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPageElementMutation, { data, loading, error }] = useCreatePageElementMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePageElementMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreatePageElementMutation,
    CreatePageElementMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreatePageElementMutation,
    CreatePageElementMutationVariables
  >(CreatePageElementGql, options)
}
export type CreatePageElementMutationHookResult = ReturnType<
  typeof useCreatePageElementMutation
>
export type CreatePageElementMutationResult =
  Apollo.MutationResult<CreatePageElementMutation>
export type CreatePageElementMutationOptions = Apollo.BaseMutationOptions<
  CreatePageElementMutation,
  CreatePageElementMutationVariables
>
export const DeletePageElementGql = gql`
  mutation DeletePageElement($input: DeletePageElementInput!) {
    deletePageElement(input: $input) {
      affected
    }
  }
`
export type DeletePageElementMutationFn = Apollo.MutationFunction<
  DeletePageElementMutation,
  DeletePageElementMutationVariables
>

/**
 * __useDeletePageElementMutation__
 *
 * To run a mutation, you first call `useDeletePageElementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePageElementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePageElementMutation, { data, loading, error }] = useDeletePageElementMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeletePageElementMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeletePageElementMutation,
    DeletePageElementMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    DeletePageElementMutation,
    DeletePageElementMutationVariables
  >(DeletePageElementGql, options)
}
export type DeletePageElementMutationHookResult = ReturnType<
  typeof useDeletePageElementMutation
>
export type DeletePageElementMutationResult =
  Apollo.MutationResult<DeletePageElementMutation>
export type DeletePageElementMutationOptions = Apollo.BaseMutationOptions<
  DeletePageElementMutation,
  DeletePageElementMutationVariables
>
export const GetPageElementGql = gql`
  query GetPageElement($input: GetPageElementInput!) {
    getPageElement(input: $input) {
      ...PageElement
    }
  }
  ${PageElementFragmentDoc}
`

/**
 * __useGetPageElementQuery__
 *
 * To run a query within a React component, call `useGetPageElementQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPageElementQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPageElementQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetPageElementQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetPageElementQuery,
    GetPageElementQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPageElementQuery, GetPageElementQueryVariables>(
    GetPageElementGql,
    options,
  )
}
export function useGetPageElementLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPageElementQuery,
    GetPageElementQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPageElementQuery, GetPageElementQueryVariables>(
    GetPageElementGql,
    options,
  )
}
export type GetPageElementQueryHookResult = ReturnType<
  typeof useGetPageElementQuery
>
export type GetPageElementLazyQueryHookResult = ReturnType<
  typeof useGetPageElementLazyQuery
>
export type GetPageElementQueryResult = Apollo.QueryResult<
  GetPageElementQuery,
  GetPageElementQueryVariables
>
export function refetchGetPageElementQuery(
  variables?: GetPageElementQueryVariables,
) {
  return { query: GetPageElementGql, variables: variables }
}
export const GetPageElementRootGql = gql`
  query GetPageElementRoot($input: GetPageElementRootInput!) {
    getPageElementRoot(input: $input) {
      ...PageElementRoot
    }
  }
  ${PageElementRootFragmentDoc}
`

/**
 * __useGetPageElementRootQuery__
 *
 * To run a query within a React component, call `useGetPageElementRootQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPageElementRootQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPageElementRootQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetPageElementRootQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetPageElementRootQuery,
    GetPageElementRootQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    GetPageElementRootQuery,
    GetPageElementRootQueryVariables
  >(GetPageElementRootGql, options)
}
export function useGetPageElementRootLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPageElementRootQuery,
    GetPageElementRootQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetPageElementRootQuery,
    GetPageElementRootQueryVariables
  >(GetPageElementRootGql, options)
}
export type GetPageElementRootQueryHookResult = ReturnType<
  typeof useGetPageElementRootQuery
>
export type GetPageElementRootLazyQueryHookResult = ReturnType<
  typeof useGetPageElementRootLazyQuery
>
export type GetPageElementRootQueryResult = Apollo.QueryResult<
  GetPageElementRootQuery,
  GetPageElementRootQueryVariables
>
export function refetchGetPageElementRootQuery(
  variables?: GetPageElementRootQueryVariables,
) {
  return { query: GetPageElementRootGql, variables: variables }
}
export const MovePageElementGql = gql`
  mutation MovePageElement($input: MovePageElementInput!) {
    movePageElement(input: $input) {
      ...PageElement
    }
  }
  ${PageElementFragmentDoc}
`
export type MovePageElementMutationFn = Apollo.MutationFunction<
  MovePageElementMutation,
  MovePageElementMutationVariables
>

/**
 * __useMovePageElementMutation__
 *
 * To run a mutation, you first call `useMovePageElementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMovePageElementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [movePageElementMutation, { data, loading, error }] = useMovePageElementMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMovePageElementMutation(
  baseOptions?: Apollo.MutationHookOptions<
    MovePageElementMutation,
    MovePageElementMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    MovePageElementMutation,
    MovePageElementMutationVariables
  >(MovePageElementGql, options)
}
export type MovePageElementMutationHookResult = ReturnType<
  typeof useMovePageElementMutation
>
export type MovePageElementMutationResult =
  Apollo.MutationResult<MovePageElementMutation>
export type MovePageElementMutationOptions = Apollo.BaseMutationOptions<
  MovePageElementMutation,
  MovePageElementMutationVariables
>
export const UpdatePageElementGql = gql`
  mutation UpdatePageElement($input: UpdatePageElementInput!) {
    updatePageElement(input: $input) {
      ...PageElement
    }
  }
  ${PageElementFragmentDoc}
`
export type UpdatePageElementMutationFn = Apollo.MutationFunction<
  UpdatePageElementMutation,
  UpdatePageElementMutationVariables
>

/**
 * __useUpdatePageElementMutation__
 *
 * To run a mutation, you first call `useUpdatePageElementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePageElementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePageElementMutation, { data, loading, error }] = useUpdatePageElementMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePageElementMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdatePageElementMutation,
    UpdatePageElementMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdatePageElementMutation,
    UpdatePageElementMutationVariables
  >(UpdatePageElementGql, options)
}
export type UpdatePageElementMutationHookResult = ReturnType<
  typeof useUpdatePageElementMutation
>
export type UpdatePageElementMutationResult =
  Apollo.MutationResult<UpdatePageElementMutation>
export type UpdatePageElementMutationOptions = Apollo.BaseMutationOptions<
  UpdatePageElementMutation,
  UpdatePageElementMutationVariables
>
export const UpdatePageGql = gql`
  mutation UpdatePage($input: UpdatePageInput!) {
    updatePage(input: $input) {
      ...PageBase
    }
  }
  ${PageBaseFragmentDoc}
`
export type UpdatePageMutationFn = Apollo.MutationFunction<
  UpdatePageMutation,
  UpdatePageMutationVariables
>

/**
 * __useUpdatePageMutation__
 *
 * To run a mutation, you first call `useUpdatePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePageMutation, { data, loading, error }] = useUpdatePageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdatePageMutation,
    UpdatePageMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdatePageMutation, UpdatePageMutationVariables>(
    UpdatePageGql,
    options,
  )
}
export type UpdatePageMutationHookResult = ReturnType<
  typeof useUpdatePageMutation
>
export type UpdatePageMutationResult = Apollo.MutationResult<UpdatePageMutation>
export type UpdatePageMutationOptions = Apollo.BaseMutationOptions<
  UpdatePageMutation,
  UpdatePageMutationVariables
>
export const GetPropsGql = gql`
  query GetProps {
    props: getProps {
      ...__Prop
    }
  }
  ${__PropFragmentDoc}
`

/**
 * __useGetPropsQuery__
 *
 * To run a query within a React component, call `useGetPropsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPropsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPropsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPropsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetPropsQuery, GetPropsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPropsQuery, GetPropsQueryVariables>(
    GetPropsGql,
    options,
  )
}
export function useGetPropsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPropsQuery,
    GetPropsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPropsQuery, GetPropsQueryVariables>(
    GetPropsGql,
    options,
  )
}
export type GetPropsQueryHookResult = ReturnType<typeof useGetPropsQuery>
export type GetPropsLazyQueryHookResult = ReturnType<
  typeof useGetPropsLazyQuery
>
export type GetPropsQueryResult = Apollo.QueryResult<
  GetPropsQuery,
  GetPropsQueryVariables
>
export function refetchGetPropsQuery(variables?: GetPropsQueryVariables) {
  return { query: GetPropsGql, variables: variables }
}
export const TestCreateFieldGql = gql`
  mutation TestCreateField($input: CreateFieldInput!) {
    createField(input: $input) {
      ...Test__Field
    }
  }
  ${Test__FieldFragmentDoc}
`
export type TestCreateFieldMutationFn = Apollo.MutationFunction<
  TestCreateFieldMutation,
  TestCreateFieldMutationVariables
>

/**
 * __useTestCreateFieldMutation__
 *
 * To run a mutation, you first call `useTestCreateFieldMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestCreateFieldMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testCreateFieldMutation, { data, loading, error }] = useTestCreateFieldMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestCreateFieldMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TestCreateFieldMutation,
    TestCreateFieldMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    TestCreateFieldMutation,
    TestCreateFieldMutationVariables
  >(TestCreateFieldGql, options)
}
export type TestCreateFieldMutationHookResult = ReturnType<
  typeof useTestCreateFieldMutation
>
export type TestCreateFieldMutationResult =
  Apollo.MutationResult<TestCreateFieldMutation>
export type TestCreateFieldMutationOptions = Apollo.BaseMutationOptions<
  TestCreateFieldMutation,
  TestCreateFieldMutationVariables
>
export const TestCreateInterfaceGql = gql`
  mutation TestCreateInterface($input: CreateInterfaceInput!) {
    createInterface(input: $input) {
      ...Test__Interface
    }
  }
  ${Test__InterfaceFragmentDoc}
`
export type TestCreateInterfaceMutationFn = Apollo.MutationFunction<
  TestCreateInterfaceMutation,
  TestCreateInterfaceMutationVariables
>

/**
 * __useTestCreateInterfaceMutation__
 *
 * To run a mutation, you first call `useTestCreateInterfaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestCreateInterfaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testCreateInterfaceMutation, { data, loading, error }] = useTestCreateInterfaceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestCreateInterfaceMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TestCreateInterfaceMutation,
    TestCreateInterfaceMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    TestCreateInterfaceMutation,
    TestCreateInterfaceMutationVariables
  >(TestCreateInterfaceGql, options)
}
export type TestCreateInterfaceMutationHookResult = ReturnType<
  typeof useTestCreateInterfaceMutation
>
export type TestCreateInterfaceMutationResult =
  Apollo.MutationResult<TestCreateInterfaceMutation>
export type TestCreateInterfaceMutationOptions = Apollo.BaseMutationOptions<
  TestCreateInterfaceMutation,
  TestCreateInterfaceMutationVariables
>
export const TestDeleteFieldGql = gql`
  mutation TestDeleteField($input: DeleteFieldInput!) {
    deleteField(input: $input) {
      affected
    }
  }
`
export type TestDeleteFieldMutationFn = Apollo.MutationFunction<
  TestDeleteFieldMutation,
  TestDeleteFieldMutationVariables
>

/**
 * __useTestDeleteFieldMutation__
 *
 * To run a mutation, you first call `useTestDeleteFieldMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestDeleteFieldMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testDeleteFieldMutation, { data, loading, error }] = useTestDeleteFieldMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestDeleteFieldMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TestDeleteFieldMutation,
    TestDeleteFieldMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    TestDeleteFieldMutation,
    TestDeleteFieldMutationVariables
  >(TestDeleteFieldGql, options)
}
export type TestDeleteFieldMutationHookResult = ReturnType<
  typeof useTestDeleteFieldMutation
>
export type TestDeleteFieldMutationResult =
  Apollo.MutationResult<TestDeleteFieldMutation>
export type TestDeleteFieldMutationOptions = Apollo.BaseMutationOptions<
  TestDeleteFieldMutation,
  TestDeleteFieldMutationVariables
>
export const TestDeleteInterfaceGql = gql`
  mutation TestDeleteInterface($input: DeleteInterfaceInput!) {
    deleteInterface(input: $input) {
      affected
    }
  }
`
export type TestDeleteInterfaceMutationFn = Apollo.MutationFunction<
  TestDeleteInterfaceMutation,
  TestDeleteInterfaceMutationVariables
>

/**
 * __useTestDeleteInterfaceMutation__
 *
 * To run a mutation, you first call `useTestDeleteInterfaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestDeleteInterfaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testDeleteInterfaceMutation, { data, loading, error }] = useTestDeleteInterfaceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestDeleteInterfaceMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TestDeleteInterfaceMutation,
    TestDeleteInterfaceMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    TestDeleteInterfaceMutation,
    TestDeleteInterfaceMutationVariables
  >(TestDeleteInterfaceGql, options)
}
export type TestDeleteInterfaceMutationHookResult = ReturnType<
  typeof useTestDeleteInterfaceMutation
>
export type TestDeleteInterfaceMutationResult =
  Apollo.MutationResult<TestDeleteInterfaceMutation>
export type TestDeleteInterfaceMutationOptions = Apollo.BaseMutationOptions<
  TestDeleteInterfaceMutation,
  TestDeleteInterfaceMutationVariables
>
export const TestGetFieldGql = gql`
  query TestGetField($input: GetFieldInput!) {
    getField(input: $input) {
      ...Test__Field
    }
  }
  ${Test__FieldFragmentDoc}
`

/**
 * __useTestGetFieldQuery__
 *
 * To run a query within a React component, call `useTestGetFieldQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestGetFieldQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestGetFieldQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestGetFieldQuery(
  baseOptions: Apollo.QueryHookOptions<
    TestGetFieldQuery,
    TestGetFieldQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<TestGetFieldQuery, TestGetFieldQueryVariables>(
    TestGetFieldGql,
    options,
  )
}
export function useTestGetFieldLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TestGetFieldQuery,
    TestGetFieldQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<TestGetFieldQuery, TestGetFieldQueryVariables>(
    TestGetFieldGql,
    options,
  )
}
export type TestGetFieldQueryHookResult = ReturnType<
  typeof useTestGetFieldQuery
>
export type TestGetFieldLazyQueryHookResult = ReturnType<
  typeof useTestGetFieldLazyQuery
>
export type TestGetFieldQueryResult = Apollo.QueryResult<
  TestGetFieldQuery,
  TestGetFieldQueryVariables
>
export function refetchTestGetFieldQuery(
  variables?: TestGetFieldQueryVariables,
) {
  return { query: TestGetFieldGql, variables: variables }
}
export const TestGetInterfaceGql = gql`
  query TestGetInterface($input: GetInterfaceInput!) {
    getInterface(input: $input) {
      ...Test__Interface
    }
  }
  ${Test__InterfaceFragmentDoc}
`

/**
 * __useTestGetInterfaceQuery__
 *
 * To run a query within a React component, call `useTestGetInterfaceQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestGetInterfaceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestGetInterfaceQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestGetInterfaceQuery(
  baseOptions: Apollo.QueryHookOptions<
    TestGetInterfaceQuery,
    TestGetInterfaceQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<TestGetInterfaceQuery, TestGetInterfaceQueryVariables>(
    TestGetInterfaceGql,
    options,
  )
}
export function useTestGetInterfaceLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TestGetInterfaceQuery,
    TestGetInterfaceQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    TestGetInterfaceQuery,
    TestGetInterfaceQueryVariables
  >(TestGetInterfaceGql, options)
}
export type TestGetInterfaceQueryHookResult = ReturnType<
  typeof useTestGetInterfaceQuery
>
export type TestGetInterfaceLazyQueryHookResult = ReturnType<
  typeof useTestGetInterfaceLazyQuery
>
export type TestGetInterfaceQueryResult = Apollo.QueryResult<
  TestGetInterfaceQuery,
  TestGetInterfaceQueryVariables
>
export function refetchTestGetInterfaceQuery(
  variables?: TestGetInterfaceQueryVariables,
) {
  return { query: TestGetInterfaceGql, variables: variables }
}
export const TestGetTypeGql = gql`
  query TestGetType($input: GetTypeInput!) {
    getType(input: $input) {
      ...Test__Type
    }
  }
  ${Test__TypeFragmentDoc}
`

/**
 * __useTestGetTypeQuery__
 *
 * To run a query within a React component, call `useTestGetTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestGetTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestGetTypeQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestGetTypeQuery(
  baseOptions: Apollo.QueryHookOptions<
    TestGetTypeQuery,
    TestGetTypeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<TestGetTypeQuery, TestGetTypeQueryVariables>(
    TestGetTypeGql,
    options,
  )
}
export function useTestGetTypeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TestGetTypeQuery,
    TestGetTypeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<TestGetTypeQuery, TestGetTypeQueryVariables>(
    TestGetTypeGql,
    options,
  )
}
export type TestGetTypeQueryHookResult = ReturnType<typeof useTestGetTypeQuery>
export type TestGetTypeLazyQueryHookResult = ReturnType<
  typeof useTestGetTypeLazyQuery
>
export type TestGetTypeQueryResult = Apollo.QueryResult<
  TestGetTypeQuery,
  TestGetTypeQueryVariables
>
export function refetchTestGetTypeQuery(variables?: TestGetTypeQueryVariables) {
  return { query: TestGetTypeGql, variables: variables }
}
export const TestUpdateFieldGql = gql`
  mutation TestUpdateField($input: UpdateFieldInput!) {
    updateField(input: $input) {
      ...Test__Field
    }
  }
  ${Test__FieldFragmentDoc}
`
export type TestUpdateFieldMutationFn = Apollo.MutationFunction<
  TestUpdateFieldMutation,
  TestUpdateFieldMutationVariables
>

/**
 * __useTestUpdateFieldMutation__
 *
 * To run a mutation, you first call `useTestUpdateFieldMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestUpdateFieldMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testUpdateFieldMutation, { data, loading, error }] = useTestUpdateFieldMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestUpdateFieldMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TestUpdateFieldMutation,
    TestUpdateFieldMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    TestUpdateFieldMutation,
    TestUpdateFieldMutationVariables
  >(TestUpdateFieldGql, options)
}
export type TestUpdateFieldMutationHookResult = ReturnType<
  typeof useTestUpdateFieldMutation
>
export type TestUpdateFieldMutationResult =
  Apollo.MutationResult<TestUpdateFieldMutation>
export type TestUpdateFieldMutationOptions = Apollo.BaseMutationOptions<
  TestUpdateFieldMutation,
  TestUpdateFieldMutationVariables
>
export const TestUpdateInterfaceGql = gql`
  mutation TestUpdateInterface($input: UpdateInterfaceInput!) {
    updateInterface(input: $input) {
      ...Test__Interface
    }
  }
  ${Test__InterfaceFragmentDoc}
`
export type TestUpdateInterfaceMutationFn = Apollo.MutationFunction<
  TestUpdateInterfaceMutation,
  TestUpdateInterfaceMutationVariables
>

/**
 * __useTestUpdateInterfaceMutation__
 *
 * To run a mutation, you first call `useTestUpdateInterfaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestUpdateInterfaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testUpdateInterfaceMutation, { data, loading, error }] = useTestUpdateInterfaceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestUpdateInterfaceMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TestUpdateInterfaceMutation,
    TestUpdateInterfaceMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    TestUpdateInterfaceMutation,
    TestUpdateInterfaceMutationVariables
  >(TestUpdateInterfaceGql, options)
}
export type TestUpdateInterfaceMutationHookResult = ReturnType<
  typeof useTestUpdateInterfaceMutation
>
export type TestUpdateInterfaceMutationResult =
  Apollo.MutationResult<TestUpdateInterfaceMutation>
export type TestUpdateInterfaceMutationOptions = Apollo.BaseMutationOptions<
  TestUpdateInterfaceMutation,
  TestUpdateInterfaceMutationVariables
>
export const DeleteUserGql = gql`
  mutation DeleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input)
  }
`
export type DeleteUserMutationFn = Apollo.MutationFunction<
  DeleteUserMutation,
  DeleteUserMutationVariables
>

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteUserMutation,
    DeleteUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(
    DeleteUserGql,
    options,
  )
}
export type DeleteUserMutationHookResult = ReturnType<
  typeof useDeleteUserMutation
>
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<
  DeleteUserMutation,
  DeleteUserMutationVariables
>
export const GetUsersGql = gql`
  query GetUsers($input: GetUsersInput) {
    users: getUsers(input: $input) {
      ...__User
    }
  }
  ${__UserFragmentDoc}
`

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersGql,
    options,
  )
}
export function useGetUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUsersQuery,
    GetUsersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersGql,
    options,
  )
}
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>
export type GetUsersLazyQueryHookResult = ReturnType<
  typeof useGetUsersLazyQuery
>
export type GetUsersQueryResult = Apollo.QueryResult<
  GetUsersQuery,
  GetUsersQueryVariables
>
export function refetchGetUsersQuery(variables?: GetUsersQueryVariables) {
  return { query: GetUsersGql, variables: variables }
}
export const GetValueTypesGql = gql`
  query GetValueTypes {
    valueTypes: getValueTypes {
      ...__ValueType
    }
  }
  ${__ValueTypeFragmentDoc}
`

/**
 * __useGetValueTypesQuery__
 *
 * To run a query within a React component, call `useGetValueTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetValueTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetValueTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetValueTypesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetValueTypesQuery,
    GetValueTypesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetValueTypesQuery, GetValueTypesQueryVariables>(
    GetValueTypesGql,
    options,
  )
}
export function useGetValueTypesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetValueTypesQuery,
    GetValueTypesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetValueTypesQuery, GetValueTypesQueryVariables>(
    GetValueTypesGql,
    options,
  )
}
export type GetValueTypesQueryHookResult = ReturnType<
  typeof useGetValueTypesQuery
>
export type GetValueTypesLazyQueryHookResult = ReturnType<
  typeof useGetValueTypesLazyQuery
>
export type GetValueTypesQueryResult = Apollo.QueryResult<
  GetValueTypesQuery,
  GetValueTypesQueryVariables
>
export function refetchGetValueTypesQuery(
  variables?: GetValueTypesQueryVariables,
) {
  return { query: GetValueTypesGql, variables: variables }
}
export const __App = gql`
  fragment __App on App {
    id
    name
  }
`
export const PageBase = gql`
  fragment PageBase on Page {
    id
    name
    app {
      id
      name
      ownerId
    }
  }
`
export const __Atom = gql`
  fragment __Atom on Atom {
    id
    label
    type
  }
`
export const PageElement = gql`
  fragment PageElement on PageElement {
    id
    name
    atom {
      ...__Atom
    }
  }
  ${__Atom}
`
export const PageElementLink = gql`
  fragment PageElementLink on PageElementLink {
    from
    order
    to
  }
`
export const PageElementRoot = gql`
  fragment PageElementRoot on PageElementRoot {
    id
    name
    atom {
      ...__Atom
    }
    descendants {
      ...PageElement
    }
    links {
      ...PageElementLink
    }
  }
  ${__Atom}
  ${PageElement}
  ${PageElementLink}
`
export const PageFull = gql`
  fragment PageFull on Page {
    ...PageBase
    rootElement {
      ...PageElementRoot
    }
  }
  ${PageBase}
  ${PageElementRoot}
`
export const __Prop = gql`
  fragment __Prop on Prop {
    description
    id
    key
    type {
      id
      type
      label
    }
    props {
      description
      id
      key
      type {
        id
        type
        label
      }
    }
  }
`
export const Test__ArrayLengthValidator = gql`
  fragment Test__ArrayLengthValidator on ArrayLengthValidator {
    id
    maxLength
    minLength
  }
`
export const Test__MinMaxValidator = gql`
  fragment Test__MinMaxValidator on MinMaxValidator {
    id
    max
    min
  }
`
export const Test__RequiredValidator = gql`
  fragment Test__RequiredValidator on RequiredValidator {
    id
    isRequired
  }
`
export const Test__Decorator = gql`
  fragment Test__Decorator on Decorator {
    __typename
    ... on ArrayLengthValidator {
      ...Test__ArrayLengthValidator
    }
    ... on MinMaxValidator {
      ...Test__MinMaxValidator
    }
    ... on RequiredValidator {
      ...Test__RequiredValidator
    }
  }
  ${Test__ArrayLengthValidator}
  ${Test__MinMaxValidator}
  ${Test__RequiredValidator}
`
export const Test__Field = gql`
  fragment Test__Field on Field {
    id
    key
    name
    typeId
    description
    decorators {
      ...Test__Decorator
    }
  }
  ${Test__Decorator}
`
export const Test__ArrayType = gql`
  fragment Test__ArrayType on ArrayType {
    id
    typeId
  }
`
export const Test__EnumTypeValue = gql`
  fragment Test__EnumTypeValue on EnumTypeValue {
    id
    name
  }
`
export const Test__EnumType = gql`
  fragment Test__EnumType on EnumType {
    id
    allowedValues {
      ...Test__EnumTypeValue
    }
  }
  ${Test__EnumTypeValue}
`
export const Test__InterfaceType = gql`
  fragment Test__InterfaceType on InterfaceType {
    interfaceId
  }
`
export const Test__SimpleType = gql`
  fragment Test__SimpleType on SimpleType {
    id
    primitiveType
  }
`
export const Test__UnitType = gql`
  fragment Test__UnitType on UnitType {
    id
    allowedUnits
  }
`
export const Test__Type = gql`
  fragment Test__Type on Type {
    __typename
    ... on ArrayType {
      ...Test__ArrayType
    }
    ... on EnumType {
      ...Test__EnumType
    }
    ... on InterfaceType {
      ...Test__InterfaceType
    }
    ... on SimpleType {
      ...Test__SimpleType
    }
    ... on UnitType {
      ...Test__UnitType
    }
  }
  ${Test__ArrayType}
  ${Test__EnumType}
  ${Test__InterfaceType}
  ${Test__SimpleType}
  ${Test__UnitType}
`
export const Test__Interface = gql`
  fragment Test__Interface on Interface {
    id
    name
    fields {
      ...Test__Field
    }
    types {
      ...Test__Type
    }
  }
  ${Test__Field}
  ${Test__Type}
`
export const __User = gql`
  fragment __User on User {
    id: user_id
    email
    name
  }
`
export const __ValueType = gql`
  fragment __ValueType on ValueType {
    id
    type
    label
  }
`
export const CreateApp = gql`
  mutation CreateApp($input: CreateAppInput!) {
    createApp(input: $input) {
      ...__App
    }
  }
  ${__App}
`
export const DeleteApp = gql`
  mutation DeleteApp($input: DeleteAppInput!) {
    deleteApp(input: $input) {
      id
    }
  }
`
export const GetApp = gql`
  query GetApp($input: GetAppInput!) {
    app: getApp(input: $input) {
      ...__App
    }
  }
  ${__App}
`
export const GetApps = gql`
  query GetApps {
    apps: getApps {
      ...__App
    }
  }
  ${__App}
`
export const UpdateApp = gql`
  mutation UpdateApp($input: UpdateAppInput!) {
    app: updateApp(input: $input) {
      ...__App
    }
  }
  ${__App}
`
export const CreateTestAtom = gql`
  mutation CreateTestAtom($input: CreateAtomInput!) {
    createAtom(input: $input) {
      id
      label
    }
  }
`
export const CreateAtom = gql`
  mutation CreateAtom($input: CreateAtomInput!) {
    createAtom(input: $input) {
      ...__Atom
    }
  }
  ${__Atom}
`
export const DeleteAtom = gql`
  mutation DeleteAtom($input: DeleteAtomInput!) {
    deleteAtom(input: $input) {
      ...__Atom
    }
  }
  ${__Atom}
`
export const GetAtom = gql`
  query GetAtom($input: GetAtomInput!) {
    atom: getAtom(input: $input) {
      ...__Atom
    }
  }
  ${__Atom}
`
export const GetAtoms = gql`
  query GetAtoms {
    atoms: getAtoms {
      ...__Atom
    }
  }
  ${__Atom}
`
export const UpdateAtom = gql`
  mutation UpdateAtom($input: UpdateAtomInput!) {
    atom: updateAtom(input: $input) {
      ...__Atom
    }
  }
  ${__Atom}
`
export const CreatePage = gql`
  mutation CreatePage($input: CreatePageInput!) {
    createPage(input: $input) {
      ...PageBase
    }
  }
  ${PageBase}
`
export const DeletePage = gql`
  mutation DeletePage($input: DeletePageInput!) {
    deletePage(input: $input) {
      id
    }
  }
`
export const GetPage = gql`
  query GetPage($input: GetPageInput!) {
    page: getPage(input: $input) {
      ...PageFull
    }
  }
  ${PageFull}
`
export const GetPages = gql`
  query GetPages($input: GetPagesInput!) {
    pages: getPages(input: $input) {
      ...PageBase
    }
  }
  ${PageBase}
`
export const CreatePageElement = gql`
  mutation CreatePageElement($input: CreatePageElementInput!) {
    createPageElement(input: $input) {
      ...PageElement
    }
  }
  ${PageElement}
`
export const DeletePageElement = gql`
  mutation DeletePageElement($input: DeletePageElementInput!) {
    deletePageElement(input: $input) {
      affected
    }
  }
`
export const GetPageElement = gql`
  query GetPageElement($input: GetPageElementInput!) {
    getPageElement(input: $input) {
      ...PageElement
    }
  }
  ${PageElement}
`
export const GetPageElementRoot = gql`
  query GetPageElementRoot($input: GetPageElementRootInput!) {
    getPageElementRoot(input: $input) {
      ...PageElementRoot
    }
  }
  ${PageElementRoot}
`
export const MovePageElement = gql`
  mutation MovePageElement($input: MovePageElementInput!) {
    movePageElement(input: $input) {
      ...PageElement
    }
  }
  ${PageElement}
`
export const UpdatePageElement = gql`
  mutation UpdatePageElement($input: UpdatePageElementInput!) {
    updatePageElement(input: $input) {
      ...PageElement
    }
  }
  ${PageElement}
`
export const UpdatePage = gql`
  mutation UpdatePage($input: UpdatePageInput!) {
    updatePage(input: $input) {
      ...PageBase
    }
  }
  ${PageBase}
`
export const GetProps = gql`
  query GetProps {
    props: getProps {
      ...__Prop
    }
  }
  ${__Prop}
`
export const TestCreateField = gql`
  mutation TestCreateField($input: CreateFieldInput!) {
    createField(input: $input) {
      ...Test__Field
    }
  }
  ${Test__Field}
`
export const TestCreateInterface = gql`
  mutation TestCreateInterface($input: CreateInterfaceInput!) {
    createInterface(input: $input) {
      ...Test__Interface
    }
  }
  ${Test__Interface}
`
export const TestDeleteField = gql`
  mutation TestDeleteField($input: DeleteFieldInput!) {
    deleteField(input: $input) {
      affected
    }
  }
`
export const TestDeleteInterface = gql`
  mutation TestDeleteInterface($input: DeleteInterfaceInput!) {
    deleteInterface(input: $input) {
      affected
    }
  }
`
export const TestGetField = gql`
  query TestGetField($input: GetFieldInput!) {
    getField(input: $input) {
      ...Test__Field
    }
  }
  ${Test__Field}
`
export const TestGetInterface = gql`
  query TestGetInterface($input: GetInterfaceInput!) {
    getInterface(input: $input) {
      ...Test__Interface
    }
  }
  ${Test__Interface}
`
export const TestGetType = gql`
  query TestGetType($input: GetTypeInput!) {
    getType(input: $input) {
      ...Test__Type
    }
  }
  ${Test__Type}
`
export const TestUpdateField = gql`
  mutation TestUpdateField($input: UpdateFieldInput!) {
    updateField(input: $input) {
      ...Test__Field
    }
  }
  ${Test__Field}
`
export const TestUpdateInterface = gql`
  mutation TestUpdateInterface($input: UpdateInterfaceInput!) {
    updateInterface(input: $input) {
      ...Test__Interface
    }
  }
  ${Test__Interface}
`
export const DeleteUser = gql`
  mutation DeleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input)
  }
`
export const GetUsers = gql`
  query GetUsers($input: GetUsersInput) {
    users: getUsers(input: $input) {
      ...__User
    }
  }
  ${__User}
`
export const GetValueTypes = gql`
  query GetValueTypes {
    valueTypes: getValueTypes {
      ...__ValueType
    }
  }
  ${__ValueType}
`
