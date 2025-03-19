import { UpdateActionPopover } from '@codelab/frontend-application-store/use-cases/update-action'

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  return <UpdateActionPopover id={id} />
}

export default Page
