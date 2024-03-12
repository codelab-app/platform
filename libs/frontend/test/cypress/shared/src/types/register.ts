import type { CommandOptions, CypressCommand } from './command.interface'

export const registerCommands = (commands: Array<CypressCommand>) => {
  for (const cmd of commands) {
    cmd.options
      ? Cypress.Commands.add(cmd.name, cmd.options as CommandOptions, cmd.fn)
      : Cypress.Commands.add(cmd.name, cmd.fn)
  }
}
