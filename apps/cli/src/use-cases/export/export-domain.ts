import { DomainOGM, domainSelectionSet } from '@codelab/backend'
import { IDomainExport } from '@codelab/shared/abstract/core'

export const exportDomain = async (): Promise<{
  domains: Array<IDomainExport>
}> => {
  const domainOGM = await DomainOGM()

  const domains = await domainOGM.find({
    selectionSet: domainSelectionSet,
  })

  return { domains }
}
