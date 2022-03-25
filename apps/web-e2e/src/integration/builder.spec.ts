import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import { AtomCreateInput } from '@codelab/shared/abstract/codegen-v2'
import { AtomType } from '@codelab/shared/abstract/core'

const atoms = [
  { name: AtomType.AntDesignGridCol, type: AtomType.AntDesignGridCol },
  { name: AtomType.AntDesignGridRow, type: AtomType.AntDesignGridRow },
  { name: AtomType.AntDesignButton, type: AtomType.AntDesignButton },
  {
    name: AtomType.AntDesignTypographyText,
    type: AtomType.AntDesignTypographyText,
  },
]

const ELEMENT_CONTAINER = 'Container'
const ELEMENT_ROW = 'Row'
const ELEMENT_COL_A = 'Col A'
const ELEMENT_COL_B = 'Col B'
const ELEMENT_TEXT = 'Text'
const ELEMENT_BUTTON = 'Button'

const elements = [
  { name: ELEMENT_CONTAINER, parentElement: ROOT_ELEMENT_NAME },
  { name: ELEMENT_ROW, parentElement: ELEMENT_CONTAINER },
  {
    name: ELEMENT_COL_A,
    atom: AtomType.AntDesignGridCol,
    parentElement: ELEMENT_ROW,
  },
  {
    name: ELEMENT_COL_B,
    atom: AtomType.AntDesignGridCol,
    parentElement: ELEMENT_ROW,
  },
  {
    name: ELEMENT_TEXT,
    atom: AtomType.AntDesignTypographyText,
    parentElement: ELEMENT_COL_A,
  },
  {
    name: ELEMENT_BUTTON,
    atom: AtomType.AntDesignButton,
    parentElement: ELEMENT_COL_B,
  },
  {
    name: ELEMENT_TEXT,
    atom: AtomType.AntDesignTypographyText,
    parentElement: ELEMENT_BUTTON,
  },
]

const updatedElementName = 'Container updated'

describe('Elements CRUD', () => {
  before(() => {
    cy.resetDatabase().then(() => {
      cy.login().then(() => {
        cy.createPageFromScratch().then((data: any) => {
          cy.getCurrentUserId().then((userId) => {
            const atomsInput: Array<AtomCreateInput> = atoms.map((atom) => ({
              name: atom.name,
              type: atom.type,
              api: {
                create: {
                  node: {
                    name: `${atom.name} API`,
                    owner: userId
                      ? { connect: [{ where: { node: { auth0Id: userId } } }] }
                      : undefined,
                  },
                },
              },
            }))

            cy.createAtom(atomsInput).then(() => {
              cy.visit(`/apps/${data.appId}/pages/${data.pageId}/builder`)

              // select root now so we can update its child later
              // there is an issue with tree interaction
              cy.findByText(ROOT_ELEMENT_NAME).click()
            })
          })
        })
      })
    })
  })

  describe(`create`, () => {
    it(`should be able to create elements`, () => {
      cy.wrap(elements).each(
        (element: { name: string; atom: string; parentElement: string }) => {
          const { atom, name, parentElement } = element
          cy.findByRole('button', { name: /plus/ }).click()

          cy.getOpenedModal().findByLabelText('Name').type(name)

          /**
           * We skip this if parent element is root, since it is disabled and can't be accessed
           */
          if (parentElement !== ROOT_ELEMENT_NAME) {
            cy.getOpenedModal().selectOptionItem(
              'Parent element',
              parentElement,
            )
          }

          if (atom) {
            cy.getOpenedModal().selectOptionItem('Atom', atom)
          }

          cy.getOpenedModal()
            .findByButtonText(/Create/)
            .click()

          cy.getOpenedModal().should('not.exist')
        },
      )
    })
  })

  describe(`update`, () => {
    it(`should be able to update element`, () => {
      cy.findByText('Container').click()
      cy.findByLabelText('Name').clear().type(updatedElementName)
      cy.findByText(updatedElementName).should('exist')
    })
  })

  describe(`delete`, () => {
    it(`should be able to delete element sub tree`, () => {
      cy.findByText(/Container/).rightclick()
      cy.contains(/Delete/).click()
      cy.getSpinner().should('not.exist')
      cy.getOpenedModal()
        .findByButtonText(/Delete/)
        .click()

      cy.getOpenedModal().should('not.exist')
      cy.findByText(/Container/).should('not.exist')
    })
  })
})
