import type { CommandModule } from 'yargs'

import { scrapeAntDesignData } from '@codelab/backend-application-admin'

export class ScrapeAntdService implements CommandModule<unknown, unknown> {
  command = 'antd'

  describe = 'Scrape props data from Ant Design as CSV files'

  handler = async () => {
    await scrapeAntDesignData()
  }
}
