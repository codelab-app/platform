/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

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
    "\n  query AppList_query($options: AppOptions, $where: AppWhere) {\n    ...AppList_queryFragment\n    # atoms(where: { type: ReactFragment }) {\n    #   ...AtomDevelopment\n    # }\n  }\n": types.AppList_QueryDocument,
    "\n  fragment AppList_queryFragment on Query {\n    apps(options: $options, where: $where) {\n      id\n      ...AppListItem_appFragment\n    }\n  }\n": types.AppList_QueryFragmentFragmentDoc,
    "\n  fragment AppListItem_appFragment on App {\n    id\n    name\n    slug\n    domains {\n      id\n      domainConfig {\n        misconfigured\n      }\n    }\n    ...DomainList_appFragment\n    pages {\n      slug\n    }\n  }\n": types.AppListItem_AppFragmentFragmentDoc,
    "\n  fragment DomainListItem_domainFragment on Domain {\n    id\n    name\n    domainConfig {\n      misconfigured\n    }\n  }\n": types.DomainListItem_DomainFragmentFragmentDoc,
    "\n  fragment DomainList_appFragment on App {\n    domains {\n      id\n      ...DomainListItem_domainFragment\n    }\n  }\n": types.DomainList_AppFragmentFragmentDoc,
    "\n  mutation CreateApps($input: [AppCreateInput!]!) {\n    createApps(input: $input) {\n      apps {\n        id\n      }\n    }\n  }\n": types.CreateAppsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AppList_query($options: AppOptions, $where: AppWhere) {\n    ...AppList_queryFragment\n    # atoms(where: { type: ReactFragment }) {\n    #   ...AtomDevelopment\n    # }\n  }\n"): (typeof documents)["\n  query AppList_query($options: AppOptions, $where: AppWhere) {\n    ...AppList_queryFragment\n    # atoms(where: { type: ReactFragment }) {\n    #   ...AtomDevelopment\n    # }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment AppList_queryFragment on Query {\n    apps(options: $options, where: $where) {\n      id\n      ...AppListItem_appFragment\n    }\n  }\n"): (typeof documents)["\n  fragment AppList_queryFragment on Query {\n    apps(options: $options, where: $where) {\n      id\n      ...AppListItem_appFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment AppListItem_appFragment on App {\n    id\n    name\n    slug\n    domains {\n      id\n      domainConfig {\n        misconfigured\n      }\n    }\n    ...DomainList_appFragment\n    pages {\n      slug\n    }\n  }\n"): (typeof documents)["\n  fragment AppListItem_appFragment on App {\n    id\n    name\n    slug\n    domains {\n      id\n      domainConfig {\n        misconfigured\n      }\n    }\n    ...DomainList_appFragment\n    pages {\n      slug\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment DomainListItem_domainFragment on Domain {\n    id\n    name\n    domainConfig {\n      misconfigured\n    }\n  }\n"): (typeof documents)["\n  fragment DomainListItem_domainFragment on Domain {\n    id\n    name\n    domainConfig {\n      misconfigured\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment DomainList_appFragment on App {\n    domains {\n      id\n      ...DomainListItem_domainFragment\n    }\n  }\n"): (typeof documents)["\n  fragment DomainList_appFragment on App {\n    domains {\n      id\n      ...DomainListItem_domainFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateApps($input: [AppCreateInput!]!) {\n    createApps(input: $input) {\n      apps {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateApps($input: [AppCreateInput!]!) {\n    createApps(input: $input) {\n      apps {\n        id\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;