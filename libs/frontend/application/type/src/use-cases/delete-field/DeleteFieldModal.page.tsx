import { DeleteFieldModalContainer } from './DeleteFieldModal.container'

export const DeleteFieldModalPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params

  return <DeleteFieldModalContainer id={id} />
}
