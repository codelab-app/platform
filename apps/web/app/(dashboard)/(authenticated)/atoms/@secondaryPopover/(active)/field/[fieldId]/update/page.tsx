import type { PageProps } from '@codelab/frontend/abstract/types'

import { IRouteType } from '@codelab/frontend/abstract/application'
import { parsePageProps } from '@codelab/frontend-application-shared-store/router'
import { UpdateFieldPopoverContainer } from '@codelab/frontend-application-type/use-cases/update-field'

const Page = async (props: PageProps<'fieldId', 'selectedKey'>) => {
  const context = await parsePageProps<'fieldId', 'selectedKey'>(props)

  return (
    <UpdateFieldPopoverContainer
      context={{
        ...context,
        type: IRouteType.Atom,
      }}
    />
  )
}

export default Page
