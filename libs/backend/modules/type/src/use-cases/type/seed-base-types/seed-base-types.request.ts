import {
  WithCurrentUserRequest,
  WithTransactionRequest,
} from '@codelab/backend/abstract/core'

export type SeedBaseTypesRequest = WithCurrentUserRequest &
  WithTransactionRequest
