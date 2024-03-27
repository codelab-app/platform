import { getEnv } from '@codelab/shared/config'

interface IDigitalOceanAppSpec extends Record<string, unknown> {
  domains: Array<IDigitalOceanDomain>
}

interface IDigitalOceanDomain {
  domain: string
  type?: string
  zone?: string
}

export const getAppSpec = async () => {
  const { hostingProvider } = getEnv()
  const appUrl = hostingProvider.appApiUrl
  const headers = hostingProvider.getBaseHeaders()
  const appResponse = await fetch(appUrl, { headers })
  const { app } = await appResponse.json()

  return app.spec as IDigitalOceanAppSpec
}

const updateAppSpec = async (spec: IDigitalOceanAppSpec) => {
  const { hostingProvider } = getEnv()
  const appUrl = hostingProvider.appApiUrl
  const headers = hostingProvider.getBaseHeaders()

  return fetch(appUrl, {
    body: JSON.stringify({ spec }),
    headers,
    method: 'PUT',
  })
}

export const deleteDomain = async (domainName: string) => {
  const appSpec = await getAppSpec()

  const updatedSpec = {
    ...appSpec,
    domains: appSpec.domains.filter(({ domain }) => domain !== domainName),
  }

  return updateAppSpec(updatedSpec)
}

export const createDomain = async (domainName: string) => {
  const appSpec = await getAppSpec()

  const updatedSpec = {
    ...appSpec,
    domains: [...appSpec.domains, { domain: domainName }],
  }

  return updateAppSpec(updatedSpec)
}

export const updateDomain = async (oldName: string, newName: string) => {
  const appSpec = await getAppSpec()

  const updatedSpec = {
    ...appSpec,
    domains: [
      ...appSpec.domains.filter(({ domain }) => domain !== oldName),
      { domain: newName },
    ],
  }

  return updateAppSpec(updatedSpec)
}
