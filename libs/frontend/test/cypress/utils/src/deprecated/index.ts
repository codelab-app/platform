import type {
  CypressCommand,
  OmitFirstArg,
} from '@codelab/frontend/test/cypress/shared'
import { findButtonByItemText } from './find-button-by-item-text'
import { findByButtonText } from './find-by-button-text'
import { findElementByText } from './find-element-by-text'
import { getOpenedModal } from './get-opened-modal'
import { getOptionItem } from './get-option-item'
import { selectOptionItem } from './select-option-item'

export interface CypressSelectorsCommands {
  findButtonByItemText: OmitFirstArg<typeof findButtonByItemText>
  findByButtonText: OmitFirstArg<typeof findByButtonText>
  findElementByText: OmitFirstArg<typeof findElementByText>
  getOpenedModal: OmitFirstArg<typeof getOpenedModal>
  getOptionItem: OmitFirstArg<typeof getOptionItem>
  // getSpinner: OmitFirstArg<typeof getSpinner>
  selectOptionItem: OmitFirstArg<typeof selectOptionItem>
}

export const selectorCommands: Array<CypressCommand> = [
  { fn: findButtonByItemText, name: 'findButtonByItemText' },
  { fn: findElementByText, name: 'findElementByText' },
  { fn: getOptionItem, name: 'getOptionItem' },
  { fn: selectOptionItem, name: 'selectOptionItem' },
  // { fn: getSpinner, name: 'getSpinner' },
  { fn: getOpenedModal, name: 'getOpenedModal' },
  { fn: findByButtonText, name: 'findByButtonText' },
]

export * from './dom-classes'
export * from './types'
export * from './utils'
