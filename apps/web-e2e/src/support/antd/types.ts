import type { AntButtonCommands } from './button'
import type { AntCardCommands } from './card'
import type { AntDrawerCommands } from './drawer'
import type { AntDropdownCommands } from './dropdown'
import type { AntFormCommands } from './form'
import type { AntIconCommands } from './icon'
import type { AntMessageCommands } from './message'
import type { AntModalCommands } from './modal/modal.register'
import type { AntNotificationCommands } from './notification'
import type { AntPaginationCommands } from './pagination'
import type { AntPopconfirmCommands } from './popconfirm'
import type { AntPopoverCommands } from './popover'
import type { AntSpinCommands } from './spin'
import type { AntTableCommands } from './table'
import type { AntTooltipCommands } from './tooltip'

export type Label = string | number | RegExp

export type CommonOptions = Partial<
  Cypress.Loggable & Cypress.Timeoutable & Cypress.Shadow
>

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable<Subject>
      extends AntButtonCommands,
        AntCardCommands,
        AntDrawerCommands,
        AntDropdownCommands,
        AntFormCommands,
        AntIconCommands,
        AntMessageCommands,
        AntModalCommands,
        AntNotificationCommands,
        AntPaginationCommands,
        AntPopconfirmCommands,
        AntPopoverCommands,
        AntSpinCommands,
        AntTableCommands,
        AntTooltipCommands {}
  }
}
