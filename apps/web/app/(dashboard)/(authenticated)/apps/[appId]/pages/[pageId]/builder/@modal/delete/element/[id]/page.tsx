import { DeleteElementModalContainer } from '@codelab/frontend-application-element/use-cases/delete-element'

const DeleteActionModalPage = async (props: {
  params: Promise<{ id: string }>
}) => {
  const params = await props.params
  const { id } = params

  return <DeleteElementModalContainer id={id} />
}

export default DeleteActionModalPage
