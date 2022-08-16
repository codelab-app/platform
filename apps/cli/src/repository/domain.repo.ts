import { DomainOGM, vercelApis } from '@codelab/backend'
import { IDomainExport } from '@codelab/shared/abstract/core'

export const handleRestError = async (res: Response, requestName: string) => {
  if (res.status !== 200) {
    let parsedBody = {}

    try {
      parsedBody = await res.json()
      // eslint-disable-next-line no-empty
    } catch {}

    console.error(
      `[${requestName}] Fail to make request. Response: ${JSON.stringify(
        parsedBody || {},
        null,
        2,
      )}`,
    )

    return false
  }

  return true
}

export const createVercelDomainIfNotExist = async (domain: IDomainExport) => {
  const resGetDomain = await vercelApis.domain.getProjectData(domain.name)

  if (resGetDomain.status === 404) {
    const resAddDomain = await vercelApis.domain.add(domain.name)

    return await handleRestError(resAddDomain, 'addDomain')
  }

  return await handleRestError(resGetDomain, 'getProjectDomainData')
}

export const createDomainIfNotExist = async (domain: IDomainExport) => {
  const Domain = await DomainOGM()

  const idExisting = await Domain.find({
    where: {
      name: domain.name,
    },
  })

  if (idExisting.length) {
    console.error(`Domain ${domain.name} already exists`)

    return
  }

  await Domain.create({
    input: [
      {
        id: domain.id,
        name: domain.name,
        app: {
          connect: { where: { node: { id: domain.app.id } } },
        },
      },
    ],
  })
}
