import { DomainsPageHeaderContainer } from '@codelab/frontend-application-domain/views'

const DomainsHeaderPage = async ({
  params,
}: {
  params: Promise<{ appId: string }>
}) => {
  const resolvedParams = await params
  const { appId } = resolvedParams

  return <DomainsPageHeaderContainer appId={appId} />
}

export default DomainsHeaderPage
