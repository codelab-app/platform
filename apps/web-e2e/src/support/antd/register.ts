import { antButtonCommands } from './button'
import { antCardCommands } from './card'
import { antDrawerCommands } from './drawer/drawer.register'
import { antDropdownCommands } from './dropdown/dropdown.register'
import { antFormCommands } from './form'
import { antIconCommands } from './icon'
import { antMessageCommands } from './message'
import { antModalCommands } from './modal'
import { antNotificationCommands } from './notification'
import { antPaginationCommands } from './pagination'
import { antPopconfirmCommands } from './popconfirm'
import { antPopoverCommands } from './popover'
import { antSpinCommands } from './spin'
import { antTableCommands } from './table/table.register'
import { antTooltipCommands } from './tooltip'

const antCommands = [
  ...antButtonCommands,
  ...antCardCommands,
  ...antDrawerCommands,
  ...antDropdownCommands,
  ...antFormCommands,
  ...antIconCommands,
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
