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
  findButtonByItemText: OmitFirstArg<typeof findButtonByItemText>
  findByButtonText: OmitFirstArg<typeof findByButtonText>
  findElementByText: OmitFirstArg<typeof findElementByText>
  getOpenedModal: OmitFirstArg<typeof getOpenedModal>
  getOptionItem: OmitFirstArg<typeof getOptionItem>
  getSpinner: OmitFirstArg<typeof getSpinner>
  selectOptionItem: OmitFirstArg<typeof selectOptionItem>
}

export const selectorCommands: Array<CypressCommand> = [
  { fn: findButtonByItemText, name: 'findButtonByItemText', options },
  { fn: findElementByText, name: 'findElementByText', options },
  { fn: getOptionItem, name: 'getOptionItem', options },
  { fn: selectOptionItem, name: 'selectOptionItem', options },
  { fn: getSpinner, name: 'getSpinner', options },
  { fn: getOpenedModal, name: 'getOpenedModal', options },
  { fn: findByButtonText, name: 'findByButtonText', options },
]
