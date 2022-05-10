import '@testing-library/cypress/add-commands'
import { databaseCommands } from './database'
import { UICommands } from './entities'
// import { selectorCommands } from './deprecated'
import { helpersCommands } from './helpers'

const commands = [...helpersCommands, ...databaseCommands, ...UICommands]

for (const cmd of commands) {
  cmd.options
    ? Cypress.Commands.add(cmd.name, cmd.options, cmd.fn)
    : Cypress.Commands.add(cmd.name, cmd.fn)
}
