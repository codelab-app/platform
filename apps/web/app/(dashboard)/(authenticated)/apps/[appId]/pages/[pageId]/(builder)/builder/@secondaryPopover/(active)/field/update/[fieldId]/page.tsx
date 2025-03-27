import type { PageProps } from '@codelab/frontend/abstract/types'

import { IRouteType } from '@codelab/frontend/abstract/application'
import { UpdateFieldPopoverContainer } from '@codelab/frontend-application-type/use-cases/update-field'

const Page = async ({
  params,
  searchParams,
}: PageProps<'appId' | 'fieldId' | 'pageId', 'selectedKey'>) => {
  const { appId, fieldId, pageId } = await params
  const resolvedSearchParams = await searchParams

  return (
    <UpdateFieldPopoverContainer
      context={{
        params: { appId, fieldId, pageId },
        searchParams: resolvedSearchParams,
        type: IRouteType.Page,
      }}
      fieldId={fieldId}
    />
  )
}

export default Page
