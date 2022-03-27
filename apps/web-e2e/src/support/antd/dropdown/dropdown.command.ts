import { absoluteRoot } from '@hon2a/cypress-without'
import type { Label } from '../types'
import { logAndMute, triggerAliased } from '../utils'

export const getDropdown = (
  options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
) =>
  absoluteRoot(options).find('.ant-dropdown:not(.ant-dropdown-hidden)', options)

export const getDropdownItem = (
  label: Label,
  options?:
    | Partial<Cypress.Loggable>
    | Partial<Cypress.Loggable & Cypress.Timeoutable>,
) => getDropdown(options).contains('.ant-dropdown-menu-item', label, options)

export const selectDropdownItem = (
  label: Label,
  options?: Partial<Cypress.Loggable>,
) =>
  getDropdownItem(
    label,
    logAndMute('selectDropdownItem', label.toString(), options),
  ).click(options)

export const openDropdown = triggerAliased('openDropdown', 'mouseover')

export const closeDropdown = triggerAliased('closeDropdown', 'mouseout')

export const expectDropdownToOpen = (
  options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
) => getDropdown(options).should('exist')

export const expectDropdownToClose = (
  options?: Partial<Cypress.Loggable & Cypress.Timeoutable>,
) => getDropdown(options).should('not.exist')
