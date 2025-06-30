import { appPreviewRepository } from '@codelab/frontend-domain-app/repositories'

import { ClientProductionPage } from '../../../[domainSlug]/[pageSlug]/component'

const PreviewPage = async ({
  params,
}: {
  params: Promise<{ appId: string; pageSlug: string }>
}) => {
  const { appId, pageSlug } = await params
  const pageUrlPattern = pageSlug ? `/${pageSlug}` : '/'

  try {
    const dto = await appPreviewRepository({ appId, pageUrlPattern })

    return <ClientProductionPage dto={dto} />
  } catch (error) {
    return <div>App or page not found</div>
  }
}

export default PreviewPage
