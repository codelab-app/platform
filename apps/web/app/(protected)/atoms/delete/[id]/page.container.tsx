'use client'

import { useAtomService } from '@codelab/frontend-application-atom/services'
import { DeleteAtomsModal } from '@codelab/frontend-application-atom/use-cases/delete-atom'
import { observer } from 'mobx-react-lite'

export const DeleteAtomsModalContainer = observer(({ id }: { id: string }) => {
  const atom = useAtomService().getOneFromCache({ id })

  return <DeleteAtomsModal atom={atom} />
})
