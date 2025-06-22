import type { PageProps } from '@codelab/frontend-abstract-types'

import { DeleteFieldModalContainer } from './DeleteFieldModal.container'

export const DeleteFieldModalPage = async ({
  params,
}: PageProps<'fieldId'>) => {
  const { fieldId } = await params

  return <DeleteFieldModalContainer id={fieldId} />
}
