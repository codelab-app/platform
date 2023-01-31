import type { CommandModule } from 'yargs'
import { parseHtmlTjs } from '../../use-cases/parse'

export const parseHtmlCommand: CommandModule<unknown, unknown> = {
  command: 'html',
  describe: 'Parse React Html interfaces to JSON schema',
  handler: () => {
    // parseCustomHtml()
    // parseHtml()
    parseHtmlTjs()
  },
}
