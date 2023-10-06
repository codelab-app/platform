import type { CypressCommand } from './command.interface'

export const registerCommands = (commands: Array<CypressCommand>) => {
  for (const cmd of commands) {
    cmd.options
      ? Cypress.Commands.add(cmd.name, cmd.options, cmd.fn)
      : Cypress.Commands.add(cmd.name, cmd.fn)
  }
}
