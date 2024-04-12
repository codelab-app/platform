import type { IAppDto } from '@codelab/shared/abstract/core'
import { IPageKindName } from '@codelab/shared/abstract/core'
import { slugify } from '@codelab/shared/utils'
import {
  providerPageLinkElementCreateData,
  staticPageLinkElementCreateData,
  staticPageTextElementCreateData,
  testUrlProps,
} from './in-app-routing.data'
import { setupTest } from './in-app-routing.setup'

describe('In-app navigation between app pages', () => {
  let app: IAppDto

  before(() => {
    setupTest()

    cy.get<{ app: IAppDto }>('@setupComplete').then((res) => {
      app = res.app
    })
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
        .contains(providerPageLinkElementCreateData.propsData?.children)
        .click()
      cy.contains(staticPageTextElementCreateData.propsData?.children).should(
        'exist',
      )
    })

    it('should navigate to the dynamic page when NextLink in the static page is clicked', () => {
      cy.get('#render-root')
        .contains(staticPageLinkElementCreateData.propsData?.children)
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
        .contains(providerPageLinkElementCreateData.propsData?.children)
        .click()

      // No navigation should occur. Give it some time to navigate and check if the text is still there.
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(2000)
      cy.contains(providerPageLinkElementCreateData.propsData?.children).should(
        'exist',
      )
      cy.contains(staticPageTextElementCreateData.propsData?.children).should(
        'not.exist',
      )
    })
  })
})
