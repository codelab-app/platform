import { FIELD_TYPE } from '@codelab/frontend/test/cypress/antd'
import type { IAppDto, IPageDto } from '@codelab/shared/abstract/core'
import { IPageKindName } from '@codelab/shared/abstract/core'
import { slugify } from '@codelab/shared/utils'
import { pageContentContainerName } from './provider-page-content-container.data'
import { setupTest } from './provider-page-content-container.setup'

describe('_app page content container', () => {
  let app: IAppDto
  let page: IPageDto

  before(() => {
    setupTest()
    cy.get<{ app: IAppDto; page: IPageDto }>('@setupComplete').then((res) => {
      app = res.app
      page = res.page
    })
  })

  it('should set card element as a container for child pages in the provider page', () => {
    cy.visit(
      `/apps/cypress/${slugify(app.name)}/pages/${slugify(
        IPageKindName.Provider,
      )}/builder`,
    )
    cy.get('.ant-tabs [aria-label="file"]').click()
    cy.get('.ant-tabs-tabpane-active form').setFormFieldValue({
      label: 'Page Content Container',
      type: FIELD_TYPE.SELECT,
      value: pageContentContainerName,
    })

    cy.waitForApiCalls()
  })

  it('should render the regular page element inside the selected page content container in the provider page', () => {
    cy.visit(`/apps/cypress/${slugify(app.name)}/pages/${slugify(page.name)}`)

    // check using css selector that the input element is rendered inside the card
    cy.get('#render-root .ant-card-body input').should('not.be.disabled')
  })
})
