import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'

export const CreateCodeActionsDocument = graphql(`
  mutation CreateCodeActions($input: [CodeActionCreateInput!]!) {
    createCodeActions(input: $input) {
      codeActions {
        __typename
        id
      }
    }
  }
`)

export const CreateApiActionsDocument = graphql(`
  mutation CreateApiActions($input: [ApiActionCreateInput!]!) {
    createApiActions(input: $input) {
      apiActions {
        __typename
        id
      }
    }
  }
`)
