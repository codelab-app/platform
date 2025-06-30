import { appPreviewRepository } from '@codelab/frontend-domain-app/repositories'

import { ClientProductionPage } from '../../[domainSlug]/[pageSlug]/component'

const PreviewHomePage = async ({
  params,
}: {
  params: Promise<{ appId: string }>
}) => {
  const { appId } = await params
  const pageUrlPattern = '/'

  try {
    const dto = await appPreviewRepository({ appId, pageUrlPattern })

    return <ClientProductionPage dto={dto} />
  } catch (error) {
    return <div>App or page not found</div>
  }
}

export default PreviewHomePage
