import {
  CreateAppsDocument,
  type CreateAppsMutationVariables,
} from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'

export const createAppApi = (variables: CreateAppsMutationVariables) =>
  gqlFetch(CreateAppsDocument, variables)
