import { print } from 'graphql'
import {
  CreatePageGql,
  CreatePageMutationVariables,
} from './graphql/CreatePage.api.graphql.gen'
import {
  GetPageGql,
  GetPageQueryVariables,
} from './graphql/GetPage.api.graphql.gen'

type GetPageInput = GetPageQueryVariables['input']

export const getPage = (input: GetPageInput) => {
  return cy
    .graphqlRequest({
      query: print(GetPageGql),
      variables: { input },
    })
    .then((r) => r.body.data?.page)
}

type CreatePageInput = CreatePageMutationVariables['input']

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
