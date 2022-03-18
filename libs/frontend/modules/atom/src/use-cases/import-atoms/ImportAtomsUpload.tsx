import { useNotify } from '@codelab/frontend/shared/utils'
import { ImportUpload } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import { atomApi, AtomStore } from '../../store'

export interface ImportAtomsUploadProps {
  atomStore: AtomStore
}

export const ImportAtomsUpload = observer<ImportAtomsUploadProps>(
  ({ atomStore }) => {
    const { onSuccess, onError } = useNotify(
      { title: 'Atoms successfully imported' },
      { title: 'Error while importing atoms' },
    )

    const onRequestSuccess = () => {
      onSuccess()

      // invalidate local data
      return atomStore.getAll()
    }

    const fetchFn = (data: any) =>
      atomApi
        .ImportAtoms({ input: { payload: data } })
        .then(onRequestSuccess)
        .catch(onError)

    return <ImportUpload fetchFn={fetchFn} />
  },
)
