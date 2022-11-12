import '@testing-library/cypress/add-commands'
import { auth0Commands } from './auth0/auth0.register'
import { builderCommands } from './builder'
import { databaseCommands } from './database'
import { UICommands } from './entities'
import { helpersCommands } from './helpers'

const commands = [
  ...helpersCommands,
  ...databaseCommands,
  ...UICommands,
  ...auth0Commands,
  ...builderCommands,
]

for (const cmd of commands) {
  cmd.options
    ? Cypress.Commands.add(cmd.name, cmd.options, cmd.fn)
    : Cypress.Commands.add(cmd.name, cmd.fn)
}
