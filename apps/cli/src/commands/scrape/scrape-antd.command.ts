import { scrapeAntDesignData } from '@codelab/backend/application/admin'
import type { CommandModule } from 'yargs'

export const scrapeAntdCommand: CommandModule<unknown, unknown> = {
  command: 'antd',
  describe: 'Scrape props data from Ant Design as CSV files',
  handler: async () => {
    await scrapeAntDesignData()
  },
}
