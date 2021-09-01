import { CreateFieldMutationVariables } from '../graphql/CreateField.api.graphql'
import { CreateTypeMutationVariables } from '../graphql/CreateType.api.graphql'
import { GetFieldQueryVariables } from '../graphql/GetField.api.graphql'
import { GetTypeQueryVariables } from '../graphql/GetType.api.graphql'

export type SeedTypeInput = CreateTypeMutationVariables['input']
export type SeedFieldInput = CreateFieldMutationVariables['input']
export type TypeRef = SeedFieldInput['type']
export type GetFieldInput = GetFieldQueryVariables['input']
export type GetTypeInput = GetTypeQueryVariables['input']
