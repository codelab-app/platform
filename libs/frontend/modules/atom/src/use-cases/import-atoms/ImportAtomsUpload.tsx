import { ImportUpload } from '@codelab/frontend/view/components'
import { useImportAtomsMutation } from './ImportAtoms.web.graphql.gen'

export const ImportAtomsUpload = () => {
  const [importAtoms, { loading }] = useImportAtomsMutation()

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
