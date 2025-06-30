import { appPreviewRepository } from '@codelab/frontend-domain-app/repositories'

import { ClientProductionPage } from '../../../production/[domainSlug]/[pageSlug]/component'

const PreviewPage = async ({
  params,
}: {
  params: Promise<{ appSlug: string; pageSlug: string }>
}) => {
  const { appSlug, pageSlug } = await params
  const pageUrlPattern = pageSlug ? `/${pageSlug}` : '/'

  try {
    const dto = await appPreviewRepository({ appSlug, pageUrlPattern })

    return <ClientProductionPage dto={dto} />
  } catch (error) {
    return <div>App or page not found</div>
  }
}

export default PreviewPage
