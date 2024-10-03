'use client'

import { useAtomService } from '@codelab/frontend-application-atom/services'
import {
  UpdateAtomForm,
  UpdateAtomPopover,
} from '@codelab/frontend-application-atom/use-cases/update-atom'
import { observer } from 'mobx-react-lite'

const UpdateAtomFormContainer = observer(({ id }: { id: string }) => {
  const atom = useAtomService().getOneFromCache({ id })

  return <UpdateAtomPopover atom={atom} />
})

export default UpdateAtomFormContainer
