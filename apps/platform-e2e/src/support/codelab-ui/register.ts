import { codelabUIHeaderToolbarCommands } from './header-toolbar'
import { codelabUISidebarCommands } from './sidebar'
import { codelabUISkeletonCommands } from './skeleton'
import { codelabUIToolbarCommands } from './toolbar'
import { codelabUITreeCommands } from './tree'

const codelabUICommands = [
  ...codelabUIHeaderToolbarCommands,
  ...codelabUISidebarCommands,
  ...codelabUIToolbarCommands,
  ...codelabUISkeletonCommands,
  ...codelabUITreeCommands,
]

for (const cmd of codelabUICommands) {
  cmd.options
    ? Cypress.Commands.add(cmd.name, cmd.options, cmd.fn)
    : Cypress.Commands.add(cmd.name, cmd.fn)
}
