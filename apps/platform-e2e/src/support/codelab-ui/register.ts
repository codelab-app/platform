import { codelabUIHeaderToolbarCommands } from './header-toolbar'
import { codelabUISidebarCommands } from './sidebar'
import { codelabUIToolbarCommands } from './toolbar'

const codelabUICommands = [
  ...codelabUIHeaderToolbarCommands,
  ...codelabUISidebarCommands,
  ...codelabUIToolbarCommands,
]

for (const cmd of codelabUICommands) {
  cmd.options
    ? Cypress.Commands.add(cmd.name, cmd.options, cmd.fn)
    : Cypress.Commands.add(cmd.name, cmd.fn)
}
