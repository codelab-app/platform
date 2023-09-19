import { scrapeAntDesignData } from '@codelab/backend/application/admin'
import type { CommandModule } from 'yargs'

export class ScrapeAntdService implements CommandModule<unknown, unknown> {
  command = 'antd'

  describe = 'Scrape props data from Ant Design as CSV files'

  handler = async () => {
    await scrapeAntDesignData()
  }
}
