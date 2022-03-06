import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import { AtomCreateInput } from '@codelab/shared/abstract/codegen-v2'
import { AtomType } from '@codelab/shared/abstract/core'

const atoms = [
  { name: 'AntDesignGridCol', type: AtomType.AntDesignGridCol },
  { name: 'AntDesignGridRow', type: AtomType.AntDesignGridRow },
  { name: 'AntDesignButton', type: AtomType.AntDesignButton },
  { name: 'AntDesignTypographyText', type: AtomType.AntDesignTypographyText },
]

const elements = [
  { name: 'Container', parentElement: ROOT_ELEMENT_NAME },
  { name: 'Row', parentElement: 'Container' },
  { name: 'Col A', atom: 'AntDesignGridCol', parentElement: 'Row' },
  { name: 'Col B', atom: 'AntDesignGridCol', parentElement: 'Row' },
  { name: 'Text', atom: 'AntDesignTypographyText', parentElement: 'Col A' },
  { name: 'Button', atom: 'AntDesignButton', parentElement: 'Col B' },
  { name: 'Text', atom: 'AntDesignTypographyText', parentElement: 'Button' },
]

const updatedElementName = 'Container updated'

describe('Elements CRUD', () => {
  before(() => {
    cy.resetDatabase().then(() => {
      cy.login().then(() => {
        cy.jumpToBuilder().then((data: any) => {
          cy.getCurrentUserId().then((userId) => {
            const atomsInput: Array<AtomCreateInput> = atoms.map((atom) => ({
              name: atom.name,
              type: atom.type,
              api: {
                create: {
                  node: {
                    name: `${atom.name} API`,
                    owner: userId
                      ? { connect: { where: { node: { auth0Id: userId } } } }
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

          if (atom) {
            cy.getOpenedModal().findByLabelText('Atom').type(atom)
            cy.getOpenedModal().getOptionItem(atom).first().click()
          }

          cy.getOpenedModal()
            .findByLabelText('Parent element')
            .click({ force: true })
            .type(parentElement, { force: true })

          cy.getOpenedModal().getOptionItem(parentElement).first().click()

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
