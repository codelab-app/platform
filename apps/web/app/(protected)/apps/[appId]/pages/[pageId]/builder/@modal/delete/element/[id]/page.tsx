import { DeleteElementModal } from '@codelab/frontend-application-element/use-cases/delete-element'

const DeleteActionModalPage = ({
  params: { id },
}: {
  params: { id: string }
}) => {
  return <DeleteElementModal id={id} />
}

export default DeleteActionModalPage
