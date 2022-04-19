import { antButtonCommands } from './button'
import { antCardCommands } from './card'
import { antDrawerCommands } from './drawer'
import { antDropdownCommands } from './dropdown'
import { antFormCommands } from './form'
import { antIconCommands } from './icon'
import { antLayoutCommands } from './layout'
import { antListCommands } from './list'
import { antMessageCommands } from './message'
import { antModalCommands } from './modal'
import { antNotificationCommands } from './notification'
import { antPaginationCommands } from './pagination'
import { antPopconfirmCommands } from './popconfirm'
import { antPopoverCommands } from './popover'
import { antSpinCommands } from './spin'
import { antTableCommands } from './table'
import { antTooltipCommands } from './tooltip'

const antCommands = [
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
]

for (const cmd of antCommands) {
  cmd.options
    ? Cypress.Commands.add(cmd.name, cmd.options, cmd.fn)
    : Cypress.Commands.add(cmd.name, cmd.fn)
}
