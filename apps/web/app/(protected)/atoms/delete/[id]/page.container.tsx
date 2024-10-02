'use client'

import { useAtomService } from '@codelab/frontend-application-atom/services'
import { DeleteAtomsModal } from '@codelab/frontend-application-atom/use-cases/delete-atom'

export const DeleteAtomsModalContainer = ({ id }: { id: string }) => {
  const atom = useAtomService().getOneFromCache({ id })

  return <DeleteAtomsModal atom={atom} />
}
