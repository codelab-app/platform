import { DeleteActionModalContainer } from './page.client'

const DeleteActionModalPage = async (props: {
  params: Promise<{ id: string }>
}) => {
  const params = await props.params
  const { id } = params

  return <DeleteActionModalContainer id={id} />
}

export default DeleteActionModalPage
