import { getSpinner } from '../antd/spin/spin.command'
import type { CypressCommand } from '../types'
import { findButtonByItemText } from './findButtonByItemText'
import { findByButtonText } from './findByButtonText'
import { findElementByText } from './findElementByText'
import { getOpenedModal } from './getOpenedModal'
import { getOptionItem } from './getOptionItem'
import { selectOptionItem } from './selectOptionItem'
import type { OmitFirstArg } from './types'

const options = { prevSubject: 'optional' }

export interface CypressSelectorsCommands {
  getOpenedModal: OmitFirstArg<typeof getOpenedModal>
  findByButtonText: OmitFirstArg<typeof findByButtonText>
  findButtonByItemText: OmitFirstArg<typeof findButtonByItemText>
  findElementByText: OmitFirstArg<typeof findElementByText>
  selectOptionItem: OmitFirstArg<typeof selectOptionItem>
  getOptionItem: OmitFirstArg<typeof getOptionItem>
  getSpinner: OmitFirstArg<typeof getSpinner>
}

export const selectorCommands: Array<CypressCommand> = [
  { name: 'findButtonByItemText', fn: findButtonByItemText, options },
  { name: 'findElementByText', fn: findElementByText, options },
  { name: 'getOptionItem', fn: getOptionItem, options },
  { name: 'selectOptionItem', fn: selectOptionItem, options },
  { name: 'getSpinner', fn: getSpinner, options },
  { name: 'getOpenedModal', fn: getOpenedModal, options },
  { name: 'findByButtonText', fn: findByButtonText, options },
]
