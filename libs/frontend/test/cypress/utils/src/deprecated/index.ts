<<<<<<< HEAD
<<<<<<<< HEAD:libs/frontend/test/cypress/utils/src/deprecated/index.ts
=======
>>>>>>> eb2460d7a (ci: fix cypress after upgrade)
import type {
  CypressCommand,
  OmitFirstArg,
} from '@codelab/frontend/test/cypress/shared'
<<<<<<< HEAD
========
import type { CypressCommand } from '../command.interface'
>>>>>>>> da3909c80 (test: use cli for testing import export):libs/testing/cypress/command/src/deprecated/index.ts
=======
>>>>>>> eb2460d7a (ci: fix cypress after upgrade)
import { findButtonByItemText } from './find-button-by-item-text'
import { findByButtonText } from './find-by-button-text'
import { findElementByText } from './find-element-by-text'
import { getOpenedModal } from './get-opened-modal'
import { getOptionItem } from './get-option-item'
import { selectOptionItem } from './select-option-item'
<<<<<<< HEAD
<<<<<<<< HEAD:libs/frontend/test/cypress/utils/src/deprecated/index.ts
========
import type { OmitFirstArg } from './types'
>>>>>>>> da3909c80 (test: use cli for testing import export):libs/testing/cypress/command/src/deprecated/index.ts
=======
>>>>>>> eb2460d7a (ci: fix cypress after upgrade)

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
