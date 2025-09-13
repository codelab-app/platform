import type { PageProps } from '@codelab/frontend-abstract-types'

import { IRouteType } from '@codelab/frontend-abstract-application'
import { DeleteElementModalContainer } from '@codelab/frontend-application-element/use-cases/delete-element'
import { parsePageProps } from '@codelab/frontend-application-shared-services/router'

const Page = async (props: PageProps<'componentId' | 'elementId'>) => {
  const context = await parsePageProps(props)
  const { elementId } = context.params

  return (
    <DeleteElementModalContainer
      context={{
        ...context,
        type: IRouteType.Component,
      }}
      id={elementId}
    />
  )
}

export default Page
