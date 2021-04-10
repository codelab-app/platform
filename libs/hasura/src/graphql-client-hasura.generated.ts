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
const defaultOptions = {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  json: any
  jsonb: any
  uuid: any
}

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: Maybe<Scalars['Int']>
  _gt?: Maybe<Scalars['Int']>
  _gte?: Maybe<Scalars['Int']>
  _in?: Maybe<Array<Scalars['Int']>>
  _is_null?: Maybe<Scalars['Boolean']>
  _lt?: Maybe<Scalars['Int']>
  _lte?: Maybe<Scalars['Int']>
  _neq?: Maybe<Scalars['Int']>
  _nin?: Maybe<Array<Scalars['Int']>>
}

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>
  _gt?: Maybe<Scalars['String']>
  _gte?: Maybe<Scalars['String']>
  /** does the column match the given case-insensitive pattern */
  _ilike?: Maybe<Scalars['String']>
  _in?: Maybe<Array<Scalars['String']>>
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: Maybe<Scalars['String']>
  _is_null?: Maybe<Scalars['Boolean']>
  /** does the column match the given pattern */
  _like?: Maybe<Scalars['String']>
  _lt?: Maybe<Scalars['String']>
  _lte?: Maybe<Scalars['String']>
  _neq?: Maybe<Scalars['String']>
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: Maybe<Scalars['String']>
  _nin?: Maybe<Array<Scalars['String']>>
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: Maybe<Scalars['String']>
  /** does the column NOT match the given pattern */
  _nlike?: Maybe<Scalars['String']>
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: Maybe<Scalars['String']>
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: Maybe<Scalars['String']>
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: Maybe<Scalars['String']>
  /** does the column match the given SQL regular expression */
  _similar?: Maybe<Scalars['String']>
}

/** columns and relationships of "app" */
export type App = {
  __typename?: 'app'
  id: Scalars['uuid']
  name: Scalars['String']
  /** An array relationship */
  pages: Array<Page>
  /** An aggregate relationship */
  pages_aggregate: Page_Aggregate
  /** An object relationship */
  user: User
  user_id: Scalars['String']
}

/** columns and relationships of "app" */
export type AppPagesArgs = {
  distinct_on?: Maybe<Array<Page_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Page_Order_By>>
  where?: Maybe<Page_Bool_Exp>
}

/** columns and relationships of "app" */
export type AppPages_AggregateArgs = {
  distinct_on?: Maybe<Array<Page_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Page_Order_By>>
  where?: Maybe<Page_Bool_Exp>
}

/** aggregated selection of "app" */
export type App_Aggregate = {
  __typename?: 'app_aggregate'
  aggregate?: Maybe<App_Aggregate_Fields>
  nodes: Array<App>
}

/** aggregate fields of "app" */
export type App_Aggregate_Fields = {
  __typename?: 'app_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<App_Max_Fields>
  min?: Maybe<App_Min_Fields>
}

/** aggregate fields of "app" */
export type App_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<App_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "app" */
export type App_Aggregate_Order_By = {
  count?: Maybe<Order_By>
  max?: Maybe<App_Max_Order_By>
  min?: Maybe<App_Min_Order_By>
}

/** input type for inserting array relation for remote table "app" */
export type App_Arr_Rel_Insert_Input = {
  data: Array<App_Insert_Input>
  /** on conflict condition */
  on_conflict?: Maybe<App_On_Conflict>
}

/** Boolean expression to filter rows from the table "app". All fields are combined with a logical 'AND'. */
export type App_Bool_Exp = {
  _and?: Maybe<Array<App_Bool_Exp>>
  _not?: Maybe<App_Bool_Exp>
  _or?: Maybe<Array<App_Bool_Exp>>
  id?: Maybe<Uuid_Comparison_Exp>
  name?: Maybe<String_Comparison_Exp>
  pages?: Maybe<Page_Bool_Exp>
  user?: Maybe<User_Bool_Exp>
  user_id?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "app" */
export enum App_Constraint {
  /** unique or primary key constraint */
  AppsPkey = 'apps_pkey',
}

/** input type for inserting data into table "app" */
export type App_Insert_Input = {
  id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  pages?: Maybe<Page_Arr_Rel_Insert_Input>
  user?: Maybe<User_Obj_Rel_Insert_Input>
  user_id?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type App_Max_Fields = {
  __typename?: 'app_max_fields'
  id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  user_id?: Maybe<Scalars['String']>
}

/** order by max() on columns of table "app" */
export type App_Max_Order_By = {
  id?: Maybe<Order_By>
  name?: Maybe<Order_By>
  user_id?: Maybe<Order_By>
}

/** aggregate min on columns */
export type App_Min_Fields = {
  __typename?: 'app_min_fields'
  id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  user_id?: Maybe<Scalars['String']>
}

/** order by min() on columns of table "app" */
export type App_Min_Order_By = {
  id?: Maybe<Order_By>
  name?: Maybe<Order_By>
  user_id?: Maybe<Order_By>
}

/** response of any mutation on the table "app" */
export type App_Mutation_Response = {
  __typename?: 'app_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<App>
}

/** input type for inserting object relation for remote table "app" */
export type App_Obj_Rel_Insert_Input = {
  data: App_Insert_Input
  /** on conflict condition */
  on_conflict?: Maybe<App_On_Conflict>
}

/** on conflict condition type for table "app" */
export type App_On_Conflict = {
  constraint: App_Constraint
  update_columns: Array<App_Update_Column>
  where?: Maybe<App_Bool_Exp>
}

/** Ordering options when selecting data from "app". */
export type App_Order_By = {
  id?: Maybe<Order_By>
  name?: Maybe<Order_By>
  pages_aggregate?: Maybe<Page_Aggregate_Order_By>
  user?: Maybe<User_Order_By>
  user_id?: Maybe<Order_By>
}

/** primary key columns input for table: app */
export type App_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "app" */
export enum App_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UserId = 'user_id',
}

/** input type for updating data in table "app" */
export type App_Set_Input = {
  id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  user_id?: Maybe<Scalars['String']>
}

/** update columns of table "app" */
export enum App_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UserId = 'user_id',
}

/** columns and relationships of "atom" */
export type Atom = {
  __typename?: 'atom'
  id: Scalars['uuid']
  type: Atom_Type_Enum
}

/** aggregated selection of "atom" */
export type Atom_Aggregate = {
  __typename?: 'atom_aggregate'
  aggregate?: Maybe<Atom_Aggregate_Fields>
  nodes: Array<Atom>
}

/** aggregate fields of "atom" */
export type Atom_Aggregate_Fields = {
  __typename?: 'atom_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Atom_Max_Fields>
  min?: Maybe<Atom_Min_Fields>
}

/** aggregate fields of "atom" */
export type Atom_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Atom_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** Boolean expression to filter rows from the table "atom". All fields are combined with a logical 'AND'. */
export type Atom_Bool_Exp = {
  _and?: Maybe<Array<Atom_Bool_Exp>>
  _not?: Maybe<Atom_Bool_Exp>
  _or?: Maybe<Array<Atom_Bool_Exp>>
  id?: Maybe<Uuid_Comparison_Exp>
  type?: Maybe<Atom_Type_Enum_Comparison_Exp>
}

/** unique or primary key constraints on table "atom" */
export enum Atom_Constraint {
  /** unique or primary key constraint */
  VerticesPkey = 'vertices_pkey',
}

/** input type for inserting data into table "atom" */
export type Atom_Insert_Input = {
  id?: Maybe<Scalars['uuid']>
  type?: Maybe<Atom_Type_Enum>
}

/** aggregate max on columns */
export type Atom_Max_Fields = {
  __typename?: 'atom_max_fields'
  id?: Maybe<Scalars['uuid']>
}

/** aggregate min on columns */
export type Atom_Min_Fields = {
  __typename?: 'atom_min_fields'
  id?: Maybe<Scalars['uuid']>
}

/** response of any mutation on the table "atom" */
export type Atom_Mutation_Response = {
  __typename?: 'atom_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Atom>
}

/** input type for inserting object relation for remote table "atom" */
export type Atom_Obj_Rel_Insert_Input = {
  data: Atom_Insert_Input
  /** on conflict condition */
  on_conflict?: Maybe<Atom_On_Conflict>
}

/** on conflict condition type for table "atom" */
export type Atom_On_Conflict = {
  constraint: Atom_Constraint
  update_columns: Array<Atom_Update_Column>
  where?: Maybe<Atom_Bool_Exp>
}

/** Ordering options when selecting data from "atom". */
export type Atom_Order_By = {
  id?: Maybe<Order_By>
  type?: Maybe<Order_By>
}

/** primary key columns input for table: atom */
export type Atom_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "atom" */
export enum Atom_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Type = 'type',
}

/** input type for updating data in table "atom" */
export type Atom_Set_Input = {
  id?: Maybe<Scalars['uuid']>
  type?: Maybe<Atom_Type_Enum>
}

/** columns and relationships of "atom_type" */
export type Atom_Type = {
  __typename?: 'atom_type'
  description?: Maybe<Scalars['String']>
  value: Scalars['String']
}

/** aggregated selection of "atom_type" */
export type Atom_Type_Aggregate = {
  __typename?: 'atom_type_aggregate'
  aggregate?: Maybe<Atom_Type_Aggregate_Fields>
  nodes: Array<Atom_Type>
}

/** aggregate fields of "atom_type" */
export type Atom_Type_Aggregate_Fields = {
  __typename?: 'atom_type_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Atom_Type_Max_Fields>
  min?: Maybe<Atom_Type_Min_Fields>
}

/** aggregate fields of "atom_type" */
export type Atom_Type_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Atom_Type_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** Boolean expression to filter rows from the table "atom_type". All fields are combined with a logical 'AND'. */
export type Atom_Type_Bool_Exp = {
  _and?: Maybe<Array<Atom_Type_Bool_Exp>>
  _not?: Maybe<Atom_Type_Bool_Exp>
  _or?: Maybe<Array<Atom_Type_Bool_Exp>>
  description?: Maybe<String_Comparison_Exp>
  value?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "atom_type" */
export enum Atom_Type_Constraint {
  /** unique or primary key constraint */
  VertexTypePkey = 'vertexType_pkey',
}

export enum Atom_Type_Enum {
  ReactAffix = 'React_Affix',
  ReactAlert = 'React_Alert',
  ReactAnchor = 'React_Anchor',
  ReactAnchorLink = 'React_Anchor_Link',
  ReactAutoComplete = 'React_AutoComplete',
  ReactAvatar = 'React_Avatar',
  ReactBackTop = 'React_BackTop',
  ReactBadge = 'React_Badge',
  ReactBreadcrumb = 'React_Breadcrumb',
  ReactBreadcrumbItem = 'React_Breadcrumb_Item',
  ReactButton = 'React_Button',
  ReactCalendar = 'React_Calendar',
  ReactCard = 'React_Card',
  ReactCardGrid = 'React_Card_Grid',
  ReactCardMeta = 'React_Card_Meta',
  ReactCarousel = 'React_Carousel',
  ReactCascader = 'React_Cascader',
  ReactCheckbox = 'React_Checkbox',
  ReactCollapse = 'React_Collapse',
  ReactCollapsePanel = 'React_Collapse_Panel',
  ReactComment = 'React_Comment',
  ReactConfigProvider = 'React_ConfigProvider',
  ReactDatePicker = 'React_DatePicker',
  ReactDescriptions = 'React_Descriptions',
  ReactDescriptionsItem = 'React_Descriptions_Item',
  ReactDivider = 'React_Divider',
  ReactDrawer = 'React_Drawer',
  ReactDropdown = 'React_Dropdown',
  ReactEmpty = 'React_Empty',
  ReactForm = 'React_Form',
  ReactFormItem = 'React_Form_Item',
  ReactFormItemHook = 'React_Form_ItemHook',
  ReactFormList = 'React_Form_List',
  ReactFragment = 'React_Fragment',
  ReactGridCol = 'React_Grid_Col',
  ReactGridRow = 'React_Grid_Row',
  ReactHtmlA = 'React_Html_A',
  ReactHtmlDiv = 'React_Html_Div',
  ReactHtmlP = 'React_Html_P',
  ReactHtmlSpan = 'React_Html_Span',
  ReactIcon = 'React_Icon',
  ReactInput = 'React_Input',
  ReactInputNumber = 'React_InputNumber',
  ReactLayout = 'React_Layout',
  ReactLayoutContent = 'React_Layout_Content',
  ReactLayoutFooter = 'React_Layout_Footer',
  ReactLayoutHeader = 'React_Layout_Header',
  ReactLayoutSider = 'React_Layout_Sider',
  ReactList = 'React_List',
  ReactListItem = 'React_List_Item',
  ReactListItemMeta = 'React_List_Item_Meta',
  ReactMapper = 'React_Mapper',
  ReactMentions = 'React_Mentions',
  ReactMentionsOption = 'React_Mentions_Option',
  ReactMenu = 'React_Menu',
  ReactMenuItem = 'React_Menu_Item',
  ReactMenuItemGroup = 'React_Menu_ItemGroup',
  ReactMenuSubMenu = 'React_Menu_SubMenu',
  ReactModal = 'React_Modal',
  ReactPageHeader = 'React_PageHeader',
  ReactPageContainer = 'React_Page_Container',
  ReactPagination = 'React_Pagination',
  ReactPopconfirm = 'React_Popconfirm',
  ReactPopover = 'React_Popover',
  ReactProgress = 'React_Progress',
  ReactProvider = 'React_Provider',
  ReactRglContainer = 'React_RGL_Container',
  ReactRglItem = 'React_RGL_Item',
  ReactRglResponsiveContainer = 'React_RGL_ResponsiveContainer',
  ReactRadio = 'React_Radio',
  ReactRadioGroup = 'React_Radio_Group',
  ReactRate = 'React_Rate',
  ReactRenderComponent = 'React_RenderComponent',
  ReactRenderContainer = 'React_RenderContainer',
  ReactResult = 'React_Result',
  ReactSelect = 'React_Select',
  ReactSelectOption = 'React_Select_Option',
  ReactSkeleton = 'React_Skeleton',
  ReactSlider = 'React_Slider',
  ReactSpace = 'React_Space',
  ReactSpin = 'React_Spin',
  ReactStatistic = 'React_Statistic',
  ReactSteps = 'React_Steps',
  ReactStepsStep = 'React_Steps_Step',
  ReactSwitch = 'React_Switch',
  ReactTable = 'React_Table',
  ReactTabs = 'React_Tabs',
  ReactTabsTabPane = 'React_Tabs_TabPane',
  ReactTag = 'React_Tag',
  ReactText = 'React_Text',
  ReactTimePicker = 'React_TimePicker',
  ReactTimeline = 'React_Timeline',
  ReactTimelineItem = 'React_Timeline_Item',
  ReactTooltip = 'React_Tooltip',
  ReactTransfer = 'React_Transfer',
  ReactTree = 'React_Tree',
  ReactTreeNode = 'React_TreeNode',
  ReactTreeSelect = 'React_TreeSelect',
  ReactTypography = 'React_Typography',
  ReactTypographyParagraph = 'React_Typography_Paragraph',
  ReactTypographyText = 'React_Typography_Text',
  ReactTypographyTitle = 'React_Typography_Title',
  ReactUpload = 'React_Upload',
}

/** Boolean expression to compare columns of type "atom_type_enum". All fields are combined with logical 'AND'. */
export type Atom_Type_Enum_Comparison_Exp = {
  _eq?: Maybe<Atom_Type_Enum>
  _in?: Maybe<Array<Atom_Type_Enum>>
  _is_null?: Maybe<Scalars['Boolean']>
  _neq?: Maybe<Atom_Type_Enum>
  _nin?: Maybe<Array<Atom_Type_Enum>>
}

/** input type for inserting data into table "atom_type" */
export type Atom_Type_Insert_Input = {
  description?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Atom_Type_Max_Fields = {
  __typename?: 'atom_type_max_fields'
  description?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Atom_Type_Min_Fields = {
  __typename?: 'atom_type_min_fields'
  description?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

/** response of any mutation on the table "atom_type" */
export type Atom_Type_Mutation_Response = {
  __typename?: 'atom_type_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Atom_Type>
}

/** input type for inserting object relation for remote table "atom_type" */
export type Atom_Type_Obj_Rel_Insert_Input = {
  data: Atom_Type_Insert_Input
  /** on conflict condition */
  on_conflict?: Maybe<Atom_Type_On_Conflict>
}

/** on conflict condition type for table "atom_type" */
export type Atom_Type_On_Conflict = {
  constraint: Atom_Type_Constraint
  update_columns: Array<Atom_Type_Update_Column>
  where?: Maybe<Atom_Type_Bool_Exp>
}

/** Ordering options when selecting data from "atom_type". */
export type Atom_Type_Order_By = {
  description?: Maybe<Order_By>
  value?: Maybe<Order_By>
}

/** primary key columns input for table: atom_type */
export type Atom_Type_Pk_Columns_Input = {
  value: Scalars['String']
}

/** select columns of table "atom_type" */
export enum Atom_Type_Select_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Value = 'value',
}

/** input type for updating data in table "atom_type" */
export type Atom_Type_Set_Input = {
  description?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

/** update columns of table "atom_type" */
export enum Atom_Type_Update_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Value = 'value',
}

/** update columns of table "atom" */
export enum Atom_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Type = 'type',
}

/** columns and relationships of "attribute" */
export type Attribute = {
  __typename?: 'attribute'
  /** An object relationship */
  atomType: Atom_Type
  atom_type: Atom_Type_Enum
  id: Scalars['uuid']
  key: Scalars['String']
  /** An object relationship */
  valueType?: Maybe<Prop_Value_Type>
  value_type?: Maybe<Prop_Value_Type_Enum>
}

/** aggregated selection of "attribute" */
export type Attribute_Aggregate = {
  __typename?: 'attribute_aggregate'
  aggregate?: Maybe<Attribute_Aggregate_Fields>
  nodes: Array<Attribute>
}

/** aggregate fields of "attribute" */
export type Attribute_Aggregate_Fields = {
  __typename?: 'attribute_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Attribute_Max_Fields>
  min?: Maybe<Attribute_Min_Fields>
}

/** aggregate fields of "attribute" */
export type Attribute_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Attribute_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** Boolean expression to filter rows from the table "attribute". All fields are combined with a logical 'AND'. */
export type Attribute_Bool_Exp = {
  _and?: Maybe<Array<Attribute_Bool_Exp>>
  _not?: Maybe<Attribute_Bool_Exp>
  _or?: Maybe<Array<Attribute_Bool_Exp>>
  atomType?: Maybe<Atom_Type_Bool_Exp>
  atom_type?: Maybe<Atom_Type_Enum_Comparison_Exp>
  id?: Maybe<Uuid_Comparison_Exp>
  key?: Maybe<String_Comparison_Exp>
  valueType?: Maybe<Prop_Value_Type_Bool_Exp>
  value_type?: Maybe<Prop_Value_Type_Enum_Comparison_Exp>
}

/** unique or primary key constraints on table "attribute" */
export enum Attribute_Constraint {
  /** unique or primary key constraint */
  AttributesPkey = 'attributes_pkey',
}

/** input type for inserting data into table "attribute" */
export type Attribute_Insert_Input = {
  atomType?: Maybe<Atom_Type_Obj_Rel_Insert_Input>
  atom_type?: Maybe<Atom_Type_Enum>
  id?: Maybe<Scalars['uuid']>
  key?: Maybe<Scalars['String']>
  valueType?: Maybe<Prop_Value_Type_Obj_Rel_Insert_Input>
  value_type?: Maybe<Prop_Value_Type_Enum>
}

/** aggregate max on columns */
export type Attribute_Max_Fields = {
  __typename?: 'attribute_max_fields'
  id?: Maybe<Scalars['uuid']>
  key?: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Attribute_Min_Fields = {
  __typename?: 'attribute_min_fields'
  id?: Maybe<Scalars['uuid']>
  key?: Maybe<Scalars['String']>
}

/** response of any mutation on the table "attribute" */
export type Attribute_Mutation_Response = {
  __typename?: 'attribute_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Attribute>
}

/** input type for inserting object relation for remote table "attribute" */
export type Attribute_Obj_Rel_Insert_Input = {
  data: Attribute_Insert_Input
  /** on conflict condition */
  on_conflict?: Maybe<Attribute_On_Conflict>
}

/** on conflict condition type for table "attribute" */
export type Attribute_On_Conflict = {
  constraint: Attribute_Constraint
  update_columns: Array<Attribute_Update_Column>
  where?: Maybe<Attribute_Bool_Exp>
}

/** Ordering options when selecting data from "attribute". */
export type Attribute_Order_By = {
  atomType?: Maybe<Atom_Type_Order_By>
  atom_type?: Maybe<Order_By>
  id?: Maybe<Order_By>
  key?: Maybe<Order_By>
  valueType?: Maybe<Prop_Value_Type_Order_By>
  value_type?: Maybe<Order_By>
}

/** primary key columns input for table: attribute */
export type Attribute_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "attribute" */
export enum Attribute_Select_Column {
  /** column name */
  AtomType = 'atom_type',
  /** column name */
  Id = 'id',
  /** column name */
  Key = 'key',
  /** column name */
  ValueType = 'value_type',
}

/** input type for updating data in table "attribute" */
export type Attribute_Set_Input = {
  atom_type?: Maybe<Atom_Type_Enum>
  id?: Maybe<Scalars['uuid']>
  key?: Maybe<Scalars['String']>
  value_type?: Maybe<Prop_Value_Type_Enum>
}

/** update columns of table "attribute" */
export enum Attribute_Update_Column {
  /** column name */
  AtomType = 'atom_type',
  /** column name */
  Id = 'id',
  /** column name */
  Key = 'key',
  /** column name */
  ValueType = 'value_type',
}

/** columns and relationships of "category" */
export type Category = {
  __typename?: 'category'
  id: Scalars['uuid']
}

/** aggregated selection of "category" */
export type Category_Aggregate = {
  __typename?: 'category_aggregate'
  aggregate?: Maybe<Category_Aggregate_Fields>
  nodes: Array<Category>
}

/** aggregate fields of "category" */
export type Category_Aggregate_Fields = {
  __typename?: 'category_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Category_Max_Fields>
  min?: Maybe<Category_Min_Fields>
}

/** aggregate fields of "category" */
export type Category_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Category_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** Boolean expression to filter rows from the table "category". All fields are combined with a logical 'AND'. */
export type Category_Bool_Exp = {
  _and?: Maybe<Array<Category_Bool_Exp>>
  _not?: Maybe<Category_Bool_Exp>
  _or?: Maybe<Array<Category_Bool_Exp>>
  id?: Maybe<Uuid_Comparison_Exp>
}

/** unique or primary key constraints on table "category" */
export enum Category_Constraint {
  /** unique or primary key constraint */
  CategoriesPkey = 'categories_pkey',
}

/** input type for inserting data into table "category" */
export type Category_Insert_Input = {
  id?: Maybe<Scalars['uuid']>
}

/** aggregate max on columns */
export type Category_Max_Fields = {
  __typename?: 'category_max_fields'
  id?: Maybe<Scalars['uuid']>
}

/** aggregate min on columns */
export type Category_Min_Fields = {
  __typename?: 'category_min_fields'
  id?: Maybe<Scalars['uuid']>
}

/** response of any mutation on the table "category" */
export type Category_Mutation_Response = {
  __typename?: 'category_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Category>
}

/** on conflict condition type for table "category" */
export type Category_On_Conflict = {
  constraint: Category_Constraint
  update_columns: Array<Category_Update_Column>
  where?: Maybe<Category_Bool_Exp>
}

/** Ordering options when selecting data from "category". */
export type Category_Order_By = {
  id?: Maybe<Order_By>
}

/** primary key columns input for table: category */
export type Category_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "category" */
export enum Category_Select_Column {
  /** column name */
  Id = 'id',
}

/** input type for updating data in table "category" */
export type Category_Set_Input = {
  id?: Maybe<Scalars['uuid']>
}

/** update columns of table "category" */
export enum Category_Update_Column {
  /** column name */
  Id = 'id',
}

/** columns and relationships of "component" */
export type Component = {
  __typename?: 'component'
  /** An array relationship */
  elements: Array<Component_Element>
  /** An aggregate relationship */
  elements_aggregate: Component_Element_Aggregate
  id: Scalars['uuid']
  label: Scalars['String']
  /** An object relationship */
  library: Library
  library_id: Scalars['uuid']
  /** An array relationship */
  links: Array<Component_Link>
  /** An aggregate relationship */
  links_aggregate: Component_Link_Aggregate
}

/** columns and relationships of "component" */
export type ComponentElementsArgs = {
  distinct_on?: Maybe<Array<Component_Element_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Component_Element_Order_By>>
  where?: Maybe<Component_Element_Bool_Exp>
}

/** columns and relationships of "component" */
export type ComponentElements_AggregateArgs = {
  distinct_on?: Maybe<Array<Component_Element_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Component_Element_Order_By>>
  where?: Maybe<Component_Element_Bool_Exp>
}

/** columns and relationships of "component" */
export type ComponentLinksArgs = {
  distinct_on?: Maybe<Array<Component_Link_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Component_Link_Order_By>>
  where?: Maybe<Component_Link_Bool_Exp>
}

/** columns and relationships of "component" */
export type ComponentLinks_AggregateArgs = {
  distinct_on?: Maybe<Array<Component_Link_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Component_Link_Order_By>>
  where?: Maybe<Component_Link_Bool_Exp>
}

/** aggregated selection of "component" */
export type Component_Aggregate = {
  __typename?: 'component_aggregate'
  aggregate?: Maybe<Component_Aggregate_Fields>
  nodes: Array<Component>
}

/** aggregate fields of "component" */
export type Component_Aggregate_Fields = {
  __typename?: 'component_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Component_Max_Fields>
  min?: Maybe<Component_Min_Fields>
}

/** aggregate fields of "component" */
export type Component_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Component_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** Boolean expression to filter rows from the table "component". All fields are combined with a logical 'AND'. */
export type Component_Bool_Exp = {
  _and?: Maybe<Array<Component_Bool_Exp>>
  _not?: Maybe<Component_Bool_Exp>
  _or?: Maybe<Array<Component_Bool_Exp>>
  elements?: Maybe<Component_Element_Bool_Exp>
  id?: Maybe<Uuid_Comparison_Exp>
  label?: Maybe<String_Comparison_Exp>
  library?: Maybe<Library_Bool_Exp>
  library_id?: Maybe<Uuid_Comparison_Exp>
  links?: Maybe<Component_Link_Bool_Exp>
}

/** unique or primary key constraints on table "component" */
export enum Component_Constraint {
  /** unique or primary key constraint */
  ComponentsPkey = 'components_pkey',
}

/** columns and relationships of "component_element" */
export type Component_Element = {
  __typename?: 'component_element'
  /** An object relationship */
  atom?: Maybe<Atom>
  atom_id?: Maybe<Scalars['uuid']>
  /** An object relationship */
  component: Component
  component_id: Scalars['uuid']
  id: Scalars['uuid']
  label: Scalars['String']
}

/** aggregated selection of "component_element" */
export type Component_Element_Aggregate = {
  __typename?: 'component_element_aggregate'
  aggregate?: Maybe<Component_Element_Aggregate_Fields>
  nodes: Array<Component_Element>
}

/** aggregate fields of "component_element" */
export type Component_Element_Aggregate_Fields = {
  __typename?: 'component_element_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Component_Element_Max_Fields>
  min?: Maybe<Component_Element_Min_Fields>
}

/** aggregate fields of "component_element" */
export type Component_Element_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Component_Element_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "component_element" */
export type Component_Element_Aggregate_Order_By = {
  count?: Maybe<Order_By>
  max?: Maybe<Component_Element_Max_Order_By>
  min?: Maybe<Component_Element_Min_Order_By>
}

/** input type for inserting array relation for remote table "component_element" */
export type Component_Element_Arr_Rel_Insert_Input = {
  data: Array<Component_Element_Insert_Input>
  /** on conflict condition */
  on_conflict?: Maybe<Component_Element_On_Conflict>
}

/** Boolean expression to filter rows from the table "component_element". All fields are combined with a logical 'AND'. */
export type Component_Element_Bool_Exp = {
  _and?: Maybe<Array<Component_Element_Bool_Exp>>
  _not?: Maybe<Component_Element_Bool_Exp>
  _or?: Maybe<Array<Component_Element_Bool_Exp>>
  atom?: Maybe<Atom_Bool_Exp>
  atom_id?: Maybe<Uuid_Comparison_Exp>
  component?: Maybe<Component_Bool_Exp>
  component_id?: Maybe<Uuid_Comparison_Exp>
  id?: Maybe<Uuid_Comparison_Exp>
  label?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "component_element" */
export enum Component_Element_Constraint {
  /** unique or primary key constraint */
  ComponentElementsPkey = 'component_elements_pkey',
}

/** input type for inserting data into table "component_element" */
export type Component_Element_Insert_Input = {
  atom?: Maybe<Atom_Obj_Rel_Insert_Input>
  atom_id?: Maybe<Scalars['uuid']>
  component?: Maybe<Component_Obj_Rel_Insert_Input>
  component_id?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  label?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Component_Element_Max_Fields = {
  __typename?: 'component_element_max_fields'
  atom_id?: Maybe<Scalars['uuid']>
  component_id?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  label?: Maybe<Scalars['String']>
}

/** order by max() on columns of table "component_element" */
export type Component_Element_Max_Order_By = {
  atom_id?: Maybe<Order_By>
  component_id?: Maybe<Order_By>
  id?: Maybe<Order_By>
  label?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Component_Element_Min_Fields = {
  __typename?: 'component_element_min_fields'
  atom_id?: Maybe<Scalars['uuid']>
  component_id?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  label?: Maybe<Scalars['String']>
}

/** order by min() on columns of table "component_element" */
export type Component_Element_Min_Order_By = {
  atom_id?: Maybe<Order_By>
  component_id?: Maybe<Order_By>
  id?: Maybe<Order_By>
  label?: Maybe<Order_By>
}

/** response of any mutation on the table "component_element" */
export type Component_Element_Mutation_Response = {
  __typename?: 'component_element_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Component_Element>
}

/** on conflict condition type for table "component_element" */
export type Component_Element_On_Conflict = {
  constraint: Component_Element_Constraint
  update_columns: Array<Component_Element_Update_Column>
  where?: Maybe<Component_Element_Bool_Exp>
}

/** Ordering options when selecting data from "component_element". */
export type Component_Element_Order_By = {
  atom?: Maybe<Atom_Order_By>
  atom_id?: Maybe<Order_By>
  component?: Maybe<Component_Order_By>
  component_id?: Maybe<Order_By>
  id?: Maybe<Order_By>
  label?: Maybe<Order_By>
}

/** primary key columns input for table: component_element */
export type Component_Element_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "component_element" */
export enum Component_Element_Select_Column {
  /** column name */
  AtomId = 'atom_id',
  /** column name */
  ComponentId = 'component_id',
  /** column name */
  Id = 'id',
  /** column name */
  Label = 'label',
}

/** input type for updating data in table "component_element" */
export type Component_Element_Set_Input = {
  atom_id?: Maybe<Scalars['uuid']>
  component_id?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  label?: Maybe<Scalars['String']>
}

/** update columns of table "component_element" */
export enum Component_Element_Update_Column {
  /** column name */
  AtomId = 'atom_id',
  /** column name */
  ComponentId = 'component_id',
  /** column name */
  Id = 'id',
  /** column name */
  Label = 'label',
}

/** input type for inserting data into table "component" */
export type Component_Insert_Input = {
  elements?: Maybe<Component_Element_Arr_Rel_Insert_Input>
  id?: Maybe<Scalars['uuid']>
  label?: Maybe<Scalars['String']>
  library?: Maybe<Library_Obj_Rel_Insert_Input>
  library_id?: Maybe<Scalars['uuid']>
  links?: Maybe<Component_Link_Arr_Rel_Insert_Input>
}

/** columns and relationships of "component_link" */
export type Component_Link = {
  __typename?: 'component_link'
  category_id?: Maybe<Scalars['uuid']>
  component_id: Scalars['uuid']
  id: Scalars['uuid']
  order?: Maybe<Scalars['Int']>
  props?: Maybe<Scalars['jsonb']>
  source_element_id: Scalars['uuid']
  target_element_id?: Maybe<Scalars['uuid']>
}

/** columns and relationships of "component_link" */
export type Component_LinkPropsArgs = {
  path?: Maybe<Scalars['String']>
}

/** aggregated selection of "component_link" */
export type Component_Link_Aggregate = {
  __typename?: 'component_link_aggregate'
  aggregate?: Maybe<Component_Link_Aggregate_Fields>
  nodes: Array<Component_Link>
}

/** aggregate fields of "component_link" */
export type Component_Link_Aggregate_Fields = {
  __typename?: 'component_link_aggregate_fields'
  avg?: Maybe<Component_Link_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Component_Link_Max_Fields>
  min?: Maybe<Component_Link_Min_Fields>
  stddev?: Maybe<Component_Link_Stddev_Fields>
  stddev_pop?: Maybe<Component_Link_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Component_Link_Stddev_Samp_Fields>
  sum?: Maybe<Component_Link_Sum_Fields>
  var_pop?: Maybe<Component_Link_Var_Pop_Fields>
  var_samp?: Maybe<Component_Link_Var_Samp_Fields>
  variance?: Maybe<Component_Link_Variance_Fields>
}

/** aggregate fields of "component_link" */
export type Component_Link_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Component_Link_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "component_link" */
export type Component_Link_Aggregate_Order_By = {
  avg?: Maybe<Component_Link_Avg_Order_By>
  count?: Maybe<Order_By>
  max?: Maybe<Component_Link_Max_Order_By>
  min?: Maybe<Component_Link_Min_Order_By>
  stddev?: Maybe<Component_Link_Stddev_Order_By>
  stddev_pop?: Maybe<Component_Link_Stddev_Pop_Order_By>
  stddev_samp?: Maybe<Component_Link_Stddev_Samp_Order_By>
  sum?: Maybe<Component_Link_Sum_Order_By>
  var_pop?: Maybe<Component_Link_Var_Pop_Order_By>
  var_samp?: Maybe<Component_Link_Var_Samp_Order_By>
  variance?: Maybe<Component_Link_Variance_Order_By>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Component_Link_Append_Input = {
  props?: Maybe<Scalars['jsonb']>
}

/** input type for inserting array relation for remote table "component_link" */
export type Component_Link_Arr_Rel_Insert_Input = {
  data: Array<Component_Link_Insert_Input>
  /** on conflict condition */
  on_conflict?: Maybe<Component_Link_On_Conflict>
}

/** aggregate avg on columns */
export type Component_Link_Avg_Fields = {
  __typename?: 'component_link_avg_fields'
  order?: Maybe<Scalars['Float']>
}

/** order by avg() on columns of table "component_link" */
export type Component_Link_Avg_Order_By = {
  order?: Maybe<Order_By>
}

/** Boolean expression to filter rows from the table "component_link". All fields are combined with a logical 'AND'. */
export type Component_Link_Bool_Exp = {
  _and?: Maybe<Array<Component_Link_Bool_Exp>>
  _not?: Maybe<Component_Link_Bool_Exp>
  _or?: Maybe<Array<Component_Link_Bool_Exp>>
  category_id?: Maybe<Uuid_Comparison_Exp>
  component_id?: Maybe<Uuid_Comparison_Exp>
  id?: Maybe<Uuid_Comparison_Exp>
  order?: Maybe<Int_Comparison_Exp>
  props?: Maybe<Jsonb_Comparison_Exp>
  source_element_id?: Maybe<Uuid_Comparison_Exp>
  target_element_id?: Maybe<Uuid_Comparison_Exp>
}

/** unique or primary key constraints on table "component_link" */
export enum Component_Link_Constraint {
  /** unique or primary key constraint */
  VertexEdgeTypePkey = 'vertex_edge_type_pkey',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Component_Link_Delete_At_Path_Input = {
  props?: Maybe<Array<Scalars['String']>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Component_Link_Delete_Elem_Input = {
  props?: Maybe<Scalars['Int']>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Component_Link_Delete_Key_Input = {
  props?: Maybe<Scalars['String']>
}

/** input type for incrementing numeric columns in table "component_link" */
export type Component_Link_Inc_Input = {
  order?: Maybe<Scalars['Int']>
}

/** input type for inserting data into table "component_link" */
export type Component_Link_Insert_Input = {
  category_id?: Maybe<Scalars['uuid']>
  component_id?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  order?: Maybe<Scalars['Int']>
  props?: Maybe<Scalars['jsonb']>
  source_element_id?: Maybe<Scalars['uuid']>
  target_element_id?: Maybe<Scalars['uuid']>
}

/** aggregate max on columns */
export type Component_Link_Max_Fields = {
  __typename?: 'component_link_max_fields'
  category_id?: Maybe<Scalars['uuid']>
  component_id?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  order?: Maybe<Scalars['Int']>
  source_element_id?: Maybe<Scalars['uuid']>
  target_element_id?: Maybe<Scalars['uuid']>
}

/** order by max() on columns of table "component_link" */
export type Component_Link_Max_Order_By = {
  category_id?: Maybe<Order_By>
  component_id?: Maybe<Order_By>
  id?: Maybe<Order_By>
  order?: Maybe<Order_By>
  source_element_id?: Maybe<Order_By>
  target_element_id?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Component_Link_Min_Fields = {
  __typename?: 'component_link_min_fields'
  category_id?: Maybe<Scalars['uuid']>
  component_id?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  order?: Maybe<Scalars['Int']>
  source_element_id?: Maybe<Scalars['uuid']>
  target_element_id?: Maybe<Scalars['uuid']>
}

/** order by min() on columns of table "component_link" */
export type Component_Link_Min_Order_By = {
  category_id?: Maybe<Order_By>
  component_id?: Maybe<Order_By>
  id?: Maybe<Order_By>
  order?: Maybe<Order_By>
  source_element_id?: Maybe<Order_By>
  target_element_id?: Maybe<Order_By>
}

/** response of any mutation on the table "component_link" */
export type Component_Link_Mutation_Response = {
  __typename?: 'component_link_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Component_Link>
}

/** on conflict condition type for table "component_link" */
export type Component_Link_On_Conflict = {
  constraint: Component_Link_Constraint
  update_columns: Array<Component_Link_Update_Column>
  where?: Maybe<Component_Link_Bool_Exp>
}

/** Ordering options when selecting data from "component_link". */
export type Component_Link_Order_By = {
  category_id?: Maybe<Order_By>
  component_id?: Maybe<Order_By>
  id?: Maybe<Order_By>
  order?: Maybe<Order_By>
  props?: Maybe<Order_By>
  source_element_id?: Maybe<Order_By>
  target_element_id?: Maybe<Order_By>
}

/** primary key columns input for table: component_link */
export type Component_Link_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Component_Link_Prepend_Input = {
  props?: Maybe<Scalars['jsonb']>
}

/** select columns of table "component_link" */
export enum Component_Link_Select_Column {
  /** column name */
  CategoryId = 'category_id',
  /** column name */
  ComponentId = 'component_id',
  /** column name */
  Id = 'id',
  /** column name */
  Order = 'order',
  /** column name */
  Props = 'props',
  /** column name */
  SourceElementId = 'source_element_id',
  /** column name */
  TargetElementId = 'target_element_id',
}

/** input type for updating data in table "component_link" */
export type Component_Link_Set_Input = {
  category_id?: Maybe<Scalars['uuid']>
  component_id?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  order?: Maybe<Scalars['Int']>
  props?: Maybe<Scalars['jsonb']>
  source_element_id?: Maybe<Scalars['uuid']>
  target_element_id?: Maybe<Scalars['uuid']>
}

/** aggregate stddev on columns */
export type Component_Link_Stddev_Fields = {
  __typename?: 'component_link_stddev_fields'
  order?: Maybe<Scalars['Float']>
}

/** order by stddev() on columns of table "component_link" */
export type Component_Link_Stddev_Order_By = {
  order?: Maybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Component_Link_Stddev_Pop_Fields = {
  __typename?: 'component_link_stddev_pop_fields'
  order?: Maybe<Scalars['Float']>
}

/** order by stddev_pop() on columns of table "component_link" */
export type Component_Link_Stddev_Pop_Order_By = {
  order?: Maybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Component_Link_Stddev_Samp_Fields = {
  __typename?: 'component_link_stddev_samp_fields'
  order?: Maybe<Scalars['Float']>
}

/** order by stddev_samp() on columns of table "component_link" */
export type Component_Link_Stddev_Samp_Order_By = {
  order?: Maybe<Order_By>
}

/** aggregate sum on columns */
export type Component_Link_Sum_Fields = {
  __typename?: 'component_link_sum_fields'
  order?: Maybe<Scalars['Int']>
}

/** order by sum() on columns of table "component_link" */
export type Component_Link_Sum_Order_By = {
  order?: Maybe<Order_By>
}

/** update columns of table "component_link" */
export enum Component_Link_Update_Column {
  /** column name */
  CategoryId = 'category_id',
  /** column name */
  ComponentId = 'component_id',
  /** column name */
  Id = 'id',
  /** column name */
  Order = 'order',
  /** column name */
  Props = 'props',
  /** column name */
  SourceElementId = 'source_element_id',
  /** column name */
  TargetElementId = 'target_element_id',
}

/** aggregate var_pop on columns */
export type Component_Link_Var_Pop_Fields = {
  __typename?: 'component_link_var_pop_fields'
  order?: Maybe<Scalars['Float']>
}

/** order by var_pop() on columns of table "component_link" */
export type Component_Link_Var_Pop_Order_By = {
  order?: Maybe<Order_By>
}

/** aggregate var_samp on columns */
export type Component_Link_Var_Samp_Fields = {
  __typename?: 'component_link_var_samp_fields'
  order?: Maybe<Scalars['Float']>
}

/** order by var_samp() on columns of table "component_link" */
export type Component_Link_Var_Samp_Order_By = {
  order?: Maybe<Order_By>
}

/** aggregate variance on columns */
export type Component_Link_Variance_Fields = {
  __typename?: 'component_link_variance_fields'
  order?: Maybe<Scalars['Float']>
}

/** order by variance() on columns of table "component_link" */
export type Component_Link_Variance_Order_By = {
  order?: Maybe<Order_By>
}

/** aggregate max on columns */
export type Component_Max_Fields = {
  __typename?: 'component_max_fields'
  id?: Maybe<Scalars['uuid']>
  label?: Maybe<Scalars['String']>
  library_id?: Maybe<Scalars['uuid']>
}

/** aggregate min on columns */
export type Component_Min_Fields = {
  __typename?: 'component_min_fields'
  id?: Maybe<Scalars['uuid']>
  label?: Maybe<Scalars['String']>
  library_id?: Maybe<Scalars['uuid']>
}

/** response of any mutation on the table "component" */
export type Component_Mutation_Response = {
  __typename?: 'component_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Component>
}

/** input type for inserting object relation for remote table "component" */
export type Component_Obj_Rel_Insert_Input = {
  data: Component_Insert_Input
  /** on conflict condition */
  on_conflict?: Maybe<Component_On_Conflict>
}

/** on conflict condition type for table "component" */
export type Component_On_Conflict = {
  constraint: Component_Constraint
  update_columns: Array<Component_Update_Column>
  where?: Maybe<Component_Bool_Exp>
}

/** Ordering options when selecting data from "component". */
export type Component_Order_By = {
  elements_aggregate?: Maybe<Component_Element_Aggregate_Order_By>
  id?: Maybe<Order_By>
  label?: Maybe<Order_By>
  library?: Maybe<Library_Order_By>
  library_id?: Maybe<Order_By>
  links_aggregate?: Maybe<Component_Link_Aggregate_Order_By>
}

/** primary key columns input for table: component */
export type Component_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "component" */
export enum Component_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Label = 'label',
  /** column name */
  LibraryId = 'library_id',
}

/** input type for updating data in table "component" */
export type Component_Set_Input = {
  id?: Maybe<Scalars['uuid']>
  label?: Maybe<Scalars['String']>
  library_id?: Maybe<Scalars['uuid']>
}

/** update columns of table "component" */
export enum Component_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Label = 'label',
  /** column name */
  LibraryId = 'library_id',
}

export type Get_Current_User_Args = {
  hasura_session?: Maybe<Scalars['json']>
}

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  /** is the column contained in the given json value */
  _contained_in?: Maybe<Scalars['jsonb']>
  /** does the column contain the given json value at the top level */
  _contains?: Maybe<Scalars['jsonb']>
  _eq?: Maybe<Scalars['jsonb']>
  _gt?: Maybe<Scalars['jsonb']>
  _gte?: Maybe<Scalars['jsonb']>
  /** does the string exist as a top-level key in the column */
  _has_key?: Maybe<Scalars['String']>
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: Maybe<Array<Scalars['String']>>
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: Maybe<Array<Scalars['String']>>
  _in?: Maybe<Array<Scalars['jsonb']>>
  _is_null?: Maybe<Scalars['Boolean']>
  _lt?: Maybe<Scalars['jsonb']>
  _lte?: Maybe<Scalars['jsonb']>
  _neq?: Maybe<Scalars['jsonb']>
  _nin?: Maybe<Array<Scalars['jsonb']>>
}

/** columns and relationships of "lambda" */
export type Lambda = {
  __typename?: 'lambda'
  body: Scalars['String']
  id: Scalars['uuid']
  libraryId: Scalars['uuid']
  name: Scalars['String']
}

/** aggregated selection of "lambda" */
export type Lambda_Aggregate = {
  __typename?: 'lambda_aggregate'
  aggregate?: Maybe<Lambda_Aggregate_Fields>
  nodes: Array<Lambda>
}

/** aggregate fields of "lambda" */
export type Lambda_Aggregate_Fields = {
  __typename?: 'lambda_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Lambda_Max_Fields>
  min?: Maybe<Lambda_Min_Fields>
}

/** aggregate fields of "lambda" */
export type Lambda_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Lambda_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** Boolean expression to filter rows from the table "lambda". All fields are combined with a logical 'AND'. */
export type Lambda_Bool_Exp = {
  _and?: Maybe<Array<Lambda_Bool_Exp>>
  _not?: Maybe<Lambda_Bool_Exp>
  _or?: Maybe<Array<Lambda_Bool_Exp>>
  body?: Maybe<String_Comparison_Exp>
  id?: Maybe<Uuid_Comparison_Exp>
  libraryId?: Maybe<Uuid_Comparison_Exp>
  name?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "lambda" */
export enum Lambda_Constraint {
  /** unique or primary key constraint */
  LambdasPkey = 'lambdas_pkey',
}

/** input type for inserting data into table "lambda" */
export type Lambda_Insert_Input = {
  body?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['uuid']>
  libraryId?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Lambda_Max_Fields = {
  __typename?: 'lambda_max_fields'
  body?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['uuid']>
  libraryId?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Lambda_Min_Fields = {
  __typename?: 'lambda_min_fields'
  body?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['uuid']>
  libraryId?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
}

/** response of any mutation on the table "lambda" */
export type Lambda_Mutation_Response = {
  __typename?: 'lambda_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Lambda>
}

/** on conflict condition type for table "lambda" */
export type Lambda_On_Conflict = {
  constraint: Lambda_Constraint
  update_columns: Array<Lambda_Update_Column>
  where?: Maybe<Lambda_Bool_Exp>
}

/** Ordering options when selecting data from "lambda". */
export type Lambda_Order_By = {
  body?: Maybe<Order_By>
  id?: Maybe<Order_By>
  libraryId?: Maybe<Order_By>
  name?: Maybe<Order_By>
}

/** primary key columns input for table: lambda */
export type Lambda_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "lambda" */
export enum Lambda_Select_Column {
  /** column name */
  Body = 'body',
  /** column name */
  Id = 'id',
  /** column name */
  LibraryId = 'libraryId',
  /** column name */
  Name = 'name',
}

/** input type for updating data in table "lambda" */
export type Lambda_Set_Input = {
  body?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['uuid']>
  libraryId?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
}

/** update columns of table "lambda" */
export enum Lambda_Update_Column {
  /** column name */
  Body = 'body',
  /** column name */
  Id = 'id',
  /** column name */
  LibraryId = 'libraryId',
  /** column name */
  Name = 'name',
}

/** columns and relationships of "library" */
export type Library = {
  __typename?: 'library'
  id: Scalars['uuid']
  name?: Maybe<Scalars['String']>
  user_id: Scalars['String']
}

/** aggregated selection of "library" */
export type Library_Aggregate = {
  __typename?: 'library_aggregate'
  aggregate?: Maybe<Library_Aggregate_Fields>
  nodes: Array<Library>
}

/** aggregate fields of "library" */
export type Library_Aggregate_Fields = {
  __typename?: 'library_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Library_Max_Fields>
  min?: Maybe<Library_Min_Fields>
}

/** aggregate fields of "library" */
export type Library_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Library_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** Boolean expression to filter rows from the table "library". All fields are combined with a logical 'AND'. */
export type Library_Bool_Exp = {
  _and?: Maybe<Array<Library_Bool_Exp>>
  _not?: Maybe<Library_Bool_Exp>
  _or?: Maybe<Array<Library_Bool_Exp>>
  id?: Maybe<Uuid_Comparison_Exp>
  name?: Maybe<String_Comparison_Exp>
  user_id?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "library" */
export enum Library_Constraint {
  /** unique or primary key constraint */
  LibrariesPkey = 'libraries_pkey',
}

/** input type for inserting data into table "library" */
export type Library_Insert_Input = {
  id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  user_id?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Library_Max_Fields = {
  __typename?: 'library_max_fields'
  id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  user_id?: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Library_Min_Fields = {
  __typename?: 'library_min_fields'
  id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  user_id?: Maybe<Scalars['String']>
}

/** response of any mutation on the table "library" */
export type Library_Mutation_Response = {
  __typename?: 'library_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Library>
}

/** input type for inserting object relation for remote table "library" */
export type Library_Obj_Rel_Insert_Input = {
  data: Library_Insert_Input
  /** on conflict condition */
  on_conflict?: Maybe<Library_On_Conflict>
}

/** on conflict condition type for table "library" */
export type Library_On_Conflict = {
  constraint: Library_Constraint
  update_columns: Array<Library_Update_Column>
  where?: Maybe<Library_Bool_Exp>
}

/** Ordering options when selecting data from "library". */
export type Library_Order_By = {
  id?: Maybe<Order_By>
  name?: Maybe<Order_By>
  user_id?: Maybe<Order_By>
}

/** primary key columns input for table: library */
export type Library_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "library" */
export enum Library_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UserId = 'user_id',
}

/** input type for updating data in table "library" */
export type Library_Set_Input = {
  id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  user_id?: Maybe<Scalars['String']>
}

/** update columns of table "library" */
export enum Library_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UserId = 'user_id',
}

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root'
  /** delete data from the table: "app" */
  delete_app?: Maybe<App_Mutation_Response>
  /** delete single row from the table: "app" */
  delete_app_by_pk?: Maybe<App>
  /** delete data from the table: "atom" */
  delete_atom?: Maybe<Atom_Mutation_Response>
  /** delete single row from the table: "atom" */
  delete_atom_by_pk?: Maybe<Atom>
  /** delete data from the table: "atom_type" */
  delete_atom_type?: Maybe<Atom_Type_Mutation_Response>
  /** delete single row from the table: "atom_type" */
  delete_atom_type_by_pk?: Maybe<Atom_Type>
  /** delete data from the table: "attribute" */
  delete_attribute?: Maybe<Attribute_Mutation_Response>
  /** delete single row from the table: "attribute" */
  delete_attribute_by_pk?: Maybe<Attribute>
  /** delete data from the table: "category" */
  delete_category?: Maybe<Category_Mutation_Response>
  /** delete single row from the table: "category" */
  delete_category_by_pk?: Maybe<Category>
  /** delete data from the table: "component" */
  delete_component?: Maybe<Component_Mutation_Response>
  /** delete single row from the table: "component" */
  delete_component_by_pk?: Maybe<Component>
  /** delete data from the table: "component_element" */
  delete_component_element?: Maybe<Component_Element_Mutation_Response>
  /** delete single row from the table: "component_element" */
  delete_component_element_by_pk?: Maybe<Component_Element>
  /** delete data from the table: "component_link" */
  delete_component_link?: Maybe<Component_Link_Mutation_Response>
  /** delete single row from the table: "component_link" */
  delete_component_link_by_pk?: Maybe<Component_Link>
  /** delete data from the table: "lambda" */
  delete_lambda?: Maybe<Lambda_Mutation_Response>
  /** delete single row from the table: "lambda" */
  delete_lambda_by_pk?: Maybe<Lambda>
  /** delete data from the table: "library" */
  delete_library?: Maybe<Library_Mutation_Response>
  /** delete single row from the table: "library" */
  delete_library_by_pk?: Maybe<Library>
  /** delete data from the table: "page" */
  delete_page?: Maybe<Page_Mutation_Response>
  /** delete single row from the table: "page" */
  delete_page_by_pk?: Maybe<Page>
  /** delete data from the table: "page_element" */
  delete_page_element?: Maybe<Page_Element_Mutation_Response>
  /** delete single row from the table: "page_element" */
  delete_page_element_by_pk?: Maybe<Page_Element>
  /** delete data from the table: "page_link" */
  delete_page_link?: Maybe<Page_Link_Mutation_Response>
  /** delete single row from the table: "page_link" */
  delete_page_link_by_pk?: Maybe<Page_Link>
  /** delete data from the table: "prop" */
  delete_prop?: Maybe<Prop_Mutation_Response>
  /** delete single row from the table: "prop" */
  delete_prop_by_pk?: Maybe<Prop>
  /** delete data from the table: "prop_element" */
  delete_prop_element?: Maybe<Prop_Element_Mutation_Response>
  /** delete single row from the table: "prop_element" */
  delete_prop_element_by_pk?: Maybe<Prop_Element>
  /** delete data from the table: "prop_value" */
  delete_prop_value?: Maybe<Prop_Value_Mutation_Response>
  /** delete single row from the table: "prop_value" */
  delete_prop_value_by_pk?: Maybe<Prop_Value>
  /** delete data from the table: "prop_value_tag" */
  delete_prop_value_tag?: Maybe<Prop_Value_Tag_Mutation_Response>
  /** delete single row from the table: "prop_value_tag" */
  delete_prop_value_tag_by_pk?: Maybe<Prop_Value_Tag>
  /** delete data from the table: "prop_value_type" */
  delete_prop_value_type?: Maybe<Prop_Value_Type_Mutation_Response>
  /** delete single row from the table: "prop_value_type" */
  delete_prop_value_type_by_pk?: Maybe<Prop_Value_Type>
  /** delete data from the table: "style" */
  delete_style?: Maybe<Style_Mutation_Response>
  /** delete single row from the table: "style" */
  delete_style_by_pk?: Maybe<Style>
  /** delete data from the table: "tag" */
  delete_tag?: Maybe<Tag_Mutation_Response>
  /** delete single row from the table: "tag" */
  delete_tag_by_pk?: Maybe<Tag>
  /** delete data from the table: "user" */
  delete_user?: Maybe<User_Mutation_Response>
  /** delete single row from the table: "user" */
  delete_user_by_pk?: Maybe<User>
  /** insert data into the table: "app" */
  insert_app?: Maybe<App_Mutation_Response>
  /** insert a single row into the table: "app" */
  insert_app_one?: Maybe<App>
  /** insert data into the table: "atom" */
  insert_atom?: Maybe<Atom_Mutation_Response>
  /** insert a single row into the table: "atom" */
  insert_atom_one?: Maybe<Atom>
  /** insert data into the table: "atom_type" */
  insert_atom_type?: Maybe<Atom_Type_Mutation_Response>
  /** insert a single row into the table: "atom_type" */
  insert_atom_type_one?: Maybe<Atom_Type>
  /** insert data into the table: "attribute" */
  insert_attribute?: Maybe<Attribute_Mutation_Response>
  /** insert a single row into the table: "attribute" */
  insert_attribute_one?: Maybe<Attribute>
  /** insert data into the table: "category" */
  insert_category?: Maybe<Category_Mutation_Response>
  /** insert a single row into the table: "category" */
  insert_category_one?: Maybe<Category>
  /** insert data into the table: "component" */
  insert_component?: Maybe<Component_Mutation_Response>
  /** insert data into the table: "component_element" */
  insert_component_element?: Maybe<Component_Element_Mutation_Response>
  /** insert a single row into the table: "component_element" */
  insert_component_element_one?: Maybe<Component_Element>
  /** insert data into the table: "component_link" */
  insert_component_link?: Maybe<Component_Link_Mutation_Response>
  /** insert a single row into the table: "component_link" */
  insert_component_link_one?: Maybe<Component_Link>
  /** insert a single row into the table: "component" */
  insert_component_one?: Maybe<Component>
  /** insert data into the table: "lambda" */
  insert_lambda?: Maybe<Lambda_Mutation_Response>
  /** insert a single row into the table: "lambda" */
  insert_lambda_one?: Maybe<Lambda>
  /** insert data into the table: "library" */
  insert_library?: Maybe<Library_Mutation_Response>
  /** insert a single row into the table: "library" */
  insert_library_one?: Maybe<Library>
  /** insert data into the table: "page" */
  insert_page?: Maybe<Page_Mutation_Response>
  /** insert data into the table: "page_element" */
  insert_page_element?: Maybe<Page_Element_Mutation_Response>
  /** insert a single row into the table: "page_element" */
  insert_page_element_one?: Maybe<Page_Element>
  /** insert data into the table: "page_link" */
  insert_page_link?: Maybe<Page_Link_Mutation_Response>
  /** insert a single row into the table: "page_link" */
  insert_page_link_one?: Maybe<Page_Link>
  /** insert a single row into the table: "page" */
  insert_page_one?: Maybe<Page>
  /** insert data into the table: "prop" */
  insert_prop?: Maybe<Prop_Mutation_Response>
  /** insert data into the table: "prop_element" */
  insert_prop_element?: Maybe<Prop_Element_Mutation_Response>
  /** insert a single row into the table: "prop_element" */
  insert_prop_element_one?: Maybe<Prop_Element>
  /** insert a single row into the table: "prop" */
  insert_prop_one?: Maybe<Prop>
  /** insert data into the table: "prop_value" */
  insert_prop_value?: Maybe<Prop_Value_Mutation_Response>
  /** insert a single row into the table: "prop_value" */
  insert_prop_value_one?: Maybe<Prop_Value>
  /** insert data into the table: "prop_value_tag" */
  insert_prop_value_tag?: Maybe<Prop_Value_Tag_Mutation_Response>
  /** insert a single row into the table: "prop_value_tag" */
  insert_prop_value_tag_one?: Maybe<Prop_Value_Tag>
  /** insert data into the table: "prop_value_type" */
  insert_prop_value_type?: Maybe<Prop_Value_Type_Mutation_Response>
  /** insert a single row into the table: "prop_value_type" */
  insert_prop_value_type_one?: Maybe<Prop_Value_Type>
  /** insert data into the table: "style" */
  insert_style?: Maybe<Style_Mutation_Response>
  /** insert a single row into the table: "style" */
  insert_style_one?: Maybe<Style>
  /** insert data into the table: "tag" */
  insert_tag?: Maybe<Tag_Mutation_Response>
  /** insert a single row into the table: "tag" */
  insert_tag_one?: Maybe<Tag>
  /** insert data into the table: "user" */
  insert_user?: Maybe<User_Mutation_Response>
  /** insert a single row into the table: "user" */
  insert_user_one?: Maybe<User>
  /** update data of the table: "app" */
  update_app?: Maybe<App_Mutation_Response>
  /** update single row of the table: "app" */
  update_app_by_pk?: Maybe<App>
  /** update data of the table: "atom" */
  update_atom?: Maybe<Atom_Mutation_Response>
  /** update single row of the table: "atom" */
  update_atom_by_pk?: Maybe<Atom>
  /** update data of the table: "atom_type" */
  update_atom_type?: Maybe<Atom_Type_Mutation_Response>
  /** update single row of the table: "atom_type" */
  update_atom_type_by_pk?: Maybe<Atom_Type>
  /** update data of the table: "attribute" */
  update_attribute?: Maybe<Attribute_Mutation_Response>
  /** update single row of the table: "attribute" */
  update_attribute_by_pk?: Maybe<Attribute>
  /** update data of the table: "category" */
  update_category?: Maybe<Category_Mutation_Response>
  /** update single row of the table: "category" */
  update_category_by_pk?: Maybe<Category>
  /** update data of the table: "component" */
  update_component?: Maybe<Component_Mutation_Response>
  /** update single row of the table: "component" */
  update_component_by_pk?: Maybe<Component>
  /** update data of the table: "component_element" */
  update_component_element?: Maybe<Component_Element_Mutation_Response>
  /** update single row of the table: "component_element" */
  update_component_element_by_pk?: Maybe<Component_Element>
  /** update data of the table: "component_link" */
  update_component_link?: Maybe<Component_Link_Mutation_Response>
  /** update single row of the table: "component_link" */
  update_component_link_by_pk?: Maybe<Component_Link>
  /** update data of the table: "lambda" */
  update_lambda?: Maybe<Lambda_Mutation_Response>
  /** update single row of the table: "lambda" */
  update_lambda_by_pk?: Maybe<Lambda>
  /** update data of the table: "library" */
  update_library?: Maybe<Library_Mutation_Response>
  /** update single row of the table: "library" */
  update_library_by_pk?: Maybe<Library>
  /** update data of the table: "page" */
  update_page?: Maybe<Page_Mutation_Response>
  /** update single row of the table: "page" */
  update_page_by_pk?: Maybe<Page>
  /** update data of the table: "page_element" */
  update_page_element?: Maybe<Page_Element_Mutation_Response>
  /** update single row of the table: "page_element" */
  update_page_element_by_pk?: Maybe<Page_Element>
  /** update data of the table: "page_link" */
  update_page_link?: Maybe<Page_Link_Mutation_Response>
  /** update single row of the table: "page_link" */
  update_page_link_by_pk?: Maybe<Page_Link>
  /** update data of the table: "prop" */
  update_prop?: Maybe<Prop_Mutation_Response>
  /** update single row of the table: "prop" */
  update_prop_by_pk?: Maybe<Prop>
  /** update data of the table: "prop_element" */
  update_prop_element?: Maybe<Prop_Element_Mutation_Response>
  /** update single row of the table: "prop_element" */
  update_prop_element_by_pk?: Maybe<Prop_Element>
  /** update data of the table: "prop_value" */
  update_prop_value?: Maybe<Prop_Value_Mutation_Response>
  /** update single row of the table: "prop_value" */
  update_prop_value_by_pk?: Maybe<Prop_Value>
  /** update data of the table: "prop_value_tag" */
  update_prop_value_tag?: Maybe<Prop_Value_Tag_Mutation_Response>
  /** update single row of the table: "prop_value_tag" */
  update_prop_value_tag_by_pk?: Maybe<Prop_Value_Tag>
  /** update data of the table: "prop_value_type" */
  update_prop_value_type?: Maybe<Prop_Value_Type_Mutation_Response>
  /** update single row of the table: "prop_value_type" */
  update_prop_value_type_by_pk?: Maybe<Prop_Value_Type>
  /** update data of the table: "style" */
  update_style?: Maybe<Style_Mutation_Response>
  /** update single row of the table: "style" */
  update_style_by_pk?: Maybe<Style>
  /** update data of the table: "tag" */
  update_tag?: Maybe<Tag_Mutation_Response>
  /** update single row of the table: "tag" */
  update_tag_by_pk?: Maybe<Tag>
  /** update data of the table: "user" */
  update_user?: Maybe<User_Mutation_Response>
  /** update single row of the table: "user" */
  update_user_by_pk?: Maybe<User>
}

/** mutation root */
export type Mutation_RootDelete_AppArgs = {
  where: App_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_App_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_AtomArgs = {
  where: Atom_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Atom_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_Atom_TypeArgs = {
  where: Atom_Type_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Atom_Type_By_PkArgs = {
  value: Scalars['String']
}

/** mutation root */
export type Mutation_RootDelete_AttributeArgs = {
  where: Attribute_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Attribute_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_CategoryArgs = {
  where: Category_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Category_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_ComponentArgs = {
  where: Component_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Component_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_Component_ElementArgs = {
  where: Component_Element_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Component_Element_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_Component_LinkArgs = {
  where: Component_Link_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Component_Link_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_LambdaArgs = {
  where: Lambda_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Lambda_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_LibraryArgs = {
  where: Library_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Library_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_PageArgs = {
  where: Page_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Page_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_Page_ElementArgs = {
  where: Page_Element_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Page_Element_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_Page_LinkArgs = {
  where: Page_Link_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Page_Link_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_PropArgs = {
  where: Prop_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Prop_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_Prop_ElementArgs = {
  where: Prop_Element_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Prop_Element_By_PkArgs = {
  element_id: Scalars['uuid']
  prop_id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_Prop_ValueArgs = {
  where: Prop_Value_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Prop_Value_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_Prop_Value_TagArgs = {
  where: Prop_Value_Tag_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Prop_Value_Tag_By_PkArgs = {
  prop_value_id: Scalars['uuid']
  tag_id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_Prop_Value_TypeArgs = {
  where: Prop_Value_Type_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Prop_Value_Type_By_PkArgs = {
  value: Scalars['String']
}

/** mutation root */
export type Mutation_RootDelete_StyleArgs = {
  where: Style_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Style_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_TagArgs = {
  where: Tag_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Tag_By_PkArgs = {
  id: Scalars['uuid']
}

/** mutation root */
export type Mutation_RootDelete_UserArgs = {
  where: User_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_User_By_PkArgs = {
  id: Scalars['String']
}

/** mutation root */
export type Mutation_RootInsert_AppArgs = {
  objects: Array<App_Insert_Input>
  on_conflict?: Maybe<App_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_App_OneArgs = {
  object: App_Insert_Input
  on_conflict?: Maybe<App_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_AtomArgs = {
  objects: Array<Atom_Insert_Input>
  on_conflict?: Maybe<Atom_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Atom_OneArgs = {
  object: Atom_Insert_Input
  on_conflict?: Maybe<Atom_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Atom_TypeArgs = {
  objects: Array<Atom_Type_Insert_Input>
  on_conflict?: Maybe<Atom_Type_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Atom_Type_OneArgs = {
  object: Atom_Type_Insert_Input
  on_conflict?: Maybe<Atom_Type_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_AttributeArgs = {
  objects: Array<Attribute_Insert_Input>
  on_conflict?: Maybe<Attribute_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Attribute_OneArgs = {
  object: Attribute_Insert_Input
  on_conflict?: Maybe<Attribute_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_CategoryArgs = {
  objects: Array<Category_Insert_Input>
  on_conflict?: Maybe<Category_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Category_OneArgs = {
  object: Category_Insert_Input
  on_conflict?: Maybe<Category_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_ComponentArgs = {
  objects: Array<Component_Insert_Input>
  on_conflict?: Maybe<Component_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Component_ElementArgs = {
  objects: Array<Component_Element_Insert_Input>
  on_conflict?: Maybe<Component_Element_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Component_Element_OneArgs = {
  object: Component_Element_Insert_Input
  on_conflict?: Maybe<Component_Element_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Component_LinkArgs = {
  objects: Array<Component_Link_Insert_Input>
  on_conflict?: Maybe<Component_Link_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Component_Link_OneArgs = {
  object: Component_Link_Insert_Input
  on_conflict?: Maybe<Component_Link_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Component_OneArgs = {
  object: Component_Insert_Input
  on_conflict?: Maybe<Component_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_LambdaArgs = {
  objects: Array<Lambda_Insert_Input>
  on_conflict?: Maybe<Lambda_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Lambda_OneArgs = {
  object: Lambda_Insert_Input
  on_conflict?: Maybe<Lambda_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_LibraryArgs = {
  objects: Array<Library_Insert_Input>
  on_conflict?: Maybe<Library_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Library_OneArgs = {
  object: Library_Insert_Input
  on_conflict?: Maybe<Library_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_PageArgs = {
  objects: Array<Page_Insert_Input>
  on_conflict?: Maybe<Page_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Page_ElementArgs = {
  objects: Array<Page_Element_Insert_Input>
  on_conflict?: Maybe<Page_Element_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Page_Element_OneArgs = {
  object: Page_Element_Insert_Input
  on_conflict?: Maybe<Page_Element_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Page_LinkArgs = {
  objects: Array<Page_Link_Insert_Input>
  on_conflict?: Maybe<Page_Link_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Page_Link_OneArgs = {
  object: Page_Link_Insert_Input
  on_conflict?: Maybe<Page_Link_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Page_OneArgs = {
  object: Page_Insert_Input
  on_conflict?: Maybe<Page_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_PropArgs = {
  objects: Array<Prop_Insert_Input>
  on_conflict?: Maybe<Prop_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Prop_ElementArgs = {
  objects: Array<Prop_Element_Insert_Input>
  on_conflict?: Maybe<Prop_Element_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Prop_Element_OneArgs = {
  object: Prop_Element_Insert_Input
  on_conflict?: Maybe<Prop_Element_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Prop_OneArgs = {
  object: Prop_Insert_Input
  on_conflict?: Maybe<Prop_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Prop_ValueArgs = {
  objects: Array<Prop_Value_Insert_Input>
  on_conflict?: Maybe<Prop_Value_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Prop_Value_OneArgs = {
  object: Prop_Value_Insert_Input
  on_conflict?: Maybe<Prop_Value_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Prop_Value_TagArgs = {
  objects: Array<Prop_Value_Tag_Insert_Input>
  on_conflict?: Maybe<Prop_Value_Tag_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Prop_Value_Tag_OneArgs = {
  object: Prop_Value_Tag_Insert_Input
  on_conflict?: Maybe<Prop_Value_Tag_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Prop_Value_TypeArgs = {
  objects: Array<Prop_Value_Type_Insert_Input>
  on_conflict?: Maybe<Prop_Value_Type_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Prop_Value_Type_OneArgs = {
  object: Prop_Value_Type_Insert_Input
  on_conflict?: Maybe<Prop_Value_Type_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_StyleArgs = {
  objects: Array<Style_Insert_Input>
  on_conflict?: Maybe<Style_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Style_OneArgs = {
  object: Style_Insert_Input
  on_conflict?: Maybe<Style_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_TagArgs = {
  objects: Array<Tag_Insert_Input>
  on_conflict?: Maybe<Tag_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Tag_OneArgs = {
  object: Tag_Insert_Input
  on_conflict?: Maybe<Tag_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_UserArgs = {
  objects: Array<User_Insert_Input>
  on_conflict?: Maybe<User_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_User_OneArgs = {
  object: User_Insert_Input
  on_conflict?: Maybe<User_On_Conflict>
}

/** mutation root */
export type Mutation_RootUpdate_AppArgs = {
  _set?: Maybe<App_Set_Input>
  where: App_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_App_By_PkArgs = {
  _set?: Maybe<App_Set_Input>
  pk_columns: App_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_AtomArgs = {
  _set?: Maybe<Atom_Set_Input>
  where: Atom_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Atom_By_PkArgs = {
  _set?: Maybe<Atom_Set_Input>
  pk_columns: Atom_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Atom_TypeArgs = {
  _set?: Maybe<Atom_Type_Set_Input>
  where: Atom_Type_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Atom_Type_By_PkArgs = {
  _set?: Maybe<Atom_Type_Set_Input>
  pk_columns: Atom_Type_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_AttributeArgs = {
  _set?: Maybe<Attribute_Set_Input>
  where: Attribute_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Attribute_By_PkArgs = {
  _set?: Maybe<Attribute_Set_Input>
  pk_columns: Attribute_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_CategoryArgs = {
  _set?: Maybe<Category_Set_Input>
  where: Category_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Category_By_PkArgs = {
  _set?: Maybe<Category_Set_Input>
  pk_columns: Category_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_ComponentArgs = {
  _set?: Maybe<Component_Set_Input>
  where: Component_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Component_By_PkArgs = {
  _set?: Maybe<Component_Set_Input>
  pk_columns: Component_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Component_ElementArgs = {
  _set?: Maybe<Component_Element_Set_Input>
  where: Component_Element_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Component_Element_By_PkArgs = {
  _set?: Maybe<Component_Element_Set_Input>
  pk_columns: Component_Element_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Component_LinkArgs = {
  _append?: Maybe<Component_Link_Append_Input>
  _delete_at_path?: Maybe<Component_Link_Delete_At_Path_Input>
  _delete_elem?: Maybe<Component_Link_Delete_Elem_Input>
  _delete_key?: Maybe<Component_Link_Delete_Key_Input>
  _inc?: Maybe<Component_Link_Inc_Input>
  _prepend?: Maybe<Component_Link_Prepend_Input>
  _set?: Maybe<Component_Link_Set_Input>
  where: Component_Link_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Component_Link_By_PkArgs = {
  _append?: Maybe<Component_Link_Append_Input>
  _delete_at_path?: Maybe<Component_Link_Delete_At_Path_Input>
  _delete_elem?: Maybe<Component_Link_Delete_Elem_Input>
  _delete_key?: Maybe<Component_Link_Delete_Key_Input>
  _inc?: Maybe<Component_Link_Inc_Input>
  _prepend?: Maybe<Component_Link_Prepend_Input>
  _set?: Maybe<Component_Link_Set_Input>
  pk_columns: Component_Link_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_LambdaArgs = {
  _set?: Maybe<Lambda_Set_Input>
  where: Lambda_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Lambda_By_PkArgs = {
  _set?: Maybe<Lambda_Set_Input>
  pk_columns: Lambda_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_LibraryArgs = {
  _set?: Maybe<Library_Set_Input>
  where: Library_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Library_By_PkArgs = {
  _set?: Maybe<Library_Set_Input>
  pk_columns: Library_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_PageArgs = {
  _set?: Maybe<Page_Set_Input>
  where: Page_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Page_By_PkArgs = {
  _set?: Maybe<Page_Set_Input>
  pk_columns: Page_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Page_ElementArgs = {
  _set?: Maybe<Page_Element_Set_Input>
  where: Page_Element_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Page_Element_By_PkArgs = {
  _set?: Maybe<Page_Element_Set_Input>
  pk_columns: Page_Element_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Page_LinkArgs = {
  _append?: Maybe<Page_Link_Append_Input>
  _delete_at_path?: Maybe<Page_Link_Delete_At_Path_Input>
  _delete_elem?: Maybe<Page_Link_Delete_Elem_Input>
  _delete_key?: Maybe<Page_Link_Delete_Key_Input>
  _inc?: Maybe<Page_Link_Inc_Input>
  _prepend?: Maybe<Page_Link_Prepend_Input>
  _set?: Maybe<Page_Link_Set_Input>
  where: Page_Link_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Page_Link_By_PkArgs = {
  _append?: Maybe<Page_Link_Append_Input>
  _delete_at_path?: Maybe<Page_Link_Delete_At_Path_Input>
  _delete_elem?: Maybe<Page_Link_Delete_Elem_Input>
  _delete_key?: Maybe<Page_Link_Delete_Key_Input>
  _inc?: Maybe<Page_Link_Inc_Input>
  _prepend?: Maybe<Page_Link_Prepend_Input>
  _set?: Maybe<Page_Link_Set_Input>
  pk_columns: Page_Link_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_PropArgs = {
  _set?: Maybe<Prop_Set_Input>
  where: Prop_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Prop_By_PkArgs = {
  _set?: Maybe<Prop_Set_Input>
  pk_columns: Prop_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Prop_ElementArgs = {
  _set?: Maybe<Prop_Element_Set_Input>
  where: Prop_Element_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Prop_Element_By_PkArgs = {
  _set?: Maybe<Prop_Element_Set_Input>
  pk_columns: Prop_Element_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Prop_ValueArgs = {
  _set?: Maybe<Prop_Value_Set_Input>
  where: Prop_Value_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Prop_Value_By_PkArgs = {
  _set?: Maybe<Prop_Value_Set_Input>
  pk_columns: Prop_Value_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Prop_Value_TagArgs = {
  _set?: Maybe<Prop_Value_Tag_Set_Input>
  where: Prop_Value_Tag_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Prop_Value_Tag_By_PkArgs = {
  _set?: Maybe<Prop_Value_Tag_Set_Input>
  pk_columns: Prop_Value_Tag_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Prop_Value_TypeArgs = {
  _set?: Maybe<Prop_Value_Type_Set_Input>
  where: Prop_Value_Type_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Prop_Value_Type_By_PkArgs = {
  _set?: Maybe<Prop_Value_Type_Set_Input>
  pk_columns: Prop_Value_Type_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_StyleArgs = {
  _set?: Maybe<Style_Set_Input>
  where: Style_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Style_By_PkArgs = {
  _set?: Maybe<Style_Set_Input>
  pk_columns: Style_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_TagArgs = {
  _set?: Maybe<Tag_Set_Input>
  where: Tag_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Tag_By_PkArgs = {
  _set?: Maybe<Tag_Set_Input>
  pk_columns: Tag_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_UserArgs = {
  _set?: Maybe<User_Set_Input>
  where: User_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_User_By_PkArgs = {
  _set?: Maybe<User_Set_Input>
  pk_columns: User_Pk_Columns_Input
}

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last',
}

/** columns and relationships of "page" */
export type Page = {
  __typename?: 'page'
  /** An object relationship */
  app: App
  app_id: Scalars['uuid']
  /** An array relationship */
  elements: Array<Page_Element>
  /** An aggregate relationship */
  elements_aggregate: Page_Element_Aggregate
  id: Scalars['uuid']
  /** An array relationship */
  links: Array<Page_Link>
  /** An aggregate relationship */
  links_aggregate: Page_Link_Aggregate
  name: Scalars['String']
  /** An object relationship */
  user: User
  user_id: Scalars['String']
}

/** columns and relationships of "page" */
export type PageElementsArgs = {
  distinct_on?: Maybe<Array<Page_Element_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Page_Element_Order_By>>
  where?: Maybe<Page_Element_Bool_Exp>
}

/** columns and relationships of "page" */
export type PageElements_AggregateArgs = {
  distinct_on?: Maybe<Array<Page_Element_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Page_Element_Order_By>>
  where?: Maybe<Page_Element_Bool_Exp>
}

/** columns and relationships of "page" */
export type PageLinksArgs = {
  distinct_on?: Maybe<Array<Page_Link_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Page_Link_Order_By>>
  where?: Maybe<Page_Link_Bool_Exp>
}

/** columns and relationships of "page" */
export type PageLinks_AggregateArgs = {
  distinct_on?: Maybe<Array<Page_Link_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Page_Link_Order_By>>
  where?: Maybe<Page_Link_Bool_Exp>
}

/** aggregated selection of "page" */
export type Page_Aggregate = {
  __typename?: 'page_aggregate'
  aggregate?: Maybe<Page_Aggregate_Fields>
  nodes: Array<Page>
}

/** aggregate fields of "page" */
export type Page_Aggregate_Fields = {
  __typename?: 'page_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Page_Max_Fields>
  min?: Maybe<Page_Min_Fields>
}

/** aggregate fields of "page" */
export type Page_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Page_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "page" */
export type Page_Aggregate_Order_By = {
  count?: Maybe<Order_By>
  max?: Maybe<Page_Max_Order_By>
  min?: Maybe<Page_Min_Order_By>
}

/** input type for inserting array relation for remote table "page" */
export type Page_Arr_Rel_Insert_Input = {
  data: Array<Page_Insert_Input>
  /** on conflict condition */
  on_conflict?: Maybe<Page_On_Conflict>
}

/** Boolean expression to filter rows from the table "page". All fields are combined with a logical 'AND'. */
export type Page_Bool_Exp = {
  _and?: Maybe<Array<Page_Bool_Exp>>
  _not?: Maybe<Page_Bool_Exp>
  _or?: Maybe<Array<Page_Bool_Exp>>
  app?: Maybe<App_Bool_Exp>
  app_id?: Maybe<Uuid_Comparison_Exp>
  elements?: Maybe<Page_Element_Bool_Exp>
  id?: Maybe<Uuid_Comparison_Exp>
  links?: Maybe<Page_Link_Bool_Exp>
  name?: Maybe<String_Comparison_Exp>
  user?: Maybe<User_Bool_Exp>
  user_id?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "page" */
export enum Page_Constraint {
  /** unique or primary key constraint */
  PagesPkey = 'pages_pkey',
}

/** columns and relationships of "page_element" */
export type Page_Element = {
  __typename?: 'page_element'
  /** An object relationship */
  component: Component
  component_id: Scalars['uuid']
  id: Scalars['uuid']
  name?: Maybe<Scalars['String']>
  /** An object relationship */
  page: Page
  page_id: Scalars['uuid']
  /** An array relationship */
  props: Array<Prop_Element>
  /** An aggregate relationship */
  props_aggregate: Prop_Element_Aggregate
}

/** columns and relationships of "page_element" */
export type Page_ElementPropsArgs = {
  distinct_on?: Maybe<Array<Prop_Element_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Element_Order_By>>
  where?: Maybe<Prop_Element_Bool_Exp>
}

/** columns and relationships of "page_element" */
export type Page_ElementProps_AggregateArgs = {
  distinct_on?: Maybe<Array<Prop_Element_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Element_Order_By>>
  where?: Maybe<Prop_Element_Bool_Exp>
}

/** aggregated selection of "page_element" */
export type Page_Element_Aggregate = {
  __typename?: 'page_element_aggregate'
  aggregate?: Maybe<Page_Element_Aggregate_Fields>
  nodes: Array<Page_Element>
}

/** aggregate fields of "page_element" */
export type Page_Element_Aggregate_Fields = {
  __typename?: 'page_element_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Page_Element_Max_Fields>
  min?: Maybe<Page_Element_Min_Fields>
}

/** aggregate fields of "page_element" */
export type Page_Element_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Page_Element_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "page_element" */
export type Page_Element_Aggregate_Order_By = {
  count?: Maybe<Order_By>
  max?: Maybe<Page_Element_Max_Order_By>
  min?: Maybe<Page_Element_Min_Order_By>
}

/** input type for inserting array relation for remote table "page_element" */
export type Page_Element_Arr_Rel_Insert_Input = {
  data: Array<Page_Element_Insert_Input>
  /** on conflict condition */
  on_conflict?: Maybe<Page_Element_On_Conflict>
}

/** Boolean expression to filter rows from the table "page_element". All fields are combined with a logical 'AND'. */
export type Page_Element_Bool_Exp = {
  _and?: Maybe<Array<Page_Element_Bool_Exp>>
  _not?: Maybe<Page_Element_Bool_Exp>
  _or?: Maybe<Array<Page_Element_Bool_Exp>>
  component?: Maybe<Component_Bool_Exp>
  component_id?: Maybe<Uuid_Comparison_Exp>
  id?: Maybe<Uuid_Comparison_Exp>
  name?: Maybe<String_Comparison_Exp>
  page?: Maybe<Page_Bool_Exp>
  page_id?: Maybe<Uuid_Comparison_Exp>
  props?: Maybe<Prop_Element_Bool_Exp>
}

/** unique or primary key constraints on table "page_element" */
export enum Page_Element_Constraint {
  /** unique or primary key constraint */
  ElementsPkey = 'elements_pkey',
}

/** input type for inserting data into table "page_element" */
export type Page_Element_Insert_Input = {
  component?: Maybe<Component_Obj_Rel_Insert_Input>
  component_id?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  page?: Maybe<Page_Obj_Rel_Insert_Input>
  page_id?: Maybe<Scalars['uuid']>
  props?: Maybe<Prop_Element_Arr_Rel_Insert_Input>
}

/** aggregate max on columns */
export type Page_Element_Max_Fields = {
  __typename?: 'page_element_max_fields'
  component_id?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  page_id?: Maybe<Scalars['uuid']>
}

/** order by max() on columns of table "page_element" */
export type Page_Element_Max_Order_By = {
  component_id?: Maybe<Order_By>
  id?: Maybe<Order_By>
  name?: Maybe<Order_By>
  page_id?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Page_Element_Min_Fields = {
  __typename?: 'page_element_min_fields'
  component_id?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  page_id?: Maybe<Scalars['uuid']>
}

/** order by min() on columns of table "page_element" */
export type Page_Element_Min_Order_By = {
  component_id?: Maybe<Order_By>
  id?: Maybe<Order_By>
  name?: Maybe<Order_By>
  page_id?: Maybe<Order_By>
}

/** response of any mutation on the table "page_element" */
export type Page_Element_Mutation_Response = {
  __typename?: 'page_element_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Page_Element>
}

/** input type for inserting object relation for remote table "page_element" */
export type Page_Element_Obj_Rel_Insert_Input = {
  data: Page_Element_Insert_Input
  /** on conflict condition */
  on_conflict?: Maybe<Page_Element_On_Conflict>
}

/** on conflict condition type for table "page_element" */
export type Page_Element_On_Conflict = {
  constraint: Page_Element_Constraint
  update_columns: Array<Page_Element_Update_Column>
  where?: Maybe<Page_Element_Bool_Exp>
}

/** Ordering options when selecting data from "page_element". */
export type Page_Element_Order_By = {
  component?: Maybe<Component_Order_By>
  component_id?: Maybe<Order_By>
  id?: Maybe<Order_By>
  name?: Maybe<Order_By>
  page?: Maybe<Page_Order_By>
  page_id?: Maybe<Order_By>
  props_aggregate?: Maybe<Prop_Element_Aggregate_Order_By>
}

/** primary key columns input for table: page_element */
export type Page_Element_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "page_element" */
export enum Page_Element_Select_Column {
  /** column name */
  ComponentId = 'component_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  PageId = 'page_id',
}

/** input type for updating data in table "page_element" */
export type Page_Element_Set_Input = {
  component_id?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  page_id?: Maybe<Scalars['uuid']>
}

/** update columns of table "page_element" */
export enum Page_Element_Update_Column {
  /** column name */
  ComponentId = 'component_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  PageId = 'page_id',
}

/** input type for inserting data into table "page" */
export type Page_Insert_Input = {
  app?: Maybe<App_Obj_Rel_Insert_Input>
  app_id?: Maybe<Scalars['uuid']>
  elements?: Maybe<Page_Element_Arr_Rel_Insert_Input>
  id?: Maybe<Scalars['uuid']>
  links?: Maybe<Page_Link_Arr_Rel_Insert_Input>
  name?: Maybe<Scalars['String']>
  user?: Maybe<User_Obj_Rel_Insert_Input>
  user_id?: Maybe<Scalars['String']>
}

/** columns and relationships of "page_link" */
export type Page_Link = {
  __typename?: 'page_link'
  id: Scalars['uuid']
  order?: Maybe<Scalars['Int']>
  page_id: Scalars['uuid']
  props?: Maybe<Scalars['jsonb']>
  source_element_id: Scalars['uuid']
  target_element_id: Scalars['uuid']
}

/** columns and relationships of "page_link" */
export type Page_LinkPropsArgs = {
  path?: Maybe<Scalars['String']>
}

/** aggregated selection of "page_link" */
export type Page_Link_Aggregate = {
  __typename?: 'page_link_aggregate'
  aggregate?: Maybe<Page_Link_Aggregate_Fields>
  nodes: Array<Page_Link>
}

/** aggregate fields of "page_link" */
export type Page_Link_Aggregate_Fields = {
  __typename?: 'page_link_aggregate_fields'
  avg?: Maybe<Page_Link_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Page_Link_Max_Fields>
  min?: Maybe<Page_Link_Min_Fields>
  stddev?: Maybe<Page_Link_Stddev_Fields>
  stddev_pop?: Maybe<Page_Link_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Page_Link_Stddev_Samp_Fields>
  sum?: Maybe<Page_Link_Sum_Fields>
  var_pop?: Maybe<Page_Link_Var_Pop_Fields>
  var_samp?: Maybe<Page_Link_Var_Samp_Fields>
  variance?: Maybe<Page_Link_Variance_Fields>
}

/** aggregate fields of "page_link" */
export type Page_Link_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Page_Link_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "page_link" */
export type Page_Link_Aggregate_Order_By = {
  avg?: Maybe<Page_Link_Avg_Order_By>
  count?: Maybe<Order_By>
  max?: Maybe<Page_Link_Max_Order_By>
  min?: Maybe<Page_Link_Min_Order_By>
  stddev?: Maybe<Page_Link_Stddev_Order_By>
  stddev_pop?: Maybe<Page_Link_Stddev_Pop_Order_By>
  stddev_samp?: Maybe<Page_Link_Stddev_Samp_Order_By>
  sum?: Maybe<Page_Link_Sum_Order_By>
  var_pop?: Maybe<Page_Link_Var_Pop_Order_By>
  var_samp?: Maybe<Page_Link_Var_Samp_Order_By>
  variance?: Maybe<Page_Link_Variance_Order_By>
}

/** append existing jsonb value of filtered columns with new jsonb value */
export type Page_Link_Append_Input = {
  props?: Maybe<Scalars['jsonb']>
}

/** input type for inserting array relation for remote table "page_link" */
export type Page_Link_Arr_Rel_Insert_Input = {
  data: Array<Page_Link_Insert_Input>
  /** on conflict condition */
  on_conflict?: Maybe<Page_Link_On_Conflict>
}

/** aggregate avg on columns */
export type Page_Link_Avg_Fields = {
  __typename?: 'page_link_avg_fields'
  order?: Maybe<Scalars['Float']>
}

/** order by avg() on columns of table "page_link" */
export type Page_Link_Avg_Order_By = {
  order?: Maybe<Order_By>
}

/** Boolean expression to filter rows from the table "page_link". All fields are combined with a logical 'AND'. */
export type Page_Link_Bool_Exp = {
  _and?: Maybe<Array<Page_Link_Bool_Exp>>
  _not?: Maybe<Page_Link_Bool_Exp>
  _or?: Maybe<Array<Page_Link_Bool_Exp>>
  id?: Maybe<Uuid_Comparison_Exp>
  order?: Maybe<Int_Comparison_Exp>
  page_id?: Maybe<Uuid_Comparison_Exp>
  props?: Maybe<Jsonb_Comparison_Exp>
  source_element_id?: Maybe<Uuid_Comparison_Exp>
  target_element_id?: Maybe<Uuid_Comparison_Exp>
}

/** unique or primary key constraints on table "page_link" */
export enum Page_Link_Constraint {
  /** unique or primary key constraint */
  PageLinksPkey = 'page_links_pkey',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Page_Link_Delete_At_Path_Input = {
  props?: Maybe<Array<Scalars['String']>>
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Page_Link_Delete_Elem_Input = {
  props?: Maybe<Scalars['Int']>
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Page_Link_Delete_Key_Input = {
  props?: Maybe<Scalars['String']>
}

/** input type for incrementing numeric columns in table "page_link" */
export type Page_Link_Inc_Input = {
  order?: Maybe<Scalars['Int']>
}

/** input type for inserting data into table "page_link" */
export type Page_Link_Insert_Input = {
  id?: Maybe<Scalars['uuid']>
  order?: Maybe<Scalars['Int']>
  page_id?: Maybe<Scalars['uuid']>
  props?: Maybe<Scalars['jsonb']>
  source_element_id?: Maybe<Scalars['uuid']>
  target_element_id?: Maybe<Scalars['uuid']>
}

/** aggregate max on columns */
export type Page_Link_Max_Fields = {
  __typename?: 'page_link_max_fields'
  id?: Maybe<Scalars['uuid']>
  order?: Maybe<Scalars['Int']>
  page_id?: Maybe<Scalars['uuid']>
  source_element_id?: Maybe<Scalars['uuid']>
  target_element_id?: Maybe<Scalars['uuid']>
}

/** order by max() on columns of table "page_link" */
export type Page_Link_Max_Order_By = {
  id?: Maybe<Order_By>
  order?: Maybe<Order_By>
  page_id?: Maybe<Order_By>
  source_element_id?: Maybe<Order_By>
  target_element_id?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Page_Link_Min_Fields = {
  __typename?: 'page_link_min_fields'
  id?: Maybe<Scalars['uuid']>
  order?: Maybe<Scalars['Int']>
  page_id?: Maybe<Scalars['uuid']>
  source_element_id?: Maybe<Scalars['uuid']>
  target_element_id?: Maybe<Scalars['uuid']>
}

/** order by min() on columns of table "page_link" */
export type Page_Link_Min_Order_By = {
  id?: Maybe<Order_By>
  order?: Maybe<Order_By>
  page_id?: Maybe<Order_By>
  source_element_id?: Maybe<Order_By>
  target_element_id?: Maybe<Order_By>
}

/** response of any mutation on the table "page_link" */
export type Page_Link_Mutation_Response = {
  __typename?: 'page_link_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Page_Link>
}

/** on conflict condition type for table "page_link" */
export type Page_Link_On_Conflict = {
  constraint: Page_Link_Constraint
  update_columns: Array<Page_Link_Update_Column>
  where?: Maybe<Page_Link_Bool_Exp>
}

/** Ordering options when selecting data from "page_link". */
export type Page_Link_Order_By = {
  id?: Maybe<Order_By>
  order?: Maybe<Order_By>
  page_id?: Maybe<Order_By>
  props?: Maybe<Order_By>
  source_element_id?: Maybe<Order_By>
  target_element_id?: Maybe<Order_By>
}

/** primary key columns input for table: page_link */
export type Page_Link_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Page_Link_Prepend_Input = {
  props?: Maybe<Scalars['jsonb']>
}

/** select columns of table "page_link" */
export enum Page_Link_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Order = 'order',
  /** column name */
  PageId = 'page_id',
  /** column name */
  Props = 'props',
  /** column name */
  SourceElementId = 'source_element_id',
  /** column name */
  TargetElementId = 'target_element_id',
}

/** input type for updating data in table "page_link" */
export type Page_Link_Set_Input = {
  id?: Maybe<Scalars['uuid']>
  order?: Maybe<Scalars['Int']>
  page_id?: Maybe<Scalars['uuid']>
  props?: Maybe<Scalars['jsonb']>
  source_element_id?: Maybe<Scalars['uuid']>
  target_element_id?: Maybe<Scalars['uuid']>
}

/** aggregate stddev on columns */
export type Page_Link_Stddev_Fields = {
  __typename?: 'page_link_stddev_fields'
  order?: Maybe<Scalars['Float']>
}

/** order by stddev() on columns of table "page_link" */
export type Page_Link_Stddev_Order_By = {
  order?: Maybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Page_Link_Stddev_Pop_Fields = {
  __typename?: 'page_link_stddev_pop_fields'
  order?: Maybe<Scalars['Float']>
}

/** order by stddev_pop() on columns of table "page_link" */
export type Page_Link_Stddev_Pop_Order_By = {
  order?: Maybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Page_Link_Stddev_Samp_Fields = {
  __typename?: 'page_link_stddev_samp_fields'
  order?: Maybe<Scalars['Float']>
}

/** order by stddev_samp() on columns of table "page_link" */
export type Page_Link_Stddev_Samp_Order_By = {
  order?: Maybe<Order_By>
}

/** aggregate sum on columns */
export type Page_Link_Sum_Fields = {
  __typename?: 'page_link_sum_fields'
  order?: Maybe<Scalars['Int']>
}

/** order by sum() on columns of table "page_link" */
export type Page_Link_Sum_Order_By = {
  order?: Maybe<Order_By>
}

/** update columns of table "page_link" */
export enum Page_Link_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Order = 'order',
  /** column name */
  PageId = 'page_id',
  /** column name */
  Props = 'props',
  /** column name */
  SourceElementId = 'source_element_id',
  /** column name */
  TargetElementId = 'target_element_id',
}

/** aggregate var_pop on columns */
export type Page_Link_Var_Pop_Fields = {
  __typename?: 'page_link_var_pop_fields'
  order?: Maybe<Scalars['Float']>
}

/** order by var_pop() on columns of table "page_link" */
export type Page_Link_Var_Pop_Order_By = {
  order?: Maybe<Order_By>
}

/** aggregate var_samp on columns */
export type Page_Link_Var_Samp_Fields = {
  __typename?: 'page_link_var_samp_fields'
  order?: Maybe<Scalars['Float']>
}

/** order by var_samp() on columns of table "page_link" */
export type Page_Link_Var_Samp_Order_By = {
  order?: Maybe<Order_By>
}

/** aggregate variance on columns */
export type Page_Link_Variance_Fields = {
  __typename?: 'page_link_variance_fields'
  order?: Maybe<Scalars['Float']>
}

/** order by variance() on columns of table "page_link" */
export type Page_Link_Variance_Order_By = {
  order?: Maybe<Order_By>
}

/** aggregate max on columns */
export type Page_Max_Fields = {
  __typename?: 'page_max_fields'
  app_id?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  user_id?: Maybe<Scalars['String']>
}

/** order by max() on columns of table "page" */
export type Page_Max_Order_By = {
  app_id?: Maybe<Order_By>
  id?: Maybe<Order_By>
  name?: Maybe<Order_By>
  user_id?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Page_Min_Fields = {
  __typename?: 'page_min_fields'
  app_id?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  user_id?: Maybe<Scalars['String']>
}

/** order by min() on columns of table "page" */
export type Page_Min_Order_By = {
  app_id?: Maybe<Order_By>
  id?: Maybe<Order_By>
  name?: Maybe<Order_By>
  user_id?: Maybe<Order_By>
}

/** response of any mutation on the table "page" */
export type Page_Mutation_Response = {
  __typename?: 'page_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Page>
}

/** input type for inserting object relation for remote table "page" */
export type Page_Obj_Rel_Insert_Input = {
  data: Page_Insert_Input
  /** on conflict condition */
  on_conflict?: Maybe<Page_On_Conflict>
}

/** on conflict condition type for table "page" */
export type Page_On_Conflict = {
  constraint: Page_Constraint
  update_columns: Array<Page_Update_Column>
  where?: Maybe<Page_Bool_Exp>
}

/** Ordering options when selecting data from "page". */
export type Page_Order_By = {
  app?: Maybe<App_Order_By>
  app_id?: Maybe<Order_By>
  elements_aggregate?: Maybe<Page_Element_Aggregate_Order_By>
  id?: Maybe<Order_By>
  links_aggregate?: Maybe<Page_Link_Aggregate_Order_By>
  name?: Maybe<Order_By>
  user?: Maybe<User_Order_By>
  user_id?: Maybe<Order_By>
}

/** primary key columns input for table: page */
export type Page_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "page" */
export enum Page_Select_Column {
  /** column name */
  AppId = 'app_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UserId = 'user_id',
}

/** input type for updating data in table "page" */
export type Page_Set_Input = {
  app_id?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  user_id?: Maybe<Scalars['String']>
}

/** update columns of table "page" */
export enum Page_Update_Column {
  /** column name */
  AppId = 'app_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UserId = 'user_id',
}

/** columns and relationships of "prop" */
export type Prop = {
  __typename?: 'prop'
  /** An object relationship */
  attribute: Attribute
  attribute_id: Scalars['uuid']
  id: Scalars['uuid']
  /** An object relationship */
  library: Library
  library_id: Scalars['uuid']
  /** An array relationship */
  values: Array<Prop_Value>
  /** An aggregate relationship */
  values_aggregate: Prop_Value_Aggregate
}

/** columns and relationships of "prop" */
export type PropValuesArgs = {
  distinct_on?: Maybe<Array<Prop_Value_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Value_Order_By>>
  where?: Maybe<Prop_Value_Bool_Exp>
}

/** columns and relationships of "prop" */
export type PropValues_AggregateArgs = {
  distinct_on?: Maybe<Array<Prop_Value_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Value_Order_By>>
  where?: Maybe<Prop_Value_Bool_Exp>
}

/** aggregated selection of "prop" */
export type Prop_Aggregate = {
  __typename?: 'prop_aggregate'
  aggregate?: Maybe<Prop_Aggregate_Fields>
  nodes: Array<Prop>
}

/** aggregate fields of "prop" */
export type Prop_Aggregate_Fields = {
  __typename?: 'prop_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Prop_Max_Fields>
  min?: Maybe<Prop_Min_Fields>
}

/** aggregate fields of "prop" */
export type Prop_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Prop_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** Boolean expression to filter rows from the table "prop". All fields are combined with a logical 'AND'. */
export type Prop_Bool_Exp = {
  _and?: Maybe<Array<Prop_Bool_Exp>>
  _not?: Maybe<Prop_Bool_Exp>
  _or?: Maybe<Array<Prop_Bool_Exp>>
  attribute?: Maybe<Attribute_Bool_Exp>
  attribute_id?: Maybe<Uuid_Comparison_Exp>
  id?: Maybe<Uuid_Comparison_Exp>
  library?: Maybe<Library_Bool_Exp>
  library_id?: Maybe<Uuid_Comparison_Exp>
  values?: Maybe<Prop_Value_Bool_Exp>
}

/** unique or primary key constraints on table "prop" */
export enum Prop_Constraint {
  /** unique or primary key constraint */
  PropsPkey = 'props_pkey',
}

/** columns and relationships of "prop_element" */
export type Prop_Element = {
  __typename?: 'prop_element'
  /** An object relationship */
  element: Page_Element
  element_id: Scalars['uuid']
  /** An object relationship */
  prop: Prop
  prop_id: Scalars['uuid']
}

/** aggregated selection of "prop_element" */
export type Prop_Element_Aggregate = {
  __typename?: 'prop_element_aggregate'
  aggregate?: Maybe<Prop_Element_Aggregate_Fields>
  nodes: Array<Prop_Element>
}

/** aggregate fields of "prop_element" */
export type Prop_Element_Aggregate_Fields = {
  __typename?: 'prop_element_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Prop_Element_Max_Fields>
  min?: Maybe<Prop_Element_Min_Fields>
}

/** aggregate fields of "prop_element" */
export type Prop_Element_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Prop_Element_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "prop_element" */
export type Prop_Element_Aggregate_Order_By = {
  count?: Maybe<Order_By>
  max?: Maybe<Prop_Element_Max_Order_By>
  min?: Maybe<Prop_Element_Min_Order_By>
}

/** input type for inserting array relation for remote table "prop_element" */
export type Prop_Element_Arr_Rel_Insert_Input = {
  data: Array<Prop_Element_Insert_Input>
  /** on conflict condition */
  on_conflict?: Maybe<Prop_Element_On_Conflict>
}

/** Boolean expression to filter rows from the table "prop_element". All fields are combined with a logical 'AND'. */
export type Prop_Element_Bool_Exp = {
  _and?: Maybe<Array<Prop_Element_Bool_Exp>>
  _not?: Maybe<Prop_Element_Bool_Exp>
  _or?: Maybe<Array<Prop_Element_Bool_Exp>>
  element?: Maybe<Page_Element_Bool_Exp>
  element_id?: Maybe<Uuid_Comparison_Exp>
  prop?: Maybe<Prop_Bool_Exp>
  prop_id?: Maybe<Uuid_Comparison_Exp>
}

/** unique or primary key constraints on table "prop_element" */
export enum Prop_Element_Constraint {
  /** unique or primary key constraint */
  PropElementPkey = 'prop_element_pkey',
}

/** input type for inserting data into table "prop_element" */
export type Prop_Element_Insert_Input = {
  element?: Maybe<Page_Element_Obj_Rel_Insert_Input>
  element_id?: Maybe<Scalars['uuid']>
  prop?: Maybe<Prop_Obj_Rel_Insert_Input>
  prop_id?: Maybe<Scalars['uuid']>
}

/** aggregate max on columns */
export type Prop_Element_Max_Fields = {
  __typename?: 'prop_element_max_fields'
  element_id?: Maybe<Scalars['uuid']>
  prop_id?: Maybe<Scalars['uuid']>
}

/** order by max() on columns of table "prop_element" */
export type Prop_Element_Max_Order_By = {
  element_id?: Maybe<Order_By>
  prop_id?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Prop_Element_Min_Fields = {
  __typename?: 'prop_element_min_fields'
  element_id?: Maybe<Scalars['uuid']>
  prop_id?: Maybe<Scalars['uuid']>
}

/** order by min() on columns of table "prop_element" */
export type Prop_Element_Min_Order_By = {
  element_id?: Maybe<Order_By>
  prop_id?: Maybe<Order_By>
}

/** response of any mutation on the table "prop_element" */
export type Prop_Element_Mutation_Response = {
  __typename?: 'prop_element_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Prop_Element>
}

/** on conflict condition type for table "prop_element" */
export type Prop_Element_On_Conflict = {
  constraint: Prop_Element_Constraint
  update_columns: Array<Prop_Element_Update_Column>
  where?: Maybe<Prop_Element_Bool_Exp>
}

/** Ordering options when selecting data from "prop_element". */
export type Prop_Element_Order_By = {
  element?: Maybe<Page_Element_Order_By>
  element_id?: Maybe<Order_By>
  prop?: Maybe<Prop_Order_By>
  prop_id?: Maybe<Order_By>
}

/** primary key columns input for table: prop_element */
export type Prop_Element_Pk_Columns_Input = {
  element_id: Scalars['uuid']
  prop_id: Scalars['uuid']
}

/** select columns of table "prop_element" */
export enum Prop_Element_Select_Column {
  /** column name */
  ElementId = 'element_id',
  /** column name */
  PropId = 'prop_id',
}

/** input type for updating data in table "prop_element" */
export type Prop_Element_Set_Input = {
  element_id?: Maybe<Scalars['uuid']>
  prop_id?: Maybe<Scalars['uuid']>
}

/** update columns of table "prop_element" */
export enum Prop_Element_Update_Column {
  /** column name */
  ElementId = 'element_id',
  /** column name */
  PropId = 'prop_id',
}

/** input type for inserting data into table "prop" */
export type Prop_Insert_Input = {
  attribute?: Maybe<Attribute_Obj_Rel_Insert_Input>
  attribute_id?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  library?: Maybe<Library_Obj_Rel_Insert_Input>
  library_id?: Maybe<Scalars['uuid']>
  values?: Maybe<Prop_Value_Arr_Rel_Insert_Input>
}

/** aggregate max on columns */
export type Prop_Max_Fields = {
  __typename?: 'prop_max_fields'
  attribute_id?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  library_id?: Maybe<Scalars['uuid']>
}

/** aggregate min on columns */
export type Prop_Min_Fields = {
  __typename?: 'prop_min_fields'
  attribute_id?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  library_id?: Maybe<Scalars['uuid']>
}

/** response of any mutation on the table "prop" */
export type Prop_Mutation_Response = {
  __typename?: 'prop_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Prop>
}

/** input type for inserting object relation for remote table "prop" */
export type Prop_Obj_Rel_Insert_Input = {
  data: Prop_Insert_Input
  /** on conflict condition */
  on_conflict?: Maybe<Prop_On_Conflict>
}

/** on conflict condition type for table "prop" */
export type Prop_On_Conflict = {
  constraint: Prop_Constraint
  update_columns: Array<Prop_Update_Column>
  where?: Maybe<Prop_Bool_Exp>
}

/** Ordering options when selecting data from "prop". */
export type Prop_Order_By = {
  attribute?: Maybe<Attribute_Order_By>
  attribute_id?: Maybe<Order_By>
  id?: Maybe<Order_By>
  library?: Maybe<Library_Order_By>
  library_id?: Maybe<Order_By>
  values_aggregate?: Maybe<Prop_Value_Aggregate_Order_By>
}

/** primary key columns input for table: prop */
export type Prop_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "prop" */
export enum Prop_Select_Column {
  /** column name */
  AttributeId = 'attribute_id',
  /** column name */
  Id = 'id',
  /** column name */
  LibraryId = 'library_id',
}

/** input type for updating data in table "prop" */
export type Prop_Set_Input = {
  attribute_id?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  library_id?: Maybe<Scalars['uuid']>
}

/** update columns of table "prop" */
export enum Prop_Update_Column {
  /** column name */
  AttributeId = 'attribute_id',
  /** column name */
  Id = 'id',
  /** column name */
  LibraryId = 'library_id',
}

/** columns and relationships of "prop_value" */
export type Prop_Value = {
  __typename?: 'prop_value'
  id: Scalars['uuid']
  /** This is used as a value */
  lambda_id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  /** This is the prop that owns this value */
  parent_prop_id: Scalars['uuid']
  type: Prop_Value_Type_Enum
  value?: Maybe<Scalars['String']>
  /** This is the prop that is used as a value */
  value_prop_id?: Maybe<Scalars['uuid']>
}

/** aggregated selection of "prop_value" */
export type Prop_Value_Aggregate = {
  __typename?: 'prop_value_aggregate'
  aggregate?: Maybe<Prop_Value_Aggregate_Fields>
  nodes: Array<Prop_Value>
}

/** aggregate fields of "prop_value" */
export type Prop_Value_Aggregate_Fields = {
  __typename?: 'prop_value_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Prop_Value_Max_Fields>
  min?: Maybe<Prop_Value_Min_Fields>
}

/** aggregate fields of "prop_value" */
export type Prop_Value_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Prop_Value_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "prop_value" */
export type Prop_Value_Aggregate_Order_By = {
  count?: Maybe<Order_By>
  max?: Maybe<Prop_Value_Max_Order_By>
  min?: Maybe<Prop_Value_Min_Order_By>
}

/** input type for inserting array relation for remote table "prop_value" */
export type Prop_Value_Arr_Rel_Insert_Input = {
  data: Array<Prop_Value_Insert_Input>
  /** on conflict condition */
  on_conflict?: Maybe<Prop_Value_On_Conflict>
}

/** Boolean expression to filter rows from the table "prop_value". All fields are combined with a logical 'AND'. */
export type Prop_Value_Bool_Exp = {
  _and?: Maybe<Array<Prop_Value_Bool_Exp>>
  _not?: Maybe<Prop_Value_Bool_Exp>
  _or?: Maybe<Array<Prop_Value_Bool_Exp>>
  id?: Maybe<Uuid_Comparison_Exp>
  lambda_id?: Maybe<Uuid_Comparison_Exp>
  name?: Maybe<String_Comparison_Exp>
  parent_prop_id?: Maybe<Uuid_Comparison_Exp>
  type?: Maybe<Prop_Value_Type_Enum_Comparison_Exp>
  value?: Maybe<String_Comparison_Exp>
  value_prop_id?: Maybe<Uuid_Comparison_Exp>
}

/** unique or primary key constraints on table "prop_value" */
export enum Prop_Value_Constraint {
  /** unique or primary key constraint */
  PropValuesPkey = 'prop_values_pkey',
}

/** input type for inserting data into table "prop_value" */
export type Prop_Value_Insert_Input = {
  id?: Maybe<Scalars['uuid']>
  /** This is used as a value */
  lambda_id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  /** This is the prop that owns this value */
  parent_prop_id?: Maybe<Scalars['uuid']>
  type?: Maybe<Prop_Value_Type_Enum>
  value?: Maybe<Scalars['String']>
  /** This is the prop that is used as a value */
  value_prop_id?: Maybe<Scalars['uuid']>
}

/** aggregate max on columns */
export type Prop_Value_Max_Fields = {
  __typename?: 'prop_value_max_fields'
  id?: Maybe<Scalars['uuid']>
  /** This is used as a value */
  lambda_id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  /** This is the prop that owns this value */
  parent_prop_id?: Maybe<Scalars['uuid']>
  value?: Maybe<Scalars['String']>
  /** This is the prop that is used as a value */
  value_prop_id?: Maybe<Scalars['uuid']>
}

/** order by max() on columns of table "prop_value" */
export type Prop_Value_Max_Order_By = {
  id?: Maybe<Order_By>
  /** This is used as a value */
  lambda_id?: Maybe<Order_By>
  name?: Maybe<Order_By>
  /** This is the prop that owns this value */
  parent_prop_id?: Maybe<Order_By>
  value?: Maybe<Order_By>
  /** This is the prop that is used as a value */
  value_prop_id?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Prop_Value_Min_Fields = {
  __typename?: 'prop_value_min_fields'
  id?: Maybe<Scalars['uuid']>
  /** This is used as a value */
  lambda_id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  /** This is the prop that owns this value */
  parent_prop_id?: Maybe<Scalars['uuid']>
  value?: Maybe<Scalars['String']>
  /** This is the prop that is used as a value */
  value_prop_id?: Maybe<Scalars['uuid']>
}

/** order by min() on columns of table "prop_value" */
export type Prop_Value_Min_Order_By = {
  id?: Maybe<Order_By>
  /** This is used as a value */
  lambda_id?: Maybe<Order_By>
  name?: Maybe<Order_By>
  /** This is the prop that owns this value */
  parent_prop_id?: Maybe<Order_By>
  value?: Maybe<Order_By>
  /** This is the prop that is used as a value */
  value_prop_id?: Maybe<Order_By>
}

/** response of any mutation on the table "prop_value" */
export type Prop_Value_Mutation_Response = {
  __typename?: 'prop_value_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Prop_Value>
}

/** on conflict condition type for table "prop_value" */
export type Prop_Value_On_Conflict = {
  constraint: Prop_Value_Constraint
  update_columns: Array<Prop_Value_Update_Column>
  where?: Maybe<Prop_Value_Bool_Exp>
}

/** Ordering options when selecting data from "prop_value". */
export type Prop_Value_Order_By = {
  id?: Maybe<Order_By>
  lambda_id?: Maybe<Order_By>
  name?: Maybe<Order_By>
  parent_prop_id?: Maybe<Order_By>
  type?: Maybe<Order_By>
  value?: Maybe<Order_By>
  value_prop_id?: Maybe<Order_By>
}

/** primary key columns input for table: prop_value */
export type Prop_Value_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "prop_value" */
export enum Prop_Value_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  LambdaId = 'lambda_id',
  /** column name */
  Name = 'name',
  /** column name */
  ParentPropId = 'parent_prop_id',
  /** column name */
  Type = 'type',
  /** column name */
  Value = 'value',
  /** column name */
  ValuePropId = 'value_prop_id',
}

/** input type for updating data in table "prop_value" */
export type Prop_Value_Set_Input = {
  id?: Maybe<Scalars['uuid']>
  /** This is used as a value */
  lambda_id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
  /** This is the prop that owns this value */
  parent_prop_id?: Maybe<Scalars['uuid']>
  type?: Maybe<Prop_Value_Type_Enum>
  value?: Maybe<Scalars['String']>
  /** This is the prop that is used as a value */
  value_prop_id?: Maybe<Scalars['uuid']>
}

/** columns and relationships of "prop_value_tag" */
export type Prop_Value_Tag = {
  __typename?: 'prop_value_tag'
  prop_value_id: Scalars['uuid']
  tag_id: Scalars['uuid']
}

/** aggregated selection of "prop_value_tag" */
export type Prop_Value_Tag_Aggregate = {
  __typename?: 'prop_value_tag_aggregate'
  aggregate?: Maybe<Prop_Value_Tag_Aggregate_Fields>
  nodes: Array<Prop_Value_Tag>
}

/** aggregate fields of "prop_value_tag" */
export type Prop_Value_Tag_Aggregate_Fields = {
  __typename?: 'prop_value_tag_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Prop_Value_Tag_Max_Fields>
  min?: Maybe<Prop_Value_Tag_Min_Fields>
}

/** aggregate fields of "prop_value_tag" */
export type Prop_Value_Tag_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Prop_Value_Tag_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** Boolean expression to filter rows from the table "prop_value_tag". All fields are combined with a logical 'AND'. */
export type Prop_Value_Tag_Bool_Exp = {
  _and?: Maybe<Array<Prop_Value_Tag_Bool_Exp>>
  _not?: Maybe<Prop_Value_Tag_Bool_Exp>
  _or?: Maybe<Array<Prop_Value_Tag_Bool_Exp>>
  prop_value_id?: Maybe<Uuid_Comparison_Exp>
  tag_id?: Maybe<Uuid_Comparison_Exp>
}

/** unique or primary key constraints on table "prop_value_tag" */
export enum Prop_Value_Tag_Constraint {
  /** unique or primary key constraint */
  PropValueTagPkey = 'prop_value_tag_pkey',
}

/** input type for inserting data into table "prop_value_tag" */
export type Prop_Value_Tag_Insert_Input = {
  prop_value_id?: Maybe<Scalars['uuid']>
  tag_id?: Maybe<Scalars['uuid']>
}

/** aggregate max on columns */
export type Prop_Value_Tag_Max_Fields = {
  __typename?: 'prop_value_tag_max_fields'
  prop_value_id?: Maybe<Scalars['uuid']>
  tag_id?: Maybe<Scalars['uuid']>
}

/** aggregate min on columns */
export type Prop_Value_Tag_Min_Fields = {
  __typename?: 'prop_value_tag_min_fields'
  prop_value_id?: Maybe<Scalars['uuid']>
  tag_id?: Maybe<Scalars['uuid']>
}

/** response of any mutation on the table "prop_value_tag" */
export type Prop_Value_Tag_Mutation_Response = {
  __typename?: 'prop_value_tag_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Prop_Value_Tag>
}

/** on conflict condition type for table "prop_value_tag" */
export type Prop_Value_Tag_On_Conflict = {
  constraint: Prop_Value_Tag_Constraint
  update_columns: Array<Prop_Value_Tag_Update_Column>
  where?: Maybe<Prop_Value_Tag_Bool_Exp>
}

/** Ordering options when selecting data from "prop_value_tag". */
export type Prop_Value_Tag_Order_By = {
  prop_value_id?: Maybe<Order_By>
  tag_id?: Maybe<Order_By>
}

/** primary key columns input for table: prop_value_tag */
export type Prop_Value_Tag_Pk_Columns_Input = {
  prop_value_id: Scalars['uuid']
  tag_id: Scalars['uuid']
}

/** select columns of table "prop_value_tag" */
export enum Prop_Value_Tag_Select_Column {
  /** column name */
  PropValueId = 'prop_value_id',
  /** column name */
  TagId = 'tag_id',
}

/** input type for updating data in table "prop_value_tag" */
export type Prop_Value_Tag_Set_Input = {
  prop_value_id?: Maybe<Scalars['uuid']>
  tag_id?: Maybe<Scalars['uuid']>
}

/** update columns of table "prop_value_tag" */
export enum Prop_Value_Tag_Update_Column {
  /** column name */
  PropValueId = 'prop_value_id',
  /** column name */
  TagId = 'tag_id',
}

/** columns and relationships of "prop_value_type" */
export type Prop_Value_Type = {
  __typename?: 'prop_value_type'
  description?: Maybe<Scalars['String']>
  value: Scalars['String']
}

/** aggregated selection of "prop_value_type" */
export type Prop_Value_Type_Aggregate = {
  __typename?: 'prop_value_type_aggregate'
  aggregate?: Maybe<Prop_Value_Type_Aggregate_Fields>
  nodes: Array<Prop_Value_Type>
}

/** aggregate fields of "prop_value_type" */
export type Prop_Value_Type_Aggregate_Fields = {
  __typename?: 'prop_value_type_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Prop_Value_Type_Max_Fields>
  min?: Maybe<Prop_Value_Type_Min_Fields>
}

/** aggregate fields of "prop_value_type" */
export type Prop_Value_Type_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Prop_Value_Type_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** Boolean expression to filter rows from the table "prop_value_type". All fields are combined with a logical 'AND'. */
export type Prop_Value_Type_Bool_Exp = {
  _and?: Maybe<Array<Prop_Value_Type_Bool_Exp>>
  _not?: Maybe<Prop_Value_Type_Bool_Exp>
  _or?: Maybe<Array<Prop_Value_Type_Bool_Exp>>
  description?: Maybe<String_Comparison_Exp>
  value?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "prop_value_type" */
export enum Prop_Value_Type_Constraint {
  /** unique or primary key constraint */
  PropValueTypesPkey = 'prop_value_types_pkey',
}

export enum Prop_Value_Type_Enum {
  Boolean = 'Boolean',
  Lambda = 'Lambda',
  Number = 'Number',
  Prop = 'Prop',
  String = 'String',
}

/** Boolean expression to compare columns of type "prop_value_type_enum". All fields are combined with logical 'AND'. */
export type Prop_Value_Type_Enum_Comparison_Exp = {
  _eq?: Maybe<Prop_Value_Type_Enum>
  _in?: Maybe<Array<Prop_Value_Type_Enum>>
  _is_null?: Maybe<Scalars['Boolean']>
  _neq?: Maybe<Prop_Value_Type_Enum>
  _nin?: Maybe<Array<Prop_Value_Type_Enum>>
}

/** input type for inserting data into table "prop_value_type" */
export type Prop_Value_Type_Insert_Input = {
  description?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Prop_Value_Type_Max_Fields = {
  __typename?: 'prop_value_type_max_fields'
  description?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Prop_Value_Type_Min_Fields = {
  __typename?: 'prop_value_type_min_fields'
  description?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

/** response of any mutation on the table "prop_value_type" */
export type Prop_Value_Type_Mutation_Response = {
  __typename?: 'prop_value_type_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Prop_Value_Type>
}

/** input type for inserting object relation for remote table "prop_value_type" */
export type Prop_Value_Type_Obj_Rel_Insert_Input = {
  data: Prop_Value_Type_Insert_Input
  /** on conflict condition */
  on_conflict?: Maybe<Prop_Value_Type_On_Conflict>
}

/** on conflict condition type for table "prop_value_type" */
export type Prop_Value_Type_On_Conflict = {
  constraint: Prop_Value_Type_Constraint
  update_columns: Array<Prop_Value_Type_Update_Column>
  where?: Maybe<Prop_Value_Type_Bool_Exp>
}

/** Ordering options when selecting data from "prop_value_type". */
export type Prop_Value_Type_Order_By = {
  description?: Maybe<Order_By>
  value?: Maybe<Order_By>
}

/** primary key columns input for table: prop_value_type */
export type Prop_Value_Type_Pk_Columns_Input = {
  value: Scalars['String']
}

/** select columns of table "prop_value_type" */
export enum Prop_Value_Type_Select_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Value = 'value',
}

/** input type for updating data in table "prop_value_type" */
export type Prop_Value_Type_Set_Input = {
  description?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

/** update columns of table "prop_value_type" */
export enum Prop_Value_Type_Update_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Value = 'value',
}

/** update columns of table "prop_value" */
export enum Prop_Value_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  LambdaId = 'lambda_id',
  /** column name */
  Name = 'name',
  /** column name */
  ParentPropId = 'parent_prop_id',
  /** column name */
  Type = 'type',
  /** column name */
  Value = 'value',
  /** column name */
  ValuePropId = 'value_prop_id',
}

export type Query_Root = {
  __typename?: 'query_root'
  /** fetch data from the table: "app" */
  app: Array<App>
  /** fetch aggregated fields from the table: "app" */
  app_aggregate: App_Aggregate
  /** fetch data from the table: "app" using primary key columns */
  app_by_pk?: Maybe<App>
  /** fetch data from the table: "atom" */
  atom: Array<Atom>
  /** fetch aggregated fields from the table: "atom" */
  atom_aggregate: Atom_Aggregate
  /** fetch data from the table: "atom" using primary key columns */
  atom_by_pk?: Maybe<Atom>
  /** fetch data from the table: "atom_type" */
  atom_type: Array<Atom_Type>
  /** fetch aggregated fields from the table: "atom_type" */
  atom_type_aggregate: Atom_Type_Aggregate
  /** fetch data from the table: "atom_type" using primary key columns */
  atom_type_by_pk?: Maybe<Atom_Type>
  /** fetch data from the table: "attribute" */
  attribute: Array<Attribute>
  /** fetch aggregated fields from the table: "attribute" */
  attribute_aggregate: Attribute_Aggregate
  /** fetch data from the table: "attribute" using primary key columns */
  attribute_by_pk?: Maybe<Attribute>
  /** fetch data from the table: "category" */
  category: Array<Category>
  /** fetch aggregated fields from the table: "category" */
  category_aggregate: Category_Aggregate
  /** fetch data from the table: "category" using primary key columns */
  category_by_pk?: Maybe<Category>
  /** fetch data from the table: "component" */
  component: Array<Component>
  /** fetch aggregated fields from the table: "component" */
  component_aggregate: Component_Aggregate
  /** fetch data from the table: "component" using primary key columns */
  component_by_pk?: Maybe<Component>
  /** fetch data from the table: "component_element" */
  component_element: Array<Component_Element>
  /** fetch aggregated fields from the table: "component_element" */
  component_element_aggregate: Component_Element_Aggregate
  /** fetch data from the table: "component_element" using primary key columns */
  component_element_by_pk?: Maybe<Component_Element>
  /** fetch data from the table: "component_link" */
  component_link: Array<Component_Link>
  /** fetch aggregated fields from the table: "component_link" */
  component_link_aggregate: Component_Link_Aggregate
  /** fetch data from the table: "component_link" using primary key columns */
  component_link_by_pk?: Maybe<Component_Link>
  /** execute function "get_current_user" which returns "user" */
  get_current_user: Array<User>
  /** execute function "get_current_user" and query aggregates on result of table type "user" */
  get_current_user_aggregate: User_Aggregate
  /** fetch data from the table: "lambda" */
  lambda: Array<Lambda>
  /** fetch aggregated fields from the table: "lambda" */
  lambda_aggregate: Lambda_Aggregate
  /** fetch data from the table: "lambda" using primary key columns */
  lambda_by_pk?: Maybe<Lambda>
  /** fetch data from the table: "library" */
  library: Array<Library>
  /** fetch aggregated fields from the table: "library" */
  library_aggregate: Library_Aggregate
  /** fetch data from the table: "library" using primary key columns */
  library_by_pk?: Maybe<Library>
  /** fetch data from the table: "page" */
  page: Array<Page>
  /** fetch aggregated fields from the table: "page" */
  page_aggregate: Page_Aggregate
  /** fetch data from the table: "page" using primary key columns */
  page_by_pk?: Maybe<Page>
  /** fetch data from the table: "page_element" */
  page_element: Array<Page_Element>
  /** fetch aggregated fields from the table: "page_element" */
  page_element_aggregate: Page_Element_Aggregate
  /** fetch data from the table: "page_element" using primary key columns */
  page_element_by_pk?: Maybe<Page_Element>
  /** fetch data from the table: "page_link" */
  page_link: Array<Page_Link>
  /** fetch aggregated fields from the table: "page_link" */
  page_link_aggregate: Page_Link_Aggregate
  /** fetch data from the table: "page_link" using primary key columns */
  page_link_by_pk?: Maybe<Page_Link>
  /** fetch data from the table: "prop" */
  prop: Array<Prop>
  /** fetch aggregated fields from the table: "prop" */
  prop_aggregate: Prop_Aggregate
  /** fetch data from the table: "prop" using primary key columns */
  prop_by_pk?: Maybe<Prop>
  /** fetch data from the table: "prop_element" */
  prop_element: Array<Prop_Element>
  /** fetch aggregated fields from the table: "prop_element" */
  prop_element_aggregate: Prop_Element_Aggregate
  /** fetch data from the table: "prop_element" using primary key columns */
  prop_element_by_pk?: Maybe<Prop_Element>
  /** fetch data from the table: "prop_value" */
  prop_value: Array<Prop_Value>
  /** fetch aggregated fields from the table: "prop_value" */
  prop_value_aggregate: Prop_Value_Aggregate
  /** fetch data from the table: "prop_value" using primary key columns */
  prop_value_by_pk?: Maybe<Prop_Value>
  /** fetch data from the table: "prop_value_tag" */
  prop_value_tag: Array<Prop_Value_Tag>
  /** fetch aggregated fields from the table: "prop_value_tag" */
  prop_value_tag_aggregate: Prop_Value_Tag_Aggregate
  /** fetch data from the table: "prop_value_tag" using primary key columns */
  prop_value_tag_by_pk?: Maybe<Prop_Value_Tag>
  /** fetch data from the table: "prop_value_type" */
  prop_value_type: Array<Prop_Value_Type>
  /** fetch aggregated fields from the table: "prop_value_type" */
  prop_value_type_aggregate: Prop_Value_Type_Aggregate
  /** fetch data from the table: "prop_value_type" using primary key columns */
  prop_value_type_by_pk?: Maybe<Prop_Value_Type>
  /** fetch data from the table: "style" */
  style: Array<Style>
  /** fetch aggregated fields from the table: "style" */
  style_aggregate: Style_Aggregate
  /** fetch data from the table: "style" using primary key columns */
  style_by_pk?: Maybe<Style>
  /** fetch data from the table: "tag" */
  tag: Array<Tag>
  /** fetch aggregated fields from the table: "tag" */
  tag_aggregate: Tag_Aggregate
  /** fetch data from the table: "tag" using primary key columns */
  tag_by_pk?: Maybe<Tag>
  /** fetch data from the table: "user" */
  user: Array<User>
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: User_Aggregate
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>
}

export type Query_RootAppArgs = {
  distinct_on?: Maybe<Array<App_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<App_Order_By>>
  where?: Maybe<App_Bool_Exp>
}

export type Query_RootApp_AggregateArgs = {
  distinct_on?: Maybe<Array<App_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<App_Order_By>>
  where?: Maybe<App_Bool_Exp>
}

export type Query_RootApp_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootAtomArgs = {
  distinct_on?: Maybe<Array<Atom_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Atom_Order_By>>
  where?: Maybe<Atom_Bool_Exp>
}

export type Query_RootAtom_AggregateArgs = {
  distinct_on?: Maybe<Array<Atom_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Atom_Order_By>>
  where?: Maybe<Atom_Bool_Exp>
}

export type Query_RootAtom_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootAtom_TypeArgs = {
  distinct_on?: Maybe<Array<Atom_Type_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Atom_Type_Order_By>>
  where?: Maybe<Atom_Type_Bool_Exp>
}

export type Query_RootAtom_Type_AggregateArgs = {
  distinct_on?: Maybe<Array<Atom_Type_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Atom_Type_Order_By>>
  where?: Maybe<Atom_Type_Bool_Exp>
}

export type Query_RootAtom_Type_By_PkArgs = {
  value: Scalars['String']
}

export type Query_RootAttributeArgs = {
  distinct_on?: Maybe<Array<Attribute_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Attribute_Order_By>>
  where?: Maybe<Attribute_Bool_Exp>
}

export type Query_RootAttribute_AggregateArgs = {
  distinct_on?: Maybe<Array<Attribute_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Attribute_Order_By>>
  where?: Maybe<Attribute_Bool_Exp>
}

export type Query_RootAttribute_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootCategoryArgs = {
  distinct_on?: Maybe<Array<Category_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Category_Order_By>>
  where?: Maybe<Category_Bool_Exp>
}

export type Query_RootCategory_AggregateArgs = {
  distinct_on?: Maybe<Array<Category_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Category_Order_By>>
  where?: Maybe<Category_Bool_Exp>
}

export type Query_RootCategory_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootComponentArgs = {
  distinct_on?: Maybe<Array<Component_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Component_Order_By>>
  where?: Maybe<Component_Bool_Exp>
}

export type Query_RootComponent_AggregateArgs = {
  distinct_on?: Maybe<Array<Component_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Component_Order_By>>
  where?: Maybe<Component_Bool_Exp>
}

export type Query_RootComponent_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootComponent_ElementArgs = {
  distinct_on?: Maybe<Array<Component_Element_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Component_Element_Order_By>>
  where?: Maybe<Component_Element_Bool_Exp>
}

export type Query_RootComponent_Element_AggregateArgs = {
  distinct_on?: Maybe<Array<Component_Element_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Component_Element_Order_By>>
  where?: Maybe<Component_Element_Bool_Exp>
}

export type Query_RootComponent_Element_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootComponent_LinkArgs = {
  distinct_on?: Maybe<Array<Component_Link_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Component_Link_Order_By>>
  where?: Maybe<Component_Link_Bool_Exp>
}

export type Query_RootComponent_Link_AggregateArgs = {
  distinct_on?: Maybe<Array<Component_Link_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Component_Link_Order_By>>
  where?: Maybe<Component_Link_Bool_Exp>
}

export type Query_RootComponent_Link_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootGet_Current_UserArgs = {
  args: Get_Current_User_Args
  distinct_on?: Maybe<Array<User_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<User_Order_By>>
  where?: Maybe<User_Bool_Exp>
}

export type Query_RootGet_Current_User_AggregateArgs = {
  args: Get_Current_User_Args
  distinct_on?: Maybe<Array<User_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<User_Order_By>>
  where?: Maybe<User_Bool_Exp>
}

export type Query_RootLambdaArgs = {
  distinct_on?: Maybe<Array<Lambda_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Lambda_Order_By>>
  where?: Maybe<Lambda_Bool_Exp>
}

export type Query_RootLambda_AggregateArgs = {
  distinct_on?: Maybe<Array<Lambda_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Lambda_Order_By>>
  where?: Maybe<Lambda_Bool_Exp>
}

export type Query_RootLambda_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootLibraryArgs = {
  distinct_on?: Maybe<Array<Library_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Library_Order_By>>
  where?: Maybe<Library_Bool_Exp>
}

export type Query_RootLibrary_AggregateArgs = {
  distinct_on?: Maybe<Array<Library_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Library_Order_By>>
  where?: Maybe<Library_Bool_Exp>
}

export type Query_RootLibrary_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootPageArgs = {
  distinct_on?: Maybe<Array<Page_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Page_Order_By>>
  where?: Maybe<Page_Bool_Exp>
}

export type Query_RootPage_AggregateArgs = {
  distinct_on?: Maybe<Array<Page_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Page_Order_By>>
  where?: Maybe<Page_Bool_Exp>
}

export type Query_RootPage_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootPage_ElementArgs = {
  distinct_on?: Maybe<Array<Page_Element_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Page_Element_Order_By>>
  where?: Maybe<Page_Element_Bool_Exp>
}

export type Query_RootPage_Element_AggregateArgs = {
  distinct_on?: Maybe<Array<Page_Element_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Page_Element_Order_By>>
  where?: Maybe<Page_Element_Bool_Exp>
}

export type Query_RootPage_Element_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootPage_LinkArgs = {
  distinct_on?: Maybe<Array<Page_Link_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Page_Link_Order_By>>
  where?: Maybe<Page_Link_Bool_Exp>
}

export type Query_RootPage_Link_AggregateArgs = {
  distinct_on?: Maybe<Array<Page_Link_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Page_Link_Order_By>>
  where?: Maybe<Page_Link_Bool_Exp>
}

export type Query_RootPage_Link_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootPropArgs = {
  distinct_on?: Maybe<Array<Prop_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Order_By>>
  where?: Maybe<Prop_Bool_Exp>
}

export type Query_RootProp_AggregateArgs = {
  distinct_on?: Maybe<Array<Prop_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Order_By>>
  where?: Maybe<Prop_Bool_Exp>
}

export type Query_RootProp_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootProp_ElementArgs = {
  distinct_on?: Maybe<Array<Prop_Element_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Element_Order_By>>
  where?: Maybe<Prop_Element_Bool_Exp>
}

export type Query_RootProp_Element_AggregateArgs = {
  distinct_on?: Maybe<Array<Prop_Element_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Element_Order_By>>
  where?: Maybe<Prop_Element_Bool_Exp>
}

export type Query_RootProp_Element_By_PkArgs = {
  element_id: Scalars['uuid']
  prop_id: Scalars['uuid']
}

export type Query_RootProp_ValueArgs = {
  distinct_on?: Maybe<Array<Prop_Value_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Value_Order_By>>
  where?: Maybe<Prop_Value_Bool_Exp>
}

export type Query_RootProp_Value_AggregateArgs = {
  distinct_on?: Maybe<Array<Prop_Value_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Value_Order_By>>
  where?: Maybe<Prop_Value_Bool_Exp>
}

export type Query_RootProp_Value_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootProp_Value_TagArgs = {
  distinct_on?: Maybe<Array<Prop_Value_Tag_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Value_Tag_Order_By>>
  where?: Maybe<Prop_Value_Tag_Bool_Exp>
}

export type Query_RootProp_Value_Tag_AggregateArgs = {
  distinct_on?: Maybe<Array<Prop_Value_Tag_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Value_Tag_Order_By>>
  where?: Maybe<Prop_Value_Tag_Bool_Exp>
}

export type Query_RootProp_Value_Tag_By_PkArgs = {
  prop_value_id: Scalars['uuid']
  tag_id: Scalars['uuid']
}

export type Query_RootProp_Value_TypeArgs = {
  distinct_on?: Maybe<Array<Prop_Value_Type_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Value_Type_Order_By>>
  where?: Maybe<Prop_Value_Type_Bool_Exp>
}

export type Query_RootProp_Value_Type_AggregateArgs = {
  distinct_on?: Maybe<Array<Prop_Value_Type_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Value_Type_Order_By>>
  where?: Maybe<Prop_Value_Type_Bool_Exp>
}

export type Query_RootProp_Value_Type_By_PkArgs = {
  value: Scalars['String']
}

export type Query_RootStyleArgs = {
  distinct_on?: Maybe<Array<Style_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Style_Order_By>>
  where?: Maybe<Style_Bool_Exp>
}

export type Query_RootStyle_AggregateArgs = {
  distinct_on?: Maybe<Array<Style_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Style_Order_By>>
  where?: Maybe<Style_Bool_Exp>
}

export type Query_RootStyle_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootTagArgs = {
  distinct_on?: Maybe<Array<Tag_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tag_Order_By>>
  where?: Maybe<Tag_Bool_Exp>
}

export type Query_RootTag_AggregateArgs = {
  distinct_on?: Maybe<Array<Tag_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tag_Order_By>>
  where?: Maybe<Tag_Bool_Exp>
}

export type Query_RootTag_By_PkArgs = {
  id: Scalars['uuid']
}

export type Query_RootUserArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<User_Order_By>>
  where?: Maybe<User_Bool_Exp>
}

export type Query_RootUser_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<User_Order_By>>
  where?: Maybe<User_Bool_Exp>
}

export type Query_RootUser_By_PkArgs = {
  id: Scalars['String']
}

/** columns and relationships of "style" */
export type Style = {
  __typename?: 'style'
  id: Scalars['uuid']
  library_id: Scalars['uuid']
  name: Scalars['String']
}

/** aggregated selection of "style" */
export type Style_Aggregate = {
  __typename?: 'style_aggregate'
  aggregate?: Maybe<Style_Aggregate_Fields>
  nodes: Array<Style>
}

/** aggregate fields of "style" */
export type Style_Aggregate_Fields = {
  __typename?: 'style_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Style_Max_Fields>
  min?: Maybe<Style_Min_Fields>
}

/** aggregate fields of "style" */
export type Style_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Style_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** Boolean expression to filter rows from the table "style". All fields are combined with a logical 'AND'. */
export type Style_Bool_Exp = {
  _and?: Maybe<Array<Style_Bool_Exp>>
  _not?: Maybe<Style_Bool_Exp>
  _or?: Maybe<Array<Style_Bool_Exp>>
  id?: Maybe<Uuid_Comparison_Exp>
  library_id?: Maybe<Uuid_Comparison_Exp>
  name?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "style" */
export enum Style_Constraint {
  /** unique or primary key constraint */
  StylesPkey = 'styles_pkey',
}

/** input type for inserting data into table "style" */
export type Style_Insert_Input = {
  id?: Maybe<Scalars['uuid']>
  library_id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Style_Max_Fields = {
  __typename?: 'style_max_fields'
  id?: Maybe<Scalars['uuid']>
  library_id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Style_Min_Fields = {
  __typename?: 'style_min_fields'
  id?: Maybe<Scalars['uuid']>
  library_id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
}

/** response of any mutation on the table "style" */
export type Style_Mutation_Response = {
  __typename?: 'style_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Style>
}

/** on conflict condition type for table "style" */
export type Style_On_Conflict = {
  constraint: Style_Constraint
  update_columns: Array<Style_Update_Column>
  where?: Maybe<Style_Bool_Exp>
}

/** Ordering options when selecting data from "style". */
export type Style_Order_By = {
  id?: Maybe<Order_By>
  library_id?: Maybe<Order_By>
  name?: Maybe<Order_By>
}

/** primary key columns input for table: style */
export type Style_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "style" */
export enum Style_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  LibraryId = 'library_id',
  /** column name */
  Name = 'name',
}

/** input type for updating data in table "style" */
export type Style_Set_Input = {
  id?: Maybe<Scalars['uuid']>
  library_id?: Maybe<Scalars['uuid']>
  name?: Maybe<Scalars['String']>
}

/** update columns of table "style" */
export enum Style_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  LibraryId = 'library_id',
  /** column name */
  Name = 'name',
}

export type Subscription_Root = {
  __typename?: 'subscription_root'
  /** fetch data from the table: "app" */
  app: Array<App>
  /** fetch aggregated fields from the table: "app" */
  app_aggregate: App_Aggregate
  /** fetch data from the table: "app" using primary key columns */
  app_by_pk?: Maybe<App>
  /** fetch data from the table: "atom" */
  atom: Array<Atom>
  /** fetch aggregated fields from the table: "atom" */
  atom_aggregate: Atom_Aggregate
  /** fetch data from the table: "atom" using primary key columns */
  atom_by_pk?: Maybe<Atom>
  /** fetch data from the table: "atom_type" */
  atom_type: Array<Atom_Type>
  /** fetch aggregated fields from the table: "atom_type" */
  atom_type_aggregate: Atom_Type_Aggregate
  /** fetch data from the table: "atom_type" using primary key columns */
  atom_type_by_pk?: Maybe<Atom_Type>
  /** fetch data from the table: "attribute" */
  attribute: Array<Attribute>
  /** fetch aggregated fields from the table: "attribute" */
  attribute_aggregate: Attribute_Aggregate
  /** fetch data from the table: "attribute" using primary key columns */
  attribute_by_pk?: Maybe<Attribute>
  /** fetch data from the table: "category" */
  category: Array<Category>
  /** fetch aggregated fields from the table: "category" */
  category_aggregate: Category_Aggregate
  /** fetch data from the table: "category" using primary key columns */
  category_by_pk?: Maybe<Category>
  /** fetch data from the table: "component" */
  component: Array<Component>
  /** fetch aggregated fields from the table: "component" */
  component_aggregate: Component_Aggregate
  /** fetch data from the table: "component" using primary key columns */
  component_by_pk?: Maybe<Component>
  /** fetch data from the table: "component_element" */
  component_element: Array<Component_Element>
  /** fetch aggregated fields from the table: "component_element" */
  component_element_aggregate: Component_Element_Aggregate
  /** fetch data from the table: "component_element" using primary key columns */
  component_element_by_pk?: Maybe<Component_Element>
  /** fetch data from the table: "component_link" */
  component_link: Array<Component_Link>
  /** fetch aggregated fields from the table: "component_link" */
  component_link_aggregate: Component_Link_Aggregate
  /** fetch data from the table: "component_link" using primary key columns */
  component_link_by_pk?: Maybe<Component_Link>
  /** execute function "get_current_user" which returns "user" */
  get_current_user: Array<User>
  /** execute function "get_current_user" and query aggregates on result of table type "user" */
  get_current_user_aggregate: User_Aggregate
  /** fetch data from the table: "lambda" */
  lambda: Array<Lambda>
  /** fetch aggregated fields from the table: "lambda" */
  lambda_aggregate: Lambda_Aggregate
  /** fetch data from the table: "lambda" using primary key columns */
  lambda_by_pk?: Maybe<Lambda>
  /** fetch data from the table: "library" */
  library: Array<Library>
  /** fetch aggregated fields from the table: "library" */
  library_aggregate: Library_Aggregate
  /** fetch data from the table: "library" using primary key columns */
  library_by_pk?: Maybe<Library>
  /** fetch data from the table: "page" */
  page: Array<Page>
  /** fetch aggregated fields from the table: "page" */
  page_aggregate: Page_Aggregate
  /** fetch data from the table: "page" using primary key columns */
  page_by_pk?: Maybe<Page>
  /** fetch data from the table: "page_element" */
  page_element: Array<Page_Element>
  /** fetch aggregated fields from the table: "page_element" */
  page_element_aggregate: Page_Element_Aggregate
  /** fetch data from the table: "page_element" using primary key columns */
  page_element_by_pk?: Maybe<Page_Element>
  /** fetch data from the table: "page_link" */
  page_link: Array<Page_Link>
  /** fetch aggregated fields from the table: "page_link" */
  page_link_aggregate: Page_Link_Aggregate
  /** fetch data from the table: "page_link" using primary key columns */
  page_link_by_pk?: Maybe<Page_Link>
  /** fetch data from the table: "prop" */
  prop: Array<Prop>
  /** fetch aggregated fields from the table: "prop" */
  prop_aggregate: Prop_Aggregate
  /** fetch data from the table: "prop" using primary key columns */
  prop_by_pk?: Maybe<Prop>
  /** fetch data from the table: "prop_element" */
  prop_element: Array<Prop_Element>
  /** fetch aggregated fields from the table: "prop_element" */
  prop_element_aggregate: Prop_Element_Aggregate
  /** fetch data from the table: "prop_element" using primary key columns */
  prop_element_by_pk?: Maybe<Prop_Element>
  /** fetch data from the table: "prop_value" */
  prop_value: Array<Prop_Value>
  /** fetch aggregated fields from the table: "prop_value" */
  prop_value_aggregate: Prop_Value_Aggregate
  /** fetch data from the table: "prop_value" using primary key columns */
  prop_value_by_pk?: Maybe<Prop_Value>
  /** fetch data from the table: "prop_value_tag" */
  prop_value_tag: Array<Prop_Value_Tag>
  /** fetch aggregated fields from the table: "prop_value_tag" */
  prop_value_tag_aggregate: Prop_Value_Tag_Aggregate
  /** fetch data from the table: "prop_value_tag" using primary key columns */
  prop_value_tag_by_pk?: Maybe<Prop_Value_Tag>
  /** fetch data from the table: "prop_value_type" */
  prop_value_type: Array<Prop_Value_Type>
  /** fetch aggregated fields from the table: "prop_value_type" */
  prop_value_type_aggregate: Prop_Value_Type_Aggregate
  /** fetch data from the table: "prop_value_type" using primary key columns */
  prop_value_type_by_pk?: Maybe<Prop_Value_Type>
  /** fetch data from the table: "style" */
  style: Array<Style>
  /** fetch aggregated fields from the table: "style" */
  style_aggregate: Style_Aggregate
  /** fetch data from the table: "style" using primary key columns */
  style_by_pk?: Maybe<Style>
  /** fetch data from the table: "tag" */
  tag: Array<Tag>
  /** fetch aggregated fields from the table: "tag" */
  tag_aggregate: Tag_Aggregate
  /** fetch data from the table: "tag" using primary key columns */
  tag_by_pk?: Maybe<Tag>
  /** fetch data from the table: "user" */
  user: Array<User>
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: User_Aggregate
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>
}

export type Subscription_RootAppArgs = {
  distinct_on?: Maybe<Array<App_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<App_Order_By>>
  where?: Maybe<App_Bool_Exp>
}

export type Subscription_RootApp_AggregateArgs = {
  distinct_on?: Maybe<Array<App_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<App_Order_By>>
  where?: Maybe<App_Bool_Exp>
}

export type Subscription_RootApp_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootAtomArgs = {
  distinct_on?: Maybe<Array<Atom_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Atom_Order_By>>
  where?: Maybe<Atom_Bool_Exp>
}

export type Subscription_RootAtom_AggregateArgs = {
  distinct_on?: Maybe<Array<Atom_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Atom_Order_By>>
  where?: Maybe<Atom_Bool_Exp>
}

export type Subscription_RootAtom_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootAtom_TypeArgs = {
  distinct_on?: Maybe<Array<Atom_Type_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Atom_Type_Order_By>>
  where?: Maybe<Atom_Type_Bool_Exp>
}

export type Subscription_RootAtom_Type_AggregateArgs = {
  distinct_on?: Maybe<Array<Atom_Type_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Atom_Type_Order_By>>
  where?: Maybe<Atom_Type_Bool_Exp>
}

export type Subscription_RootAtom_Type_By_PkArgs = {
  value: Scalars['String']
}

export type Subscription_RootAttributeArgs = {
  distinct_on?: Maybe<Array<Attribute_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Attribute_Order_By>>
  where?: Maybe<Attribute_Bool_Exp>
}

export type Subscription_RootAttribute_AggregateArgs = {
  distinct_on?: Maybe<Array<Attribute_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Attribute_Order_By>>
  where?: Maybe<Attribute_Bool_Exp>
}

export type Subscription_RootAttribute_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootCategoryArgs = {
  distinct_on?: Maybe<Array<Category_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Category_Order_By>>
  where?: Maybe<Category_Bool_Exp>
}

export type Subscription_RootCategory_AggregateArgs = {
  distinct_on?: Maybe<Array<Category_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Category_Order_By>>
  where?: Maybe<Category_Bool_Exp>
}

export type Subscription_RootCategory_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootComponentArgs = {
  distinct_on?: Maybe<Array<Component_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Component_Order_By>>
  where?: Maybe<Component_Bool_Exp>
}

export type Subscription_RootComponent_AggregateArgs = {
  distinct_on?: Maybe<Array<Component_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Component_Order_By>>
  where?: Maybe<Component_Bool_Exp>
}

export type Subscription_RootComponent_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootComponent_ElementArgs = {
  distinct_on?: Maybe<Array<Component_Element_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Component_Element_Order_By>>
  where?: Maybe<Component_Element_Bool_Exp>
}

export type Subscription_RootComponent_Element_AggregateArgs = {
  distinct_on?: Maybe<Array<Component_Element_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Component_Element_Order_By>>
  where?: Maybe<Component_Element_Bool_Exp>
}

export type Subscription_RootComponent_Element_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootComponent_LinkArgs = {
  distinct_on?: Maybe<Array<Component_Link_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Component_Link_Order_By>>
  where?: Maybe<Component_Link_Bool_Exp>
}

export type Subscription_RootComponent_Link_AggregateArgs = {
  distinct_on?: Maybe<Array<Component_Link_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Component_Link_Order_By>>
  where?: Maybe<Component_Link_Bool_Exp>
}

export type Subscription_RootComponent_Link_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootGet_Current_UserArgs = {
  args: Get_Current_User_Args
  distinct_on?: Maybe<Array<User_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<User_Order_By>>
  where?: Maybe<User_Bool_Exp>
}

export type Subscription_RootGet_Current_User_AggregateArgs = {
  args: Get_Current_User_Args
  distinct_on?: Maybe<Array<User_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<User_Order_By>>
  where?: Maybe<User_Bool_Exp>
}

export type Subscription_RootLambdaArgs = {
  distinct_on?: Maybe<Array<Lambda_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Lambda_Order_By>>
  where?: Maybe<Lambda_Bool_Exp>
}

export type Subscription_RootLambda_AggregateArgs = {
  distinct_on?: Maybe<Array<Lambda_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Lambda_Order_By>>
  where?: Maybe<Lambda_Bool_Exp>
}

export type Subscription_RootLambda_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootLibraryArgs = {
  distinct_on?: Maybe<Array<Library_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Library_Order_By>>
  where?: Maybe<Library_Bool_Exp>
}

export type Subscription_RootLibrary_AggregateArgs = {
  distinct_on?: Maybe<Array<Library_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Library_Order_By>>
  where?: Maybe<Library_Bool_Exp>
}

export type Subscription_RootLibrary_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootPageArgs = {
  distinct_on?: Maybe<Array<Page_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Page_Order_By>>
  where?: Maybe<Page_Bool_Exp>
}

export type Subscription_RootPage_AggregateArgs = {
  distinct_on?: Maybe<Array<Page_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Page_Order_By>>
  where?: Maybe<Page_Bool_Exp>
}

export type Subscription_RootPage_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootPage_ElementArgs = {
  distinct_on?: Maybe<Array<Page_Element_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Page_Element_Order_By>>
  where?: Maybe<Page_Element_Bool_Exp>
}

export type Subscription_RootPage_Element_AggregateArgs = {
  distinct_on?: Maybe<Array<Page_Element_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Page_Element_Order_By>>
  where?: Maybe<Page_Element_Bool_Exp>
}

export type Subscription_RootPage_Element_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootPage_LinkArgs = {
  distinct_on?: Maybe<Array<Page_Link_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Page_Link_Order_By>>
  where?: Maybe<Page_Link_Bool_Exp>
}

export type Subscription_RootPage_Link_AggregateArgs = {
  distinct_on?: Maybe<Array<Page_Link_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Page_Link_Order_By>>
  where?: Maybe<Page_Link_Bool_Exp>
}

export type Subscription_RootPage_Link_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootPropArgs = {
  distinct_on?: Maybe<Array<Prop_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Order_By>>
  where?: Maybe<Prop_Bool_Exp>
}

export type Subscription_RootProp_AggregateArgs = {
  distinct_on?: Maybe<Array<Prop_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Order_By>>
  where?: Maybe<Prop_Bool_Exp>
}

export type Subscription_RootProp_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootProp_ElementArgs = {
  distinct_on?: Maybe<Array<Prop_Element_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Element_Order_By>>
  where?: Maybe<Prop_Element_Bool_Exp>
}

export type Subscription_RootProp_Element_AggregateArgs = {
  distinct_on?: Maybe<Array<Prop_Element_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Element_Order_By>>
  where?: Maybe<Prop_Element_Bool_Exp>
}

export type Subscription_RootProp_Element_By_PkArgs = {
  element_id: Scalars['uuid']
  prop_id: Scalars['uuid']
}

export type Subscription_RootProp_ValueArgs = {
  distinct_on?: Maybe<Array<Prop_Value_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Value_Order_By>>
  where?: Maybe<Prop_Value_Bool_Exp>
}

export type Subscription_RootProp_Value_AggregateArgs = {
  distinct_on?: Maybe<Array<Prop_Value_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Value_Order_By>>
  where?: Maybe<Prop_Value_Bool_Exp>
}

export type Subscription_RootProp_Value_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootProp_Value_TagArgs = {
  distinct_on?: Maybe<Array<Prop_Value_Tag_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Value_Tag_Order_By>>
  where?: Maybe<Prop_Value_Tag_Bool_Exp>
}

export type Subscription_RootProp_Value_Tag_AggregateArgs = {
  distinct_on?: Maybe<Array<Prop_Value_Tag_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Value_Tag_Order_By>>
  where?: Maybe<Prop_Value_Tag_Bool_Exp>
}

export type Subscription_RootProp_Value_Tag_By_PkArgs = {
  prop_value_id: Scalars['uuid']
  tag_id: Scalars['uuid']
}

export type Subscription_RootProp_Value_TypeArgs = {
  distinct_on?: Maybe<Array<Prop_Value_Type_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Value_Type_Order_By>>
  where?: Maybe<Prop_Value_Type_Bool_Exp>
}

export type Subscription_RootProp_Value_Type_AggregateArgs = {
  distinct_on?: Maybe<Array<Prop_Value_Type_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Prop_Value_Type_Order_By>>
  where?: Maybe<Prop_Value_Type_Bool_Exp>
}

export type Subscription_RootProp_Value_Type_By_PkArgs = {
  value: Scalars['String']
}

export type Subscription_RootStyleArgs = {
  distinct_on?: Maybe<Array<Style_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Style_Order_By>>
  where?: Maybe<Style_Bool_Exp>
}

export type Subscription_RootStyle_AggregateArgs = {
  distinct_on?: Maybe<Array<Style_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Style_Order_By>>
  where?: Maybe<Style_Bool_Exp>
}

export type Subscription_RootStyle_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootTagArgs = {
  distinct_on?: Maybe<Array<Tag_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tag_Order_By>>
  where?: Maybe<Tag_Bool_Exp>
}

export type Subscription_RootTag_AggregateArgs = {
  distinct_on?: Maybe<Array<Tag_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Tag_Order_By>>
  where?: Maybe<Tag_Bool_Exp>
}

export type Subscription_RootTag_By_PkArgs = {
  id: Scalars['uuid']
}

export type Subscription_RootUserArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<User_Order_By>>
  where?: Maybe<User_Bool_Exp>
}

export type Subscription_RootUser_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<User_Order_By>>
  where?: Maybe<User_Bool_Exp>
}

export type Subscription_RootUser_By_PkArgs = {
  id: Scalars['String']
}

/** columns and relationships of "tag" */
export type Tag = {
  __typename?: 'tag'
  category_id?: Maybe<Scalars['uuid']>
  id: Scalars['uuid']
  label: Scalars['String']
}

/** aggregated selection of "tag" */
export type Tag_Aggregate = {
  __typename?: 'tag_aggregate'
  aggregate?: Maybe<Tag_Aggregate_Fields>
  nodes: Array<Tag>
}

/** aggregate fields of "tag" */
export type Tag_Aggregate_Fields = {
  __typename?: 'tag_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<Tag_Max_Fields>
  min?: Maybe<Tag_Min_Fields>
}

/** aggregate fields of "tag" */
export type Tag_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Tag_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** Boolean expression to filter rows from the table "tag". All fields are combined with a logical 'AND'. */
export type Tag_Bool_Exp = {
  _and?: Maybe<Array<Tag_Bool_Exp>>
  _not?: Maybe<Tag_Bool_Exp>
  _or?: Maybe<Array<Tag_Bool_Exp>>
  category_id?: Maybe<Uuid_Comparison_Exp>
  id?: Maybe<Uuid_Comparison_Exp>
  label?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "tag" */
export enum Tag_Constraint {
  /** unique or primary key constraint */
  TagsPkey = 'tags_pkey',
}

/** input type for inserting data into table "tag" */
export type Tag_Insert_Input = {
  category_id?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  label?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Tag_Max_Fields = {
  __typename?: 'tag_max_fields'
  category_id?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  label?: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Tag_Min_Fields = {
  __typename?: 'tag_min_fields'
  category_id?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  label?: Maybe<Scalars['String']>
}

/** response of any mutation on the table "tag" */
export type Tag_Mutation_Response = {
  __typename?: 'tag_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Tag>
}

/** on conflict condition type for table "tag" */
export type Tag_On_Conflict = {
  constraint: Tag_Constraint
  update_columns: Array<Tag_Update_Column>
  where?: Maybe<Tag_Bool_Exp>
}

/** Ordering options when selecting data from "tag". */
export type Tag_Order_By = {
  category_id?: Maybe<Order_By>
  id?: Maybe<Order_By>
  label?: Maybe<Order_By>
}

/** primary key columns input for table: tag */
export type Tag_Pk_Columns_Input = {
  id: Scalars['uuid']
}

/** select columns of table "tag" */
export enum Tag_Select_Column {
  /** column name */
  CategoryId = 'category_id',
  /** column name */
  Id = 'id',
  /** column name */
  Label = 'label',
}

/** input type for updating data in table "tag" */
export type Tag_Set_Input = {
  category_id?: Maybe<Scalars['uuid']>
  id?: Maybe<Scalars['uuid']>
  label?: Maybe<Scalars['String']>
}

/** update columns of table "tag" */
export enum Tag_Update_Column {
  /** column name */
  CategoryId = 'category_id',
  /** column name */
  Id = 'id',
  /** column name */
  Label = 'label',
}

/** columns and relationships of "user" */
export type User = {
  __typename?: 'user'
  /** An array relationship */
  apps: Array<App>
  /** An aggregate relationship */
  apps_aggregate: App_Aggregate
  id: Scalars['String']
  name?: Maybe<Scalars['String']>
}

/** columns and relationships of "user" */
export type UserAppsArgs = {
  distinct_on?: Maybe<Array<App_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<App_Order_By>>
  where?: Maybe<App_Bool_Exp>
}

/** columns and relationships of "user" */
export type UserApps_AggregateArgs = {
  distinct_on?: Maybe<Array<App_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<App_Order_By>>
  where?: Maybe<App_Bool_Exp>
}

/** aggregated selection of "user" */
export type User_Aggregate = {
  __typename?: 'user_aggregate'
  aggregate?: Maybe<User_Aggregate_Fields>
  nodes: Array<User>
}

/** aggregate fields of "user" */
export type User_Aggregate_Fields = {
  __typename?: 'user_aggregate_fields'
  count: Scalars['Int']
  max?: Maybe<User_Max_Fields>
  min?: Maybe<User_Min_Fields>
}

/** aggregate fields of "user" */
export type User_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<User_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** Boolean expression to filter rows from the table "user". All fields are combined with a logical 'AND'. */
export type User_Bool_Exp = {
  _and?: Maybe<Array<User_Bool_Exp>>
  _not?: Maybe<User_Bool_Exp>
  _or?: Maybe<Array<User_Bool_Exp>>
  apps?: Maybe<App_Bool_Exp>
  id?: Maybe<String_Comparison_Exp>
  name?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "user" */
export enum User_Constraint {
  /** unique or primary key constraint */
  UsersPkey = 'users_pkey',
}

/** input type for inserting data into table "user" */
export type User_Insert_Input = {
  apps?: Maybe<App_Arr_Rel_Insert_Input>
  id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type User_Max_Fields = {
  __typename?: 'user_max_fields'
  id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type User_Min_Fields = {
  __typename?: 'user_min_fields'
  id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

/** response of any mutation on the table "user" */
export type User_Mutation_Response = {
  __typename?: 'user_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<User>
}

/** input type for inserting object relation for remote table "user" */
export type User_Obj_Rel_Insert_Input = {
  data: User_Insert_Input
  /** on conflict condition */
  on_conflict?: Maybe<User_On_Conflict>
}

/** on conflict condition type for table "user" */
export type User_On_Conflict = {
  constraint: User_Constraint
  update_columns: Array<User_Update_Column>
  where?: Maybe<User_Bool_Exp>
}

/** Ordering options when selecting data from "user". */
export type User_Order_By = {
  apps_aggregate?: Maybe<App_Aggregate_Order_By>
  id?: Maybe<Order_By>
  name?: Maybe<Order_By>
}

/** primary key columns input for table: user */
export type User_Pk_Columns_Input = {
  id: Scalars['String']
}

/** select columns of table "user" */
export enum User_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
}

/** input type for updating data in table "user" */
export type User_Set_Input = {
  id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

/** update columns of table "user" */
export enum User_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
}

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: Maybe<Scalars['uuid']>
  _gt?: Maybe<Scalars['uuid']>
  _gte?: Maybe<Scalars['uuid']>
  _in?: Maybe<Array<Scalars['uuid']>>
  _is_null?: Maybe<Scalars['Boolean']>
  _lt?: Maybe<Scalars['uuid']>
  _lte?: Maybe<Scalars['uuid']>
  _neq?: Maybe<Scalars['uuid']>
  _nin?: Maybe<Array<Scalars['uuid']>>
}

export type RootAppPageElementFragment = { __typename?: 'page_element' } & Pick<
  Page_Element,
  'id' | 'name'
> & {
    component: { __typename?: 'component' } & Pick<
      Component,
      'id' | 'label'
    > & {
        elements: Array<
          { __typename?: 'component_element' } & Pick<
            Component_Element,
            'id' | 'label'
          > & {
              atom?: Maybe<{ __typename?: 'atom' } & Pick<Atom, 'id' | 'type'>>
            }
        >
        links: Array<
          { __typename?: 'component_link' } & Pick<
            Component_Link,
            'id' | 'order' | 'props' | 'source_element_id' | 'target_element_id'
          >
        >
      }
    props: Array<
      { __typename?: 'prop_element' } & {
        prop: { __typename?: 'prop' } & Pick<Prop, 'id'>
      }
    >
  }

export type RootAppPageLinkFragment = { __typename?: 'page_link' } & Pick<
  Page_Link,
  'id' | 'order' | 'props' | 'source_element_id' | 'target_element_id'
>

export type RootAppQueryVariables = Exact<{
  appId: Scalars['uuid']
  pageId: Scalars['uuid']
}>

export type RootAppQuery = { __typename?: 'query_root' } & {
  app_by_pk?: Maybe<
    { __typename?: 'app' } & Pick<App, 'id' | 'name'> & {
        pages: Array<{ __typename?: 'page' } & Pick<Page, 'id' | 'name'>>
      }
  >
  page_by_pk?: Maybe<
    { __typename?: 'page' } & Pick<Page, 'id' | 'name'> & {
        elements: Array<
          { __typename?: 'page_element' } & RootAppPageElementFragment
        >
        links: Array<{ __typename?: 'page_link' } & RootAppPageLinkFragment>
      }
  >
}

export type CreateAppMutationVariables = Exact<{
  input: App_Insert_Input
}>

export type CreateAppMutation = { __typename?: 'mutation_root' } & {
  insert_app_one?: Maybe<{ __typename?: 'app' } & Pick<App, 'id'>>
}

export type DeleteAppMutationVariables = Exact<{
  id: Scalars['uuid']
}>

export type DeleteAppMutation = { __typename?: 'mutation_root' } & {
  delete_app_by_pk?: Maybe<{ __typename?: 'app' } & Pick<App, 'id'>>
}

export type EditAppMutationVariables = Exact<{
  input: App_Set_Input
  id: Scalars['uuid']
}>

export type EditAppMutation = { __typename?: 'mutation_root' } & {
  update_app_by_pk?: Maybe<{ __typename?: 'app' } & Pick<App, 'id' | 'name'>>
}

export type GetAppsListQueryVariables = Exact<{ [key: string]: never }>

export type GetAppsListQuery = { __typename?: 'query_root' } & {
  app: Array<
    { __typename?: 'app' } & Pick<App, 'id' | 'name'> & {
        pages: Array<{ __typename?: 'page' } & Pick<Page, 'id'>>
      }
  >
}

export type GetAtomQueryVariables = Exact<{
  atomId: Scalars['uuid']
}>

export type GetAtomQuery = { __typename?: 'query_root' } & {
  atom_by_pk?: Maybe<{ __typename?: 'atom' } & Pick<Atom, 'id' | 'type'>>
}

export type CreateAtomMutationVariables = Exact<{
  data: Atom_Insert_Input
}>

export type CreateAtomMutation = { __typename?: 'mutation_root' } & {
  insert_atom_one?: Maybe<{ __typename?: 'atom' } & Pick<Atom, 'id'>>
}

export type DeleteAtomMutationVariables = Exact<{
  atomId: Scalars['uuid']
}>

export type DeleteAtomMutation = { __typename?: 'mutation_root' } & {
  delete_atom_by_pk?: Maybe<{ __typename?: 'atom' } & Pick<Atom, 'id'>>
}

export type GetAtomsListQueryVariables = Exact<{ [key: string]: never }>

export type GetAtomsListQuery = { __typename?: 'query_root' } & {
  atom: Array<{ __typename?: 'atom' } & Pick<Atom, 'id' | 'type'>>
}

export type GetAtomsTypesQueryVariables = Exact<{ [key: string]: never }>

export type GetAtomsTypesQuery = { __typename?: 'query_root' } & {
  atom_type: Array<
    { __typename?: 'atom_type' } & Pick<Atom_Type, 'description' | 'value'>
  >
}

export type UpdateAtomMutationVariables = Exact<{
  input: Atom_Set_Input
  atomId: Scalars['uuid']
}>

export type UpdateAtomMutation = { __typename?: 'mutation_root' } & {
  update_atom_by_pk?: Maybe<{ __typename?: 'atom' } & Pick<Atom, 'id' | 'type'>>
}

export type UpdatePageElementMutationVariables = Exact<{
  id: Scalars['uuid']
  input?: Maybe<Page_Element_Set_Input>
}>

export type UpdatePageElementMutation = { __typename?: 'mutation_root' } & {
  update_page_element_by_pk?: Maybe<
    { __typename?: 'page_element' } & Pick<Page_Element, 'id'>
  >
}

export type CreatePageMutationVariables = Exact<{
  data: Page_Insert_Input
}>

export type CreatePageMutation = { __typename?: 'mutation_root' } & {
  insert_page_one?: Maybe<{ __typename?: 'page' } & Pick<Page, 'id'>>
}

export type DeletePageMutationVariables = Exact<{
  pageId: Scalars['uuid']
}>

export type DeletePageMutation = { __typename?: 'mutation_root' } & {
  delete_page_by_pk?: Maybe<{ __typename?: 'page' } & Pick<Page, 'id'>>
}

export type GetPageQueryVariables = Exact<{
  pageId: Scalars['uuid']
}>

export type GetPageQuery = { __typename?: 'query_root' } & {
  page_by_pk?: Maybe<{ __typename?: 'page' } & Pick<Page, 'id' | 'name'>>
}

export type GetPagesListQueryVariables = Exact<{
  appId: Scalars['uuid']
}>

export type GetPagesListQuery = { __typename?: 'query_root' } & {
  app_by_pk?: Maybe<
    { __typename?: 'app' } & {
      pages: Array<{ __typename?: 'page' } & Pick<Page, 'id' | 'name'>>
    }
  >
}

export type UpdatePageMutationVariables = Exact<{
  input: Page_Set_Input
  pageId: Scalars['uuid']
}>

export type UpdatePageMutation = { __typename?: 'mutation_root' } & {
  update_page_by_pk?: Maybe<{ __typename?: 'page' } & Pick<Page, 'id' | 'name'>>
}

export type CreatePropMutationVariables = Exact<{
  input: Prop_Insert_Input
}>

export type CreatePropMutation = { __typename?: 'mutation_root' } & {
  insert_prop_one?: Maybe<{ __typename?: 'prop' } & Pick<Prop, 'id'>>
}

export type GetAttributes__AttributeFragment = {
  __typename?: 'attribute'
} & Pick<Attribute, 'id' | 'key' | 'atom_type' | 'value_type'>

export type GetAttributesQueryVariables = Exact<{
  where: Attribute_Bool_Exp
}>

export type GetAttributesQuery = { __typename?: 'query_root' } & {
  attribute: Array<
    { __typename?: 'attribute' } & GetAttributes__AttributeFragment
  >
}

export type UpdatePropMutationVariables = Exact<{
  input: Prop_Set_Input
  propId: Scalars['uuid']
}>

export type UpdatePropMutation = { __typename?: 'mutation_root' } & {
  update_prop_by_pk?: Maybe<
    { __typename?: 'prop' } & Pick<Prop, 'id'> & PageElementProps__PropFragment
  >
}

export type UpdatePropValueMutationVariables = Exact<{
  propValueId: Scalars['uuid']
  input: Prop_Value_Set_Input
}>

export type UpdatePropValueMutation = { __typename?: 'mutation_root' } & {
  update_prop_value_by_pk?: Maybe<
    { __typename?: 'prop_value' } & PageElementProps__PropValueFragment
  >
}

export type CreatePageElementPropMutationVariables = Exact<{
  pageElementId: Scalars['uuid']
  propInput: Prop_Insert_Input
}>

export type CreatePageElementPropMutation = { __typename?: 'mutation_root' } & {
  insert_prop_element_one?: Maybe<
    { __typename?: 'prop_element' } & Pick<
      Prop_Element,
      'element_id' | 'prop_id'
    > & { prop: { __typename?: 'prop' } & PageElementProps__PropFragment }
  >
}

export type PageElementProps__PropValueFragment = {
  __typename?: 'prop_value'
} & Pick<
  Prop_Value,
  'id' | 'name' | 'type' | 'value' | 'value_prop_id' | 'lambda_id'
>

export type PageElementProps__AttributeFragment = {
  __typename?: 'attribute'
} & Pick<Attribute, 'id' | 'key'> & {
    valueType?: Maybe<
      { __typename?: 'prop_value_type' } & Pick<Prop_Value_Type, 'value'>
    >
  }

export type PageElementProps__PropFragment = { __typename?: 'prop' } & Pick<
  Prop,
  'id'
> & {
    attribute: {
      __typename?: 'attribute'
    } & PageElementProps__AttributeFragment
    values_aggregate: { __typename?: 'prop_value_aggregate' } & {
      aggregate?: Maybe<
        { __typename?: 'prop_value_aggregate_fields' } & Pick<
          Prop_Value_Aggregate_Fields,
          'count'
        >
      >
    }
    values: Array<
      { __typename?: 'prop_value' } & PageElementProps__PropValueFragment
    >
  }

export type PageElementProps__PageElementFragment = {
  __typename?: 'page_element'
} & Pick<Page_Element, 'id' | 'name' | 'page_id'> & {
    props: Array<
      { __typename?: 'prop_element' } & {
        prop: { __typename?: 'prop' } & PageElementProps__PropFragment
      }
    >
  }

export type PageElementPropsQueryVariables = Exact<{
  pageElementId: Scalars['uuid']
}>

export type PageElementPropsQuery = { __typename?: 'query_root' } & {
  page_element_by_pk?: Maybe<
    { __typename?: 'page_element' } & PageElementProps__PageElementFragment
  >
}

export type GetStyleQueryVariables = Exact<{
  styleId: Scalars['uuid']
}>

export type GetStyleQuery = { __typename?: 'query_root' } & {
  style_by_pk?: Maybe<
    { __typename?: 'style' } & Pick<Style, 'id' | 'name' | 'library_id'>
  >
}

export type CreateStyleMutationVariables = Exact<{
  data: Style_Insert_Input
}>

export type CreateStyleMutation = { __typename?: 'mutation_root' } & {
  insert_style_one?: Maybe<{ __typename?: 'style' } & Pick<Style, 'id'>>
}

export type DeleteStyleMutationVariables = Exact<{
  styleId: Scalars['uuid']
}>

export type DeleteStyleMutation = { __typename?: 'mutation_root' } & {
  delete_style_by_pk?: Maybe<{ __typename?: 'style' } & Pick<Style, 'id'>>
}

export type GetStylesListQueryVariables = Exact<{ [key: string]: never }>

export type GetStylesListQuery = { __typename?: 'query_root' } & {
  style: Array<
    { __typename?: 'style' } & Pick<Style, 'id' | 'library_id' | 'name'>
  >
}

export type UpdateStyleMutationVariables = Exact<{
  input: Style_Set_Input
  styleId: Scalars['uuid']
}>

export type UpdateStyleMutation = { __typename?: 'mutation_root' } & {
  update_style_by_pk?: Maybe<
    { __typename?: 'style' } & Pick<Style, 'id' | 'name'>
  >
}

export const RootAppPageElementFragmentDoc = gql`
  fragment RootAppPageElement on page_element {
    id
    name
    component {
      id
      label
      elements {
        id
        label
        atom {
          id
          type
        }
      }
      links {
        id
        order
        props
        source_element_id
        target_element_id
      }
    }
    props {
      prop {
        id
      }
    }
  }
`
export const RootAppPageLinkFragmentDoc = gql`
  fragment RootAppPageLink on page_link {
    id
    order
    props
    source_element_id
    target_element_id
  }
`
export const GetAttributes__AttributeFragmentDoc = gql`
  fragment GetAttributes__Attribute on attribute {
    id
    key
    atom_type
    value_type
  }
`
export const PageElementProps__AttributeFragmentDoc = gql`
  fragment PageElementProps__Attribute on attribute {
    id
    key
    valueType {
      value
    }
  }
`
export const PageElementProps__PropValueFragmentDoc = gql`
  fragment PageElementProps__PropValue on prop_value {
    id
    name
    type
    value
    value_prop_id
    lambda_id
  }
`
export const PageElementProps__PropFragmentDoc = gql`
  fragment PageElementProps__Prop on prop {
    id
    attribute {
      ...PageElementProps__Attribute
    }
    values_aggregate {
      aggregate {
        count
      }
    }
    values {
      ...PageElementProps__PropValue
    }
  }
  ${PageElementProps__AttributeFragmentDoc}
  ${PageElementProps__PropValueFragmentDoc}
`
export const PageElementProps__PageElementFragmentDoc = gql`
  fragment PageElementProps__PageElement on page_element {
    id
    name
    page_id
    props {
      prop {
        ...PageElementProps__Prop
      }
    }
  }
  ${PageElementProps__PropFragmentDoc}
`
export const RootAppGql = gql`
  query RootApp($appId: uuid!, $pageId: uuid!) {
    app_by_pk(id: $appId) {
      id
      name
      pages {
        id
        name
      }
    }
    page_by_pk(id: $pageId) {
      id
      name
      elements {
        ...RootAppPageElement
      }
      links {
        ...RootAppPageLink
      }
    }
  }
  ${RootAppPageElementFragmentDoc}
  ${RootAppPageLinkFragmentDoc}
`

/**
 * __useRootAppQuery__
 *
 * To run a query within a React component, call `useRootAppQuery` and pass it any options that fit your needs.
 * When your component renders, `useRootAppQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRootAppQuery({
 *   variables: {
 *      appId: // value for 'appId'
 *      pageId: // value for 'pageId'
 *   },
 * });
 */
export function useRootAppQuery(
  baseOptions: Apollo.QueryHookOptions<RootAppQuery, RootAppQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<RootAppQuery, RootAppQueryVariables>(
    RootAppGql,
    options,
  )
}
export function useRootAppLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    RootAppQuery,
    RootAppQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<RootAppQuery, RootAppQueryVariables>(
    RootAppGql,
    options,
  )
}
export type RootAppQueryHookResult = ReturnType<typeof useRootAppQuery>
export type RootAppLazyQueryHookResult = ReturnType<typeof useRootAppLazyQuery>
export type RootAppQueryResult = Apollo.QueryResult<
  RootAppQuery,
  RootAppQueryVariables
>
export const CreateAppGql = gql`
  mutation CreateApp($input: app_insert_input!) {
    insert_app_one(object: $input) {
      id
    }
  }
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
  mutation DeleteApp($id: uuid!) {
    delete_app_by_pk(id: $id) {
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
 *      id: // value for 'id'
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
export const EditAppGql = gql`
  mutation EditApp($input: app_set_input!, $id: uuid!) {
    update_app_by_pk(_set: $input, pk_columns: { id: $id }) {
      id
      name
    }
  }
`
export type EditAppMutationFn = Apollo.MutationFunction<
  EditAppMutation,
  EditAppMutationVariables
>

/**
 * __useEditAppMutation__
 *
 * To run a mutation, you first call `useEditAppMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditAppMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editAppMutation, { data, loading, error }] = useEditAppMutation({
 *   variables: {
 *      input: // value for 'input'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEditAppMutation(
  baseOptions?: Apollo.MutationHookOptions<
    EditAppMutation,
    EditAppMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<EditAppMutation, EditAppMutationVariables>(
    EditAppGql,
    options,
  )
}
export type EditAppMutationHookResult = ReturnType<typeof useEditAppMutation>
export type EditAppMutationResult = Apollo.MutationResult<EditAppMutation>
export type EditAppMutationOptions = Apollo.BaseMutationOptions<
  EditAppMutation,
  EditAppMutationVariables
>
export const GetAppsListGql = gql`
  query GetAppsList {
    app {
      id
      name
      pages {
        id
      }
    }
  }
`

/**
 * __useGetAppsListQuery__
 *
 * To run a query within a React component, call `useGetAppsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAppsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAppsListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAppsListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAppsListQuery,
    GetAppsListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetAppsListQuery, GetAppsListQueryVariables>(
    GetAppsListGql,
    options,
  )
}
export function useGetAppsListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAppsListQuery,
    GetAppsListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetAppsListQuery, GetAppsListQueryVariables>(
    GetAppsListGql,
    options,
  )
}
export type GetAppsListQueryHookResult = ReturnType<typeof useGetAppsListQuery>
export type GetAppsListLazyQueryHookResult = ReturnType<
  typeof useGetAppsListLazyQuery
>
export type GetAppsListQueryResult = Apollo.QueryResult<
  GetAppsListQuery,
  GetAppsListQueryVariables
>
export const GetAtomGql = gql`
  query GetAtom($atomId: uuid!) {
    atom_by_pk(id: $atomId) {
      id
      type
    }
  }
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
 *      atomId: // value for 'atomId'
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
export const CreateAtomGql = gql`
  mutation CreateAtom($data: atom_insert_input!) {
    insert_atom_one(object: $data) {
      id
    }
  }
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
 *      data: // value for 'data'
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
  mutation DeleteAtom($atomId: uuid!) {
    delete_atom_by_pk(id: $atomId) {
      id
    }
  }
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
 *      atomId: // value for 'atomId'
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
export const GetAtomsListGql = gql`
  query GetAtomsList {
    atom {
      id
      type
    }
  }
`

/**
 * __useGetAtomsListQuery__
 *
 * To run a query within a React component, call `useGetAtomsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAtomsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAtomsListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAtomsListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAtomsListQuery,
    GetAtomsListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetAtomsListQuery, GetAtomsListQueryVariables>(
    GetAtomsListGql,
    options,
  )
}
export function useGetAtomsListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAtomsListQuery,
    GetAtomsListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetAtomsListQuery, GetAtomsListQueryVariables>(
    GetAtomsListGql,
    options,
  )
}
export type GetAtomsListQueryHookResult = ReturnType<
  typeof useGetAtomsListQuery
>
export type GetAtomsListLazyQueryHookResult = ReturnType<
  typeof useGetAtomsListLazyQuery
>
export type GetAtomsListQueryResult = Apollo.QueryResult<
  GetAtomsListQuery,
  GetAtomsListQueryVariables
>
export const GetAtomsTypesGql = gql`
  query GetAtomsTypes {
    atom_type {
      description
      value
    }
  }
`

/**
 * __useGetAtomsTypesQuery__
 *
 * To run a query within a React component, call `useGetAtomsTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAtomsTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAtomsTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAtomsTypesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAtomsTypesQuery,
    GetAtomsTypesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetAtomsTypesQuery, GetAtomsTypesQueryVariables>(
    GetAtomsTypesGql,
    options,
  )
}
export function useGetAtomsTypesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAtomsTypesQuery,
    GetAtomsTypesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetAtomsTypesQuery, GetAtomsTypesQueryVariables>(
    GetAtomsTypesGql,
    options,
  )
}
export type GetAtomsTypesQueryHookResult = ReturnType<
  typeof useGetAtomsTypesQuery
>
export type GetAtomsTypesLazyQueryHookResult = ReturnType<
  typeof useGetAtomsTypesLazyQuery
>
export type GetAtomsTypesQueryResult = Apollo.QueryResult<
  GetAtomsTypesQuery,
  GetAtomsTypesQueryVariables
>
export const UpdateAtomGql = gql`
  mutation UpdateAtom($input: atom_set_input!, $atomId: uuid!) {
    update_atom_by_pk(_set: $input, pk_columns: { id: $atomId }) {
      id
      type
    }
  }
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
 *      atomId: // value for 'atomId'
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
export const UpdatePageElementGql = gql`
  mutation UpdatePageElement($id: uuid!, $input: page_element_set_input) {
    update_page_element_by_pk(pk_columns: { id: $id }, _set: $input) {
      id
    }
  }
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
 *      id: // value for 'id'
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
export type UpdatePageElementMutationResult = Apollo.MutationResult<UpdatePageElementMutation>
export type UpdatePageElementMutationOptions = Apollo.BaseMutationOptions<
  UpdatePageElementMutation,
  UpdatePageElementMutationVariables
>
export const CreatePageGql = gql`
  mutation CreatePage($data: page_insert_input!) {
    insert_page_one(object: $data) {
      id
    }
  }
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
 *      data: // value for 'data'
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
  mutation DeletePage($pageId: uuid!) {
    delete_page_by_pk(id: $pageId) {
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
 *      pageId: // value for 'pageId'
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
  query GetPage($pageId: uuid!) {
    page_by_pk(id: $pageId) {
      id
      name
    }
  }
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
 *      pageId: // value for 'pageId'
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
export const GetPagesListGql = gql`
  query GetPagesList($appId: uuid!) {
    app_by_pk(id: $appId) {
      pages {
        id
        name
      }
    }
  }
`

/**
 * __useGetPagesListQuery__
 *
 * To run a query within a React component, call `useGetPagesListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPagesListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPagesListQuery({
 *   variables: {
 *      appId: // value for 'appId'
 *   },
 * });
 */
export function useGetPagesListQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetPagesListQuery,
    GetPagesListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPagesListQuery, GetPagesListQueryVariables>(
    GetPagesListGql,
    options,
  )
}
export function useGetPagesListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPagesListQuery,
    GetPagesListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPagesListQuery, GetPagesListQueryVariables>(
    GetPagesListGql,
    options,
  )
}
export type GetPagesListQueryHookResult = ReturnType<
  typeof useGetPagesListQuery
>
export type GetPagesListLazyQueryHookResult = ReturnType<
  typeof useGetPagesListLazyQuery
>
export type GetPagesListQueryResult = Apollo.QueryResult<
  GetPagesListQuery,
  GetPagesListQueryVariables
>
export const UpdatePageGql = gql`
  mutation UpdatePage($input: page_set_input!, $pageId: uuid!) {
    update_page_by_pk(_set: $input, pk_columns: { id: $pageId }) {
      id
      name
    }
  }
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
 *      pageId: // value for 'pageId'
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
export const CreatePropGql = gql`
  mutation CreateProp($input: prop_insert_input!) {
    insert_prop_one(object: $input) {
      id
    }
  }
`
export type CreatePropMutationFn = Apollo.MutationFunction<
  CreatePropMutation,
  CreatePropMutationVariables
>

/**
 * __useCreatePropMutation__
 *
 * To run a mutation, you first call `useCreatePropMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePropMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPropMutation, { data, loading, error }] = useCreatePropMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePropMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreatePropMutation,
    CreatePropMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreatePropMutation, CreatePropMutationVariables>(
    CreatePropGql,
    options,
  )
}
export type CreatePropMutationHookResult = ReturnType<
  typeof useCreatePropMutation
>
export type CreatePropMutationResult = Apollo.MutationResult<CreatePropMutation>
export type CreatePropMutationOptions = Apollo.BaseMutationOptions<
  CreatePropMutation,
  CreatePropMutationVariables
>
export const GetAttributesGql = gql`
  query GetAttributes($where: attribute_bool_exp!) {
    attribute(where: $where) {
      ...GetAttributes__Attribute
    }
  }
  ${GetAttributes__AttributeFragmentDoc}
`

/**
 * __useGetAttributesQuery__
 *
 * To run a query within a React component, call `useGetAttributesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAttributesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAttributesQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetAttributesQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAttributesQuery,
    GetAttributesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetAttributesQuery, GetAttributesQueryVariables>(
    GetAttributesGql,
    options,
  )
}
export function useGetAttributesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAttributesQuery,
    GetAttributesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetAttributesQuery, GetAttributesQueryVariables>(
    GetAttributesGql,
    options,
  )
}
export type GetAttributesQueryHookResult = ReturnType<
  typeof useGetAttributesQuery
>
export type GetAttributesLazyQueryHookResult = ReturnType<
  typeof useGetAttributesLazyQuery
>
export type GetAttributesQueryResult = Apollo.QueryResult<
  GetAttributesQuery,
  GetAttributesQueryVariables
>
export const UpdatePropGql = gql`
  mutation UpdateProp($input: prop_set_input!, $propId: uuid!) {
    update_prop_by_pk(pk_columns: { id: $propId }, _set: $input) {
      id
      ...PageElementProps__Prop
    }
  }
  ${PageElementProps__PropFragmentDoc}
`
export type UpdatePropMutationFn = Apollo.MutationFunction<
  UpdatePropMutation,
  UpdatePropMutationVariables
>

/**
 * __useUpdatePropMutation__
 *
 * To run a mutation, you first call `useUpdatePropMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePropMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePropMutation, { data, loading, error }] = useUpdatePropMutation({
 *   variables: {
 *      input: // value for 'input'
 *      propId: // value for 'propId'
 *   },
 * });
 */
export function useUpdatePropMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdatePropMutation,
    UpdatePropMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdatePropMutation, UpdatePropMutationVariables>(
    UpdatePropGql,
    options,
  )
}
export type UpdatePropMutationHookResult = ReturnType<
  typeof useUpdatePropMutation
>
export type UpdatePropMutationResult = Apollo.MutationResult<UpdatePropMutation>
export type UpdatePropMutationOptions = Apollo.BaseMutationOptions<
  UpdatePropMutation,
  UpdatePropMutationVariables
>
export const UpdatePropValueGql = gql`
  mutation UpdatePropValue($propValueId: uuid!, $input: prop_value_set_input!) {
    update_prop_value_by_pk(pk_columns: { id: $propValueId }, _set: $input) {
      ...PageElementProps__PropValue
    }
  }
  ${PageElementProps__PropValueFragmentDoc}
`
export type UpdatePropValueMutationFn = Apollo.MutationFunction<
  UpdatePropValueMutation,
  UpdatePropValueMutationVariables
>

/**
 * __useUpdatePropValueMutation__
 *
 * To run a mutation, you first call `useUpdatePropValueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePropValueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePropValueMutation, { data, loading, error }] = useUpdatePropValueMutation({
 *   variables: {
 *      propValueId: // value for 'propValueId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePropValueMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdatePropValueMutation,
    UpdatePropValueMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdatePropValueMutation,
    UpdatePropValueMutationVariables
  >(UpdatePropValueGql, options)
}
export type UpdatePropValueMutationHookResult = ReturnType<
  typeof useUpdatePropValueMutation
>
export type UpdatePropValueMutationResult = Apollo.MutationResult<UpdatePropValueMutation>
export type UpdatePropValueMutationOptions = Apollo.BaseMutationOptions<
  UpdatePropValueMutation,
  UpdatePropValueMutationVariables
>
export const CreatePageElementPropGql = gql`
  mutation CreatePageElementProp(
    $pageElementId: uuid!
    $propInput: prop_insert_input!
  ) {
    insert_prop_element_one(
      object: { element_id: $pageElementId, prop: { data: $propInput } }
    ) {
      element_id
      prop_id
      prop {
        ...PageElementProps__Prop
      }
    }
  }
  ${PageElementProps__PropFragmentDoc}
`
export type CreatePageElementPropMutationFn = Apollo.MutationFunction<
  CreatePageElementPropMutation,
  CreatePageElementPropMutationVariables
>

/**
 * __useCreatePageElementPropMutation__
 *
 * To run a mutation, you first call `useCreatePageElementPropMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePageElementPropMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPageElementPropMutation, { data, loading, error }] = useCreatePageElementPropMutation({
 *   variables: {
 *      pageElementId: // value for 'pageElementId'
 *      propInput: // value for 'propInput'
 *   },
 * });
 */
export function useCreatePageElementPropMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreatePageElementPropMutation,
    CreatePageElementPropMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreatePageElementPropMutation,
    CreatePageElementPropMutationVariables
  >(CreatePageElementPropGql, options)
}
export type CreatePageElementPropMutationHookResult = ReturnType<
  typeof useCreatePageElementPropMutation
>
export type CreatePageElementPropMutationResult = Apollo.MutationResult<CreatePageElementPropMutation>
export type CreatePageElementPropMutationOptions = Apollo.BaseMutationOptions<
  CreatePageElementPropMutation,
  CreatePageElementPropMutationVariables
>
export const PageElementPropsGql = gql`
  query PageElementProps($pageElementId: uuid!) {
    page_element_by_pk(id: $pageElementId) {
      ...PageElementProps__PageElement
    }
  }
  ${PageElementProps__PageElementFragmentDoc}
`

/**
 * __usePageElementPropsQuery__
 *
 * To run a query within a React component, call `usePageElementPropsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageElementPropsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageElementPropsQuery({
 *   variables: {
 *      pageElementId: // value for 'pageElementId'
 *   },
 * });
 */
export function usePageElementPropsQuery(
  baseOptions: Apollo.QueryHookOptions<
    PageElementPropsQuery,
    PageElementPropsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<PageElementPropsQuery, PageElementPropsQueryVariables>(
    PageElementPropsGql,
    options,
  )
}
export function usePageElementPropsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PageElementPropsQuery,
    PageElementPropsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    PageElementPropsQuery,
    PageElementPropsQueryVariables
  >(PageElementPropsGql, options)
}
export type PageElementPropsQueryHookResult = ReturnType<
  typeof usePageElementPropsQuery
>
export type PageElementPropsLazyQueryHookResult = ReturnType<
  typeof usePageElementPropsLazyQuery
>
export type PageElementPropsQueryResult = Apollo.QueryResult<
  PageElementPropsQuery,
  PageElementPropsQueryVariables
>
export const GetStyleGql = gql`
  query GetStyle($styleId: uuid!) {
    style_by_pk(id: $styleId) {
      id
      name
      library_id
    }
  }
`

/**
 * __useGetStyleQuery__
 *
 * To run a query within a React component, call `useGetStyleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStyleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStyleQuery({
 *   variables: {
 *      styleId: // value for 'styleId'
 *   },
 * });
 */
export function useGetStyleQuery(
  baseOptions: Apollo.QueryHookOptions<GetStyleQuery, GetStyleQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetStyleQuery, GetStyleQueryVariables>(
    GetStyleGql,
    options,
  )
}
export function useGetStyleLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetStyleQuery,
    GetStyleQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetStyleQuery, GetStyleQueryVariables>(
    GetStyleGql,
    options,
  )
}
export type GetStyleQueryHookResult = ReturnType<typeof useGetStyleQuery>
export type GetStyleLazyQueryHookResult = ReturnType<
  typeof useGetStyleLazyQuery
>
export type GetStyleQueryResult = Apollo.QueryResult<
  GetStyleQuery,
  GetStyleQueryVariables
>
export const CreateStyleGql = gql`
  mutation CreateStyle($data: style_insert_input!) {
    insert_style_one(object: $data) {
      id
    }
  }
`
export type CreateStyleMutationFn = Apollo.MutationFunction<
  CreateStyleMutation,
  CreateStyleMutationVariables
>

/**
 * __useCreateStyleMutation__
 *
 * To run a mutation, you first call `useCreateStyleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStyleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStyleMutation, { data, loading, error }] = useCreateStyleMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateStyleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateStyleMutation,
    CreateStyleMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateStyleMutation, CreateStyleMutationVariables>(
    CreateStyleGql,
    options,
  )
}
export type CreateStyleMutationHookResult = ReturnType<
  typeof useCreateStyleMutation
>
export type CreateStyleMutationResult = Apollo.MutationResult<CreateStyleMutation>
export type CreateStyleMutationOptions = Apollo.BaseMutationOptions<
  CreateStyleMutation,
  CreateStyleMutationVariables
>
export const DeleteStyleGql = gql`
  mutation DeleteStyle($styleId: uuid!) {
    delete_style_by_pk(id: $styleId) {
      id
    }
  }
`
export type DeleteStyleMutationFn = Apollo.MutationFunction<
  DeleteStyleMutation,
  DeleteStyleMutationVariables
>

/**
 * __useDeleteStyleMutation__
 *
 * To run a mutation, you first call `useDeleteStyleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteStyleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteStyleMutation, { data, loading, error }] = useDeleteStyleMutation({
 *   variables: {
 *      styleId: // value for 'styleId'
 *   },
 * });
 */
export function useDeleteStyleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteStyleMutation,
    DeleteStyleMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteStyleMutation, DeleteStyleMutationVariables>(
    DeleteStyleGql,
    options,
  )
}
export type DeleteStyleMutationHookResult = ReturnType<
  typeof useDeleteStyleMutation
>
export type DeleteStyleMutationResult = Apollo.MutationResult<DeleteStyleMutation>
export type DeleteStyleMutationOptions = Apollo.BaseMutationOptions<
  DeleteStyleMutation,
  DeleteStyleMutationVariables
>
export const GetStylesListGql = gql`
  query GetStylesList {
    style {
      id
      library_id
      name
    }
  }
`

/**
 * __useGetStylesListQuery__
 *
 * To run a query within a React component, call `useGetStylesListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStylesListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStylesListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetStylesListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetStylesListQuery,
    GetStylesListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetStylesListQuery, GetStylesListQueryVariables>(
    GetStylesListGql,
    options,
  )
}
export function useGetStylesListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetStylesListQuery,
    GetStylesListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetStylesListQuery, GetStylesListQueryVariables>(
    GetStylesListGql,
    options,
  )
}
export type GetStylesListQueryHookResult = ReturnType<
  typeof useGetStylesListQuery
>
export type GetStylesListLazyQueryHookResult = ReturnType<
  typeof useGetStylesListLazyQuery
>
export type GetStylesListQueryResult = Apollo.QueryResult<
  GetStylesListQuery,
  GetStylesListQueryVariables
>
export const UpdateStyleGql = gql`
  mutation UpdateStyle($input: style_set_input!, $styleId: uuid!) {
    update_style_by_pk(_set: $input, pk_columns: { id: $styleId }) {
      id
      name
    }
  }
`
export type UpdateStyleMutationFn = Apollo.MutationFunction<
  UpdateStyleMutation,
  UpdateStyleMutationVariables
>

/**
 * __useUpdateStyleMutation__
 *
 * To run a mutation, you first call `useUpdateStyleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStyleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStyleMutation, { data, loading, error }] = useUpdateStyleMutation({
 *   variables: {
 *      input: // value for 'input'
 *      styleId: // value for 'styleId'
 *   },
 * });
 */
export function useUpdateStyleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateStyleMutation,
    UpdateStyleMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateStyleMutation, UpdateStyleMutationVariables>(
    UpdateStyleGql,
    options,
  )
}
export type UpdateStyleMutationHookResult = ReturnType<
  typeof useUpdateStyleMutation
>
export type UpdateStyleMutationResult = Apollo.MutationResult<UpdateStyleMutation>
export type UpdateStyleMutationOptions = Apollo.BaseMutationOptions<
  UpdateStyleMutation,
  UpdateStyleMutationVariables
>
export const RootAppPageElement = gql`
  fragment RootAppPageElement on page_element {
    id
    name
    component {
      id
      label
      elements {
        id
        label
        atom {
          id
          type
        }
      }
      links {
        id
        order
        props
        source_element_id
        target_element_id
      }
    }
    props {
      prop {
        id
      }
    }
  }
`
export const RootAppPageLink = gql`
  fragment RootAppPageLink on page_link {
    id
    order
    props
    source_element_id
    target_element_id
  }
`
export const GetAttributes__Attribute = gql`
  fragment GetAttributes__Attribute on attribute {
    id
    key
    atom_type
    value_type
  }
`
export const PageElementProps__Attribute = gql`
  fragment PageElementProps__Attribute on attribute {
    id
    key
    valueType {
      value
    }
  }
`
export const PageElementProps__PropValue = gql`
  fragment PageElementProps__PropValue on prop_value {
    id
    name
    type
    value
    value_prop_id
    lambda_id
  }
`
export const PageElementProps__Prop = gql`
  fragment PageElementProps__Prop on prop {
    id
    attribute {
      ...PageElementProps__Attribute
    }
    values_aggregate {
      aggregate {
        count
      }
    }
    values {
      ...PageElementProps__PropValue
    }
  }
  ${PageElementProps__Attribute}
  ${PageElementProps__PropValue}
`
export const PageElementProps__PageElement = gql`
  fragment PageElementProps__PageElement on page_element {
    id
    name
    page_id
    props {
      prop {
        ...PageElementProps__Prop
      }
    }
  }
  ${PageElementProps__Prop}
`
export const RootApp = gql`
  query RootApp($appId: uuid!, $pageId: uuid!) {
    app_by_pk(id: $appId) {
      id
      name
      pages {
        id
        name
      }
    }
    page_by_pk(id: $pageId) {
      id
      name
      elements {
        ...RootAppPageElement
      }
      links {
        ...RootAppPageLink
      }
    }
  }
  ${RootAppPageElement}
  ${RootAppPageLink}
`
export const CreateApp = gql`
  mutation CreateApp($input: app_insert_input!) {
    insert_app_one(object: $input) {
      id
    }
  }
`
export const DeleteApp = gql`
  mutation DeleteApp($id: uuid!) {
    delete_app_by_pk(id: $id) {
      id
    }
  }
`
export const EditApp = gql`
  mutation EditApp($input: app_set_input!, $id: uuid!) {
    update_app_by_pk(_set: $input, pk_columns: { id: $id }) {
      id
      name
    }
  }
`
export const GetAppsList = gql`
  query GetAppsList {
    app {
      id
      name
      pages {
        id
      }
    }
  }
`
export const GetAtom = gql`
  query GetAtom($atomId: uuid!) {
    atom_by_pk(id: $atomId) {
      id
      type
    }
  }
`
export const CreateAtom = gql`
  mutation CreateAtom($data: atom_insert_input!) {
    insert_atom_one(object: $data) {
      id
    }
  }
`
export const DeleteAtom = gql`
  mutation DeleteAtom($atomId: uuid!) {
    delete_atom_by_pk(id: $atomId) {
      id
    }
  }
`
export const GetAtomsList = gql`
  query GetAtomsList {
    atom {
      id
      type
    }
  }
`
export const GetAtomsTypes = gql`
  query GetAtomsTypes {
    atom_type {
      description
      value
    }
  }
`
export const UpdateAtom = gql`
  mutation UpdateAtom($input: atom_set_input!, $atomId: uuid!) {
    update_atom_by_pk(_set: $input, pk_columns: { id: $atomId }) {
      id
      type
    }
  }
`
export const UpdatePageElement = gql`
  mutation UpdatePageElement($id: uuid!, $input: page_element_set_input) {
    update_page_element_by_pk(pk_columns: { id: $id }, _set: $input) {
      id
    }
  }
`
export const CreatePage = gql`
  mutation CreatePage($data: page_insert_input!) {
    insert_page_one(object: $data) {
      id
    }
  }
`
export const DeletePage = gql`
  mutation DeletePage($pageId: uuid!) {
    delete_page_by_pk(id: $pageId) {
      id
    }
  }
`
export const GetPage = gql`
  query GetPage($pageId: uuid!) {
    page_by_pk(id: $pageId) {
      id
      name
    }
  }
`
export const GetPagesList = gql`
  query GetPagesList($appId: uuid!) {
    app_by_pk(id: $appId) {
      pages {
        id
        name
      }
    }
  }
`
export const UpdatePage = gql`
  mutation UpdatePage($input: page_set_input!, $pageId: uuid!) {
    update_page_by_pk(_set: $input, pk_columns: { id: $pageId }) {
      id
      name
    }
  }
`
export const CreateProp = gql`
  mutation CreateProp($input: prop_insert_input!) {
    insert_prop_one(object: $input) {
      id
    }
  }
`
export const GetAttributes = gql`
  query GetAttributes($where: attribute_bool_exp!) {
    attribute(where: $where) {
      ...GetAttributes__Attribute
    }
  }
  ${GetAttributes__Attribute}
`
export const UpdateProp = gql`
  mutation UpdateProp($input: prop_set_input!, $propId: uuid!) {
    update_prop_by_pk(pk_columns: { id: $propId }, _set: $input) {
      id
      ...PageElementProps__Prop
    }
  }
  ${PageElementProps__Prop}
`
export const UpdatePropValue = gql`
  mutation UpdatePropValue($propValueId: uuid!, $input: prop_value_set_input!) {
    update_prop_value_by_pk(pk_columns: { id: $propValueId }, _set: $input) {
      ...PageElementProps__PropValue
    }
  }
  ${PageElementProps__PropValue}
`
export const CreatePageElementProp = gql`
  mutation CreatePageElementProp(
    $pageElementId: uuid!
    $propInput: prop_insert_input!
  ) {
    insert_prop_element_one(
      object: { element_id: $pageElementId, prop: { data: $propInput } }
    ) {
      element_id
      prop_id
      prop {
        ...PageElementProps__Prop
      }
    }
  }
  ${PageElementProps__Prop}
`
export const PageElementProps = gql`
  query PageElementProps($pageElementId: uuid!) {
    page_element_by_pk(id: $pageElementId) {
      ...PageElementProps__PageElement
    }
  }
  ${PageElementProps__PageElement}
`
export const GetStyle = gql`
  query GetStyle($styleId: uuid!) {
    style_by_pk(id: $styleId) {
      id
      name
      library_id
    }
  }
`
export const CreateStyle = gql`
  mutation CreateStyle($data: style_insert_input!) {
    insert_style_one(object: $data) {
      id
    }
  }
`
export const DeleteStyle = gql`
  mutation DeleteStyle($styleId: uuid!) {
    delete_style_by_pk(id: $styleId) {
      id
    }
  }
`
export const GetStylesList = gql`
  query GetStylesList {
    style {
      id
      library_id
      name
    }
  }
`
export const UpdateStyle = gql`
  mutation UpdateStyle($input: style_set_input!, $styleId: uuid!) {
    update_style_by_pk(_set: $input, pk_columns: { id: $styleId }) {
      id
      name
    }
  }
`
