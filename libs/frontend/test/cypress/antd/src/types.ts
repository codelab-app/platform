import type { AntButtonCommands } from './button'
import type { AntCardCommands } from './card'
import type { AntDrawerCommands } from './drawer'
import type { AntDropdownCommands } from './dropdown'
import type { AntFormCommands } from './form'
import type { AntIconCommands } from './icon'
import type { AntLayoutCommands } from './layout'
import type { AntListCommands } from './list'
import type { AntMessageCommands } from './message'
import type { AntModalCommands } from './modal/modal.register'
import type { AntNotificationCommands } from './notification'
import type { AntPaginationCommands } from './pagination'
import type { AntPopconfirmCommands } from './popconfirm'
import type { AntPopoverCommands } from './popover'
import type { AntSpinCommands } from './spin'
import type { AntTableCommands } from './table'
import type { AntTooltipCommands } from './tooltip'
import type { AntTreeCommands } from './tree'

export type Label = RegExp | number | string

export type CommonOptions = Partial<
  Cypress.Loggable & Cypress.Shadow & Cypress.Timeoutable
>
