import { getEnv } from '@codelab/shared/config'

export const getWebsitesDroplet = async () => {
  const { hostingProvider } = getEnv()
  const dropletUrl = hostingProvider.dropletApiUrl
  const headers = hostingProvider.getBaseHeaders()
  const dropletResponse = await fetch(dropletUrl, { headers })
  const { droplets } = await dropletResponse.json()

  return droplets[0]
}

export const getDomainRecords = async (domainName: string) => {
  const { hostingProvider } = getEnv()
  const domainsUrl = `${hostingProvider.domainsApiUrl}/${domainName}/records`
  const headers = hostingProvider.getBaseHeaders()
  const result = await fetch(domainsUrl, { headers })
  const { domain_records } = await result.json()

  return domain_records
}

export const deleteDomain = async (domainName: string) => {
  const { hostingProvider } = getEnv()
  const domainsUrl = `${hostingProvider.domainsApiUrl}/${domainName}`
  const headers = hostingProvider.getBaseHeaders()

  return await fetch(domainsUrl, { headers, method: 'DELETE' })
}

export const createDomain = async (name: string) => {
  const droplet = await getWebsitesDroplet()
  const networks = droplet.networks.v4

  const network = networks.find(
    ({ type }: { type: string }) => type === 'public',
  )

  const { ip_address } = network
  const { hostingProvider } = getEnv()
  const domainsUrl = new URL(hostingProvider.domainsApiUrl)
  const headers = hostingProvider.getBaseHeaders()

  return await fetch(domainsUrl, {
    body: JSON.stringify({ ip_address, name }),
    headers,
    method: 'POST',
  })
}

export const updateDomain = async (oldName: string, newName: string) => {
  return Promise.all([deleteDomain(oldName), createDomain(newName)])
}
