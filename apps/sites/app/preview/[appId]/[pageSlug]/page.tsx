import { appPreviewRepository } from '@codelab/frontend-domain-app/repositories'

import { ClientProductionPage } from '../../../production/[domainSlug]/[pageSlug]/component'

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
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error'

    console.error(`Preview error for ${appId}/${pageSlug}:`, errorMessage)

    if (errorMessage === 'App not found') {
      return (
        <div>
          <h1>App Not Found</h1>
          <p>The app with ID "{appId}" does not exist.</p>
        </div>
      )
    }

    if (errorMessage === 'Page not found') {
      return (
        <div>
          <h1>Page Not Found</h1>
          <p>
            The page "/{pageSlug}" does not exist in app "{appId}".
          </p>
        </div>
      )
    }

    return (
      <div>
        <h1>Error</h1>
        <p>{errorMessage}</p>
      </div>
    )
  }
}

export default PreviewPage
