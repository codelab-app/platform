import { Seeder_CreateFieldMutationVariables } from '../graphql/CreateField.api.graphql.gen'
import { Seeder_CreateTypeMutationVariables } from '../graphql/CreateType.api.graphql.gen'
import { Seeder_GetFieldQueryVariables } from '../graphql/GetField.api.graphql.gen'
import { Seeder_GetTypeQueryVariables } from '../graphql/GetType.api.graphql.gen'

export type SeedTypeInput = Seeder_CreateTypeMutationVariables['input']
export type SeedFieldInput = Seeder_CreateFieldMutationVariables['input']
export type TypeRef = SeedFieldInput['type']
export type GetFieldInput = Seeder_GetFieldQueryVariables['input']
export type GetTypeInput = Seeder_GetTypeQueryVariables['input']
