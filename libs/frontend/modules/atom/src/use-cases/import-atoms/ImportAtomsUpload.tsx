import { useUser } from '@auth0/nextjs-auth0'
import {
  IMPORT_ATOM_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import { useNotify } from '@codelab/frontend/shared/utils'
import { ImportUpload } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'

export const ImportAtomsUpload = observer<WithServices<IMPORT_ATOM_SERVICE>>(
  ({ importAtomService }) => {
    const { onSuccess, onError } = useNotify(
      { title: 'Atoms successfully imported' },
      { title: 'Error while importing atoms' },
    )

    const { user } = useUser()

    const fetchFn = async (data: any) => {
      if (!user?.sub) {
        console.error('User not found')

        return
      }

      await importAtomService
        .importAtoms(data, user.sub)
        .then(onSuccess)
        .catch(onError)
    }

    return <ImportUpload fetchFn={fetchFn} />
  },
)
