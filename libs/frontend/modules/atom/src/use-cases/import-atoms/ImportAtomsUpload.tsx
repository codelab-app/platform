import { ATOMS_CACHE_TAG } from '@codelab/frontend/model/infra/redux'
import { useNotify } from '@codelab/frontend/shared/utils'
import { ImportUpload } from '@codelab/frontend/view/components'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useImportAtomsMutation } from '../../graphql/Atom.endpoints.v2.graphql.gen'
import { api } from '../../store'

export const ImportAtomsUpload = () => {
  const [importAtoms] = useImportAtomsMutation()
  const dispatch = useDispatch()

  const { onSuccess, onError } = useNotify(
    { title: 'Atoms successfully imported' },
    { title: 'Error while importing atoms' },
  )

  const onRequestSuccess = () => {
    onSuccess()
    dispatch(api.util.invalidateTags([ATOMS_CACHE_TAG]))
  }

  const fetchFn = (data: any) => {
    return importAtoms({
      variables: {
        input: {
          payload: data,
        },
      },
    })
      .unwrap()
      .then(onRequestSuccess)
      .catch(onError)
  }

  return <ImportUpload fetchFn={fetchFn} />
}
