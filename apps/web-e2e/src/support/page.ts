import {
  CreatePageInput,
  CreateResponse,
  GetPageInput,
} from '@codelab/frontend/abstract/codegen'
import type { PageFullFragment } from '@codelab/frontend/modules/page'
import { print } from 'graphql'
import {
  E2eCreatePageGql,
  E2eGetPageGql,
} from '../graphql/page.api.graphql.gen'

export const getPage = (input: GetPageInput) => {
  return cy
    .graphqlRequest({
      query: print(E2eGetPageGql),
      variables: { input },
    })
    .then((r) => r.body.data?.page as PageFullFragment)
}

export const defaultAppName = 'test'

export const createPage = (input: Partial<CreatePageInput>) => {
  return cy
    .graphqlRequest({
      query: print(E2eCreatePageGql),
      variables: {
        input: { appId: input.appId, name: input.name || defaultAppName },
      },
    })
    .then((r) => r.body.data?.createPage)
}

// should be use with createPageFromScratch
export const goToPageByAliasId = () => {
  let appId: string
  let pageId: string

  cy.get('@appId')
    .then((_appId) => {
      appId = String(_appId)
    })
    .get('@pageId')
    .then((_pageId) => {
      pageId = String(_pageId)
    })
    .then(() => {
      cy.visit(`/apps/${appId}/pages/${pageId}/builder`)
    })
}

export const createPageFromScratch = () => {
  return cy
    .createApp()
    .then((app: CreateResponse) => {
      console.log('app', app)

      const appId = app.id
      cy.wrap(appId).as('appId')

      return cy.createPage({ appId })
    })
    .then((page: CreateResponse) => {
      const pageId = page.id
      cy.wrap(pageId).as('pageId')

      return cy.getPage({ pageId })
    })
}

Cypress.Commands.add('createPageFromScratch', createPageFromScratch)
Cypress.Commands.add('goToPageByAliasId', goToPageByAliasId)
Cypress.Commands.add('createPage', createPage)
Cypress.Commands.add('getPage', getPage)
