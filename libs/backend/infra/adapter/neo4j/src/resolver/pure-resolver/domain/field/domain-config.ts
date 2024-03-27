import type { Domain } from '@codelab/backend/abstract/codegen'
import { getEnv } from '@codelab/shared/config'
import type { IFieldResolver } from '@graphql-tools/utils'

interface IDomainConfig {
  spec: {
    domain: string
    phase: string
  }
}

export const domainConfig: IFieldResolver<Domain, unknown, unknown> = async ({
  name,
}) => {
  try {
    const { hostingProvider } = getEnv()
    const appUrl = hostingProvider.appApiUrl
    const headers = hostingProvider.getBaseHeaders()
    const appResponse = await fetch(appUrl, { headers })
    const { app } = await appResponse.json()

    const domain = app.domains.find(
      ({ spec }: IDomainConfig) => spec.domain === name,
    )

    return { status: domain?.phase ?? 'NOT FOUND' }
  } catch (error) {
    console.error(error)

    return { status: 'error' }
  }
}
