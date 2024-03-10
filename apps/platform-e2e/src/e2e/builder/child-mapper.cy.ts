import { FIELD_TYPE } from '@codelab/frontend/test/cypress/antd'
import type { App } from '@codelab/shared/abstract/codegen'
import type {
  IAppDto,
  IComponentDto,
  IPageDto,
} from '@codelab/shared/abstract/core'
import {
  IAtomType,
  IPageKind,
  IPageKindName,
} from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { findOrFail, slugify } from '@codelab/shared/utils'
import {
  childMapperComponent,
  childMapperComponentElements,
} from './components.data'

interface ComponentChildData {
  atom: string
  name: string
}

const COMPONENT_NAME = 'Component Name'
const ELEMENT_ROW = 'Row'

const componentChildren = [
  { atom: IAtomType.AntDesignSpace, name: 'Space' },
  { atom: IAtomType.AntDesignTypographyText, name: 'Typography' },
]

describe('Element Child Mapper', () => {
  let app: IAppDto
  let page: IPageDto
  let component: IComponentDto

  before(() => {
    cy.postApiRequest<App>('/app/seed-cypress-app')
      .then(({ body }) => {
        app = body
        page = findOrFail(
          app.pages,
          (_page) => _page.kind === IPageKind.Provider,
        )

        cy.wrap(page).should('have.property', 'store')

        return cy.wrap(app)
      })
      .as('cypressApp')

    cy.get('@cypressApp').then(() =>
      cy
        .postApiRequest<IComponentDto>(
          'component/create-component',
          childMapperComponent,
        )
        .then(({ body }) => {
          component = body
        })
        .as('cypressComponent'),
    )

    cy.get('@cypressComponent').then(() =>
      cy
        .postApiRequest<Element>(
          `element/${component.rootElement.id}/create-elements`,
          childMapperComponentElements,
        )
        .as('cypressElements'),
    )

    cy.get('@cypressElements').then(() =>
      cy.visit(
        `/apps/cypress/${slugify(app.name)}/pages/${slugify(
          IPageKindName.Provider,
        )}/builder`,
      ),
    )
  })
  it('should create the component that will be used for the child mapper', () => {
    cy.waitForSpinners()

    // select root now so we can update its child later
    // there is an issue with tree interaction
    // Increased timeout since builder may take longer to load
    cy.findByText(ROOT_ELEMENT_NAME, { timeout: 30000 })
      .should('be.visible')
      .click({ force: true })
  })

  // it('should create the element tree where we will insert the component as a child mapper component', () => {
  //   cy.createElementTree([
  //     {
  //       atom: IAtomType.AntDesignGridRow,
  //       name: ELEMENT_ROW,
  //       parentElement: ROOT_ELEMENT_NAME,
  //     },
  //     {
  //       atom: IAtomType.ReactFragment,
  //       name: 'Child 1',
  //       parentElement: ELEMENT_ROW,
  //     },
  //     {
  //       atom: IAtomType.ReactFragment,
  //       name: 'Child 2',
  //       parentElement: ELEMENT_ROW,
  //     },
  //   ])
  // })

  // it('should create an AntDesignRow element and add child mapper data', () => {
  //   cy.findAllByText(ELEMENT_ROW).first().click()
  //   cy.findByText('Child Mapper').click()
  //   cy.get('.ant-collapse').setFormFieldValue({
  //     label: 'Render next to',
  //     type: FIELD_TYPE.SELECT,
  //     value: 'Child 2',
  //   })
  //   cy.get('.ant-collapse').findByRole('button', { name: 'JS' }).click()
  //   cy.get('.ant-collapse').setFormFieldValue({
  //     type: FIELD_TYPE.CODE_MIRROR,
  //     value: '{{[{ name: "test 1" }, { name: "test 2" }]}}',
  //   })
  //   cy.intercept('POST', `api/graphql`).as('action')
  //   cy.get('.ant-collapse').setFormFieldValue({
  //     label: 'Component',
  //     type: FIELD_TYPE.SELECT,
  //     value: COMPONENT_NAME,
  //   })
  //   cy.wait('@action')
  // })

  // it('should render the component instances with props values from array', () => {
  //   cy.openPreview()
  //   cy.get('#render-root').contains('text test 1')
  //   cy.get('#render-root').contains('text test 2')
  //   cy.openBuilder()
  // })

  // it('should render the component instances n times and next to the selected previous sibling', () => {
  //   cy.get('.ant-tree-treenode-draggable:nth-child(3)')
  //     .contains('Child 2')
  //     .should('exist')
  //   cy.get('.ant-tree-treenode-draggable:nth-child(4)')
  //     .contains(`${COMPONENT_NAME} Root 0`)
  //     .should('exist')
  //   cy.get('.ant-tree-treenode-draggable:nth-child(5)')
  //     .contains(`${COMPONENT_NAME} Root 1`)
  //     .should('exist')
  //   cy.get('.ant-tree-treenode-draggable:nth-child(6)')
  //     .contains('Child 1')
  //     .should('exist')
  // })

  // it('should update the rendered instances when props values from array and previous sibling is updated', () => {
  //   cy.findAllByText(ELEMENT_ROW).first().click()

  //   cy.get('.ant-collapse').setFormFieldValue({
  //     label: 'Render next to',
  //     type: FIELD_TYPE.SELECT,
  //     value: 'Child 1',
  //   })
  //   cy.get('.ant-collapse').setFormFieldValue({
  //     type: FIELD_TYPE.CODE_MIRROR,
  //     value: '{{[{ name: "updated test 1" }, { name: "updated test 2" }]}}',
  //   })

  //   cy.waitForApiCalls()

  //   // changed props
  //   cy.openPreview()
  //   cy.get('#render-root').contains('text updated test 1')
  //   cy.get('#render-root').contains('text updated test 2')
  //   cy.openBuilder()

  //   // For some reason, when the prop is auto updated from the form, theres some delay in the tree view changes
  //   // and the element node being queried still has the old value
  //   // eslint-disable-next-line cypress/no-unnecessary-waiting
  //   cy.wait(2000)

  //   // changed order
  //   cy.get('.ant-tree-treenode-draggable:nth-child(3)')
  //     .findByText('Child 2')
  //     .should('exist')
  //   cy.get('.ant-tree-treenode-draggable:nth-child(4)')
  //     .findByText('Child 1')
  //     .should('exist')
  //   cy.get('.ant-tree-treenode-draggable:nth-child(5)')
  //     .findByText(`${COMPONENT_NAME} Root 0`)
  //     .should('exist')
  //   cy.get('.ant-tree-treenode-draggable:nth-child(6)')
  //     .findByText(`${COMPONENT_NAME} Root 1`)
  //     .should('exist')
  // })

  // it('should not render instances when the prop arrary is empty', () => {
  //   cy.findAllByText(ELEMENT_ROW).first().click()

  //   cy.get('.ant-collapse').setFormFieldValue({
  //     type: FIELD_TYPE.CODE_MIRROR,
  //     value: '{{[]}}',
  //   })

  //   cy.waitForApiCalls()

  //   // rendered instances are removed
  //   cy.get('.ant-tree-treenode-draggable').should('have.length', 4)

  //   // changed props
  //   cy.openPreview()
  //   cy.get('#render-root').contains('text updated test 1').should('not.exist')
  //   cy.get('#render-root').contains('text updated test 2').should('not.exist')
  //   cy.openBuilder()
  // })

  // it('should not render instances when the prop is not an array', () => {
  //   cy.findAllByText(ELEMENT_ROW).first().click()

  //   cy.get('.ant-collapse').setFormFieldValue({
  //     type: FIELD_TYPE.CODE_MIRROR,
  //     value: '{{false}}',
  //   })

  //   cy.waitForApiCalls()

  //   // rendered instances are removed
  //   cy.get('.ant-tree-treenode-draggable').should('have.length', 4)

  //   // changed props
  //   cy.openPreview()
  //   cy.get('#render-root').contains('text updated test 1').should('not.exist')
  //   cy.get('#render-root').contains('text updated test 2').should('not.exist')
  // })
})
