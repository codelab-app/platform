import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { DeletePageModal } from '@codelab/frontend-application-page/use-cases/delete-page'
import { PageConnector } from '@codelab/frontend-application-page/views'
import { pageRepository } from '@codelab/frontend-domain-page/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

const DeletePageModalPage = async (props: {
  params: Promise<{ appId: string; pageId: string }>
}) => {
  const params = await props.params
  const { appId, pageId } = params

  return (
    <PageConnector id={pageId}>
      {(page) => <DeletePageModal appId={appId} page={page} />}
    </PageConnector>
  )
}

export default DeletePageModalPage
