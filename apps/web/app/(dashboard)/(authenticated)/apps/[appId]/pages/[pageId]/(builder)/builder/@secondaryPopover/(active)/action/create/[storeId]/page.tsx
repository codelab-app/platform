import type { PageProps } from '@codelab/frontend/abstract/types'

import { CreateActionPopover } from '@codelab/frontend-application-store/use-cases/create-action'

const Page = async ({ params }: PageProps<'storeId'>) => {
  const { storeId } = await params

  return <CreateActionPopover storeId={storeId} />
}

export default Page
