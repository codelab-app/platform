import { ObjectLike } from '@codelab/shared-abstract-types';
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
import { GraphQLClient } from 'graphql-request';
export declare const gqlRequest: <TResult, TVariables extends ObjectLike>(client: GraphQLClient, document: DocumentTypeDecoration<TResult, TVariables>, variables: TVariables) => Promise<TResult>;
