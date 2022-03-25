import '@testing-library/cypress/add-commands'
import { databaseCommands } from './database'
import { helpersCommands } from './helpers'
import { selectorCommands } from './selectors'

const commands = [...helpersCommands, ...databaseCommands, ...selectorCommands]

for (const cmd of commands) {
  cmd.options
    ? Cypress.Commands.add(cmd.name, cmd.options, cmd.fn)
    : Cypress.Commands.add(cmd.name, cmd.fn)
}
