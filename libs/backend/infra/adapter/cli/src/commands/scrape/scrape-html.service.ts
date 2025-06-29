import type { CommandModule } from 'yargs'

import { scrapeAntDesignData } from '@codelab/backend-application-admin'

export class ScrapeHtmlService implements CommandModule<unknown, unknown> {
  command = 'html'

  describe =
    'Scrape html data from https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes'

  handler = async () => {
    await scrapeAntDesignData()
  }
}
