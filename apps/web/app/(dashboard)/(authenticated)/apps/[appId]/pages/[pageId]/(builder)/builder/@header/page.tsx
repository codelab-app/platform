import type { PageContextParams } from '@codelab/frontend/abstract/application'
import type { PageProps } from '@codelab/frontend-presentation-view/templates'

import { PageBuilderHeaderContainer } from '@codelab/frontend-application-builder/use-cases/page-builder'

const Header = async ({ params }: PageProps<'appId' | 'pageId'>) => {
  const { appId, pageId } = await params

  return <PageBuilderHeaderContainer appId={appId} pageId={pageId} />
}

Header.displayName = 'Header'

export default Header
