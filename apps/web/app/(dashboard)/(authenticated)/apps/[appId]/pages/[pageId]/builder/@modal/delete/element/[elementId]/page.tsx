import { DeleteElementModalContainer } from '@codelab/frontend-application-element/use-cases/delete-element'

const DeleteActionModalPage = async (props: {
  params: Promise<{ elementId: string }>
}) => {
  const params = await props.params
  const { elementId } = params

  return <DeleteElementModalContainer id={elementId} />
}

export default DeleteActionModalPage
