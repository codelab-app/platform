import { DeleteFieldModalContainer } from '@codelab/frontend-application-type/use-cases/delete-field'

const Page = async ({ params }: { params: Promise<{ fieldId: string }> }) => {
  const { fieldId } = await params

  return <DeleteFieldModalContainer id={fieldId} />
}

export default Page
