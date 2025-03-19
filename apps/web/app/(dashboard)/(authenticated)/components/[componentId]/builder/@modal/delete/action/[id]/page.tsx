import { DeleteActionModalContainer } from '@codelab/frontend-application-store/use-cases/delete-action'

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  return <DeleteActionModalContainer id={id} />
}

export default Page
