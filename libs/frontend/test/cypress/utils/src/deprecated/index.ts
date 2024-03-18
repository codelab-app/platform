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

/**
 * @deprecated
 */
export interface SelectorsCommands {
  findButtonByItemText: OmitFirstArg<typeof findButtonByItemText>
  findByButtonText: OmitFirstArg<typeof findByButtonText>
  findElementByText: OmitFirstArg<typeof findElementByText>
  getOpenedModal: OmitFirstArg<typeof getOpenedModal>
  getOptionItem: OmitFirstArg<typeof getOptionItem>
  selectOptionItem: OmitFirstArg<typeof selectOptionItem>
}

/**
 * @deprecated
 */
export const selectorCommands: Array<CypressCommand> = [
  { fn: findButtonByItemText },
  { fn: findElementByText },
  { fn: getOptionItem },
  { fn: selectOptionItem },
  { fn: getOpenedModal },
  { fn: findByButtonText },
]
