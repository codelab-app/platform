import type { PageProps } from '@codelab/frontend-abstract-types'

import { IRouteType } from '@codelab/frontend-abstract-application'
import { parsePageProps } from '@codelab/frontend-application-shared-services/router'
import { CreateFieldPopover } from '@codelab/frontend-application-type/use-cases/create-field'

const Page = async (props: PageProps<'interfaceId', 'selectedKey'>) => {
  const context = await parsePageProps(props)

  return (
    <CreateFieldPopover
      context={{
        ...context,
        type: IRouteType.Type,
      }}
    />
  )
}

export default Page
