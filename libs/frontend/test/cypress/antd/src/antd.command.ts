import type { CypressCommand } from '@codelab/frontend/test/cypress/shared'
import type { AntButtonCommands } from './button'
import { antButtonCommands } from './button'
import type { AntCardCommands } from './card'
import { antCardCommands } from './card'
import type { AntDrawerCommands } from './drawer'
import { antDrawerCommands } from './drawer'
import type { AntDropdownCommands } from './dropdown'
import { antDropdownCommands } from './dropdown'
import type { AntFormCommands } from './form'
import { antFormCommands } from './form'
import type { AntIconCommands } from './icon'
import { antIconCommands } from './icon'
import type { AntLayoutCommands } from './layout'
import { antLayoutCommands } from './layout'
import type { AntListCommands } from './list'
import { antListCommands } from './list'
import type { AntMessageCommands } from './message'
import { antMessageCommands } from './message'
import type { AntModalCommands } from './modal'
import { antModalCommands } from './modal'
import type { AntNotificationCommands } from './notification'
import { antNotificationCommands } from './notification'
import type { AntPaginationCommands } from './pagination'
import { antPaginationCommands } from './pagination'
import type { AntPopconfirmCommands } from './popconfirm'
import { antPopconfirmCommands } from './popconfirm'
import type { AntPopoverCommands } from './popover'
import { antPopoverCommands } from './popover'
import type { AntSpinCommands } from './spin'
import { antSpinCommands } from './spin'
import type { AntTableCommands } from './table'
import { antTableCommands } from './table'
import type { AntTooltipCommands } from './tooltip'
import { antTooltipCommands } from './tooltip'
import type { AntTreeCommands } from './tree'
import { antTreeCommands } from './tree'

export type CypressAntdCommands = AntButtonCommands &
  AntCardCommands &
  AntDrawerCommands &
  AntDropdownCommands &
  AntFormCommands &
  AntIconCommands &
  AntLayoutCommands &
  AntListCommands &
  AntMessageCommands &
  AntModalCommands &
  AntNotificationCommands &
  AntPaginationCommands &
  AntPopconfirmCommands &
  AntPopoverCommands &
  AntSpinCommands &
  AntTableCommands &
  AntTooltipCommands &
  AntTreeCommands &
  AntTreeCommands

export const antCommands: Array<CypressCommand> = [
  ...antButtonCommands,
  ...antCardCommands,
  ...antDrawerCommands,
  ...antDropdownCommands,
  ...antFormCommands,
  ...antIconCommands,
  ...antLayoutCommands,
  ...antListCommands,
  ...antMessageCommands,
  ...antModalCommands,
  ...antNotificationCommands,
  ...antPaginationCommands,
  ...antPopconfirmCommands,
  ...antPopoverCommands,
  ...antSpinCommands,
  ...antTableCommands,
  ...antTooltipCommands,
  ...antTreeCommands,
]
