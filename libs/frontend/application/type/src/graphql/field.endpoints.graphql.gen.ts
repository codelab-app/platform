import * as Types from '@codelab/shared/abstract/codegen';

import { FieldFragment } from '../../../../abstract/domain/src/type/fragments/field.fragment.graphql.gen';
import { GraphQLClient, RequestOptions } from 'graphql-request';
import { gql } from 'graphql-tag';
import { FieldFragmentDoc } from '../../../../abstract/domain/src/type/fragments/field.fragment.graphql.gen';
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
export type CreateFieldsMutationVariables = Types.Exact<{
  input: Array<Types.FieldCreateInput> | Types.FieldCreateInput;
}>;


export type CreateFieldsMutation = { createFields: { fields: Array<{ id: string }> } };

export type UpdateFieldsMutationVariables = Types.Exact<{
  where: Types.FieldWhere;
  update: Types.FieldUpdateInput;
}>;


export type UpdateFieldsMutation = { updateFields: { fields: Array<{ id: string }> } };

export type DeleteFieldsMutationVariables = Types.Exact<{
  where: Types.FieldWhere;
}>;


export type DeleteFieldsMutation = { deleteFields: { nodesDeleted: number } };

export type GetFieldsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.FieldWhere>;
  options?: Types.InputMaybe<Types.FieldOptions>;
}>;


export type GetFieldsQuery = { aggregate: { count: number }, items: Array<FieldFragment> };


export const CreateFieldsDocument = gql`
    mutation CreateFields($input: [FieldCreateInput!]!) {
  createFields(input: $input) {
    fields {
      id
    }
  }
}
    `;
export const UpdateFieldsDocument = gql`
    mutation UpdateFields($where: FieldWhere!, $update: FieldUpdateInput!) {
  updateFields(update: $update, where: $where) {
    fields {
      id
    }
  }
}
    `;
export const DeleteFieldsDocument = gql`
    mutation DeleteFields($where: FieldWhere!) {
  deleteFields(where: $where) {
    nodesDeleted
  }
}
    `;
export const GetFieldsDocument = gql`
    query GetFields($where: FieldWhere, $options: FieldOptions) {
  aggregate: fieldsAggregate(where: $where) {
    count
  }
  items: fields(options: $options, where: $where) {
    ...Field
  }
}
    ${FieldFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    CreateFields(variables: CreateFieldsMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateFieldsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateFieldsMutation>(CreateFieldsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateFields', 'mutation', variables);
    },
    UpdateFields(variables: UpdateFieldsMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateFieldsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateFieldsMutation>(UpdateFieldsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateFields', 'mutation', variables);
    },
    DeleteFields(variables: DeleteFieldsMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeleteFieldsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteFieldsMutation>(DeleteFieldsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteFields', 'mutation', variables);
    },
    GetFields(variables?: GetFieldsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetFieldsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetFieldsQuery>(GetFieldsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetFields', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;