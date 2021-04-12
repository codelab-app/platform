/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type app_constraint = "apps_pkey" | "%future added value";
export type app_update_column = "id" | "name" | "user_id" | "%future added value";
export type atom_constraint = "vertices_pkey" | "%future added value";
export type atom_type_constraint = "vertexType_pkey" | "%future added value";
export type atom_type_enum = "React_Affix" | "React_Alert" | "React_Anchor" | "React_Anchor_Link" | "React_AutoComplete" | "React_Avatar" | "React_BackTop" | "React_Badge" | "React_Breadcrumb" | "React_Breadcrumb_Item" | "React_Button" | "React_Calendar" | "React_Card" | "React_Card_Grid" | "React_Card_Meta" | "React_Carousel" | "React_Cascader" | "React_Checkbox" | "React_Collapse" | "React_Collapse_Panel" | "React_Comment" | "React_ConfigProvider" | "React_DatePicker" | "React_Descriptions" | "React_Descriptions_Item" | "React_Divider" | "React_Drawer" | "React_Dropdown" | "React_Empty" | "React_Form" | "React_Form_Item" | "React_Form_ItemHook" | "React_Form_List" | "React_Fragment" | "React_Grid_Col" | "React_Grid_Row" | "React_Html_A" | "React_Html_Div" | "React_Html_P" | "React_Html_Span" | "React_Icon" | "React_Input" | "React_InputNumber" | "React_Layout" | "React_Layout_Content" | "React_Layout_Footer" | "React_Layout_Header" | "React_Layout_Sider" | "React_List" | "React_List_Item" | "React_List_Item_Meta" | "React_Mapper" | "React_Mentions" | "React_Mentions_Option" | "React_Menu" | "React_Menu_Item" | "React_Menu_ItemGroup" | "React_Menu_SubMenu" | "React_Modal" | "React_PageHeader" | "React_Page_Container" | "React_Pagination" | "React_Popconfirm" | "React_Popover" | "React_Progress" | "React_Provider" | "React_RGL_Container" | "React_RGL_Item" | "React_RGL_ResponsiveContainer" | "React_Radio" | "React_Radio_Group" | "React_Rate" | "React_RenderComponent" | "React_RenderContainer" | "React_Result" | "React_Select" | "React_Select_Option" | "React_Skeleton" | "React_Slider" | "React_Space" | "React_Spin" | "React_Statistic" | "React_Steps" | "React_Steps_Step" | "React_Switch" | "React_Table" | "React_Tabs" | "React_Tabs_TabPane" | "React_Tag" | "React_Text" | "React_TimePicker" | "React_Timeline" | "React_Timeline_Item" | "React_Tooltip" | "React_Transfer" | "React_Tree" | "React_TreeNode" | "React_TreeSelect" | "React_Typography" | "React_Typography_Paragraph" | "React_Typography_Text" | "React_Typography_Title" | "React_Upload" | "%future added value";
export type atom_type_update_column = "description" | "value" | "%future added value";
export type atom_update_column = "id" | "type" | "%future added value";
export type attribute_constraint = "attributes_pkey" | "%future added value";
export type attribute_update_column = "atom_type" | "id" | "key" | "value_type" | "%future added value";
export type component_constraint = "components_pkey" | "%future added value";
export type component_element_constraint = "component_elements_pkey" | "%future added value";
export type component_element_update_column = "atom_id" | "component_id" | "id" | "label" | "%future added value";
export type component_link_constraint = "vertex_edge_type_pkey" | "%future added value";
export type component_link_update_column = "category_id" | "component_id" | "id" | "order" | "props" | "source_element_id" | "target_element_id" | "%future added value";
export type component_update_column = "id" | "label" | "library_id" | "%future added value";
export type library_constraint = "libraries_pkey" | "%future added value";
export type library_update_column = "id" | "name" | "user_id" | "%future added value";
export type page_constraint = "pages_pkey" | "%future added value";
export type page_element_constraint = "elements_pkey" | "%future added value";
export type page_element_update_column = "component_id" | "id" | "name" | "page_id" | "%future added value";
export type page_link_constraint = "page_links_pkey" | "%future added value";
export type page_link_update_column = "id" | "order" | "page_id" | "props" | "source_element_id" | "target_element_id" | "%future added value";
export type page_update_column = "app_id" | "id" | "name" | "user_id" | "%future added value";
export type prop_constraint = "props_pkey" | "%future added value";
export type prop_element_constraint = "prop_element_pkey" | "%future added value";
export type prop_element_update_column = "element_id" | "prop_id" | "%future added value";
export type prop_update_column = "attribute_id" | "id" | "library_id" | "%future added value";
export type prop_value_constraint = "prop_values_pkey" | "%future added value";
export type prop_value_type_constraint = "prop_value_types_pkey" | "%future added value";
export type prop_value_type_enum = "Boolean" | "Lambda" | "Number" | "Prop" | "String" | "%future added value";
export type prop_value_type_update_column = "description" | "value" | "%future added value";
export type prop_value_update_column = "id" | "lambda_id" | "name" | "parent_prop_id" | "type" | "value" | "value_prop_id" | "%future added value";
export type user_constraint = "users_pkey" | "%future added value";
export type user_update_column = "id" | "name" | "%future added value";
export type app_insert_input = {
    id?: unknown | null;
    name?: string | null;
    pages?: page_arr_rel_insert_input | null;
    user?: user_obj_rel_insert_input | null;
    user_id?: string | null;
};
export type page_arr_rel_insert_input = {
    data: Array<page_insert_input>;
    on_conflict?: page_on_conflict | null;
};
export type page_insert_input = {
    app?: app_obj_rel_insert_input | null;
    app_id?: unknown | null;
    elements?: page_element_arr_rel_insert_input | null;
    id?: unknown | null;
    links?: page_link_arr_rel_insert_input | null;
    name?: string | null;
    user?: user_obj_rel_insert_input | null;
    user_id?: string | null;
};
export type app_obj_rel_insert_input = {
    data: app_insert_input;
    on_conflict?: app_on_conflict | null;
};
export type app_on_conflict = {
    constraint: app_constraint;
    update_columns: Array<app_update_column>;
    where?: app_bool_exp | null;
};
export type app_bool_exp = {
    _and?: Array<app_bool_exp> | null;
    _not?: app_bool_exp | null;
    _or?: Array<app_bool_exp> | null;
    id?: uuid_comparison_exp | null;
    name?: String_comparison_exp | null;
    pages?: page_bool_exp | null;
    user?: user_bool_exp | null;
    user_id?: String_comparison_exp | null;
};
export type uuid_comparison_exp = {
    _eq?: unknown | null;
    _gt?: unknown | null;
    _gte?: unknown | null;
    _in?: Array<unknown> | null;
    _is_null?: boolean | null;
    _lt?: unknown | null;
    _lte?: unknown | null;
    _neq?: unknown | null;
    _nin?: Array<unknown> | null;
};
export type String_comparison_exp = {
    _eq?: string | null;
    _gt?: string | null;
    _gte?: string | null;
    _ilike?: string | null;
    _in?: Array<string> | null;
    _iregex?: string | null;
    _is_null?: boolean | null;
    _like?: string | null;
    _lt?: string | null;
    _lte?: string | null;
    _neq?: string | null;
    _nilike?: string | null;
    _nin?: Array<string> | null;
    _niregex?: string | null;
    _nlike?: string | null;
    _nregex?: string | null;
    _nsimilar?: string | null;
    _regex?: string | null;
    _similar?: string | null;
};
export type page_bool_exp = {
    _and?: Array<page_bool_exp> | null;
    _not?: page_bool_exp | null;
    _or?: Array<page_bool_exp> | null;
    app?: app_bool_exp | null;
    app_id?: uuid_comparison_exp | null;
    elements?: page_element_bool_exp | null;
    id?: uuid_comparison_exp | null;
    links?: page_link_bool_exp | null;
    name?: String_comparison_exp | null;
    user?: user_bool_exp | null;
    user_id?: String_comparison_exp | null;
};
export type page_element_bool_exp = {
    _and?: Array<page_element_bool_exp> | null;
    _not?: page_element_bool_exp | null;
    _or?: Array<page_element_bool_exp> | null;
    component?: component_bool_exp | null;
    component_id?: uuid_comparison_exp | null;
    id?: uuid_comparison_exp | null;
    name?: String_comparison_exp | null;
    page?: page_bool_exp | null;
    page_id?: uuid_comparison_exp | null;
    props?: prop_element_bool_exp | null;
};
export type component_bool_exp = {
    _and?: Array<component_bool_exp> | null;
    _not?: component_bool_exp | null;
    _or?: Array<component_bool_exp> | null;
    elements?: component_element_bool_exp | null;
    id?: uuid_comparison_exp | null;
    label?: String_comparison_exp | null;
    library?: library_bool_exp | null;
    library_id?: uuid_comparison_exp | null;
    links?: component_link_bool_exp | null;
};
export type component_element_bool_exp = {
    _and?: Array<component_element_bool_exp> | null;
    _not?: component_element_bool_exp | null;
    _or?: Array<component_element_bool_exp> | null;
    atom?: atom_bool_exp | null;
    atom_id?: uuid_comparison_exp | null;
    component?: component_bool_exp | null;
    component_id?: uuid_comparison_exp | null;
    id?: uuid_comparison_exp | null;
    label?: String_comparison_exp | null;
};
export type atom_bool_exp = {
    _and?: Array<atom_bool_exp> | null;
    _not?: atom_bool_exp | null;
    _or?: Array<atom_bool_exp> | null;
    id?: uuid_comparison_exp | null;
    type?: atom_type_enum_comparison_exp | null;
};
export type atom_type_enum_comparison_exp = {
    _eq?: atom_type_enum | null;
    _in?: Array<atom_type_enum> | null;
    _is_null?: boolean | null;
    _neq?: atom_type_enum | null;
    _nin?: Array<atom_type_enum> | null;
};
export type library_bool_exp = {
    _and?: Array<library_bool_exp> | null;
    _not?: library_bool_exp | null;
    _or?: Array<library_bool_exp> | null;
    id?: uuid_comparison_exp | null;
    name?: String_comparison_exp | null;
    user_id?: String_comparison_exp | null;
};
export type component_link_bool_exp = {
    _and?: Array<component_link_bool_exp> | null;
    _not?: component_link_bool_exp | null;
    _or?: Array<component_link_bool_exp> | null;
    category_id?: uuid_comparison_exp | null;
    component_id?: uuid_comparison_exp | null;
    id?: uuid_comparison_exp | null;
    order?: Int_comparison_exp | null;
    props?: jsonb_comparison_exp | null;
    source_element_id?: uuid_comparison_exp | null;
    target_element_id?: uuid_comparison_exp | null;
};
export type Int_comparison_exp = {
    _eq?: number | null;
    _gt?: number | null;
    _gte?: number | null;
    _in?: Array<number> | null;
    _is_null?: boolean | null;
    _lt?: number | null;
    _lte?: number | null;
    _neq?: number | null;
    _nin?: Array<number> | null;
};
export type jsonb_comparison_exp = {
    _contained_in?: unknown | null;
    _contains?: unknown | null;
    _eq?: unknown | null;
    _gt?: unknown | null;
    _gte?: unknown | null;
    _has_key?: string | null;
    _has_keys_all?: Array<string> | null;
    _has_keys_any?: Array<string> | null;
    _in?: Array<unknown> | null;
    _is_null?: boolean | null;
    _lt?: unknown | null;
    _lte?: unknown | null;
    _neq?: unknown | null;
    _nin?: Array<unknown> | null;
};
export type prop_element_bool_exp = {
    _and?: Array<prop_element_bool_exp> | null;
    _not?: prop_element_bool_exp | null;
    _or?: Array<prop_element_bool_exp> | null;
    element?: page_element_bool_exp | null;
    element_id?: uuid_comparison_exp | null;
    prop?: prop_bool_exp | null;
    prop_id?: uuid_comparison_exp | null;
};
export type prop_bool_exp = {
    _and?: Array<prop_bool_exp> | null;
    _not?: prop_bool_exp | null;
    _or?: Array<prop_bool_exp> | null;
    attribute?: attribute_bool_exp | null;
    attribute_id?: uuid_comparison_exp | null;
    id?: uuid_comparison_exp | null;
    library?: library_bool_exp | null;
    library_id?: uuid_comparison_exp | null;
    values?: prop_value_bool_exp | null;
};
export type attribute_bool_exp = {
    _and?: Array<attribute_bool_exp> | null;
    _not?: attribute_bool_exp | null;
    _or?: Array<attribute_bool_exp> | null;
    atomType?: atom_type_bool_exp | null;
    atom_type?: atom_type_enum_comparison_exp | null;
    id?: uuid_comparison_exp | null;
    key?: String_comparison_exp | null;
    valueType?: prop_value_type_bool_exp | null;
    value_type?: prop_value_type_enum_comparison_exp | null;
};
export type atom_type_bool_exp = {
    _and?: Array<atom_type_bool_exp> | null;
    _not?: atom_type_bool_exp | null;
    _or?: Array<atom_type_bool_exp> | null;
    description?: String_comparison_exp | null;
    value?: String_comparison_exp | null;
};
export type prop_value_type_bool_exp = {
    _and?: Array<prop_value_type_bool_exp> | null;
    _not?: prop_value_type_bool_exp | null;
    _or?: Array<prop_value_type_bool_exp> | null;
    description?: String_comparison_exp | null;
    value?: String_comparison_exp | null;
};
export type prop_value_type_enum_comparison_exp = {
    _eq?: prop_value_type_enum | null;
    _in?: Array<prop_value_type_enum> | null;
    _is_null?: boolean | null;
    _neq?: prop_value_type_enum | null;
    _nin?: Array<prop_value_type_enum> | null;
};
export type prop_value_bool_exp = {
    _and?: Array<prop_value_bool_exp> | null;
    _not?: prop_value_bool_exp | null;
    _or?: Array<prop_value_bool_exp> | null;
    id?: uuid_comparison_exp | null;
    lambda_id?: uuid_comparison_exp | null;
    name?: String_comparison_exp | null;
    parent_prop_id?: uuid_comparison_exp | null;
    type?: prop_value_type_enum_comparison_exp | null;
    value?: String_comparison_exp | null;
    value_prop_id?: uuid_comparison_exp | null;
};
export type page_link_bool_exp = {
    _and?: Array<page_link_bool_exp> | null;
    _not?: page_link_bool_exp | null;
    _or?: Array<page_link_bool_exp> | null;
    id?: uuid_comparison_exp | null;
    order?: Int_comparison_exp | null;
    page_id?: uuid_comparison_exp | null;
    props?: jsonb_comparison_exp | null;
    source_element_id?: uuid_comparison_exp | null;
    target_element_id?: uuid_comparison_exp | null;
};
export type user_bool_exp = {
    _and?: Array<user_bool_exp> | null;
    _not?: user_bool_exp | null;
    _or?: Array<user_bool_exp> | null;
    apps?: app_bool_exp | null;
    id?: String_comparison_exp | null;
    name?: String_comparison_exp | null;
};
export type page_element_arr_rel_insert_input = {
    data: Array<page_element_insert_input>;
    on_conflict?: page_element_on_conflict | null;
};
export type page_element_insert_input = {
    component?: component_obj_rel_insert_input | null;
    component_id?: unknown | null;
    id?: unknown | null;
    name?: string | null;
    page?: page_obj_rel_insert_input | null;
    page_id?: unknown | null;
    props?: prop_element_arr_rel_insert_input | null;
};
export type component_obj_rel_insert_input = {
    data: component_insert_input;
    on_conflict?: component_on_conflict | null;
};
export type component_insert_input = {
    elements?: component_element_arr_rel_insert_input | null;
    id?: unknown | null;
    label?: string | null;
    library?: library_obj_rel_insert_input | null;
    library_id?: unknown | null;
    links?: component_link_arr_rel_insert_input | null;
};
export type component_element_arr_rel_insert_input = {
    data: Array<component_element_insert_input>;
    on_conflict?: component_element_on_conflict | null;
};
export type component_element_insert_input = {
    atom?: atom_obj_rel_insert_input | null;
    atom_id?: unknown | null;
    component?: component_obj_rel_insert_input | null;
    component_id?: unknown | null;
    id?: unknown | null;
    label?: string | null;
};
export type atom_obj_rel_insert_input = {
    data: atom_insert_input;
    on_conflict?: atom_on_conflict | null;
};
export type atom_insert_input = {
    id?: unknown | null;
    type?: atom_type_enum | null;
};
export type atom_on_conflict = {
    constraint: atom_constraint;
    update_columns: Array<atom_update_column>;
    where?: atom_bool_exp | null;
};
export type component_element_on_conflict = {
    constraint: component_element_constraint;
    update_columns: Array<component_element_update_column>;
    where?: component_element_bool_exp | null;
};
export type library_obj_rel_insert_input = {
    data: library_insert_input;
    on_conflict?: library_on_conflict | null;
};
export type library_insert_input = {
    id?: unknown | null;
    name?: string | null;
    user_id?: string | null;
};
export type library_on_conflict = {
    constraint: library_constraint;
    update_columns: Array<library_update_column>;
    where?: library_bool_exp | null;
};
export type component_link_arr_rel_insert_input = {
    data: Array<component_link_insert_input>;
    on_conflict?: component_link_on_conflict | null;
};
export type component_link_insert_input = {
    category_id?: unknown | null;
    component_id?: unknown | null;
    id?: unknown | null;
    order?: number | null;
    props?: unknown | null;
    source_element_id?: unknown | null;
    target_element_id?: unknown | null;
};
export type component_link_on_conflict = {
    constraint: component_link_constraint;
    update_columns: Array<component_link_update_column>;
    where?: component_link_bool_exp | null;
};
export type component_on_conflict = {
    constraint: component_constraint;
    update_columns: Array<component_update_column>;
    where?: component_bool_exp | null;
};
export type page_obj_rel_insert_input = {
    data: page_insert_input;
    on_conflict?: page_on_conflict | null;
};
export type page_on_conflict = {
    constraint: page_constraint;
    update_columns: Array<page_update_column>;
    where?: page_bool_exp | null;
};
export type prop_element_arr_rel_insert_input = {
    data: Array<prop_element_insert_input>;
    on_conflict?: prop_element_on_conflict | null;
};
export type prop_element_insert_input = {
    element?: page_element_obj_rel_insert_input | null;
    element_id?: unknown | null;
    prop?: prop_obj_rel_insert_input | null;
    prop_id?: unknown | null;
};
export type page_element_obj_rel_insert_input = {
    data: page_element_insert_input;
    on_conflict?: page_element_on_conflict | null;
};
export type page_element_on_conflict = {
    constraint: page_element_constraint;
    update_columns: Array<page_element_update_column>;
    where?: page_element_bool_exp | null;
};
export type prop_obj_rel_insert_input = {
    data: prop_insert_input;
    on_conflict?: prop_on_conflict | null;
};
export type prop_insert_input = {
    attribute?: attribute_obj_rel_insert_input | null;
    attribute_id?: unknown | null;
    id?: unknown | null;
    library?: library_obj_rel_insert_input | null;
    library_id?: unknown | null;
    values?: prop_value_arr_rel_insert_input | null;
};
export type attribute_obj_rel_insert_input = {
    data: attribute_insert_input;
    on_conflict?: attribute_on_conflict | null;
};
export type attribute_insert_input = {
    atomType?: atom_type_obj_rel_insert_input | null;
    atom_type?: atom_type_enum | null;
    id?: unknown | null;
    key?: string | null;
    valueType?: prop_value_type_obj_rel_insert_input | null;
    value_type?: prop_value_type_enum | null;
};
export type atom_type_obj_rel_insert_input = {
    data: atom_type_insert_input;
    on_conflict?: atom_type_on_conflict | null;
};
export type atom_type_insert_input = {
    description?: string | null;
    value?: string | null;
};
export type atom_type_on_conflict = {
    constraint: atom_type_constraint;
    update_columns: Array<atom_type_update_column>;
    where?: atom_type_bool_exp | null;
};
export type prop_value_type_obj_rel_insert_input = {
    data: prop_value_type_insert_input;
    on_conflict?: prop_value_type_on_conflict | null;
};
export type prop_value_type_insert_input = {
    description?: string | null;
    value?: string | null;
};
export type prop_value_type_on_conflict = {
    constraint: prop_value_type_constraint;
    update_columns: Array<prop_value_type_update_column>;
    where?: prop_value_type_bool_exp | null;
};
export type attribute_on_conflict = {
    constraint: attribute_constraint;
    update_columns: Array<attribute_update_column>;
    where?: attribute_bool_exp | null;
};
export type prop_value_arr_rel_insert_input = {
    data: Array<prop_value_insert_input>;
    on_conflict?: prop_value_on_conflict | null;
};
export type prop_value_insert_input = {
    id?: unknown | null;
    lambda_id?: unknown | null;
    name?: string | null;
    parent_prop_id?: unknown | null;
    type?: prop_value_type_enum | null;
    value?: string | null;
    value_prop_id?: unknown | null;
};
export type prop_value_on_conflict = {
    constraint: prop_value_constraint;
    update_columns: Array<prop_value_update_column>;
    where?: prop_value_bool_exp | null;
};
export type prop_on_conflict = {
    constraint: prop_constraint;
    update_columns: Array<prop_update_column>;
    where?: prop_bool_exp | null;
};
export type prop_element_on_conflict = {
    constraint: prop_element_constraint;
    update_columns: Array<prop_element_update_column>;
    where?: prop_element_bool_exp | null;
};
export type page_link_arr_rel_insert_input = {
    data: Array<page_link_insert_input>;
    on_conflict?: page_link_on_conflict | null;
};
export type page_link_insert_input = {
    id?: unknown | null;
    order?: number | null;
    page_id?: unknown | null;
    props?: unknown | null;
    source_element_id?: unknown | null;
    target_element_id?: unknown | null;
};
export type page_link_on_conflict = {
    constraint: page_link_constraint;
    update_columns: Array<page_link_update_column>;
    where?: page_link_bool_exp | null;
};
export type user_obj_rel_insert_input = {
    data: user_insert_input;
    on_conflict?: user_on_conflict | null;
};
export type user_insert_input = {
    apps?: app_arr_rel_insert_input | null;
    id?: string | null;
    name?: string | null;
};
export type app_arr_rel_insert_input = {
    data: Array<app_insert_input>;
    on_conflict?: app_on_conflict | null;
};
export type user_on_conflict = {
    constraint: user_constraint;
    update_columns: Array<user_update_column>;
    where?: user_bool_exp | null;
};
export type CreateApp_MutationVariables = {
    data: app_insert_input;
};
export type CreateApp_MutationResponse = {
    readonly insert_app_one: {
        readonly " $fragmentRefs": FragmentRefs<"AppFragment_app">;
    } | null;
};
export type CreateApp_Mutation = {
    readonly response: CreateApp_MutationResponse;
    readonly variables: CreateApp_MutationVariables;
};



/*
mutation CreateApp_Mutation(
  $data: app_insert_input!
) {
  insert_app_one(object: $data) {
    ...AppFragment_app
    id
  }
}

fragment AppFragment_app on app {
  id
  name
  pages {
    ...PageFragment_page
    id
  }
}

fragment PageFragment_page on page {
  id
  name
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "data"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "object",
    "variableName": "data"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateApp_Mutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "app",
        "kind": "LinkedField",
        "name": "insert_app_one",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AppFragment_app"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateApp_Mutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "app",
        "kind": "LinkedField",
        "name": "insert_app_one",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "page",
            "kind": "LinkedField",
            "name": "pages",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "389bdf31f43e31fc33afed966d8e5f9d",
    "id": null,
    "metadata": {},
    "name": "CreateApp_Mutation",
    "operationKind": "mutation",
    "text": "mutation CreateApp_Mutation(\n  $data: app_insert_input!\n) {\n  insert_app_one(object: $data) {\n    ...AppFragment_app\n    id\n  }\n}\n\nfragment AppFragment_app on app {\n  id\n  name\n  pages {\n    ...PageFragment_page\n    id\n  }\n}\n\nfragment PageFragment_page on page {\n  id\n  name\n}\n"
  }
};
})();
(node as any).hash = '206a8e6a2cac29a02839dbf7b40ce9e6';
export default node;
