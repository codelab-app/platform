import type { PageContextParams } from '@codelab/frontend/abstract/application'

import { PageBuilderHeaderContainer } from '@codelab/frontend-application-builder/use-cases/page-builder'

const Header = async ({ params }: { params: Promise<PageContextParams> }) => {
  const { appId, pageId } = await params

  return <PageBuilderHeaderContainer appId={appId} pageId={pageId} />
}

Header.displayName = 'Header'

export default Header
