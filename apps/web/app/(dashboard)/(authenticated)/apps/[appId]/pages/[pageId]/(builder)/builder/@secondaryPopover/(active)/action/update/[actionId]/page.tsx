import { UpdateActionPopover } from '@codelab/frontend-application-store/use-cases/update-action'

const Page = async ({ params }: { params: Promise<{ actionId: string }> }) => {
  const { actionId } = await params

  return <UpdateActionPopover id={actionId} />
}

export default Page
