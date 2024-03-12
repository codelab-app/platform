import type { App } from '@codelab/shared/abstract/codegen'
import type { IAppDto, IPage, IPageDto } from '@codelab/shared/abstract/core'
import { IPageKind, IPageKindName } from '@codelab/shared/abstract/core'
import { findOrFail, slugify } from '@codelab/shared/utils'
import {
  buildTestPages,
  dynamicPageTextElementCreateData,
  providerPageLinkElementCreateData,
  staticPageLinkElementCreateData,
  staticPageTextElementCreateData,
  testUrlProps,
} from './in-app-routing.data'

let app: IAppDto
let providerPage: IPageDto

const setupTest = () => {
  cy.postApiRequest<App>('/app/seed-cypress-app')
    .then(({ body }) => {
      app = body

      providerPage = findOrFail(
        app.pages,
        (_page) => _page.kind === IPageKind.Provider,
      )
    })
    .as('appCreated')

  cy.get('@appCreated').then(() => {
    const { dynamicPageCreateData, staticPageCreateData } = buildTestPages(app)

    cy.postApiRequest(`/element/${providerPage.id}/create-element`, {
      ...providerPageLinkElementCreateData,
      parentElement: { id: providerPage.rootElement.id },
    }).as('providerPageLinkElementCreated')

    cy.postApiRequest('/page/create-page', staticPageCreateData).as(
      'staticPageCreated',
    )

    cy.get<Cypress.Response<IPage>>('@staticPageCreated').then(
      ({ body: staticPage }) => {
        cy.postApiRequest(`/element/${staticPage.id}/create-elements`, [
          {
            ...staticPageTextElementCreateData,
            parentElement: { id: staticPage.rootElement.id },
          },
          staticPageLinkElementCreateData,
        ]).as('staticPageElementsCreated')
      },
    )

    cy.postApiRequest('/page/create-page', dynamicPageCreateData).as(
      'dynamicPageCreated',
    )

    cy.get<Cypress.Response<IPage>>('@dynamicPageCreated').then(
      ({ body: dynamicPage }) => {
        cy.postApiRequest(`/element/${dynamicPage.id}/create-element`, {
          ...dynamicPageTextElementCreateData,
          parentElement: { id: dynamicPage.rootElement.id },
        }).as('dynamicPageContentElementCreated')
      },
    )
  })

  return cy
    .get('@providerPageLinkElementCreated')
    .get('@staticPageElementsCreated')
    .get('@dynamicPageContentElementCreated')
}

describe('In-app navigation between app pages', () => {
  before(() => {
    setupTest()
  })

  describe('Preview Mode', () => {
    before(() => {
      cy.visit(
        `/apps/cypress/${slugify(app.name)}/pages/${slugify(
          IPageKindName.Provider,
        )}`,
      )
    })
    it('should navigate to the static page when NextLink in the _app is clicked', () => {
      cy.get('#render-root')
        .contains(providerPageLinkElementCreateData.propsData?.customText)
        .click()
      cy.contains(staticPageTextElementCreateData.propsData?.customText).should(
        'exist',
      )
    })

    it('should navigate to the dynamic page when NextLink in the static page is clicked', () => {
      cy.get('#render-root')
        .contains(staticPageLinkElementCreateData.propsData?.customText)
        .click()
      cy.findByText(
        `testId: "${testUrlProps.testId}", subtestId: "${testUrlProps.subtestId}"`,
      ).should('exist')
    })
  })

  describe('Builder Mode', () => {
    before(() => {
      cy.visit(
        `/apps/cypress/${slugify(app.name)}/pages/${slugify(
          IPageKindName.Provider,
        )}/builder`,
      )
    })
    it('should disable navigation', () => {
      cy.get('#render-root')
        .contains(providerPageLinkElementCreateData.propsData?.customText)
        .click()

      // No navigation should occur. Give it some time to navigate and check if the text is still there.
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(2000)
      cy.contains(
        providerPageLinkElementCreateData.propsData?.customText,
      ).should('exist')
      cy.contains(staticPageTextElementCreateData.propsData?.customText).should(
        'not.exist',
      )
    })
  })
})
