import * as Types from '@codelab/shared/abstract/codegen';

import { AtomFragment } from '../../../../abstract/domain/src/atom/atom.fragment.graphql.gen';
import { GraphQLClient, RequestOptions } from 'graphql-request';
import { gql } from 'graphql-tag';
import { AtomFragmentDoc } from '../../../../abstract/domain/src/atom/atom.fragment.graphql.gen';
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
export type CreateAtomsMutationVariables = Types.Exact<{
  input: Array<Types.AtomCreateInput> | Types.AtomCreateInput;
}>;


export type CreateAtomsMutation = { createAtoms: { atoms: Array<{ id: string }>, info: { nodesCreated: number, relationshipsCreated: number } } };

export type DeleteAtomsMutationVariables = Types.Exact<{
  where: Types.AtomWhere;
}>;


export type DeleteAtomsMutation = { deleteAtoms: { nodesDeleted: number, relationshipsDeleted: number } };

export type GetAtomsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.AtomWhere>;
  options?: Types.InputMaybe<Types.AtomOptions>;
}>;


export type GetAtomsQuery = { aggregate: { count: number }, items: Array<AtomFragment> };

export type UpdateAtomsMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.AtomWhere>;
  update?: Types.InputMaybe<Types.AtomUpdateInput>;
}>;


export type UpdateAtomsMutation = { updateAtoms: { atoms: Array<{ id: string }> } };


export const CreateAtomsDocument = gql`
    mutation CreateAtoms($input: [AtomCreateInput!]!) {
  createAtoms(input: $input) {
    atoms {
      id
    }
    info {
      nodesCreated
      relationshipsCreated
    }
  }
}
    `;
export const DeleteAtomsDocument = gql`
    mutation DeleteAtoms($where: AtomWhere!) {
  deleteAtoms(where: $where) {
    nodesDeleted
    relationshipsDeleted
  }
}
    `;
export const GetAtomsDocument = gql`
    query GetAtoms($where: AtomWhere, $options: AtomOptions) {
  aggregate: atomsAggregate(where: $where) {
    count
  }
  items: atoms(options: $options, where: $where) {
    ...Atom
  }
}
    ${AtomFragmentDoc}`;
export const UpdateAtomsDocument = gql`
    mutation UpdateAtoms($where: AtomWhere, $update: AtomUpdateInput) {
  updateAtoms(update: $update, where: $where) {
    atoms {
      id
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    CreateAtoms(variables: CreateAtomsMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateAtomsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateAtomsMutation>(CreateAtomsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateAtoms', 'mutation', variables);
    },
    DeleteAtoms(variables: DeleteAtomsMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeleteAtomsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteAtomsMutation>(DeleteAtomsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteAtoms', 'mutation', variables);
    },
    GetAtoms(variables?: GetAtomsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAtomsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAtomsQuery>(GetAtomsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAtoms', 'query', variables);
    },
    UpdateAtoms(variables?: UpdateAtomsMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateAtomsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateAtomsMutation>(UpdateAtomsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateAtoms', 'mutation', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;