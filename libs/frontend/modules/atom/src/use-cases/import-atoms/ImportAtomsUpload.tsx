import { useNotify } from '@codelab/frontend/shared/utils'
import { ImportUpload } from '@codelab/frontend/view/components'
import React from 'react'
import { useImportAtomsMutation } from '../../graphql/Atom.endpoints.v2.graphql.gen'

export const ImportAtomsUpload = () => {
  const [importAtoms] = useImportAtomsMutation()

  const { onSuccess, onError } = useNotify(
    { title: 'Atoms successfully imported' },
    { title: 'Error while importing atoms' },
  )

  const fetchFn = (data: any) => {
    return importAtoms({
      variables: {
        input: {
          payload: data,
        },
      },
    })
      .unwrap()
      .then(onSuccess)
      .catch(onError)
  }

  return <ImportUpload fetchFn={fetchFn} />
}
