'use client'

import { useAtomService } from '@codelab/frontend-application-atom/services'
import { UpdateAtomPopover } from '@codelab/frontend-application-atom/use-cases/update-atom'
import { observer } from 'mobx-react-lite'

const UpdateAtomFormContainer = observer(({ id }: { id: string }) => {
  const atom = useAtomService().getOneFromCache({ id })

  if (!atom) {
    return null
  }

  return <UpdateAtomPopover atom={atom} />
})

export default UpdateAtomFormContainer
