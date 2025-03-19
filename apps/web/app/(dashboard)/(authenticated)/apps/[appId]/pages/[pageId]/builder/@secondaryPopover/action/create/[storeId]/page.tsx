import { CreateActionPopover } from '@codelab/frontend-application-store/use-cases/create-action'

const Page = async ({ params }: { params: Promise<{ storeId: string }> }) => {
  const { storeId } = await params

  return <CreateActionPopover storeId={storeId} />
}

export default Page
