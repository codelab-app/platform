import { DeleteElementModalContainer } from '@codelab/frontend-application-element/use-cases/delete-element'

const DeleteActionModalPage = async ({
  params,
}: {
  params: Promise<{ elementId: string }>
}) => {
  const { elementId } = await params

  return <DeleteElementModalContainer id={elementId} />
}

export default DeleteActionModalPage
