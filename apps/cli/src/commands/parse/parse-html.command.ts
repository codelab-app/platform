import { parseHtmlTjs } from '@codelab/backend/application/admin'
import type { CommandModule } from 'yargs'

export const parseHtmlCommand: CommandModule<unknown, unknown> = {
  command: 'html',
  describe: 'Parse React Html interfaces to JSON schema',
  handler: () => {
    // parseCustomHtml()
    // parseHtml()
    parseHtmlTjs()
  },
}
