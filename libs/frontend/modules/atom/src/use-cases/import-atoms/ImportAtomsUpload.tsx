import { ImportUpload } from '@codelab/frontend/view/components'
import { useImportAtomsMutation } from '../atom.endpoints'

export const ImportAtomsUpload = () => {
  const [importAtoms, { isLoading }] = useImportAtomsMutation()

  const fetchFn = (data: any) =>
    importAtoms({
      variables: {
        input: {
          payload: data,
        },
      },
    })

  return <ImportUpload fetchFn={fetchFn} />
}
