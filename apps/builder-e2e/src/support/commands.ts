import { auth0Commands } from './auth0/auth0.register'
import { builderCommands } from './builder'
import { databaseCommands } from './database'
import { UICommands } from './entities'
import { helpersCommands } from './helpers'
import { nextjsAuth0Commands } from './nextjs-auth0/nextjs-auth0.register'

const commands = [
  ...helpersCommands,
  ...databaseCommands,
  ...UICommands,
  ...auth0Commands,
  ...nextjsAuth0Commands,
  ...builderCommands,
]

for (const cmd of commands) {
  cmd.options
    ? Cypress.Commands.add(cmd.name, cmd.options, cmd.fn)
    : Cypress.Commands.add(cmd.name, cmd.fn)
}
