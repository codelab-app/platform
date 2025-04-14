import type { PageProps } from '@codelab/frontend/abstract/types'

import { IRouteType } from '@codelab/frontend/abstract/application'
import { parsePageProps } from '@codelab/frontend-application-shared-store/router'
import { CreateFieldPopover } from '@codelab/frontend-application-type/use-cases/create-field'

const Page = async (
  props: PageProps<'componentId' | 'interfaceId', 'selectedKey'>,
) => {
  const context = await parsePageProps(props)

  return (
    <CreateFieldPopover
      context={{
        ...context,
        type: IRouteType.Component,
      }}
    />
  )
}

export default Page
