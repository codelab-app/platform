import { IAppExport } from '@codelab/backend/abstract/core'

export const removeDuplicates = (app: IAppExport) => {
  const uniqueIds = new Set()
  const pages = app.pages.map((page) => ({
    ...page,
    components: page.components.filter((comp) => {
      if (uniqueIds.has(comp.id)) {
        return false
      } else {
        uniqueIds.add(comp.id)
        return true
      }
    }),
  }))
  return {
    ...app,
    pages,
  }
}
