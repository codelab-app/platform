import { DeleteActionModal } from '@codelab/frontend-application-store/use-cases/delete-action'

const DeleteActionModalPage = async (props: {
  params: Promise<{ id: string }>
}) => {
  const params = await props.params
  const { id } = params

  return <DeleteActionModal id={id} />
}

export default DeleteActionModalPage
