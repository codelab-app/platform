import { useUser } from '@auth0/nextjs-auth0'
import { useNotify } from '@codelab/frontend/shared/utils'
import { ImportUpload } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import { WithAtomImportService } from '../../store/atom-import.service'

export const ImportAtomsUpload = observer<WithAtomImportService>(
  ({ atomImportService }) => {
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

      await atomImportService
        .importAtoms(data, user.sub)
        .then(onSuccess)
        .catch(onError)
    }

    return <ImportUpload fetchFn={fetchFn} />
  },
)
