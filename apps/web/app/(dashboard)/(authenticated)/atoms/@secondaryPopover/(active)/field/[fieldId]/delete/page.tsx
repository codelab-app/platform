import type { PageProps } from '@codelab/frontend-presentation-view/templates'

import { DeleteFieldModalContainer } from '@codelab/frontend-application-type/use-cases/delete-field'

const Page = async ({ params }: PageProps<'fieldId'>) => {
  const { fieldId } = await params

  return <DeleteFieldModalContainer id={fieldId} />
}

export default Page
