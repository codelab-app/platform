import { CommandModule } from 'yargs'
import { ScraperService } from './scraper.service'

export const scrapeCommand: CommandModule<unknown, unknown> = {
  command: 'scrape',
  describe: 'Scrape props data from Ant Design',
  handler: async () => {
    const scraper = new ScraperService()

    await scraper.scrape()
  },
}
