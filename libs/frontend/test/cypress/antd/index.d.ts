import type { AntButtonCommands } from './src/button'
import type { AntCardCommands } from './src/card'
import type { AntDrawerCommands } from './src/drawer'
import type { AntDropdownCommands } from './src/dropdown'
import type { AntFormCommands } from './src/form'
import type { AntIconCommands } from './src/icon'
import type { AntLayoutCommands } from './src/layout'
import type { AntListCommands } from './src/list'
import type { AntMessageCommands } from './src/message'
import type { AntModalCommands } from './src/modal'
import type { AntNotificationCommands } from './src/notification'
import type { AntPaginationCommands } from './src/pagination'
import type { AntPopconfirmCommands } from './src/popconfirm'
import type { AntPopoverCommands } from './src/popover'
import type { AntSpinCommands } from './src/spin'
import type { AntTableCommands } from './src/table'
import type { AntTooltipCommands } from './src/tooltip'
import type { AntTreeCommands } from './src/tree'

// Need this for IDE typing
import type cypress from 'cypress'

declare global {
  namespace Cypress {
    interface Chainable<Subject>
      extends AntButtonCommands,
        AntCardCommands,
        AntDrawerCommands,
        AntDropdownCommands,
        AntFormCommands,
        AntIconCommands,
        AntLayoutCommands,
        AntListCommands,
        AntTreeCommands,
        AntMessageCommands,
        AntModalCommands,
        AntNotificationCommands,
        AntPaginationCommands,
        AntPopconfirmCommands,
        AntPopoverCommands,
        AntSpinCommands,
        AntTableCommands,
        AntTreeCommands,
        AntTooltipCommands {}
  }
}
