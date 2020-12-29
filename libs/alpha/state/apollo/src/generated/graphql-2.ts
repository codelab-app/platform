/* eslint-disable camelcase */
/* eslint-disable import/no-duplicates */
import { MutationOptions, WatchQueryOptions } from '@apollo/client'
import { gql } from '@apollo/client';
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { mutate, watchQuery } from '@codelab/alpha/shared/utils'
import { getApolloClient} from '@codelab/alpha/ui/hoc';

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
  jsonb: any;
  uuid: any;
  vertex_type_enum: any;
};

/** query root */
export type Query = {
  __typename?: 'Query';
  graphs: Array<GraphUseCaseDto>;
  users: Array<UserUseCaseDto>;
  /** fetch data from the table: "app" */
  app: Array<App>;
  /** fetch aggregated fields from the table: "app" */
  app_aggregate: App_Aggregate;
  /** fetch data from the table: "app" using primary key columns */
  app_by_pk?: Maybe<App>;
  /** fetch data from the table: "edge" */
  edge: Array<Edge>;
  /** fetch aggregated fields from the table: "edge" */
  edge_aggregate: Edge_Aggregate;
  /** fetch data from the table: "edge" using primary key columns */
  edge_by_pk?: Maybe<Edge>;
  /** fetch data from the table: "graph" */
  graph: Array<Graph>;
  /** fetch aggregated fields from the table: "graph" */
  graph_aggregate: Graph_Aggregate;
  /** fetch data from the table: "graph" using primary key columns */
  graph_by_pk?: Maybe<Graph>;
  /** fetch data from the table: "page" */
  page: Array<Page>;
  /** fetch aggregated fields from the table: "page" */
  page_aggregate: Page_Aggregate;
  /** fetch data from the table: "page" using primary key columns */
  page_by_pk?: Maybe<Page>;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: User_Aggregate;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
  /** fetch data from the table: "vertex" */
  vertex: Array<Vertex>;
  /** fetch aggregated fields from the table: "vertex" */
  vertex_aggregate: Vertex_Aggregate;
  /** fetch data from the table: "vertex" using primary key columns */
  vertex_by_pk?: Maybe<Vertex>;
};


/** query root */
export type QueryUsersArgs = {
  email: GetUserRequest;
};


/** query root */
export type QueryAppArgs = {
  distinct_on?: Maybe<Array<App_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<App_Order_By>>;
  where?: Maybe<App_Bool_Exp>;
};


/** query root */
export type QueryApp_AggregateArgs = {
  distinct_on?: Maybe<Array<App_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<App_Order_By>>;
  where?: Maybe<App_Bool_Exp>;
};


/** query root */
export type QueryApp_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type QueryEdgeArgs = {
  distinct_on?: Maybe<Array<Edge_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Edge_Order_By>>;
  where?: Maybe<Edge_Bool_Exp>;
};


/** query root */
export type QueryEdge_AggregateArgs = {
  distinct_on?: Maybe<Array<Edge_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Edge_Order_By>>;
  where?: Maybe<Edge_Bool_Exp>;
};


/** query root */
export type QueryEdge_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type QueryGraphArgs = {
  distinct_on?: Maybe<Array<Graph_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Graph_Order_By>>;
  where?: Maybe<Graph_Bool_Exp>;
};


/** query root */
export type QueryGraph_AggregateArgs = {
  distinct_on?: Maybe<Array<Graph_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Graph_Order_By>>;
  where?: Maybe<Graph_Bool_Exp>;
};


/** query root */
export type QueryGraph_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type QueryPageArgs = {
  distinct_on?: Maybe<Array<Page_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Page_Order_By>>;
  where?: Maybe<Page_Bool_Exp>;
};


/** query root */
export type QueryPage_AggregateArgs = {
  distinct_on?: Maybe<Array<Page_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Page_Order_By>>;
  where?: Maybe<Page_Bool_Exp>;
};


/** query root */
export type QueryPage_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type QueryUserArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Order_By>>;
  where?: Maybe<User_Bool_Exp>;
};


/** query root */
export type QueryUser_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Order_By>>;
  where?: Maybe<User_Bool_Exp>;
};


/** query root */
export type QueryUser_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type QueryVertexArgs = {
  distinct_on?: Maybe<Array<Vertex_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Vertex_Order_By>>;
  where?: Maybe<Vertex_Bool_Exp>;
};


/** query root */
export type QueryVertex_AggregateArgs = {
  distinct_on?: Maybe<Array<Vertex_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Vertex_Order_By>>;
  where?: Maybe<Vertex_Bool_Exp>;
};


/** query root */
export type QueryVertex_By_PkArgs = {
  id: Scalars['uuid'];
};

/** mutation root */
export type Mutation = {
  __typename?: 'Mutation';
  createGraph: GraphUseCaseDto;
  addChildNode: GraphUseCaseDto;
  createUser: UserUseCaseDto;
  deleteUser: UserUseCaseDto;
  updateUser: UserUseCaseDto;
  /** delete data from the table: "app" */
  delete_app?: Maybe<App_Mutation_Response>;
  /** delete single row from the table: "app" */
  delete_app_by_pk?: Maybe<App>;
  /** delete data from the table: "edge" */
  delete_edge?: Maybe<Edge_Mutation_Response>;
  /** delete single row from the table: "edge" */
  delete_edge_by_pk?: Maybe<Edge>;
  /** delete data from the table: "graph" */
  delete_graph?: Maybe<Graph_Mutation_Response>;
  /** delete single row from the table: "graph" */
  delete_graph_by_pk?: Maybe<Graph>;
  /** delete data from the table: "page" */
  delete_page?: Maybe<Page_Mutation_Response>;
  /** delete single row from the table: "page" */
  delete_page_by_pk?: Maybe<Page>;
  /** delete data from the table: "user" */
  delete_user?: Maybe<User_Mutation_Response>;
  /** delete single row from the table: "user" */
  delete_user_by_pk?: Maybe<User>;
  /** delete data from the table: "vertex" */
  delete_vertex?: Maybe<Vertex_Mutation_Response>;
  /** delete single row from the table: "vertex" */
  delete_vertex_by_pk?: Maybe<Vertex>;
  /** insert data into the table: "app" */
  insert_app?: Maybe<App_Mutation_Response>;
  /** insert a single row into the table: "app" */
  insert_app_one?: Maybe<App>;
  /** insert data into the table: "edge" */
  insert_edge?: Maybe<Edge_Mutation_Response>;
  /** insert a single row into the table: "edge" */
  insert_edge_one?: Maybe<Edge>;
  /** insert data into the table: "graph" */
  insert_graph?: Maybe<Graph_Mutation_Response>;
  /** insert a single row into the table: "graph" */
  insert_graph_one?: Maybe<Graph>;
  /** insert data into the table: "page" */
  insert_page?: Maybe<Page_Mutation_Response>;
  /** insert a single row into the table: "page" */
  insert_page_one?: Maybe<Page>;
  /** insert data into the table: "user" */
  insert_user?: Maybe<User_Mutation_Response>;
  /** insert a single row into the table: "user" */
  insert_user_one?: Maybe<User>;
  /** insert data into the table: "vertex" */
  insert_vertex?: Maybe<Vertex_Mutation_Response>;
  /** insert a single row into the table: "vertex" */
  insert_vertex_one?: Maybe<Vertex>;
  /** update data of the table: "app" */
  update_app?: Maybe<App_Mutation_Response>;
  /** update single row of the table: "app" */
  update_app_by_pk?: Maybe<App>;
  /** update data of the table: "edge" */
  update_edge?: Maybe<Edge_Mutation_Response>;
  /** update single row of the table: "edge" */
  update_edge_by_pk?: Maybe<Edge>;
  /** update data of the table: "graph" */
  update_graph?: Maybe<Graph_Mutation_Response>;
  /** update single row of the table: "graph" */
  update_graph_by_pk?: Maybe<Graph>;
  /** update data of the table: "page" */
  update_page?: Maybe<Page_Mutation_Response>;
  /** update single row of the table: "page" */
  update_page_by_pk?: Maybe<Page>;
  /** update data of the table: "user" */
  update_user?: Maybe<User_Mutation_Response>;
  /** update single row of the table: "user" */
  update_user_by_pk?: Maybe<User>;
  /** update data of the table: "vertex" */
  update_vertex?: Maybe<Vertex_Mutation_Response>;
  /** update single row of the table: "vertex" */
  update_vertex_by_pk?: Maybe<Vertex>;
};


/** mutation root */
export type MutationCreateGraphArgs = {
  graph: CreateGraphRequest;
};


/** mutation root */
export type MutationAddChildNodeArgs = {
  request: AddChildNodeRequest;
};


/** mutation root */
export type MutationCreateUserArgs = {
  user: CreateUserRequest;
};


/** mutation root */
export type MutationDeleteUserArgs = {
  user: DeleteUserRequest;
};


/** mutation root */
export type MutationUpdateUserArgs = {
  user: UpdateUserRequest;
};


/** mutation root */
export type MutationDelete_AppArgs = {
  where: App_Bool_Exp;
};


/** mutation root */
export type MutationDelete_App_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type MutationDelete_EdgeArgs = {
  where: Edge_Bool_Exp;
};


/** mutation root */
export type MutationDelete_Edge_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type MutationDelete_GraphArgs = {
  where: Graph_Bool_Exp;
};


/** mutation root */
export type MutationDelete_Graph_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type MutationDelete_PageArgs = {
  where: Page_Bool_Exp;
};


/** mutation root */
export type MutationDelete_Page_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type MutationDelete_UserArgs = {
  where: User_Bool_Exp;
};


/** mutation root */
export type MutationDelete_User_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type MutationDelete_VertexArgs = {
  where: Vertex_Bool_Exp;
};


/** mutation root */
export type MutationDelete_Vertex_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type MutationInsert_AppArgs = {
  objects: Array<App_Insert_Input>;
  on_conflict?: Maybe<App_On_Conflict>;
};


/** mutation root */
export type MutationInsert_App_OneArgs = {
  object: App_Insert_Input;
  on_conflict?: Maybe<App_On_Conflict>;
};


/** mutation root */
export type MutationInsert_EdgeArgs = {
  objects: Array<Edge_Insert_Input>;
  on_conflict?: Maybe<Edge_On_Conflict>;
};


/** mutation root */
export type MutationInsert_Edge_OneArgs = {
  object: Edge_Insert_Input;
  on_conflict?: Maybe<Edge_On_Conflict>;
};


/** mutation root */
export type MutationInsert_GraphArgs = {
  objects: Array<Graph_Insert_Input>;
  on_conflict?: Maybe<Graph_On_Conflict>;
};


/** mutation root */
export type MutationInsert_Graph_OneArgs = {
  object: Graph_Insert_Input;
  on_conflict?: Maybe<Graph_On_Conflict>;
};


/** mutation root */
export type MutationInsert_PageArgs = {
  objects: Array<Page_Insert_Input>;
  on_conflict?: Maybe<Page_On_Conflict>;
};


/** mutation root */
export type MutationInsert_Page_OneArgs = {
  object: Page_Insert_Input;
  on_conflict?: Maybe<Page_On_Conflict>;
};


/** mutation root */
export type MutationInsert_UserArgs = {
  objects: Array<User_Insert_Input>;
  on_conflict?: Maybe<User_On_Conflict>;
};


/** mutation root */
export type MutationInsert_User_OneArgs = {
  object: User_Insert_Input;
  on_conflict?: Maybe<User_On_Conflict>;
};


/** mutation root */
export type MutationInsert_VertexArgs = {
  objects: Array<Vertex_Insert_Input>;
  on_conflict?: Maybe<Vertex_On_Conflict>;
};


/** mutation root */
export type MutationInsert_Vertex_OneArgs = {
  object: Vertex_Insert_Input;
  on_conflict?: Maybe<Vertex_On_Conflict>;
};


/** mutation root */
export type MutationUpdate_AppArgs = {
  _set?: Maybe<App_Set_Input>;
  where: App_Bool_Exp;
};


/** mutation root */
export type MutationUpdate_App_By_PkArgs = {
  _set?: Maybe<App_Set_Input>;
  pk_columns: App_Pk_Columns_Input;
};


/** mutation root */
export type MutationUpdate_EdgeArgs = {
  _append?: Maybe<Edge_Append_Input>;
  _delete_at_path?: Maybe<Edge_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Edge_Delete_Elem_Input>;
  _delete_key?: Maybe<Edge_Delete_Key_Input>;
  _inc?: Maybe<Edge_Inc_Input>;
  _prepend?: Maybe<Edge_Prepend_Input>;
  _set?: Maybe<Edge_Set_Input>;
  where: Edge_Bool_Exp;
};


/** mutation root */
export type MutationUpdate_Edge_By_PkArgs = {
  _append?: Maybe<Edge_Append_Input>;
  _delete_at_path?: Maybe<Edge_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Edge_Delete_Elem_Input>;
  _delete_key?: Maybe<Edge_Delete_Key_Input>;
  _inc?: Maybe<Edge_Inc_Input>;
  _prepend?: Maybe<Edge_Prepend_Input>;
  _set?: Maybe<Edge_Set_Input>;
  pk_columns: Edge_Pk_Columns_Input;
};


/** mutation root */
export type MutationUpdate_GraphArgs = {
  _set?: Maybe<Graph_Set_Input>;
  where: Graph_Bool_Exp;
};


/** mutation root */
export type MutationUpdate_Graph_By_PkArgs = {
  _set?: Maybe<Graph_Set_Input>;
  pk_columns: Graph_Pk_Columns_Input;
};


/** mutation root */
export type MutationUpdate_PageArgs = {
  _set?: Maybe<Page_Set_Input>;
  where: Page_Bool_Exp;
};


/** mutation root */
export type MutationUpdate_Page_By_PkArgs = {
  _set?: Maybe<Page_Set_Input>;
  pk_columns: Page_Pk_Columns_Input;
};


/** mutation root */
export type MutationUpdate_UserArgs = {
  _set?: Maybe<User_Set_Input>;
  where: User_Bool_Exp;
};


/** mutation root */
export type MutationUpdate_User_By_PkArgs = {
  _set?: Maybe<User_Set_Input>;
  pk_columns: User_Pk_Columns_Input;
};


/** mutation root */
export type MutationUpdate_VertexArgs = {
  _append?: Maybe<Vertex_Append_Input>;
  _delete_at_path?: Maybe<Vertex_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Vertex_Delete_Elem_Input>;
  _delete_key?: Maybe<Vertex_Delete_Key_Input>;
  _prepend?: Maybe<Vertex_Prepend_Input>;
  _set?: Maybe<Vertex_Set_Input>;
  where: Vertex_Bool_Exp;
};


/** mutation root */
export type MutationUpdate_Vertex_By_PkArgs = {
  _append?: Maybe<Vertex_Append_Input>;
  _delete_at_path?: Maybe<Vertex_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Vertex_Delete_Elem_Input>;
  _delete_key?: Maybe<Vertex_Delete_Key_Input>;
  _prepend?: Maybe<Vertex_Prepend_Input>;
  _set?: Maybe<Vertex_Set_Input>;
  pk_columns: Vertex_Pk_Columns_Input;
};

export type TypeOrmUser = IUser & {
  __typename?: 'TypeOrmUser';
  id: Scalars['String'];
  email: Scalars['String'];
};

export type IUser = {
  id: Scalars['String'];
  email: Scalars['String'];
};

export type TypeOrmVertex = IVertex & {
  __typename?: 'TypeOrmVertex';
  id: Scalars['String'];
  props?: Maybe<Scalars['JSONObject']>;
  parent?: Maybe<Scalars['String']>;
  type: NodeType;
};

export type IVertex = {
  id: Scalars['String'];
  props?: Maybe<Scalars['JSONObject']>;
  parent?: Maybe<Scalars['String']>;
  type: NodeType;
};


export enum NodeType {
  ReactFragment = 'React_Fragment',
  ReactHtmlDiv = 'React_Html_Div',
  ReactHtmlP = 'React_Html_P',
  ReactHtmlA = 'React_Html_A',
  ReactHtmlSpan = 'React_Html_Span',
  ReactText = 'React_Text',
  ReactIcon = 'React_Icon',
  ReactMenu = 'React_Menu',
  ReactMenuItem = 'React_Menu_Item',
  ReactMenuItemGroup = 'React_Menu_ItemGroup',
  ReactMenuSubMenu = 'React_Menu_SubMenu',
  ReactCard = 'React_Card',
  ReactCardGrid = 'React_Card_Grid',
  ReactCardMeta = 'React_Card_Meta',
  ReactTypography = 'React_Typography',
  ReactTypographyTitle = 'React_Typography_Title',
  ReactTypographyText = 'React_Typography_Text',
  ReactTypographyParagraph = 'React_Typography_Paragraph',
  ReactAlert = 'React_Alert',
  ReactAffix = 'React_Affix',
  ReactAutoComplete = 'React_AutoComplete',
  ReactButton = 'React_Button',
  ReactBreadcrumb = 'React_Breadcrumb',
  ReactBreadcrumbItem = 'React_Breadcrumb_Item',
  ReactDropdown = 'React_Dropdown',
  ReactForm = 'React_Form',
  ReactFormItem = 'React_Form_Item',
  ReactFormItemHook = 'React_Form_ItemHook',
  ReactFormList = 'React_Form_List',
  ReactCheckbox = 'React_Checkbox',
  ReactInput = 'React_Input',
  ReactInputNumber = 'React_InputNumber',
  ReactSelect = 'React_Select',
  ReactSelectOption = 'React_Select_Option',
  ReactGrid = 'React_Grid',
  ReactResponsiveGrid = 'React_ResponsiveGrid',
  ReactProvider = 'React_Provider',
  ReactModal = 'React_Modal',
  ReactRadioGroup = 'React_Radio_Group',
  ReactRadio = 'React_Radio',
  ReactRate = 'React_Rate',
  ReactSlider = 'React_Slider',
  ReactSwitch = 'React_Switch',
  ReactTable = 'React_Table',
  ReactSpace = 'React_Space',
  ReactDatePicker = 'React_DatePicker',
  ReactDivider = 'React_Divider',
  ReactPagination = 'React_Pagination',
  ReactPageHeader = 'React_PageHeader',
  ReactBadge = 'React_Badge',
  ReactAvatar = 'React_Avatar',
  ReactComment = 'React_Comment',
  ReactCalendar = 'React_Calendar',
  ReactDescriptions = 'React_Descriptions',
  ReactDescriptionsItem = 'React_Descriptions_Item',
  ReactEmpty = 'React_Empty',
  ReactTimeline = 'React_Timeline',
  ReactTimelineItem = 'React_Timeline_Item',
  ReactTabs = 'React_Tabs',
  ReactTabsTabPane = 'React_Tabs_TabPane',
  ReactStatistic = 'React_Statistic',
  ReactTooltip = 'React_Tooltip',
  ReactTag = 'React_Tag',
  ReactTree = 'React_Tree',
  ReactDrawer = 'React_Drawer',
  ReactProgress = 'React_Progress',
  ReactResult = 'React_Result',
  ReactSpin = 'React_Spin',
  ReactSkeleton = 'React_Skeleton',
  ReactAnchor = 'React_Anchor',
  ReactAnchorLink = 'React_Anchor_Link',
  ReactBackTop = 'React_BackTop',
  ReactConfigProvider = 'React_ConfigProvider',
  ReactPopconfirm = 'React_Popconfirm',
  ReactTransfer = 'React_Transfer',
  ReactTreeSelect = 'React_TreeSelect',
  ReactTreeNode = 'React_TreeNode',
  ReactTimePicker = 'React_TimePicker',
  ReactUpload = 'React_Upload',
  ReactSteps = 'React_Steps',
  ReactStepsStep = 'React_Steps_Step',
  ReactCollapse = 'React_Collapse',
  ReactCollapsePanel = 'React_Collapse_Panel',
  ReactCarousel = 'React_Carousel',
  ReactList = 'React_List',
  ReactListItem = 'React_List_Item',
  ReactListItemMeta = 'React_List_Item_Meta',
  ReactMentions = 'React_Mentions',
  ReactMentionsOption = 'React_Mentions_Option',
  ReactLayout = 'React_Layout',
  ReactLayoutHeader = 'React_Layout_Header',
  ReactLayoutSider = 'React_Layout_Sider',
  ReactLayoutContent = 'React_Layout_Content',
  ReactLayoutFooter = 'React_Layout_Footer',
  ReactCascader = 'React_Cascader',
  ReactPopover = 'React_Popover',
  ReactRenderComponent = 'React_RenderComponent',
  ReactRenderContainer = 'React_RenderContainer',
  ReactMapper = 'React_Mapper',
  Model = 'Model',
  Schema = 'Schema',
  Tree = 'Tree',
  Ref = 'Ref'
}

export type TypeOrmEdge = IEdge & {
  __typename?: 'TypeOrmEdge';
  id: Scalars['String'];
  source: Scalars['String'];
  target: Scalars['String'];
  order: Scalars['Int'];
  props?: Maybe<Scalars['JSONObject']>;
};

export type IEdge = {
  id: Scalars['String'];
  source: Scalars['String'];
  target: Scalars['String'];
  order: Scalars['Int'];
  props?: Maybe<Scalars['JSONObject']>;
};

export type GraphUseCaseDto = {
  __typename?: 'GraphUseCaseDto';
  id?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
};

export type UserUseCaseDto = {
  __typename?: 'UserUseCaseDto';
  id: Scalars['String'];
  email: Scalars['String'];
};

export type GetUserRequest = {
  email: Scalars['String'];
};

export type CreateGraphRequest = {
  label: Scalars['String'];
};

export type AddChildNodeRequest = {
  graphId: Scalars['String'];
  parentVertexId?: Maybe<Scalars['String']>;
  vertex: CreateVertexRequest;
  order?: Maybe<Scalars['Float']>;
};

export type CreateVertexRequest = {
  type: NodeType;
  props: Scalars['JSONObject'];
};

export type CreateUserRequest = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type DeleteUserRequest = {
  email: Scalars['String'];
};

export type UpdateUserRequest = {
  id: Scalars['String'];
  email: Scalars['String'];
};

/** subscription root */
export type Subscription = {
  __typename?: 'Subscription';
  /** fetch data from the table: "app" */
  app: Array<App>;
  /** fetch aggregated fields from the table: "app" */
  app_aggregate: App_Aggregate;
  /** fetch data from the table: "app" using primary key columns */
  app_by_pk?: Maybe<App>;
  /** fetch data from the table: "edge" */
  edge: Array<Edge>;
  /** fetch aggregated fields from the table: "edge" */
  edge_aggregate: Edge_Aggregate;
  /** fetch data from the table: "edge" using primary key columns */
  edge_by_pk?: Maybe<Edge>;
  /** fetch data from the table: "graph" */
  graph: Array<Graph>;
  /** fetch aggregated fields from the table: "graph" */
  graph_aggregate: Graph_Aggregate;
  /** fetch data from the table: "graph" using primary key columns */
  graph_by_pk?: Maybe<Graph>;
  /** fetch data from the table: "page" */
  page: Array<Page>;
  /** fetch aggregated fields from the table: "page" */
  page_aggregate: Page_Aggregate;
  /** fetch data from the table: "page" using primary key columns */
  page_by_pk?: Maybe<Page>;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: User_Aggregate;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
  /** fetch data from the table: "vertex" */
  vertex: Array<Vertex>;
  /** fetch aggregated fields from the table: "vertex" */
  vertex_aggregate: Vertex_Aggregate;
  /** fetch data from the table: "vertex" using primary key columns */
  vertex_by_pk?: Maybe<Vertex>;
};


/** subscription root */
export type SubscriptionAppArgs = {
  distinct_on?: Maybe<Array<App_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<App_Order_By>>;
  where?: Maybe<App_Bool_Exp>;
};


/** subscription root */
export type SubscriptionApp_AggregateArgs = {
  distinct_on?: Maybe<Array<App_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<App_Order_By>>;
  where?: Maybe<App_Bool_Exp>;
};


/** subscription root */
export type SubscriptionApp_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type SubscriptionEdgeArgs = {
  distinct_on?: Maybe<Array<Edge_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Edge_Order_By>>;
  where?: Maybe<Edge_Bool_Exp>;
};


/** subscription root */
export type SubscriptionEdge_AggregateArgs = {
  distinct_on?: Maybe<Array<Edge_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Edge_Order_By>>;
  where?: Maybe<Edge_Bool_Exp>;
};


/** subscription root */
export type SubscriptionEdge_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type SubscriptionGraphArgs = {
  distinct_on?: Maybe<Array<Graph_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Graph_Order_By>>;
  where?: Maybe<Graph_Bool_Exp>;
};


/** subscription root */
export type SubscriptionGraph_AggregateArgs = {
  distinct_on?: Maybe<Array<Graph_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Graph_Order_By>>;
  where?: Maybe<Graph_Bool_Exp>;
};


/** subscription root */
export type SubscriptionGraph_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type SubscriptionPageArgs = {
  distinct_on?: Maybe<Array<Page_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Page_Order_By>>;
  where?: Maybe<Page_Bool_Exp>;
};


/** subscription root */
export type SubscriptionPage_AggregateArgs = {
  distinct_on?: Maybe<Array<Page_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Page_Order_By>>;
  where?: Maybe<Page_Bool_Exp>;
};


/** subscription root */
export type SubscriptionPage_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type SubscriptionUserArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Order_By>>;
  where?: Maybe<User_Bool_Exp>;
};


/** subscription root */
export type SubscriptionUser_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Order_By>>;
  where?: Maybe<User_Bool_Exp>;
};


/** subscription root */
export type SubscriptionUser_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type SubscriptionVertexArgs = {
  distinct_on?: Maybe<Array<Vertex_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Vertex_Order_By>>;
  where?: Maybe<Vertex_Bool_Exp>;
};


/** subscription root */
export type SubscriptionVertex_AggregateArgs = {
  distinct_on?: Maybe<Array<Vertex_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Vertex_Order_By>>;
  where?: Maybe<Vertex_Bool_Exp>;
};


/** subscription root */
export type SubscriptionVertex_By_PkArgs = {
  id: Scalars['uuid'];
};

/** expression to compare columns of type Int. All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: Maybe<Scalars['Int']>;
  _gt?: Maybe<Scalars['Int']>;
  _gte?: Maybe<Scalars['Int']>;
  _in?: Maybe<Array<Scalars['Int']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Int']>;
  _lte?: Maybe<Scalars['Int']>;
  _neq?: Maybe<Scalars['Int']>;
  _nin?: Maybe<Array<Scalars['Int']>>;
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  _nlike?: Maybe<Scalars['String']>;
  _nsimilar?: Maybe<Scalars['String']>;
  _similar?: Maybe<Scalars['String']>;
};

/** columns and relationships of "app" */
export type App = {
  __typename?: 'app';
  /** An array relationship */
  graphs: Array<Graph>;
  /** An aggregated array relationship */
  graphs_aggregate: Graph_Aggregate;
  id: Scalars['uuid'];
  /** An array relationship */
  pages: Array<Page>;
  /** An aggregated array relationship */
  pages_aggregate: Page_Aggregate;
  /** An object relationship */
  user?: Maybe<User>;
  user_id?: Maybe<Scalars['uuid']>;
};


/** columns and relationships of "app" */
export type AppGraphsArgs = {
  distinct_on?: Maybe<Array<Graph_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Graph_Order_By>>;
  where?: Maybe<Graph_Bool_Exp>;
};


/** columns and relationships of "app" */
export type AppGraphs_AggregateArgs = {
  distinct_on?: Maybe<Array<Graph_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Graph_Order_By>>;
  where?: Maybe<Graph_Bool_Exp>;
};


/** columns and relationships of "app" */
export type AppPagesArgs = {
  distinct_on?: Maybe<Array<Page_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Page_Order_By>>;
  where?: Maybe<Page_Bool_Exp>;
};


/** columns and relationships of "app" */
export type AppPages_AggregateArgs = {
  distinct_on?: Maybe<Array<Page_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Page_Order_By>>;
  where?: Maybe<Page_Bool_Exp>;
};

/** aggregated selection of "app" */
export type App_Aggregate = {
  __typename?: 'app_aggregate';
  aggregate?: Maybe<App_Aggregate_Fields>;
  nodes: Array<App>;
};

/** aggregate fields of "app" */
export type App_Aggregate_Fields = {
  __typename?: 'app_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<App_Max_Fields>;
  min?: Maybe<App_Min_Fields>;
};


/** aggregate fields of "app" */
export type App_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<App_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "app" */
export type App_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<App_Max_Order_By>;
  min?: Maybe<App_Min_Order_By>;
};

/** input type for inserting array relation for remote table "app" */
export type App_Arr_Rel_Insert_Input = {
  data: Array<App_Insert_Input>;
  on_conflict?: Maybe<App_On_Conflict>;
};

/** Boolean expression to filter rows from the table "app". All fields are combined with a logical 'AND'. */
export type App_Bool_Exp = {
  _and?: Maybe<Array<Maybe<App_Bool_Exp>>>;
  _not?: Maybe<App_Bool_Exp>;
  _or?: Maybe<Array<Maybe<App_Bool_Exp>>>;
  graphs?: Maybe<Graph_Bool_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  pages?: Maybe<Page_Bool_Exp>;
  user?: Maybe<User_Bool_Exp>;
  user_id?: Maybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "app" */
export enum App_Constraint {
  /** unique or primary key constraint */
  Pk_9478629fc093d229df09e560aea = 'PK_9478629fc093d229df09e560aea'
}

/** input type for inserting data into table "app" */
export type App_Insert_Input = {
  graphs?: Maybe<Graph_Arr_Rel_Insert_Input>;
  id?: Maybe<Scalars['uuid']>;
  pages?: Maybe<Page_Arr_Rel_Insert_Input>;
  user?: Maybe<User_Obj_Rel_Insert_Input>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type App_Max_Fields = {
  __typename?: 'app_max_fields';
  id?: Maybe<Scalars['uuid']>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "app" */
export type App_Max_Order_By = {
  id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type App_Min_Fields = {
  __typename?: 'app_min_fields';
  id?: Maybe<Scalars['uuid']>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "app" */
export type App_Min_Order_By = {
  id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "app" */
export type App_Mutation_Response = {
  __typename?: 'app_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<App>;
};

/** input type for inserting object relation for remote table "app" */
export type App_Obj_Rel_Insert_Input = {
  data: App_Insert_Input;
  on_conflict?: Maybe<App_On_Conflict>;
};

/** on conflict condition type for table "app" */
export type App_On_Conflict = {
  constraint: App_Constraint;
  update_columns: Array<App_Update_Column>;
  where?: Maybe<App_Bool_Exp>;
};

/** ordering options when selecting data from "app" */
export type App_Order_By = {
  graphs_aggregate?: Maybe<Graph_Aggregate_Order_By>;
  id?: Maybe<Order_By>;
  pages_aggregate?: Maybe<Page_Aggregate_Order_By>;
  user?: Maybe<User_Order_By>;
  user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "app" */
export type App_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "app" */
export enum App_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "app" */
export type App_Set_Input = {
  id?: Maybe<Scalars['uuid']>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** update columns of table "app" */
export enum App_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  UserId = 'user_id'
}

/** columns and relationships of "edge" */
export type Edge = {
  __typename?: 'edge';
  /** An object relationship */
  graph?: Maybe<Graph>;
  graph_id?: Maybe<Scalars['uuid']>;
  id: Scalars['uuid'];
  order: Scalars['Int'];
  props: Scalars['jsonb'];
  source: Scalars['String'];
  target: Scalars['String'];
};


/** columns and relationships of "edge" */
export type EdgePropsArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "edge" */
export type Edge_Aggregate = {
  __typename?: 'edge_aggregate';
  aggregate?: Maybe<Edge_Aggregate_Fields>;
  nodes: Array<Edge>;
};

/** aggregate fields of "edge" */
export type Edge_Aggregate_Fields = {
  __typename?: 'edge_aggregate_fields';
  avg?: Maybe<Edge_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Edge_Max_Fields>;
  min?: Maybe<Edge_Min_Fields>;
  stddev?: Maybe<Edge_Stddev_Fields>;
  stddev_pop?: Maybe<Edge_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Edge_Stddev_Samp_Fields>;
  sum?: Maybe<Edge_Sum_Fields>;
  var_pop?: Maybe<Edge_Var_Pop_Fields>;
  var_samp?: Maybe<Edge_Var_Samp_Fields>;
  variance?: Maybe<Edge_Variance_Fields>;
};


/** aggregate fields of "edge" */
export type Edge_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Edge_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "edge" */
export type Edge_Aggregate_Order_By = {
  avg?: Maybe<Edge_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Edge_Max_Order_By>;
  min?: Maybe<Edge_Min_Order_By>;
  stddev?: Maybe<Edge_Stddev_Order_By>;
  stddev_pop?: Maybe<Edge_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Edge_Stddev_Samp_Order_By>;
  sum?: Maybe<Edge_Sum_Order_By>;
  var_pop?: Maybe<Edge_Var_Pop_Order_By>;
  var_samp?: Maybe<Edge_Var_Samp_Order_By>;
  variance?: Maybe<Edge_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Edge_Append_Input = {
  props?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "edge" */
export type Edge_Arr_Rel_Insert_Input = {
  data: Array<Edge_Insert_Input>;
  on_conflict?: Maybe<Edge_On_Conflict>;
};

/** aggregate avg on columns */
export type Edge_Avg_Fields = {
  __typename?: 'edge_avg_fields';
  order?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "edge" */
export type Edge_Avg_Order_By = {
  order?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "edge". All fields are combined with a logical 'AND'. */
export type Edge_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Edge_Bool_Exp>>>;
  _not?: Maybe<Edge_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Edge_Bool_Exp>>>;
  graph?: Maybe<Graph_Bool_Exp>;
  graph_id?: Maybe<Uuid_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  order?: Maybe<Int_Comparison_Exp>;
  props?: Maybe<Jsonb_Comparison_Exp>;
  source?: Maybe<String_Comparison_Exp>;
  target?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "edge" */
export enum Edge_Constraint {
  /** unique or primary key constraint */
  PkBf6f43c9af56d05094d8c57b311 = 'PK_bf6f43c9af56d05094d8c57b311'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Edge_Delete_At_Path_Input = {
  props?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Edge_Delete_Elem_Input = {
  props?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Edge_Delete_Key_Input = {
  props?: Maybe<Scalars['String']>;
};

/** input type for incrementing integer column in table "edge" */
export type Edge_Inc_Input = {
  order?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "edge" */
export type Edge_Insert_Input = {
  graph?: Maybe<Graph_Obj_Rel_Insert_Input>;
  graph_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  order?: Maybe<Scalars['Int']>;
  props?: Maybe<Scalars['jsonb']>;
  source?: Maybe<Scalars['String']>;
  target?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Edge_Max_Fields = {
  __typename?: 'edge_max_fields';
  graph_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  order?: Maybe<Scalars['Int']>;
  source?: Maybe<Scalars['String']>;
  target?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "edge" */
export type Edge_Max_Order_By = {
  graph_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  order?: Maybe<Order_By>;
  source?: Maybe<Order_By>;
  target?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Edge_Min_Fields = {
  __typename?: 'edge_min_fields';
  graph_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  order?: Maybe<Scalars['Int']>;
  source?: Maybe<Scalars['String']>;
  target?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "edge" */
export type Edge_Min_Order_By = {
  graph_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  order?: Maybe<Order_By>;
  source?: Maybe<Order_By>;
  target?: Maybe<Order_By>;
};

/** response of any mutation on the table "edge" */
export type Edge_Mutation_Response = {
  __typename?: 'edge_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Edge>;
};

/** input type for inserting object relation for remote table "edge" */
export type Edge_Obj_Rel_Insert_Input = {
  data: Edge_Insert_Input;
  on_conflict?: Maybe<Edge_On_Conflict>;
};

/** on conflict condition type for table "edge" */
export type Edge_On_Conflict = {
  constraint: Edge_Constraint;
  update_columns: Array<Edge_Update_Column>;
  where?: Maybe<Edge_Bool_Exp>;
};

/** ordering options when selecting data from "edge" */
export type Edge_Order_By = {
  graph?: Maybe<Graph_Order_By>;
  graph_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  order?: Maybe<Order_By>;
  props?: Maybe<Order_By>;
  source?: Maybe<Order_By>;
  target?: Maybe<Order_By>;
};

/** primary key columns input for table: "edge" */
export type Edge_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Edge_Prepend_Input = {
  props?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "edge" */
export enum Edge_Select_Column {
  /** column name */
  GraphId = 'graph_id',
  /** column name */
  Id = 'id',
  /** column name */
  Order = 'order',
  /** column name */
  Props = 'props',
  /** column name */
  Source = 'source',
  /** column name */
  Target = 'target'
}

/** input type for updating data in table "edge" */
export type Edge_Set_Input = {
  graph_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  order?: Maybe<Scalars['Int']>;
  props?: Maybe<Scalars['jsonb']>;
  source?: Maybe<Scalars['String']>;
  target?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Edge_Stddev_Fields = {
  __typename?: 'edge_stddev_fields';
  order?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "edge" */
export type Edge_Stddev_Order_By = {
  order?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Edge_Stddev_Pop_Fields = {
  __typename?: 'edge_stddev_pop_fields';
  order?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "edge" */
export type Edge_Stddev_Pop_Order_By = {
  order?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Edge_Stddev_Samp_Fields = {
  __typename?: 'edge_stddev_samp_fields';
  order?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "edge" */
export type Edge_Stddev_Samp_Order_By = {
  order?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Edge_Sum_Fields = {
  __typename?: 'edge_sum_fields';
  order?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "edge" */
export type Edge_Sum_Order_By = {
  order?: Maybe<Order_By>;
};

/** update columns of table "edge" */
export enum Edge_Update_Column {
  /** column name */
  GraphId = 'graph_id',
  /** column name */
  Id = 'id',
  /** column name */
  Order = 'order',
  /** column name */
  Props = 'props',
  /** column name */
  Source = 'source',
  /** column name */
  Target = 'target'
}

/** aggregate var_pop on columns */
export type Edge_Var_Pop_Fields = {
  __typename?: 'edge_var_pop_fields';
  order?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "edge" */
export type Edge_Var_Pop_Order_By = {
  order?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Edge_Var_Samp_Fields = {
  __typename?: 'edge_var_samp_fields';
  order?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "edge" */
export type Edge_Var_Samp_Order_By = {
  order?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Edge_Variance_Fields = {
  __typename?: 'edge_variance_fields';
  order?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "edge" */
export type Edge_Variance_Order_By = {
  order?: Maybe<Order_By>;
};

/** columns and relationships of "graph" */
export type Graph = {
  __typename?: 'graph';
  /** An object relationship */
  app?: Maybe<App>;
  app_id?: Maybe<Scalars['uuid']>;
  /** An array relationship */
  edges: Array<Edge>;
  /** An aggregated array relationship */
  edges_aggregate: Edge_Aggregate;
  id: Scalars['uuid'];
  label?: Maybe<Scalars['String']>;
  /** An object relationship */
  page?: Maybe<Page>;
  page_id?: Maybe<Scalars['uuid']>;
  /** An array relationship */
  vertices: Array<Vertex>;
  /** An aggregated array relationship */
  vertices_aggregate: Vertex_Aggregate;
};


/** columns and relationships of "graph" */
export type GraphEdgesArgs = {
  distinct_on?: Maybe<Array<Edge_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Edge_Order_By>>;
  where?: Maybe<Edge_Bool_Exp>;
};


/** columns and relationships of "graph" */
export type GraphEdges_AggregateArgs = {
  distinct_on?: Maybe<Array<Edge_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Edge_Order_By>>;
  where?: Maybe<Edge_Bool_Exp>;
};


/** columns and relationships of "graph" */
export type GraphVerticesArgs = {
  distinct_on?: Maybe<Array<Vertex_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Vertex_Order_By>>;
  where?: Maybe<Vertex_Bool_Exp>;
};


/** columns and relationships of "graph" */
export type GraphVertices_AggregateArgs = {
  distinct_on?: Maybe<Array<Vertex_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Vertex_Order_By>>;
  where?: Maybe<Vertex_Bool_Exp>;
};

/** aggregated selection of "graph" */
export type Graph_Aggregate = {
  __typename?: 'graph_aggregate';
  aggregate?: Maybe<Graph_Aggregate_Fields>;
  nodes: Array<Graph>;
};

/** aggregate fields of "graph" */
export type Graph_Aggregate_Fields = {
  __typename?: 'graph_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Graph_Max_Fields>;
  min?: Maybe<Graph_Min_Fields>;
};


/** aggregate fields of "graph" */
export type Graph_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Graph_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "graph" */
export type Graph_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Graph_Max_Order_By>;
  min?: Maybe<Graph_Min_Order_By>;
};

/** input type for inserting array relation for remote table "graph" */
export type Graph_Arr_Rel_Insert_Input = {
  data: Array<Graph_Insert_Input>;
  on_conflict?: Maybe<Graph_On_Conflict>;
};

/** Boolean expression to filter rows from the table "graph". All fields are combined with a logical 'AND'. */
export type Graph_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Graph_Bool_Exp>>>;
  _not?: Maybe<Graph_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Graph_Bool_Exp>>>;
  app?: Maybe<App_Bool_Exp>;
  app_id?: Maybe<Uuid_Comparison_Exp>;
  edges?: Maybe<Edge_Bool_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  label?: Maybe<String_Comparison_Exp>;
  page?: Maybe<Page_Bool_Exp>;
  page_id?: Maybe<Uuid_Comparison_Exp>;
  vertices?: Maybe<Vertex_Bool_Exp>;
};

/** unique or primary key constraints on table "graph" */
export enum Graph_Constraint {
  /** unique or primary key constraint */
  PkEb3e36eefae596e0ba9122fff16 = 'PK_eb3e36eefae596e0ba9122fff16'
}

/** input type for inserting data into table "graph" */
export type Graph_Insert_Input = {
  app?: Maybe<App_Obj_Rel_Insert_Input>;
  app_id?: Maybe<Scalars['uuid']>;
  edges?: Maybe<Edge_Arr_Rel_Insert_Input>;
  id?: Maybe<Scalars['uuid']>;
  label?: Maybe<Scalars['String']>;
  page?: Maybe<Page_Obj_Rel_Insert_Input>;
  page_id?: Maybe<Scalars['uuid']>;
  vertices?: Maybe<Vertex_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Graph_Max_Fields = {
  __typename?: 'graph_max_fields';
  app_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  label?: Maybe<Scalars['String']>;
  page_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "graph" */
export type Graph_Max_Order_By = {
  app_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  label?: Maybe<Order_By>;
  page_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Graph_Min_Fields = {
  __typename?: 'graph_min_fields';
  app_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  label?: Maybe<Scalars['String']>;
  page_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "graph" */
export type Graph_Min_Order_By = {
  app_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  label?: Maybe<Order_By>;
  page_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "graph" */
export type Graph_Mutation_Response = {
  __typename?: 'graph_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Graph>;
};

/** input type for inserting object relation for remote table "graph" */
export type Graph_Obj_Rel_Insert_Input = {
  data: Graph_Insert_Input;
  on_conflict?: Maybe<Graph_On_Conflict>;
};

/** on conflict condition type for table "graph" */
export type Graph_On_Conflict = {
  constraint: Graph_Constraint;
  update_columns: Array<Graph_Update_Column>;
  where?: Maybe<Graph_Bool_Exp>;
};

/** ordering options when selecting data from "graph" */
export type Graph_Order_By = {
  app?: Maybe<App_Order_By>;
  app_id?: Maybe<Order_By>;
  edges_aggregate?: Maybe<Edge_Aggregate_Order_By>;
  id?: Maybe<Order_By>;
  label?: Maybe<Order_By>;
  page?: Maybe<Page_Order_By>;
  page_id?: Maybe<Order_By>;
  vertices_aggregate?: Maybe<Vertex_Aggregate_Order_By>;
};

/** primary key columns input for table: "graph" */
export type Graph_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "graph" */
export enum Graph_Select_Column {
  /** column name */
  AppId = 'app_id',
  /** column name */
  Id = 'id',
  /** column name */
  Label = 'label',
  /** column name */
  PageId = 'page_id'
}

/** input type for updating data in table "graph" */
export type Graph_Set_Input = {
  app_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  label?: Maybe<Scalars['String']>;
  page_id?: Maybe<Scalars['uuid']>;
};

/** update columns of table "graph" */
export enum Graph_Update_Column {
  /** column name */
  AppId = 'app_id',
  /** column name */
  Id = 'id',
  /** column name */
  Label = 'label',
  /** column name */
  PageId = 'page_id'
}


/** expression to compare columns of type jsonb. All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  /** is the column contained in the given json value */
  _contained_in?: Maybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: Maybe<Scalars['jsonb']>;
  _eq?: Maybe<Scalars['jsonb']>;
  _gt?: Maybe<Scalars['jsonb']>;
  _gte?: Maybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: Maybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: Maybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: Maybe<Array<Scalars['String']>>;
  _in?: Maybe<Array<Scalars['jsonb']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['jsonb']>;
  _lte?: Maybe<Scalars['jsonb']>;
  _neq?: Maybe<Scalars['jsonb']>;
  _nin?: Maybe<Array<Scalars['jsonb']>>;
};

/** column ordering options */
export enum Order_By {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "page" */
export type Page = {
  __typename?: 'page';
  /** An object relationship */
  app?: Maybe<App>;
  app_id?: Maybe<Scalars['uuid']>;
  /** An array relationship */
  graphs: Array<Graph>;
  /** An aggregated array relationship */
  graphs_aggregate: Graph_Aggregate;
  id: Scalars['uuid'];
};


/** columns and relationships of "page" */
export type PageGraphsArgs = {
  distinct_on?: Maybe<Array<Graph_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Graph_Order_By>>;
  where?: Maybe<Graph_Bool_Exp>;
};


/** columns and relationships of "page" */
export type PageGraphs_AggregateArgs = {
  distinct_on?: Maybe<Array<Graph_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Graph_Order_By>>;
  where?: Maybe<Graph_Bool_Exp>;
};

/** aggregated selection of "page" */
export type Page_Aggregate = {
  __typename?: 'page_aggregate';
  aggregate?: Maybe<Page_Aggregate_Fields>;
  nodes: Array<Page>;
};

/** aggregate fields of "page" */
export type Page_Aggregate_Fields = {
  __typename?: 'page_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Page_Max_Fields>;
  min?: Maybe<Page_Min_Fields>;
};


/** aggregate fields of "page" */
export type Page_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Page_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "page" */
export type Page_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Page_Max_Order_By>;
  min?: Maybe<Page_Min_Order_By>;
};

/** input type for inserting array relation for remote table "page" */
export type Page_Arr_Rel_Insert_Input = {
  data: Array<Page_Insert_Input>;
  on_conflict?: Maybe<Page_On_Conflict>;
};

/** Boolean expression to filter rows from the table "page". All fields are combined with a logical 'AND'. */
export type Page_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Page_Bool_Exp>>>;
  _not?: Maybe<Page_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Page_Bool_Exp>>>;
  app?: Maybe<App_Bool_Exp>;
  app_id?: Maybe<Uuid_Comparison_Exp>;
  graphs?: Maybe<Graph_Bool_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "page" */
export enum Page_Constraint {
  /** unique or primary key constraint */
  Pk_742f4117e065c5b6ad21b37ba1f = 'PK_742f4117e065c5b6ad21b37ba1f'
}

/** input type for inserting data into table "page" */
export type Page_Insert_Input = {
  app?: Maybe<App_Obj_Rel_Insert_Input>;
  app_id?: Maybe<Scalars['uuid']>;
  graphs?: Maybe<Graph_Arr_Rel_Insert_Input>;
  id?: Maybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Page_Max_Fields = {
  __typename?: 'page_max_fields';
  app_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "page" */
export type Page_Max_Order_By = {
  app_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Page_Min_Fields = {
  __typename?: 'page_min_fields';
  app_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "page" */
export type Page_Min_Order_By = {
  app_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** response of any mutation on the table "page" */
export type Page_Mutation_Response = {
  __typename?: 'page_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Page>;
};

/** input type for inserting object relation for remote table "page" */
export type Page_Obj_Rel_Insert_Input = {
  data: Page_Insert_Input;
  on_conflict?: Maybe<Page_On_Conflict>;
};

/** on conflict condition type for table "page" */
export type Page_On_Conflict = {
  constraint: Page_Constraint;
  update_columns: Array<Page_Update_Column>;
  where?: Maybe<Page_Bool_Exp>;
};

/** ordering options when selecting data from "page" */
export type Page_Order_By = {
  app?: Maybe<App_Order_By>;
  app_id?: Maybe<Order_By>;
  graphs_aggregate?: Maybe<Graph_Aggregate_Order_By>;
  id?: Maybe<Order_By>;
};

/** primary key columns input for table: "page" */
export type Page_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "page" */
export enum Page_Select_Column {
  /** column name */
  AppId = 'app_id',
  /** column name */
  Id = 'id'
}

/** input type for updating data in table "page" */
export type Page_Set_Input = {
  app_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
};

/** update columns of table "page" */
export enum Page_Update_Column {
  /** column name */
  AppId = 'app_id',
  /** column name */
  Id = 'id'
}

/** columns and relationships of "user" */
export type User = {
  __typename?: 'user';
  /** An array relationship */
  apps: Array<App>;
  /** An aggregated array relationship */
  apps_aggregate: App_Aggregate;
  email: Scalars['String'];
  google_provider_id?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  password?: Maybe<Scalars['String']>;
};


/** columns and relationships of "user" */
export type UserAppsArgs = {
  distinct_on?: Maybe<Array<App_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<App_Order_By>>;
  where?: Maybe<App_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserApps_AggregateArgs = {
  distinct_on?: Maybe<Array<App_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<App_Order_By>>;
  where?: Maybe<App_Bool_Exp>;
};

/** aggregated selection of "user" */
export type User_Aggregate = {
  __typename?: 'user_aggregate';
  aggregate?: Maybe<User_Aggregate_Fields>;
  nodes: Array<User>;
};

/** aggregate fields of "user" */
export type User_Aggregate_Fields = {
  __typename?: 'user_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<User_Max_Fields>;
  min?: Maybe<User_Min_Fields>;
};


/** aggregate fields of "user" */
export type User_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<User_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "user" */
export type User_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<User_Max_Order_By>;
  min?: Maybe<User_Min_Order_By>;
};

/** input type for inserting array relation for remote table "user" */
export type User_Arr_Rel_Insert_Input = {
  data: Array<User_Insert_Input>;
  on_conflict?: Maybe<User_On_Conflict>;
};

/** Boolean expression to filter rows from the table "user". All fields are combined with a logical 'AND'. */
export type User_Bool_Exp = {
  _and?: Maybe<Array<Maybe<User_Bool_Exp>>>;
  _not?: Maybe<User_Bool_Exp>;
  _or?: Maybe<Array<Maybe<User_Bool_Exp>>>;
  apps?: Maybe<App_Bool_Exp>;
  email?: Maybe<String_Comparison_Exp>;
  google_provider_id?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  password?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "user" */
export enum User_Constraint {
  /** unique or primary key constraint */
  PkCace4a159ff9f2512dd42373760 = 'PK_cace4a159ff9f2512dd42373760',
  /** unique or primary key constraint */
  UqE12875dfb3b1d92d7d7c5377e22 = 'UQ_e12875dfb3b1d92d7d7c5377e22'
}

/** input type for inserting data into table "user" */
export type User_Insert_Input = {
  apps?: Maybe<App_Arr_Rel_Insert_Input>;
  email?: Maybe<Scalars['String']>;
  google_provider_id?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  password?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type User_Max_Fields = {
  __typename?: 'user_max_fields';
  email?: Maybe<Scalars['String']>;
  google_provider_id?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  password?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "user" */
export type User_Max_Order_By = {
  email?: Maybe<Order_By>;
  google_provider_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  password?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type User_Min_Fields = {
  __typename?: 'user_min_fields';
  email?: Maybe<Scalars['String']>;
  google_provider_id?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  password?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "user" */
export type User_Min_Order_By = {
  email?: Maybe<Order_By>;
  google_provider_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  password?: Maybe<Order_By>;
};

/** response of any mutation on the table "user" */
export type User_Mutation_Response = {
  __typename?: 'user_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<User>;
};

/** input type for inserting object relation for remote table "user" */
export type User_Obj_Rel_Insert_Input = {
  data: User_Insert_Input;
  on_conflict?: Maybe<User_On_Conflict>;
};

/** on conflict condition type for table "user" */
export type User_On_Conflict = {
  constraint: User_Constraint;
  update_columns: Array<User_Update_Column>;
  where?: Maybe<User_Bool_Exp>;
};

/** ordering options when selecting data from "user" */
export type User_Order_By = {
  apps_aggregate?: Maybe<App_Aggregate_Order_By>;
  email?: Maybe<Order_By>;
  google_provider_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  password?: Maybe<Order_By>;
};

/** primary key columns input for table: "user" */
export type User_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "user" */
export enum User_Select_Column {
  /** column name */
  Email = 'email',
  /** column name */
  GoogleProviderId = 'google_provider_id',
  /** column name */
  Id = 'id',
  /** column name */
  Password = 'password'
}

/** input type for updating data in table "user" */
export type User_Set_Input = {
  email?: Maybe<Scalars['String']>;
  google_provider_id?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  password?: Maybe<Scalars['String']>;
};

/** update columns of table "user" */
export enum User_Update_Column {
  /** column name */
  Email = 'email',
  /** column name */
  GoogleProviderId = 'google_provider_id',
  /** column name */
  Id = 'id',
  /** column name */
  Password = 'password'
}


/** expression to compare columns of type uuid. All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: Maybe<Scalars['uuid']>;
  _gt?: Maybe<Scalars['uuid']>;
  _gte?: Maybe<Scalars['uuid']>;
  _in?: Maybe<Array<Scalars['uuid']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['uuid']>;
  _lte?: Maybe<Scalars['uuid']>;
  _neq?: Maybe<Scalars['uuid']>;
  _nin?: Maybe<Array<Scalars['uuid']>>;
};

/** columns and relationships of "vertex" */
export type Vertex = {
  __typename?: 'vertex';
  /** An object relationship */
  graph?: Maybe<Graph>;
  graph_id?: Maybe<Scalars['uuid']>;
  id: Scalars['uuid'];
  props: Scalars['jsonb'];
  type: Scalars['vertex_type_enum'];
};


/** columns and relationships of "vertex" */
export type VertexPropsArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "vertex" */
export type Vertex_Aggregate = {
  __typename?: 'vertex_aggregate';
  aggregate?: Maybe<Vertex_Aggregate_Fields>;
  nodes: Array<Vertex>;
};

/** aggregate fields of "vertex" */
export type Vertex_Aggregate_Fields = {
  __typename?: 'vertex_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Vertex_Max_Fields>;
  min?: Maybe<Vertex_Min_Fields>;
};


/** aggregate fields of "vertex" */
export type Vertex_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Vertex_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "vertex" */
export type Vertex_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Vertex_Max_Order_By>;
  min?: Maybe<Vertex_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Vertex_Append_Input = {
  props?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "vertex" */
export type Vertex_Arr_Rel_Insert_Input = {
  data: Array<Vertex_Insert_Input>;
  on_conflict?: Maybe<Vertex_On_Conflict>;
};

/** Boolean expression to filter rows from the table "vertex". All fields are combined with a logical 'AND'. */
export type Vertex_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Vertex_Bool_Exp>>>;
  _not?: Maybe<Vertex_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Vertex_Bool_Exp>>>;
  graph?: Maybe<Graph_Bool_Exp>;
  graph_id?: Maybe<Uuid_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  props?: Maybe<Jsonb_Comparison_Exp>;
  type?: Maybe<Vertex_Type_Enum_Comparison_Exp>;
};

/** unique or primary key constraints on table "vertex" */
export enum Vertex_Constraint {
  /** unique or primary key constraint */
  PkC8ba7ae73ad81b9f3991ad76684 = 'PK_c8ba7ae73ad81b9f3991ad76684'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Vertex_Delete_At_Path_Input = {
  props?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Vertex_Delete_Elem_Input = {
  props?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Vertex_Delete_Key_Input = {
  props?: Maybe<Scalars['String']>;
};

/** input type for inserting data into table "vertex" */
export type Vertex_Insert_Input = {
  graph?: Maybe<Graph_Obj_Rel_Insert_Input>;
  graph_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  props?: Maybe<Scalars['jsonb']>;
  type?: Maybe<Scalars['vertex_type_enum']>;
};

/** aggregate max on columns */
export type Vertex_Max_Fields = {
  __typename?: 'vertex_max_fields';
  graph_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "vertex" */
export type Vertex_Max_Order_By = {
  graph_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Vertex_Min_Fields = {
  __typename?: 'vertex_min_fields';
  graph_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "vertex" */
export type Vertex_Min_Order_By = {
  graph_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** response of any mutation on the table "vertex" */
export type Vertex_Mutation_Response = {
  __typename?: 'vertex_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Vertex>;
};

/** input type for inserting object relation for remote table "vertex" */
export type Vertex_Obj_Rel_Insert_Input = {
  data: Vertex_Insert_Input;
  on_conflict?: Maybe<Vertex_On_Conflict>;
};

/** on conflict condition type for table "vertex" */
export type Vertex_On_Conflict = {
  constraint: Vertex_Constraint;
  update_columns: Array<Vertex_Update_Column>;
  where?: Maybe<Vertex_Bool_Exp>;
};

/** ordering options when selecting data from "vertex" */
export type Vertex_Order_By = {
  graph?: Maybe<Graph_Order_By>;
  graph_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  props?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
};

/** primary key columns input for table: "vertex" */
export type Vertex_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Vertex_Prepend_Input = {
  props?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "vertex" */
export enum Vertex_Select_Column {
  /** column name */
  GraphId = 'graph_id',
  /** column name */
  Id = 'id',
  /** column name */
  Props = 'props',
  /** column name */
  Type = 'type'
}

/** input type for updating data in table "vertex" */
export type Vertex_Set_Input = {
  graph_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  props?: Maybe<Scalars['jsonb']>;
  type?: Maybe<Scalars['vertex_type_enum']>;
};


/** expression to compare columns of type vertex_type_enum. All fields are combined with logical 'AND'. */
export type Vertex_Type_Enum_Comparison_Exp = {
  _eq?: Maybe<Scalars['vertex_type_enum']>;
  _gt?: Maybe<Scalars['vertex_type_enum']>;
  _gte?: Maybe<Scalars['vertex_type_enum']>;
  _in?: Maybe<Array<Scalars['vertex_type_enum']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['vertex_type_enum']>;
  _lte?: Maybe<Scalars['vertex_type_enum']>;
  _neq?: Maybe<Scalars['vertex_type_enum']>;
  _nin?: Maybe<Array<Scalars['vertex_type_enum']>>;
};

/** update columns of table "vertex" */
export enum Vertex_Update_Column {
  /** column name */
  GraphId = 'graph_id',
  /** column name */
  Id = 'id',
  /** column name */
  Props = 'props',
  /** column name */
  Type = 'type'
}



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: Array<any>) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  TypeOrmUser: ResolverTypeWrapper<TypeOrmUser>;
  String: ResolverTypeWrapper<Scalars['String']>;
  IUser: ResolversTypes['TypeOrmUser'];
  TypeOrmVertex: ResolverTypeWrapper<TypeOrmVertex>;
  IVertex: ResolversTypes['TypeOrmVertex'];
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>;
  NodeType: NodeType;
  TypeOrmEdge: ResolverTypeWrapper<TypeOrmEdge>;
  IEdge: ResolversTypes['TypeOrmEdge'];
  GraphUseCaseDto: ResolverTypeWrapper<GraphUseCaseDto>;
  UserUseCaseDto: ResolverTypeWrapper<UserUseCaseDto>;
  GetUserRequest: GetUserRequest;
  CreateGraphRequest: CreateGraphRequest;
  AddChildNodeRequest: AddChildNodeRequest;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  CreateVertexRequest: CreateVertexRequest;
  CreateUserRequest: CreateUserRequest;
  DeleteUserRequest: DeleteUserRequest;
  UpdateUserRequest: UpdateUserRequest;
  Subscription: ResolverTypeWrapper<{}>;
  Int_comparison_exp: Int_Comparison_Exp;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  String_comparison_exp: String_Comparison_Exp;
  app: ResolverTypeWrapper<App>;
  app_aggregate: ResolverTypeWrapper<App_Aggregate>;
  app_aggregate_fields: ResolverTypeWrapper<App_Aggregate_Fields>;
  app_aggregate_order_by: App_Aggregate_Order_By;
  app_arr_rel_insert_input: App_Arr_Rel_Insert_Input;
  app_bool_exp: App_Bool_Exp;
  app_constraint: App_Constraint;
  app_insert_input: App_Insert_Input;
  app_max_fields: ResolverTypeWrapper<App_Max_Fields>;
  app_max_order_by: App_Max_Order_By;
  app_min_fields: ResolverTypeWrapper<App_Min_Fields>;
  app_min_order_by: App_Min_Order_By;
  app_mutation_response: ResolverTypeWrapper<App_Mutation_Response>;
  app_obj_rel_insert_input: App_Obj_Rel_Insert_Input;
  app_on_conflict: App_On_Conflict;
  app_order_by: App_Order_By;
  app_pk_columns_input: App_Pk_Columns_Input;
  app_select_column: App_Select_Column;
  app_set_input: App_Set_Input;
  app_update_column: App_Update_Column;
  edge: ResolverTypeWrapper<Edge>;
  edge_aggregate: ResolverTypeWrapper<Edge_Aggregate>;
  edge_aggregate_fields: ResolverTypeWrapper<Edge_Aggregate_Fields>;
  edge_aggregate_order_by: Edge_Aggregate_Order_By;
  edge_append_input: Edge_Append_Input;
  edge_arr_rel_insert_input: Edge_Arr_Rel_Insert_Input;
  edge_avg_fields: ResolverTypeWrapper<Edge_Avg_Fields>;
  edge_avg_order_by: Edge_Avg_Order_By;
  edge_bool_exp: Edge_Bool_Exp;
  edge_constraint: Edge_Constraint;
  edge_delete_at_path_input: Edge_Delete_At_Path_Input;
  edge_delete_elem_input: Edge_Delete_Elem_Input;
  edge_delete_key_input: Edge_Delete_Key_Input;
  edge_inc_input: Edge_Inc_Input;
  edge_insert_input: Edge_Insert_Input;
  edge_max_fields: ResolverTypeWrapper<Edge_Max_Fields>;
  edge_max_order_by: Edge_Max_Order_By;
  edge_min_fields: ResolverTypeWrapper<Edge_Min_Fields>;
  edge_min_order_by: Edge_Min_Order_By;
  edge_mutation_response: ResolverTypeWrapper<Edge_Mutation_Response>;
  edge_obj_rel_insert_input: Edge_Obj_Rel_Insert_Input;
  edge_on_conflict: Edge_On_Conflict;
  edge_order_by: Edge_Order_By;
  edge_pk_columns_input: Edge_Pk_Columns_Input;
  edge_prepend_input: Edge_Prepend_Input;
  edge_select_column: Edge_Select_Column;
  edge_set_input: Edge_Set_Input;
  edge_stddev_fields: ResolverTypeWrapper<Edge_Stddev_Fields>;
  edge_stddev_order_by: Edge_Stddev_Order_By;
  edge_stddev_pop_fields: ResolverTypeWrapper<Edge_Stddev_Pop_Fields>;
  edge_stddev_pop_order_by: Edge_Stddev_Pop_Order_By;
  edge_stddev_samp_fields: ResolverTypeWrapper<Edge_Stddev_Samp_Fields>;
  edge_stddev_samp_order_by: Edge_Stddev_Samp_Order_By;
  edge_sum_fields: ResolverTypeWrapper<Edge_Sum_Fields>;
  edge_sum_order_by: Edge_Sum_Order_By;
  edge_update_column: Edge_Update_Column;
  edge_var_pop_fields: ResolverTypeWrapper<Edge_Var_Pop_Fields>;
  edge_var_pop_order_by: Edge_Var_Pop_Order_By;
  edge_var_samp_fields: ResolverTypeWrapper<Edge_Var_Samp_Fields>;
  edge_var_samp_order_by: Edge_Var_Samp_Order_By;
  edge_variance_fields: ResolverTypeWrapper<Edge_Variance_Fields>;
  edge_variance_order_by: Edge_Variance_Order_By;
  graph: ResolverTypeWrapper<Graph>;
  graph_aggregate: ResolverTypeWrapper<Graph_Aggregate>;
  graph_aggregate_fields: ResolverTypeWrapper<Graph_Aggregate_Fields>;
  graph_aggregate_order_by: Graph_Aggregate_Order_By;
  graph_arr_rel_insert_input: Graph_Arr_Rel_Insert_Input;
  graph_bool_exp: Graph_Bool_Exp;
  graph_constraint: Graph_Constraint;
  graph_insert_input: Graph_Insert_Input;
  graph_max_fields: ResolverTypeWrapper<Graph_Max_Fields>;
  graph_max_order_by: Graph_Max_Order_By;
  graph_min_fields: ResolverTypeWrapper<Graph_Min_Fields>;
  graph_min_order_by: Graph_Min_Order_By;
  graph_mutation_response: ResolverTypeWrapper<Graph_Mutation_Response>;
  graph_obj_rel_insert_input: Graph_Obj_Rel_Insert_Input;
  graph_on_conflict: Graph_On_Conflict;
  graph_order_by: Graph_Order_By;
  graph_pk_columns_input: Graph_Pk_Columns_Input;
  graph_select_column: Graph_Select_Column;
  graph_set_input: Graph_Set_Input;
  graph_update_column: Graph_Update_Column;
  jsonb: ResolverTypeWrapper<Scalars['jsonb']>;
  jsonb_comparison_exp: Jsonb_Comparison_Exp;
  order_by: Order_By;
  page: ResolverTypeWrapper<Page>;
  page_aggregate: ResolverTypeWrapper<Page_Aggregate>;
  page_aggregate_fields: ResolverTypeWrapper<Page_Aggregate_Fields>;
  page_aggregate_order_by: Page_Aggregate_Order_By;
  page_arr_rel_insert_input: Page_Arr_Rel_Insert_Input;
  page_bool_exp: Page_Bool_Exp;
  page_constraint: Page_Constraint;
  page_insert_input: Page_Insert_Input;
  page_max_fields: ResolverTypeWrapper<Page_Max_Fields>;
  page_max_order_by: Page_Max_Order_By;
  page_min_fields: ResolverTypeWrapper<Page_Min_Fields>;
  page_min_order_by: Page_Min_Order_By;
  page_mutation_response: ResolverTypeWrapper<Page_Mutation_Response>;
  page_obj_rel_insert_input: Page_Obj_Rel_Insert_Input;
  page_on_conflict: Page_On_Conflict;
  page_order_by: Page_Order_By;
  page_pk_columns_input: Page_Pk_Columns_Input;
  page_select_column: Page_Select_Column;
  page_set_input: Page_Set_Input;
  page_update_column: Page_Update_Column;
  user: ResolverTypeWrapper<User>;
  user_aggregate: ResolverTypeWrapper<User_Aggregate>;
  user_aggregate_fields: ResolverTypeWrapper<User_Aggregate_Fields>;
  user_aggregate_order_by: User_Aggregate_Order_By;
  user_arr_rel_insert_input: User_Arr_Rel_Insert_Input;
  user_bool_exp: User_Bool_Exp;
  user_constraint: User_Constraint;
  user_insert_input: User_Insert_Input;
  user_max_fields: ResolverTypeWrapper<User_Max_Fields>;
  user_max_order_by: User_Max_Order_By;
  user_min_fields: ResolverTypeWrapper<User_Min_Fields>;
  user_min_order_by: User_Min_Order_By;
  user_mutation_response: ResolverTypeWrapper<User_Mutation_Response>;
  user_obj_rel_insert_input: User_Obj_Rel_Insert_Input;
  user_on_conflict: User_On_Conflict;
  user_order_by: User_Order_By;
  user_pk_columns_input: User_Pk_Columns_Input;
  user_select_column: User_Select_Column;
  user_set_input: User_Set_Input;
  user_update_column: User_Update_Column;
  uuid: ResolverTypeWrapper<Scalars['uuid']>;
  uuid_comparison_exp: Uuid_Comparison_Exp;
  vertex: ResolverTypeWrapper<Vertex>;
  vertex_aggregate: ResolverTypeWrapper<Vertex_Aggregate>;
  vertex_aggregate_fields: ResolverTypeWrapper<Vertex_Aggregate_Fields>;
  vertex_aggregate_order_by: Vertex_Aggregate_Order_By;
  vertex_append_input: Vertex_Append_Input;
  vertex_arr_rel_insert_input: Vertex_Arr_Rel_Insert_Input;
  vertex_bool_exp: Vertex_Bool_Exp;
  vertex_constraint: Vertex_Constraint;
  vertex_delete_at_path_input: Vertex_Delete_At_Path_Input;
  vertex_delete_elem_input: Vertex_Delete_Elem_Input;
  vertex_delete_key_input: Vertex_Delete_Key_Input;
  vertex_insert_input: Vertex_Insert_Input;
  vertex_max_fields: ResolverTypeWrapper<Vertex_Max_Fields>;
  vertex_max_order_by: Vertex_Max_Order_By;
  vertex_min_fields: ResolverTypeWrapper<Vertex_Min_Fields>;
  vertex_min_order_by: Vertex_Min_Order_By;
  vertex_mutation_response: ResolverTypeWrapper<Vertex_Mutation_Response>;
  vertex_obj_rel_insert_input: Vertex_Obj_Rel_Insert_Input;
  vertex_on_conflict: Vertex_On_Conflict;
  vertex_order_by: Vertex_Order_By;
  vertex_pk_columns_input: Vertex_Pk_Columns_Input;
  vertex_prepend_input: Vertex_Prepend_Input;
  vertex_select_column: Vertex_Select_Column;
  vertex_set_input: Vertex_Set_Input;
  vertex_type_enum: ResolverTypeWrapper<Scalars['vertex_type_enum']>;
  vertex_type_enum_comparison_exp: Vertex_Type_Enum_Comparison_Exp;
  vertex_update_column: Vertex_Update_Column;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  Int: Scalars['Int'];
  Mutation: {};
  TypeOrmUser: TypeOrmUser;
  String: Scalars['String'];
  IUser: ResolversParentTypes['TypeOrmUser'];
  TypeOrmVertex: TypeOrmVertex;
  IVertex: ResolversParentTypes['TypeOrmVertex'];
  JSONObject: Scalars['JSONObject'];
  TypeOrmEdge: TypeOrmEdge;
  IEdge: ResolversParentTypes['TypeOrmEdge'];
  GraphUseCaseDto: GraphUseCaseDto;
  UserUseCaseDto: UserUseCaseDto;
  GetUserRequest: GetUserRequest;
  CreateGraphRequest: CreateGraphRequest;
  AddChildNodeRequest: AddChildNodeRequest;
  Float: Scalars['Float'];
  CreateVertexRequest: CreateVertexRequest;
  CreateUserRequest: CreateUserRequest;
  DeleteUserRequest: DeleteUserRequest;
  UpdateUserRequest: UpdateUserRequest;
  Subscription: {};
  Int_comparison_exp: Int_Comparison_Exp;
  Boolean: Scalars['Boolean'];
  String_comparison_exp: String_Comparison_Exp;
  app: App;
  app_aggregate: App_Aggregate;
  app_aggregate_fields: App_Aggregate_Fields;
  app_aggregate_order_by: App_Aggregate_Order_By;
  app_arr_rel_insert_input: App_Arr_Rel_Insert_Input;
  app_bool_exp: App_Bool_Exp;
  app_insert_input: App_Insert_Input;
  app_max_fields: App_Max_Fields;
  app_max_order_by: App_Max_Order_By;
  app_min_fields: App_Min_Fields;
  app_min_order_by: App_Min_Order_By;
  app_mutation_response: App_Mutation_Response;
  app_obj_rel_insert_input: App_Obj_Rel_Insert_Input;
  app_on_conflict: App_On_Conflict;
  app_order_by: App_Order_By;
  app_pk_columns_input: App_Pk_Columns_Input;
  app_set_input: App_Set_Input;
  edge: Edge;
  edge_aggregate: Edge_Aggregate;
  edge_aggregate_fields: Edge_Aggregate_Fields;
  edge_aggregate_order_by: Edge_Aggregate_Order_By;
  edge_append_input: Edge_Append_Input;
  edge_arr_rel_insert_input: Edge_Arr_Rel_Insert_Input;
  edge_avg_fields: Edge_Avg_Fields;
  edge_avg_order_by: Edge_Avg_Order_By;
  edge_bool_exp: Edge_Bool_Exp;
  edge_delete_at_path_input: Edge_Delete_At_Path_Input;
  edge_delete_elem_input: Edge_Delete_Elem_Input;
  edge_delete_key_input: Edge_Delete_Key_Input;
  edge_inc_input: Edge_Inc_Input;
  edge_insert_input: Edge_Insert_Input;
  edge_max_fields: Edge_Max_Fields;
  edge_max_order_by: Edge_Max_Order_By;
  edge_min_fields: Edge_Min_Fields;
  edge_min_order_by: Edge_Min_Order_By;
  edge_mutation_response: Edge_Mutation_Response;
  edge_obj_rel_insert_input: Edge_Obj_Rel_Insert_Input;
  edge_on_conflict: Edge_On_Conflict;
  edge_order_by: Edge_Order_By;
  edge_pk_columns_input: Edge_Pk_Columns_Input;
  edge_prepend_input: Edge_Prepend_Input;
  edge_set_input: Edge_Set_Input;
  edge_stddev_fields: Edge_Stddev_Fields;
  edge_stddev_order_by: Edge_Stddev_Order_By;
  edge_stddev_pop_fields: Edge_Stddev_Pop_Fields;
  edge_stddev_pop_order_by: Edge_Stddev_Pop_Order_By;
  edge_stddev_samp_fields: Edge_Stddev_Samp_Fields;
  edge_stddev_samp_order_by: Edge_Stddev_Samp_Order_By;
  edge_sum_fields: Edge_Sum_Fields;
  edge_sum_order_by: Edge_Sum_Order_By;
  edge_var_pop_fields: Edge_Var_Pop_Fields;
  edge_var_pop_order_by: Edge_Var_Pop_Order_By;
  edge_var_samp_fields: Edge_Var_Samp_Fields;
  edge_var_samp_order_by: Edge_Var_Samp_Order_By;
  edge_variance_fields: Edge_Variance_Fields;
  edge_variance_order_by: Edge_Variance_Order_By;
  graph: Graph;
  graph_aggregate: Graph_Aggregate;
  graph_aggregate_fields: Graph_Aggregate_Fields;
  graph_aggregate_order_by: Graph_Aggregate_Order_By;
  graph_arr_rel_insert_input: Graph_Arr_Rel_Insert_Input;
  graph_bool_exp: Graph_Bool_Exp;
  graph_insert_input: Graph_Insert_Input;
  graph_max_fields: Graph_Max_Fields;
  graph_max_order_by: Graph_Max_Order_By;
  graph_min_fields: Graph_Min_Fields;
  graph_min_order_by: Graph_Min_Order_By;
  graph_mutation_response: Graph_Mutation_Response;
  graph_obj_rel_insert_input: Graph_Obj_Rel_Insert_Input;
  graph_on_conflict: Graph_On_Conflict;
  graph_order_by: Graph_Order_By;
  graph_pk_columns_input: Graph_Pk_Columns_Input;
  graph_set_input: Graph_Set_Input;
  jsonb: Scalars['jsonb'];
  jsonb_comparison_exp: Jsonb_Comparison_Exp;
  page: Page;
  page_aggregate: Page_Aggregate;
  page_aggregate_fields: Page_Aggregate_Fields;
  page_aggregate_order_by: Page_Aggregate_Order_By;
  page_arr_rel_insert_input: Page_Arr_Rel_Insert_Input;
  page_bool_exp: Page_Bool_Exp;
  page_insert_input: Page_Insert_Input;
  page_max_fields: Page_Max_Fields;
  page_max_order_by: Page_Max_Order_By;
  page_min_fields: Page_Min_Fields;
  page_min_order_by: Page_Min_Order_By;
  page_mutation_response: Page_Mutation_Response;
  page_obj_rel_insert_input: Page_Obj_Rel_Insert_Input;
  page_on_conflict: Page_On_Conflict;
  page_order_by: Page_Order_By;
  page_pk_columns_input: Page_Pk_Columns_Input;
  page_set_input: Page_Set_Input;
  user: User;
  user_aggregate: User_Aggregate;
  user_aggregate_fields: User_Aggregate_Fields;
  user_aggregate_order_by: User_Aggregate_Order_By;
  user_arr_rel_insert_input: User_Arr_Rel_Insert_Input;
  user_bool_exp: User_Bool_Exp;
  user_insert_input: User_Insert_Input;
  user_max_fields: User_Max_Fields;
  user_max_order_by: User_Max_Order_By;
  user_min_fields: User_Min_Fields;
  user_min_order_by: User_Min_Order_By;
  user_mutation_response: User_Mutation_Response;
  user_obj_rel_insert_input: User_Obj_Rel_Insert_Input;
  user_on_conflict: User_On_Conflict;
  user_order_by: User_Order_By;
  user_pk_columns_input: User_Pk_Columns_Input;
  user_set_input: User_Set_Input;
  uuid: Scalars['uuid'];
  uuid_comparison_exp: Uuid_Comparison_Exp;
  vertex: Vertex;
  vertex_aggregate: Vertex_Aggregate;
  vertex_aggregate_fields: Vertex_Aggregate_Fields;
  vertex_aggregate_order_by: Vertex_Aggregate_Order_By;
  vertex_append_input: Vertex_Append_Input;
  vertex_arr_rel_insert_input: Vertex_Arr_Rel_Insert_Input;
  vertex_bool_exp: Vertex_Bool_Exp;
  vertex_delete_at_path_input: Vertex_Delete_At_Path_Input;
  vertex_delete_elem_input: Vertex_Delete_Elem_Input;
  vertex_delete_key_input: Vertex_Delete_Key_Input;
  vertex_insert_input: Vertex_Insert_Input;
  vertex_max_fields: Vertex_Max_Fields;
  vertex_max_order_by: Vertex_Max_Order_By;
  vertex_min_fields: Vertex_Min_Fields;
  vertex_min_order_by: Vertex_Min_Order_By;
  vertex_mutation_response: Vertex_Mutation_Response;
  vertex_obj_rel_insert_input: Vertex_Obj_Rel_Insert_Input;
  vertex_on_conflict: Vertex_On_Conflict;
  vertex_order_by: Vertex_Order_By;
  vertex_pk_columns_input: Vertex_Pk_Columns_Input;
  vertex_prepend_input: Vertex_Prepend_Input;
  vertex_set_input: Vertex_Set_Input;
  vertex_type_enum: Scalars['vertex_type_enum'];
  vertex_type_enum_comparison_exp: Vertex_Type_Enum_Comparison_Exp;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  graphs?: Resolver<Array<ResolversTypes['GraphUseCaseDto']>, ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['UserUseCaseDto']>, ParentType, ContextType, RequireFields<QueryUsersArgs, 'email'>>;
  app?: Resolver<Array<ResolversTypes['app']>, ParentType, ContextType, RequireFields<QueryAppArgs, never>>;
  app_aggregate?: Resolver<ResolversTypes['app_aggregate'], ParentType, ContextType, RequireFields<QueryApp_AggregateArgs, never>>;
  app_by_pk?: Resolver<Maybe<ResolversTypes['app']>, ParentType, ContextType, RequireFields<QueryApp_By_PkArgs, 'id'>>;
  edge?: Resolver<Array<ResolversTypes['edge']>, ParentType, ContextType, RequireFields<QueryEdgeArgs, never>>;
  edge_aggregate?: Resolver<ResolversTypes['edge_aggregate'], ParentType, ContextType, RequireFields<QueryEdge_AggregateArgs, never>>;
  edge_by_pk?: Resolver<Maybe<ResolversTypes['edge']>, ParentType, ContextType, RequireFields<QueryEdge_By_PkArgs, 'id'>>;
  graph?: Resolver<Array<ResolversTypes['graph']>, ParentType, ContextType, RequireFields<QueryGraphArgs, never>>;
  graph_aggregate?: Resolver<ResolversTypes['graph_aggregate'], ParentType, ContextType, RequireFields<QueryGraph_AggregateArgs, never>>;
  graph_by_pk?: Resolver<Maybe<ResolversTypes['graph']>, ParentType, ContextType, RequireFields<QueryGraph_By_PkArgs, 'id'>>;
  page?: Resolver<Array<ResolversTypes['page']>, ParentType, ContextType, RequireFields<QueryPageArgs, never>>;
  page_aggregate?: Resolver<ResolversTypes['page_aggregate'], ParentType, ContextType, RequireFields<QueryPage_AggregateArgs, never>>;
  page_by_pk?: Resolver<Maybe<ResolversTypes['page']>, ParentType, ContextType, RequireFields<QueryPage_By_PkArgs, 'id'>>;
  user?: Resolver<Array<ResolversTypes['user']>, ParentType, ContextType, RequireFields<QueryUserArgs, never>>;
  user_aggregate?: Resolver<ResolversTypes['user_aggregate'], ParentType, ContextType, RequireFields<QueryUser_AggregateArgs, never>>;
  user_by_pk?: Resolver<Maybe<ResolversTypes['user']>, ParentType, ContextType, RequireFields<QueryUser_By_PkArgs, 'id'>>;
  vertex?: Resolver<Array<ResolversTypes['vertex']>, ParentType, ContextType, RequireFields<QueryVertexArgs, never>>;
  vertex_aggregate?: Resolver<ResolversTypes['vertex_aggregate'], ParentType, ContextType, RequireFields<QueryVertex_AggregateArgs, never>>;
  vertex_by_pk?: Resolver<Maybe<ResolversTypes['vertex']>, ParentType, ContextType, RequireFields<QueryVertex_By_PkArgs, 'id'>>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createGraph?: Resolver<ResolversTypes['GraphUseCaseDto'], ParentType, ContextType, RequireFields<MutationCreateGraphArgs, 'graph'>>;
  addChildNode?: Resolver<ResolversTypes['GraphUseCaseDto'], ParentType, ContextType, RequireFields<MutationAddChildNodeArgs, 'request'>>;
  createUser?: Resolver<ResolversTypes['UserUseCaseDto'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'user'>>;
  deleteUser?: Resolver<ResolversTypes['UserUseCaseDto'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'user'>>;
  updateUser?: Resolver<ResolversTypes['UserUseCaseDto'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'user'>>;
  delete_app?: Resolver<Maybe<ResolversTypes['app_mutation_response']>, ParentType, ContextType, RequireFields<MutationDelete_AppArgs, 'where'>>;
  delete_app_by_pk?: Resolver<Maybe<ResolversTypes['app']>, ParentType, ContextType, RequireFields<MutationDelete_App_By_PkArgs, 'id'>>;
  delete_edge?: Resolver<Maybe<ResolversTypes['edge_mutation_response']>, ParentType, ContextType, RequireFields<MutationDelete_EdgeArgs, 'where'>>;
  delete_edge_by_pk?: Resolver<Maybe<ResolversTypes['edge']>, ParentType, ContextType, RequireFields<MutationDelete_Edge_By_PkArgs, 'id'>>;
  delete_graph?: Resolver<Maybe<ResolversTypes['graph_mutation_response']>, ParentType, ContextType, RequireFields<MutationDelete_GraphArgs, 'where'>>;
  delete_graph_by_pk?: Resolver<Maybe<ResolversTypes['graph']>, ParentType, ContextType, RequireFields<MutationDelete_Graph_By_PkArgs, 'id'>>;
  delete_page?: Resolver<Maybe<ResolversTypes['page_mutation_response']>, ParentType, ContextType, RequireFields<MutationDelete_PageArgs, 'where'>>;
  delete_page_by_pk?: Resolver<Maybe<ResolversTypes['page']>, ParentType, ContextType, RequireFields<MutationDelete_Page_By_PkArgs, 'id'>>;
  delete_user?: Resolver<Maybe<ResolversTypes['user_mutation_response']>, ParentType, ContextType, RequireFields<MutationDelete_UserArgs, 'where'>>;
  delete_user_by_pk?: Resolver<Maybe<ResolversTypes['user']>, ParentType, ContextType, RequireFields<MutationDelete_User_By_PkArgs, 'id'>>;
  delete_vertex?: Resolver<Maybe<ResolversTypes['vertex_mutation_response']>, ParentType, ContextType, RequireFields<MutationDelete_VertexArgs, 'where'>>;
  delete_vertex_by_pk?: Resolver<Maybe<ResolversTypes['vertex']>, ParentType, ContextType, RequireFields<MutationDelete_Vertex_By_PkArgs, 'id'>>;
  insert_app?: Resolver<Maybe<ResolversTypes['app_mutation_response']>, ParentType, ContextType, RequireFields<MutationInsert_AppArgs, 'objects'>>;
  insert_app_one?: Resolver<Maybe<ResolversTypes['app']>, ParentType, ContextType, RequireFields<MutationInsert_App_OneArgs, 'object'>>;
  insert_edge?: Resolver<Maybe<ResolversTypes['edge_mutation_response']>, ParentType, ContextType, RequireFields<MutationInsert_EdgeArgs, 'objects'>>;
  insert_edge_one?: Resolver<Maybe<ResolversTypes['edge']>, ParentType, ContextType, RequireFields<MutationInsert_Edge_OneArgs, 'object'>>;
  insert_graph?: Resolver<Maybe<ResolversTypes['graph_mutation_response']>, ParentType, ContextType, RequireFields<MutationInsert_GraphArgs, 'objects'>>;
  insert_graph_one?: Resolver<Maybe<ResolversTypes['graph']>, ParentType, ContextType, RequireFields<MutationInsert_Graph_OneArgs, 'object'>>;
  insert_page?: Resolver<Maybe<ResolversTypes['page_mutation_response']>, ParentType, ContextType, RequireFields<MutationInsert_PageArgs, 'objects'>>;
  insert_page_one?: Resolver<Maybe<ResolversTypes['page']>, ParentType, ContextType, RequireFields<MutationInsert_Page_OneArgs, 'object'>>;
  insert_user?: Resolver<Maybe<ResolversTypes['user_mutation_response']>, ParentType, ContextType, RequireFields<MutationInsert_UserArgs, 'objects'>>;
  insert_user_one?: Resolver<Maybe<ResolversTypes['user']>, ParentType, ContextType, RequireFields<MutationInsert_User_OneArgs, 'object'>>;
  insert_vertex?: Resolver<Maybe<ResolversTypes['vertex_mutation_response']>, ParentType, ContextType, RequireFields<MutationInsert_VertexArgs, 'objects'>>;
  insert_vertex_one?: Resolver<Maybe<ResolversTypes['vertex']>, ParentType, ContextType, RequireFields<MutationInsert_Vertex_OneArgs, 'object'>>;
  update_app?: Resolver<Maybe<ResolversTypes['app_mutation_response']>, ParentType, ContextType, RequireFields<MutationUpdate_AppArgs, 'where'>>;
  update_app_by_pk?: Resolver<Maybe<ResolversTypes['app']>, ParentType, ContextType, RequireFields<MutationUpdate_App_By_PkArgs, 'pk_columns'>>;
  update_edge?: Resolver<Maybe<ResolversTypes['edge_mutation_response']>, ParentType, ContextType, RequireFields<MutationUpdate_EdgeArgs, 'where'>>;
  update_edge_by_pk?: Resolver<Maybe<ResolversTypes['edge']>, ParentType, ContextType, RequireFields<MutationUpdate_Edge_By_PkArgs, 'pk_columns'>>;
  update_graph?: Resolver<Maybe<ResolversTypes['graph_mutation_response']>, ParentType, ContextType, RequireFields<MutationUpdate_GraphArgs, 'where'>>;
  update_graph_by_pk?: Resolver<Maybe<ResolversTypes['graph']>, ParentType, ContextType, RequireFields<MutationUpdate_Graph_By_PkArgs, 'pk_columns'>>;
  update_page?: Resolver<Maybe<ResolversTypes['page_mutation_response']>, ParentType, ContextType, RequireFields<MutationUpdate_PageArgs, 'where'>>;
  update_page_by_pk?: Resolver<Maybe<ResolversTypes['page']>, ParentType, ContextType, RequireFields<MutationUpdate_Page_By_PkArgs, 'pk_columns'>>;
  update_user?: Resolver<Maybe<ResolversTypes['user_mutation_response']>, ParentType, ContextType, RequireFields<MutationUpdate_UserArgs, 'where'>>;
  update_user_by_pk?: Resolver<Maybe<ResolversTypes['user']>, ParentType, ContextType, RequireFields<MutationUpdate_User_By_PkArgs, 'pk_columns'>>;
  update_vertex?: Resolver<Maybe<ResolversTypes['vertex_mutation_response']>, ParentType, ContextType, RequireFields<MutationUpdate_VertexArgs, 'where'>>;
  update_vertex_by_pk?: Resolver<Maybe<ResolversTypes['vertex']>, ParentType, ContextType, RequireFields<MutationUpdate_Vertex_By_PkArgs, 'pk_columns'>>;
};

export type TypeOrmUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['TypeOrmUser'] = ResolversParentTypes['TypeOrmUser']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['IUser'] = ResolversParentTypes['IUser']> = {
  __resolveType: TypeResolveFn<'TypeOrmUser', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type TypeOrmVertexResolvers<ContextType = any, ParentType extends ResolversParentTypes['TypeOrmVertex'] = ResolversParentTypes['TypeOrmVertex']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  props?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['NodeType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IVertexResolvers<ContextType = any, ParentType extends ResolversParentTypes['IVertex'] = ResolversParentTypes['IVertex']> = {
  __resolveType: TypeResolveFn<'TypeOrmVertex', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  props?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['NodeType'], ParentType, ContextType>;
};

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export type TypeOrmEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['TypeOrmEdge'] = ResolversParentTypes['TypeOrmEdge']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  source?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  target?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  props?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['IEdge'] = ResolversParentTypes['IEdge']> = {
  __resolveType: TypeResolveFn<'TypeOrmEdge', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  source?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  target?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  props?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
};

export type GraphUseCaseDtoResolvers<ContextType = any, ParentType extends ResolversParentTypes['GraphUseCaseDto'] = ResolversParentTypes['GraphUseCaseDto']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserUseCaseDtoResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserUseCaseDto'] = ResolversParentTypes['UserUseCaseDto']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  app?: SubscriptionResolver<Array<ResolversTypes['app']>, "app", ParentType, ContextType, RequireFields<SubscriptionAppArgs, never>>;
  app_aggregate?: SubscriptionResolver<ResolversTypes['app_aggregate'], "app_aggregate", ParentType, ContextType, RequireFields<SubscriptionApp_AggregateArgs, never>>;
  app_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['app']>, "app_by_pk", ParentType, ContextType, RequireFields<SubscriptionApp_By_PkArgs, 'id'>>;
  edge?: SubscriptionResolver<Array<ResolversTypes['edge']>, "edge", ParentType, ContextType, RequireFields<SubscriptionEdgeArgs, never>>;
  edge_aggregate?: SubscriptionResolver<ResolversTypes['edge_aggregate'], "edge_aggregate", ParentType, ContextType, RequireFields<SubscriptionEdge_AggregateArgs, never>>;
  edge_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['edge']>, "edge_by_pk", ParentType, ContextType, RequireFields<SubscriptionEdge_By_PkArgs, 'id'>>;
  graph?: SubscriptionResolver<Array<ResolversTypes['graph']>, "graph", ParentType, ContextType, RequireFields<SubscriptionGraphArgs, never>>;
  graph_aggregate?: SubscriptionResolver<ResolversTypes['graph_aggregate'], "graph_aggregate", ParentType, ContextType, RequireFields<SubscriptionGraph_AggregateArgs, never>>;
  graph_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['graph']>, "graph_by_pk", ParentType, ContextType, RequireFields<SubscriptionGraph_By_PkArgs, 'id'>>;
  page?: SubscriptionResolver<Array<ResolversTypes['page']>, "page", ParentType, ContextType, RequireFields<SubscriptionPageArgs, never>>;
  page_aggregate?: SubscriptionResolver<ResolversTypes['page_aggregate'], "page_aggregate", ParentType, ContextType, RequireFields<SubscriptionPage_AggregateArgs, never>>;
  page_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['page']>, "page_by_pk", ParentType, ContextType, RequireFields<SubscriptionPage_By_PkArgs, 'id'>>;
  user?: SubscriptionResolver<Array<ResolversTypes['user']>, "user", ParentType, ContextType, RequireFields<SubscriptionUserArgs, never>>;
  user_aggregate?: SubscriptionResolver<ResolversTypes['user_aggregate'], "user_aggregate", ParentType, ContextType, RequireFields<SubscriptionUser_AggregateArgs, never>>;
  user_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['user']>, "user_by_pk", ParentType, ContextType, RequireFields<SubscriptionUser_By_PkArgs, 'id'>>;
  vertex?: SubscriptionResolver<Array<ResolversTypes['vertex']>, "vertex", ParentType, ContextType, RequireFields<SubscriptionVertexArgs, never>>;
  vertex_aggregate?: SubscriptionResolver<ResolversTypes['vertex_aggregate'], "vertex_aggregate", ParentType, ContextType, RequireFields<SubscriptionVertex_AggregateArgs, never>>;
  vertex_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['vertex']>, "vertex_by_pk", ParentType, ContextType, RequireFields<SubscriptionVertex_By_PkArgs, 'id'>>;
};

export type AppResolvers<ContextType = any, ParentType extends ResolversParentTypes['app'] = ResolversParentTypes['app']> = {
  graphs?: Resolver<Array<ResolversTypes['graph']>, ParentType, ContextType, RequireFields<AppGraphsArgs, never>>;
  graphs_aggregate?: Resolver<ResolversTypes['graph_aggregate'], ParentType, ContextType, RequireFields<AppGraphs_AggregateArgs, never>>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  pages?: Resolver<Array<ResolversTypes['page']>, ParentType, ContextType, RequireFields<AppPagesArgs, never>>;
  pages_aggregate?: Resolver<ResolversTypes['page_aggregate'], ParentType, ContextType, RequireFields<AppPages_AggregateArgs, never>>;
  user?: Resolver<Maybe<ResolversTypes['user']>, ParentType, ContextType>;
  user_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type App_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['app_aggregate'] = ResolversParentTypes['app_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['app_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['app']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type App_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['app_aggregate_fields'] = ResolversParentTypes['app_aggregate_fields']> = {
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<App_Aggregate_FieldsCountArgs, never>>;
  max?: Resolver<Maybe<ResolversTypes['app_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['app_min_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type App_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['app_max_fields'] = ResolversParentTypes['app_max_fields']> = {
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  user_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type App_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['app_min_fields'] = ResolversParentTypes['app_min_fields']> = {
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  user_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type App_Mutation_ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['app_mutation_response'] = ResolversParentTypes['app_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['app']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['edge'] = ResolversParentTypes['edge']> = {
  graph?: Resolver<Maybe<ResolversTypes['graph']>, ParentType, ContextType>;
  graph_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  props?: Resolver<ResolversTypes['jsonb'], ParentType, ContextType, RequireFields<EdgePropsArgs, never>>;
  source?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  target?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Edge_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['edge_aggregate'] = ResolversParentTypes['edge_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['edge_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['edge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Edge_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['edge_aggregate_fields'] = ResolversParentTypes['edge_aggregate_fields']> = {
  avg?: Resolver<Maybe<ResolversTypes['edge_avg_fields']>, ParentType, ContextType>;
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<Edge_Aggregate_FieldsCountArgs, never>>;
  max?: Resolver<Maybe<ResolversTypes['edge_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['edge_min_fields']>, ParentType, ContextType>;
  stddev?: Resolver<Maybe<ResolversTypes['edge_stddev_fields']>, ParentType, ContextType>;
  stddev_pop?: Resolver<Maybe<ResolversTypes['edge_stddev_pop_fields']>, ParentType, ContextType>;
  stddev_samp?: Resolver<Maybe<ResolversTypes['edge_stddev_samp_fields']>, ParentType, ContextType>;
  sum?: Resolver<Maybe<ResolversTypes['edge_sum_fields']>, ParentType, ContextType>;
  var_pop?: Resolver<Maybe<ResolversTypes['edge_var_pop_fields']>, ParentType, ContextType>;
  var_samp?: Resolver<Maybe<ResolversTypes['edge_var_samp_fields']>, ParentType, ContextType>;
  variance?: Resolver<Maybe<ResolversTypes['edge_variance_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Edge_Avg_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['edge_avg_fields'] = ResolversParentTypes['edge_avg_fields']> = {
  order?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Edge_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['edge_max_fields'] = ResolversParentTypes['edge_max_fields']> = {
  graph_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  source?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  target?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Edge_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['edge_min_fields'] = ResolversParentTypes['edge_min_fields']> = {
  graph_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  source?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  target?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Edge_Mutation_ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['edge_mutation_response'] = ResolversParentTypes['edge_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['edge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Edge_Stddev_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['edge_stddev_fields'] = ResolversParentTypes['edge_stddev_fields']> = {
  order?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Edge_Stddev_Pop_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['edge_stddev_pop_fields'] = ResolversParentTypes['edge_stddev_pop_fields']> = {
  order?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Edge_Stddev_Samp_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['edge_stddev_samp_fields'] = ResolversParentTypes['edge_stddev_samp_fields']> = {
  order?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Edge_Sum_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['edge_sum_fields'] = ResolversParentTypes['edge_sum_fields']> = {
  order?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Edge_Var_Pop_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['edge_var_pop_fields'] = ResolversParentTypes['edge_var_pop_fields']> = {
  order?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Edge_Var_Samp_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['edge_var_samp_fields'] = ResolversParentTypes['edge_var_samp_fields']> = {
  order?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Edge_Variance_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['edge_variance_fields'] = ResolversParentTypes['edge_variance_fields']> = {
  order?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GraphResolvers<ContextType = any, ParentType extends ResolversParentTypes['graph'] = ResolversParentTypes['graph']> = {
  app?: Resolver<Maybe<ResolversTypes['app']>, ParentType, ContextType>;
  app_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  edges?: Resolver<Array<ResolversTypes['edge']>, ParentType, ContextType, RequireFields<GraphEdgesArgs, never>>;
  edges_aggregate?: Resolver<ResolversTypes['edge_aggregate'], ParentType, ContextType, RequireFields<GraphEdges_AggregateArgs, never>>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  page?: Resolver<Maybe<ResolversTypes['page']>, ParentType, ContextType>;
  page_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  vertices?: Resolver<Array<ResolversTypes['vertex']>, ParentType, ContextType, RequireFields<GraphVerticesArgs, never>>;
  vertices_aggregate?: Resolver<ResolversTypes['vertex_aggregate'], ParentType, ContextType, RequireFields<GraphVertices_AggregateArgs, never>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Graph_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['graph_aggregate'] = ResolversParentTypes['graph_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['graph_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['graph']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Graph_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['graph_aggregate_fields'] = ResolversParentTypes['graph_aggregate_fields']> = {
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<Graph_Aggregate_FieldsCountArgs, never>>;
  max?: Resolver<Maybe<ResolversTypes['graph_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['graph_min_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Graph_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['graph_max_fields'] = ResolversParentTypes['graph_max_fields']> = {
  app_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  page_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Graph_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['graph_min_fields'] = ResolversParentTypes['graph_min_fields']> = {
  app_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  page_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Graph_Mutation_ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['graph_mutation_response'] = ResolversParentTypes['graph_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['graph']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonbScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['jsonb'], any> {
  name: 'jsonb';
}

export type PageResolvers<ContextType = any, ParentType extends ResolversParentTypes['page'] = ResolversParentTypes['page']> = {
  app?: Resolver<Maybe<ResolversTypes['app']>, ParentType, ContextType>;
  app_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  graphs?: Resolver<Array<ResolversTypes['graph']>, ParentType, ContextType, RequireFields<PageGraphsArgs, never>>;
  graphs_aggregate?: Resolver<ResolversTypes['graph_aggregate'], ParentType, ContextType, RequireFields<PageGraphs_AggregateArgs, never>>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Page_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['page_aggregate'] = ResolversParentTypes['page_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['page_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['page']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Page_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['page_aggregate_fields'] = ResolversParentTypes['page_aggregate_fields']> = {
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<Page_Aggregate_FieldsCountArgs, never>>;
  max?: Resolver<Maybe<ResolversTypes['page_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['page_min_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Page_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['page_max_fields'] = ResolversParentTypes['page_max_fields']> = {
  app_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Page_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['page_min_fields'] = ResolversParentTypes['page_min_fields']> = {
  app_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Page_Mutation_ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['page_mutation_response'] = ResolversParentTypes['page_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['page']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['user'] = ResolversParentTypes['user']> = {
  apps?: Resolver<Array<ResolversTypes['app']>, ParentType, ContextType, RequireFields<UserAppsArgs, never>>;
  apps_aggregate?: Resolver<ResolversTypes['app_aggregate'], ParentType, ContextType, RequireFields<UserApps_AggregateArgs, never>>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  google_provider_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type User_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['user_aggregate'] = ResolversParentTypes['user_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['user_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['user']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type User_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['user_aggregate_fields'] = ResolversParentTypes['user_aggregate_fields']> = {
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<User_Aggregate_FieldsCountArgs, never>>;
  max?: Resolver<Maybe<ResolversTypes['user_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['user_min_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type User_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['user_max_fields'] = ResolversParentTypes['user_max_fields']> = {
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  google_provider_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type User_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['user_min_fields'] = ResolversParentTypes['user_min_fields']> = {
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  google_provider_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type User_Mutation_ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['user_mutation_response'] = ResolversParentTypes['user_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['user']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['uuid'], any> {
  name: 'uuid';
}

export type VertexResolvers<ContextType = any, ParentType extends ResolversParentTypes['vertex'] = ResolversParentTypes['vertex']> = {
  graph?: Resolver<Maybe<ResolversTypes['graph']>, ParentType, ContextType>;
  graph_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  props?: Resolver<ResolversTypes['jsonb'], ParentType, ContextType, RequireFields<VertexPropsArgs, never>>;
  type?: Resolver<ResolversTypes['vertex_type_enum'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Vertex_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['vertex_aggregate'] = ResolversParentTypes['vertex_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['vertex_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['vertex']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Vertex_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['vertex_aggregate_fields'] = ResolversParentTypes['vertex_aggregate_fields']> = {
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<Vertex_Aggregate_FieldsCountArgs, never>>;
  max?: Resolver<Maybe<ResolversTypes['vertex_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['vertex_min_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Vertex_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['vertex_max_fields'] = ResolversParentTypes['vertex_max_fields']> = {
  graph_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Vertex_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['vertex_min_fields'] = ResolversParentTypes['vertex_min_fields']> = {
  graph_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Vertex_Mutation_ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['vertex_mutation_response'] = ResolversParentTypes['vertex_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['vertex']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface Vertex_Type_EnumScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['vertex_type_enum'], any> {
  name: 'vertex_type_enum';
}

export type Resolvers<ContextType = any> = {
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  TypeOrmUser?: TypeOrmUserResolvers<ContextType>;
  IUser?: IUserResolvers<ContextType>;
  TypeOrmVertex?: TypeOrmVertexResolvers<ContextType>;
  IVertex?: IVertexResolvers<ContextType>;
  JSONObject?: GraphQLScalarType;
  TypeOrmEdge?: TypeOrmEdgeResolvers<ContextType>;
  IEdge?: IEdgeResolvers<ContextType>;
  GraphUseCaseDto?: GraphUseCaseDtoResolvers<ContextType>;
  UserUseCaseDto?: UserUseCaseDtoResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  app?: AppResolvers<ContextType>;
  app_aggregate?: App_AggregateResolvers<ContextType>;
  app_aggregate_fields?: App_Aggregate_FieldsResolvers<ContextType>;
  app_max_fields?: App_Max_FieldsResolvers<ContextType>;
  app_min_fields?: App_Min_FieldsResolvers<ContextType>;
  app_mutation_response?: App_Mutation_ResponseResolvers<ContextType>;
  edge?: EdgeResolvers<ContextType>;
  edge_aggregate?: Edge_AggregateResolvers<ContextType>;
  edge_aggregate_fields?: Edge_Aggregate_FieldsResolvers<ContextType>;
  edge_avg_fields?: Edge_Avg_FieldsResolvers<ContextType>;
  edge_max_fields?: Edge_Max_FieldsResolvers<ContextType>;
  edge_min_fields?: Edge_Min_FieldsResolvers<ContextType>;
  edge_mutation_response?: Edge_Mutation_ResponseResolvers<ContextType>;
  edge_stddev_fields?: Edge_Stddev_FieldsResolvers<ContextType>;
  edge_stddev_pop_fields?: Edge_Stddev_Pop_FieldsResolvers<ContextType>;
  edge_stddev_samp_fields?: Edge_Stddev_Samp_FieldsResolvers<ContextType>;
  edge_sum_fields?: Edge_Sum_FieldsResolvers<ContextType>;
  edge_var_pop_fields?: Edge_Var_Pop_FieldsResolvers<ContextType>;
  edge_var_samp_fields?: Edge_Var_Samp_FieldsResolvers<ContextType>;
  edge_variance_fields?: Edge_Variance_FieldsResolvers<ContextType>;
  graph?: GraphResolvers<ContextType>;
  graph_aggregate?: Graph_AggregateResolvers<ContextType>;
  graph_aggregate_fields?: Graph_Aggregate_FieldsResolvers<ContextType>;
  graph_max_fields?: Graph_Max_FieldsResolvers<ContextType>;
  graph_min_fields?: Graph_Min_FieldsResolvers<ContextType>;
  graph_mutation_response?: Graph_Mutation_ResponseResolvers<ContextType>;
  jsonb?: GraphQLScalarType;
  page?: PageResolvers<ContextType>;
  page_aggregate?: Page_AggregateResolvers<ContextType>;
  page_aggregate_fields?: Page_Aggregate_FieldsResolvers<ContextType>;
  page_max_fields?: Page_Max_FieldsResolvers<ContextType>;
  page_min_fields?: Page_Min_FieldsResolvers<ContextType>;
  page_mutation_response?: Page_Mutation_ResponseResolvers<ContextType>;
  user?: UserResolvers<ContextType>;
  user_aggregate?: User_AggregateResolvers<ContextType>;
  user_aggregate_fields?: User_Aggregate_FieldsResolvers<ContextType>;
  user_max_fields?: User_Max_FieldsResolvers<ContextType>;
  user_min_fields?: User_Min_FieldsResolvers<ContextType>;
  user_mutation_response?: User_Mutation_ResponseResolvers<ContextType>;
  uuid?: GraphQLScalarType;
  vertex?: VertexResolvers<ContextType>;
  vertex_aggregate?: Vertex_AggregateResolvers<ContextType>;
  vertex_aggregate_fields?: Vertex_Aggregate_FieldsResolvers<ContextType>;
  vertex_max_fields?: Vertex_Max_FieldsResolvers<ContextType>;
  vertex_min_fields?: Vertex_Min_FieldsResolvers<ContextType>;
  vertex_mutation_response?: Vertex_Mutation_ResponseResolvers<ContextType>;
  vertex_type_enum?: GraphQLScalarType;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;

export type EdgeFragmentFragment = (
  { __typename?: 'edge' }
  & Pick<Edge, 'id' | 'source' | 'target'>
);

export type GraphFragmentFragment = (
  { __typename?: 'graph' }
  & Pick<Graph, 'id' | 'label'>
);

export type GraphsQueryVariables = Exact<{ [key: string]: never; }>;


export type GraphsQuery = (
  { __typename?: 'Query' }
  & { graph: Array<(
    { __typename?: 'graph' }
    & { edges: Array<(
      { __typename?: 'edge' }
      & EdgeFragmentFragment
    )>, vertices: Array<(
      { __typename?: 'vertex' }
      & VertexFragmentFragment
    )> }
    & GraphFragmentFragment
  )> }
);

export type GraphQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GraphQuery = (
  { __typename?: 'Query' }
  & { graph_by_pk?: Maybe<(
    { __typename?: 'graph' }
    & Pick<Graph, 'id'>
    & { edges: Array<(
      { __typename?: 'edge' }
      & EdgeFragmentFragment
    )>, vertices: Array<(
      { __typename?: 'vertex' }
      & VertexFragmentFragment
    )> }
  )> }
);

export type CreateGraphMutationVariables = Exact<{
  input: Graph_Insert_Input;
}>;


export type CreateGraphMutation = (
  { __typename?: 'Mutation' }
  & { insert_graph_one?: Maybe<(
    { __typename?: 'graph' }
    & Pick<Graph, 'id'>
  )> }
);

export type VerticesQueryVariables = Exact<{ [key: string]: never; }>;


export type VerticesQuery = (
  { __typename?: 'Query' }
  & { vertex: Array<(
    { __typename?: 'vertex' }
    & VertexFragmentFragment
  )> }
);

export type VertexFragmentFragment = (
  { __typename?: 'vertex' }
  & Pick<Vertex, 'id' | 'type'>
);

export const EdgeFragmentFragmentDoc = gql`
    fragment edgeFragment on edge {
  id
  source
  target
}
    `;
export const GraphFragmentFragmentDoc = gql`
    fragment graphFragment on graph {
  id
  label
}
    `;
export const VertexFragmentFragmentDoc = gql`
    fragment vertexFragment on vertex {
  id
  type
}
    `;
export const GraphsDocument = gql`
    query graphs {
  graph {
    ...graphFragment
    edges {
      ...edgeFragment
    }
    vertices {
      ...vertexFragment
    }
  }
}
    ${GraphFragmentFragmentDoc}
${EdgeFragmentFragmentDoc}
${VertexFragmentFragmentDoc}`;

export const graphsWatchQuery = (options: Partial<WatchQueryOptions<GraphsQueryVariables, GraphsQuery>> = {}) => {
  return watchQuery<GraphsQuery, GraphsQueryVariables>(getApolloClient(), {
    query: GraphsDocument,
    context: {
      clientName: 'hasura',
    },
    ...options
  })
}
export const GraphDocument = gql`
    query graph($id: uuid!) {
  graph_by_pk(id: $id) {
    id
    edges {
      ...edgeFragment
    }
    vertices {
      ...vertexFragment
    }
  }
}
    ${EdgeFragmentFragmentDoc}
${VertexFragmentFragmentDoc}`;

export const graphWatchQuery = (options: Partial<WatchQueryOptions<GraphQueryVariables, GraphQuery>> = {}) => {
  return watchQuery<GraphQuery, GraphQueryVariables>(getApolloClient(), {
    query: GraphDocument,
    context: {
      clientName: 'hasura',
    },
    ...options
  })
}
export const CreateGraphDocument = gql`
    mutation createGraph($input: graph_insert_input!) {
  insert_graph_one(object: $input) {
    id
  }
}
    `;

export const createGraphMutate = (options: Partial<MutationOptions<CreateGraphMutation, CreateGraphMutationVariables>> = {}) => {
  return mutate<CreateGraphMutation, CreateGraphMutationVariables>(getApolloClient(), {
    mutation: CreateGraphDocument,
    context: {
      clientName: 'hasura',
    },
    ...options
  })
}
export const VerticesDocument = gql`
    query vertices {
  vertex {
    ...vertexFragment
  }
}
    ${VertexFragmentFragmentDoc}`;

export const verticesWatchQuery = (options: Partial<WatchQueryOptions<VerticesQueryVariables, VerticesQuery>> = {}) => {
  return watchQuery<VerticesQuery, VerticesQueryVariables>(getApolloClient(), {
    query: VerticesDocument,
    context: {
      clientName: 'hasura',
    },
    ...options
  })
}