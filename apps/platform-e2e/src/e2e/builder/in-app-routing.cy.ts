import type { App } from '@codelab/shared/abstract/codegen'
import type { IAppDto, IPage, IPageDto } from '@codelab/shared/abstract/core'
import { IPageKind, IPageKindName } from '@codelab/shared/abstract/core'
import { findOrFail, slugify } from '@codelab/shared/utils'
import { buildTestData } from './in-app-routing.data'

const TestPageText = 'this is the test page'
const DynamicPageText = 'this is the dynamic page'
const GoToTestPageText = 'go to test page'
const GoToDynamicPageText = 'go to dynamic page'
const dynamicUrlFirstSegmentKey = 'testId'
const dynamicUrlFirstSegment = 'first-url-segment'
const dynamicUrlSecondSegmentKey = 'subtestId'
const dynamicUrlSecondSegment = 'second-url-segment'

const setupTest = () => {
  let app: IAppDto
  let providerPage: IPageDto

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
    const {
      dynamicPageCreateData,
      dynamicPageTextElementCreateData,
      providerPageLinkElementCreateData,
      staticPageCreateData,
      staticPageLinkElementCreateData,
      staticPageTextElementCreateData,
    } = buildTestData(app)

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

  cy.get('@providerPageLinkElementCreated')
    .get('@staticPageElementsCreated')
    .get('@dynamicPageContentElementCreated')
    .then(() => {
      cy.visit(
        `/apps/cypress/${slugify(app.name)}/pages/${slugify(
          IPageKindName.Provider,
        )}`,
      )
    })
}

describe('Routing between app pages within the builder', () => {
  before(() => {
    setupTest()
  })

  // Skip this for now until we re-worked the routing within the builder preview
  it('should navigate to /test-page of the app within the builder when NextLink in the provider is clicked', () => {
    cy.get('#render-root').contains(GoToTestPageText).click()
    cy.contains(TestPageText).should('exist')
  })

  // Skip this for now until we re-worked the routing within the builder preview
  it('should navigate to the dynamic page within the builder when NextLink in the /test-page is clicked', () => {
    cy.get('#render-root').contains(GoToDynamicPageText).click()
    cy.findByText(
      `${DynamicPageText} - ${dynamicUrlFirstSegmentKey}: "${dynamicUrlFirstSegment}", ${dynamicUrlSecondSegmentKey}: "${dynamicUrlSecondSegment}"`,
    ).should('exist')
  })
})
