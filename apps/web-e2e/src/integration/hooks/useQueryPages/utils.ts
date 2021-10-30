import { AtomType, CreateResponse } from '@codelab/frontend/abstract/codegen'

interface beforeHookParams {
  pageName: string
  childElementName: string
  dummyPageName: string
  sourceKey: string
}

interface selectHookParams {
  hook: string
  childElementName: string
}

export const selectHook = ({ hook, childElementName }: selectHookParams) => {
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

  // click on created child element
  cy.findByText('Root element').click()
  cy.findByText(childElementName).click()

  // click on hooks panel
  cy.findByText('Hooks').click()

  // open add modal hook
  cy.findByText('Add hook').click()

  // click on type select
  cy.getOpenedModal().findByLabelText(/Type/).click()

  // select item 'Query Page'
  cy.getOptionItem(hook).first().click()
}

export const beforeHook = ({
  childElementName,
  dummyPageName,
  pageName,
  sourceKey,
}: beforeHookParams) => {
  cy.resetDgraphData()

  cy.login().then(async () => {
    cy.preserveAuthCookies()
    cy.createAtom({ name: 'test', type: AtomType.Text }).then(
      (atom: CreateResponse) => {
        const atomId = atom.id
        cy.createApp()
          .then((app: CreateResponse) => {
            const appId = app.id
            cy.wrap(appId).as('appId')

            return cy.createPage({ appId, name: pageName })
          })
          .then((page: CreateResponse) => {
            const pageId = page.id
            cy.wrap(pageId).as('pageId')

            return cy.getPage({ pageId })
          })
          .then((page) => {
            return cy
              .getElementGraph({
                where: {
                  id: page.rootElementId,
                },
              })
              .then((elements) => {
                const rootElement = elements.vertices.find(
                  (v) => v.id === page.rootElementId,
                )

                return cy.createElement({
                  atomId,
                  name: childElementName,
                  parentElementId: rootElement?.id as string,
                })
              })
              .then((element: CreateResponse) => {
                const elementId = element.id
                cy.createPropBinding({
                  elementId,
                  sourceKey,
                  targetKey: 'text',
                })
              })
              .then(() => {
                cy.get('@appId').then((appId) => {
                  cy.createPage({ appId: String(appId), name: dummyPageName })
                })
              })
          })
      },
    )

    cy.getSpinner().should('not.exist')
  })
}
