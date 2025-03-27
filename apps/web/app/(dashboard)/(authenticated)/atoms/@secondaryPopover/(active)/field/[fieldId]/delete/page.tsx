import type { PageProps } from '@codelab/frontend/abstract/types'

import { DeleteFieldModalContainer } from '@codelab/frontend-application-type/use-cases/delete-field'

const Page = async ({ params }: PageProps<'fieldId'>) => {
  const awaitedParams = await params
  const { fieldId } = await params

  return <DeleteFieldModalContainer id={fieldId} />
}

export default Page
