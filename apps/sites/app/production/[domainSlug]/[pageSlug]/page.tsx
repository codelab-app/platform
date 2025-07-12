import { pagePreviewQuery } from '@codelab/frontend-application-app/use-cases/page-preview'

import { ClientProductionPage } from './component'

const ProductionPage = async ({
  params,
}: {
  params: Promise<{ domainSlug: string; pageSlug: string }>
}) => {
  const { domainSlug, pageSlug } = await params
  const pageUrlPattern = pageSlug ? `/${pageSlug}` : '/'
  const dto = await pagePreviewQuery({ domainSlug, pageUrlPattern })

  return <ClientProductionPage dto={dto} />
}

export default ProductionPage
