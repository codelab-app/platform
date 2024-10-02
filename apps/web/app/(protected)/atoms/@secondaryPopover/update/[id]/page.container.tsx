'use client'

import { useAtomService } from '@codelab/frontend-application-atom/services'
import {
  UpdateAtomForm,
  UpdateAtomPopover,
} from '@codelab/frontend-application-atom/use-cases/update-atom'

const UpdateAtomFormContainer = ({ id }: { id: string }) => {
  const atom = useAtomService().getOneFromCache({ id })

  return <UpdateAtomPopover atom={atom} />
}

export default UpdateAtomFormContainer
