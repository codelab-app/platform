import { NextFetchOptions, ObjectLike } from '@codelab/shared-abstract-types';
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
/**
 * When you call server action in client component Next.js consider it as mutation and re-render the entire route segment
 */
export declare const gqlServerRequest: <TResult, TVariables extends ObjectLike>(document: DocumentTypeDecoration<TResult, TVariables>, variables: TVariables, next?: NextFetchOptions) => Promise<TResult>;
