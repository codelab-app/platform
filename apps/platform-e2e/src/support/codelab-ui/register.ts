import { codelabUIHeaderToolbarCommands } from './header-toolbar'

const codelabUICommands = [...codelabUIHeaderToolbarCommands]

for (const cmd of codelabUICommands) {
  cmd.options
    ? Cypress.Commands.add(cmd.name, cmd.options, cmd.fn)
    : Cypress.Commands.add(cmd.name, cmd.fn)
}
