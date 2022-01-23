import { API_ENV } from '@codelab/frontend/model/infra/redux'
import {
  useImportAtomsMutation,
  useLazyExportAtomsQuery,
} from '@codelab/frontend/modules/atom'
import { notify, useNotify } from '@codelab/frontend/shared/utils'
import { Button } from 'antd'

const hardCodedAtomIds = ['0x551ac']

/**
 * Sync atoms remotely to local (or current) url.
 */
export const SyncAtomsButton = () => {
  const [getExportAtoms, { isLoading: isLoadingDownAtoms }] =
    useLazyExportAtomsQuery()

  const [importAtom, { isLoading: isLoadingImportAtoms }] =
    useImportAtomsMutation()

  const { onSuccess, onError } = useNotify(
    { title: 'Atoms has been synced successfully' },
    { title: 'Failed to sync atoms' },
  )

  const onClick = async () => {
    let atomData

    try {
      atomData = await getExportAtoms({
        env: API_ENV.production,
        variables: { input: { where: { ids: hardCodedAtomIds } } },
      }).unwrap()
    } catch {
      notify({ title: 'Failed to down atoms', type: 'error' })

      return
    }

    // try {
    //   await importAtom({ variables: { input: { payload: JSON.stringify(atomData.data.getAtoms) } } }).unwrap()
    //   onSuccess()
    // } catch {
    //   onError()
    // }
  }

  return (
    <Button
      loading={isLoadingDownAtoms || isLoadingImportAtoms}
      onClick={onClick}
    >
      Sync Atoms
    </Button>
  )
}
