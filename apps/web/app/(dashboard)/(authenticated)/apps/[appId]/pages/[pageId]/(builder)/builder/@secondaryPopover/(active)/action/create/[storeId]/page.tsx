import type { PageProps } from '@codelab/frontend/abstract/types'

import { parsePageProps } from '@codelab/frontend-application-shared-store/router'
import { CreateActionPopover } from '@codelab/frontend-application-store/use-cases/create-action'

const Page = async (props: PageProps<'storeId'>) => {
  const {
    params: { storeId },
  } = await parsePageProps(props)

  return <CreateActionPopover storeId={storeId} />
}

export default Page
