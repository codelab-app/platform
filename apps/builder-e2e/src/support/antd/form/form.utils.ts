// h4ck: shit-typed because it's internal and I don't have the time to properly type it
import isArray from 'lodash/isArray'
import isNumber from 'lodash/isNumber'
import map from 'lodash/map'
import mapValues from 'lodash/mapValues'
import merge from 'lodash/merge'
import type { CommonOptions } from '../types'
import { MUTE } from '../utils'
import { getSelectDropdown } from './form.commands'
import type { ScrollPosition } from './form.types'

export const mergeFields = (fields: any, additionalProps: any) => {
  const [empty, mapPropValues]: [
    object,
    (collection: any, mapper: (value: any) => any) => any,
  ] = isArray(fields) ? [[], map] : [{}, mapValues]

  return merge(
    empty,
    fields,
    ...Object.entries(additionalProps)
      .filter(([, values]) => values)
      .map(([key, values]) =>
        mapPropValues(values, (value) => ({ [key]: value })),
      ),
  )
}

export const on = ($el: JQuery) => cy.wrap($el, MUTE)

export const unsupportedFieldType = (type: string) =>
  new Error(`Field type "${type}" is not supported!`)

export const getSelectValuePart = <Subject>(
  scope: Cypress.Chainable<Subject>,
  options?: CommonOptions,
) => scope.find('.ant-select-selector', options)

export const getSelectSearchPart = <Subject>(
  scope: Cypress.Chainable<Subject>,
  options?: CommonOptions,
) => scope.find('.ant-select-selection-search-input', options)

export const unlockSelectDropdownOptions = (options?: CommonOptions) =>
  getSelectDropdown(options).then(($el) => $el.css({ 'pointer-events': 'all' }))

export const scrollToToVerticalPosition = (scrollTo: ScrollPosition) => {
  if (scrollTo === 'top') {
    return 0
  }

  if (scrollTo === 'bottom') {
    return Number.MAX_SAFE_INTEGER
  }

  if (isNumber(scrollTo)) {
    return scrollTo
  }

  throw new Error(
    'Vertical `scrollTo` must be either `top`, `bottom`, or a number!',
  )
}

export const dropdownSelector =
  '.ant-select-dropdown:not(.ant-select-dropdown-hidden):not(.ant-slide-up-leave):not(.ant-slide-down-leave):not(.ant-slice-up-appear):not(.ant-slide-down-appear)'
