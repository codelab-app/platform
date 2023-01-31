import type { CommandModule } from 'yargs'
import { scrapeAntDesignData } from '../../use-cases/scrape'

export const scrapeAntdCommand: CommandModule<unknown, unknown> = {
  command: 'antd',
  describe: 'Scrape props data from Ant Design as CSV files',
  handler: async () => {
    await scrapeAntDesignData()
  },
}
