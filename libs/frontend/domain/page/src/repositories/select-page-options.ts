import { pageRepository } from './page.repository'

export const getSelectPageOptions = async (appId?: string) => {
  const { items: pages } = await pageRepository.find({
    appConnection: { node: { id: appId } },
  })

  return pages.map((page) => ({
    label: page.name,
    value: page.id,
  }))
}
