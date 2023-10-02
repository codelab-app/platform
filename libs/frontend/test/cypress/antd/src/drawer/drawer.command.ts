import { absoluteRoot } from '@hon2a/cypress-without'

export const getDrawer = (
  options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
) => absoluteRoot(options).find('.ant-drawer:visible', options)

export const getDrawerTitle = (
  options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
) => getDrawer(options).find('.ant-drawer-title', options)

export const closeDrawer = (
  options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
) => getDrawer(options).find('.ant-drawer-close', options).click(options)

export const expectDrawerTitle = (expectedText: string) =>
  getDrawerTitle().should('have.text', expectedText)

export const expectDrawerToOpen = () => getDrawer().should('exist')

export const expectDrawerToClose = () =>
  absoluteRoot().find('.ant-drawer').should('not.be.visible')
