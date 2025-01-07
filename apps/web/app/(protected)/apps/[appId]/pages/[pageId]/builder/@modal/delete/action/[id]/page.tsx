import { DeleteActionModal } from '@codelab/frontend-application-store/use-cases/delete-action'

const DeleteActionModalPage = ({
  params: { id },
}: {
  params: { id: string }
}) => {
  return <DeleteActionModal id={id} />
}

export default DeleteActionModalPage
