import { AppDomainStories } from './app/AppDomainStories'
import { PageDomainStories } from './page/PageDomainStories'

export default {
  title: 'Domain',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    docs: {
      page: null,
    },
  },
}

export const AppDomain = AppDomainStories

export const PageDomain = PageDomainStories
