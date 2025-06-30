import { appPreviewRepository } from '@codelab/frontend-domain-app/repositories'

import { ClientProductionPage } from '../../production/[domainSlug]/[pageSlug]/component'

const PreviewHomePage = async ({
  params,
}: {
  params: Promise<{ appSlug: string }>
}) => {
  const { appSlug } = await params
  const pageUrlPattern = '/'

  try {
    const dto = await appPreviewRepository({ appSlug, pageUrlPattern })

    return <ClientProductionPage dto={dto} />
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error(`Preview error for ${appSlug}:`, errorMessage)
    
    if (errorMessage === 'App not found') {
      return (
        <div>
          <h1>App Not Found</h1>
          <p>The app "{appSlug}" does not exist.</p>
        </div>
      )
    }
    
    if (errorMessage === 'Page not found') {
      return (
        <div>
          <h1>Page Not Found</h1>
          <p>The home page for app "{appSlug}" does not exist.</p>
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

export default PreviewHomePage
