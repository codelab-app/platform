import '@testing-library/cypress/add-commands'
import { databaseCommands } from './database'
// import { selectorCommands } from './deprecated'
import { helpersCommands } from './helpers'

const commands = [...helpersCommands, ...databaseCommands]

for (const cmd of commands) {
  cmd.options
    ? Cypress.Commands.add(cmd.name, cmd.options, cmd.fn)
    : Cypress.Commands.add(cmd.name, cmd.fn)
}
