import { DeleteFieldModalContainer } from './DeleteFieldModal.container'

export const DeleteFieldModalPage = async ({
  params,
}: {
  params: Promise<{ fieldId: string }>
}) => {
  const { fieldId } = await params

  return <DeleteFieldModalContainer id={fieldId} />
}
