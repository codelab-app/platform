import { scrapeAntDesignData } from '@codelab/backend/application/admin'
import type { CommandModule } from 'yargs'

export class ScrapeHtmlService implements CommandModule<unknown, unknown> {
  command = 'html'

  describe =
    'Scrape html data from https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes'

  handler = async () => {
    await scrapeAntDesignData()
  }
}
