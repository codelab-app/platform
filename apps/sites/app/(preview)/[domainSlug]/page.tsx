import { appPreviewRepository } from '@codelab/frontend-domain-app/repositories'

import { ClientProductionPage } from '../../(production)/[domainSlug]/[pageSlug]/component'

const PreviewHomePage = async ({
  params,
}: {
  params: Promise<{ domainSlug: string }>
}) => {
  const { domainSlug } = await params
  const pageUrlPattern = '/'

  // Extract app ID from preview subdomain
  // domainSlug will be like "abc123.preview.codelab.app"
  const appIdMatch = domainSlug.match(
    /^([a-zA-Z0-9-]+)\.preview\.codelab\.app$/,
  )

  if (!appIdMatch) {
    return <div>Invalid preview URL</div>
  }

  const appId = appIdMatch[1]

  try {
    const dto = await appPreviewRepository({ appId, pageUrlPattern })

    return <ClientProductionPage dto={dto} />
  } catch (error) {
    return <div>App or page not found</div>
  }
}

export default PreviewHomePage
