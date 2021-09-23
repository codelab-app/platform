import { CreatePageGql, GetPageGql } from '@codelab/frontend/modules/page'
import { CreatePageInput, GetPageInput } from '@codelab/shared/codegen/graphql'
import { print } from 'graphql'

export const getPage = (input: GetPageInput) => {
  return cy
    .graphqlRequest({
      query: print(GetPageGql),
      variables: { input },
    })
    .then((r) => r.body.data?.page)
}

export const createPage = (input: CreatePageInput) => {
  return cy
    .graphqlRequest({
      query: print(CreatePageGql),
      variables: { input },
    })
    .then((r) => r.body.data?.createPage)
}

Cypress.Commands.add('createPage', createPage)
Cypress.Commands.add('getPage', getPage)
