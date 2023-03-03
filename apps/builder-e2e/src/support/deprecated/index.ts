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
  { fn: findButtonByItemText, name: 'findButtonByItemText', options },
  { fn: findElementByText, name: 'findElementByText', options },
  { fn: getOptionItem, name: 'getOptionItem', options },
  { fn: selectOptionItem, name: 'selectOptionItem', options },
  { fn: getSpinner, name: 'getSpinner', options },
  { fn: getOpenedModal, name: 'getOpenedModal', options },
  { fn: findByButtonText, name: 'findByButtonText', options },
]
