import type { App } from '@codelab/shared/abstract/codegen'
import type { IAppDto } from '@codelab/shared/abstract/core'
import { IAtomType, IPageKindName } from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { slugify } from '@codelab/shared/utils'

const CONVERT_TO_COMPONENT_TEXT = 'Convert To Component'
const ELEMENT_CONTAINER = 'Element Abc'
const ELEMENT_ROW = 'Row'
const ELEMENT_COL_A = 'Col A'
const ELEMENT_TEXT_1 = 'Text 1'

const elements = [
  {
    atom: IAtomType.ReactFragment,
    name: ELEMENT_CONTAINER,
    parentElement: ROOT_ELEMENT_NAME,
  },
  {
    atom: IAtomType.ReactFragment,
    name: ELEMENT_ROW,
    parentElement: ELEMENT_CONTAINER,
  },
  {
    atom: IAtomType.AntDesignGridCol,
    name: ELEMENT_COL_A,
    parentElement: ELEMENT_ROW,
  },
  {
    atom: IAtomType.AntDesignTypographyText,
    name: ELEMENT_TEXT_1,
    parentElement: ELEMENT_COL_A,
  },
]

describe('Converting an element to a component', () => {
  let app: IAppDto

  before(() => {
    cy.postApiRequest<App>('/app/seed-cypress-app').then(
      ({ body }) => (app = body),
    )
  })
  it('should convert the element into a component and create an instance of it', () => {
    cy.visit(
      `/apps/cypress/${slugify(app.name)}/pages/${slugify(
        IPageKindName.Provider,
      )}/builder`,
    )
    cy.waitForSpinners()

    // select root now so we can update its child later
    // there is an issue with tree interaction
    // Increased timeout since builder may take longer to load
    cy.findByText(ROOT_ELEMENT_NAME, { timeout: 30000 })
      .should('be.visible')
      .click({ force: true })

    cy.createElementTree(elements)

    cy.getCuiTreeItemByPrimaryTitle(ELEMENT_CONTAINER).rightclick()

    cy.findByText(CONVERT_TO_COMPONENT_TEXT).click()

    cy.findByText(`instance of ${ELEMENT_CONTAINER}`).should('be.visible')

    // the element descendants of a component instance is not shown
    cy.getCuiTreeItemByPrimaryTitle(ELEMENT_ROW).should('not.exist')
    cy.getCuiTreeItemByPrimaryTitle(ELEMENT_COL_A).should('not.exist')
    cy.getCuiTreeItemByPrimaryTitle(ELEMENT_TEXT_1).should('not.exist')
  })

  it('should still have the descendant elements of the component', () => {
    cy.visit(
      `/apps/cypress/${slugify(app.name)}/pages/${slugify(
        IPageKindName.Provider,
      )}/builder?primarySidebarKey=components`,
    )
    // GetRenderedPageAndCommonAppData
    cy.waitForApiCalls()
    cy.waitForSpinners()

    // GetAtoms
    // GetComponents
    cy.waitForApiCalls()
    cy.waitForSpinners()

    cy.getCuiSidebar('Components')
      .getCuiSidebarViewContent('Custom')
      .contains('.ant-card-head-title', ELEMENT_CONTAINER)
      .next()
      .getButton({ icon: 'edit' })
      .click()

    // the element descendants of a component should show on the custom component builder
    cy.getCuiTreeItemByPrimaryTitle(ELEMENT_ROW).should('exist')
    cy.getCuiTreeItemByPrimaryTitle(ELEMENT_COL_A).should('exist')
    cy.getCuiTreeItemByPrimaryTitle(ELEMENT_TEXT_1).should('exist')
  })
})
