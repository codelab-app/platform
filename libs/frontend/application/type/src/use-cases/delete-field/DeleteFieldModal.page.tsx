import type { PageProps } from '@codelab/frontend-presentation-view/templates'

import { DeleteFieldModalContainer } from './DeleteFieldModal.container'

export const DeleteFieldModalPage = async ({
  params,
}: PageProps<'fieldId'>) => {
  const { fieldId } = await params

  return <DeleteFieldModalContainer id={fieldId} />
}
