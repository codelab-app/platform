'use client'

import { PageType } from '@codelab/frontend/abstract/types'
import { useAtomService } from '@codelab/frontend-application-atom/services'
import { DeleteAtomsModal } from '@codelab/frontend-application-atom/use-cases/delete-atom'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'

export const DeleteAtomsModalContainer = observer(({ id }: { id: string }) => {
  const atom = useAtomService().getOneFromCache({ id })

  if (!atom) {
    return null
  }

  return <DeleteAtomsModal atom={atom} />
})
