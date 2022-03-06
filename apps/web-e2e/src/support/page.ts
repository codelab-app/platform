import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import { PageCreateInput, PageWhere } from '@codelab/shared/abstract/codegen-v2'
import { IApp, IPage } from '@codelab/shared/abstract/core'
import { print } from 'graphql'
import {
  E2eCreatePageDocument,
  E2eGetPageDocument,
} from '../graphql/page.api.v2.1.graphql.gen'

export const getPages = (input: PageWhere) => {
  return cy
    .graphqlRequest({
      query: print(E2eGetPageDocument),
      variables: { input },
    })
    .then((r) => r.body.data?.pages as Array<IPage>)
}

const defaultPageInput: PageCreateInput = {
  name: 'Test Page',
  rootElement: { create: { node: { name: ROOT_ELEMENT_NAME } } },
}

export const createPage = (
  input: Partial<PageCreateInput> = defaultPageInput,
) => {
  return cy
    .graphqlRequest({
      query: print(E2eCreatePageDocument),
      variables: { input },
    })
    .then((r) => r.body.data?.createPages.pages as Array<IPage>)
}

// should be use with createPageFromScratch
export const goToPageByAliasId = () => {
  let appId: string
  let pageId: string

  return cy
    .get('@appId')
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
    .then((apps: Array<IApp>) => {
      console.log('app', apps[0])

      const appId = apps[0]?.id
      cy.wrap(appId).as('appId')

      return cy.createPage({
        app: { connect: { where: { node: { id: appId } } } },
        name: 'test',
      })
    })
    .then((page: Array<IPage>) => {
      const pageId = page[0]?.id
      cy.wrap(pageId).as('pageId')

      return cy.getPage({ id: pageId })
    })
}

Cypress.Commands.add('createPageFromScratch', createPageFromScratch)
Cypress.Commands.add('goToPageByAliasId', goToPageByAliasId)
Cypress.Commands.add('createPage', createPage)
Cypress.Commands.add('getPage', getPages)
