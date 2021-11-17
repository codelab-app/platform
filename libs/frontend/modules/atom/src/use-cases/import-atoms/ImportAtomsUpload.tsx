import { ImportUpload } from '@codelab/frontend/view/components'
import { useImportAtomsMutation } from '../../store'

export const ImportAtomsUpload = () => {
  const [importAtoms] = useImportAtomsMutation()

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
