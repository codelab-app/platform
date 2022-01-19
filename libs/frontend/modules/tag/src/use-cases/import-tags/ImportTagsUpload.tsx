import { ImportUpload } from '@codelab/frontend/view/components'
import { useImportTagsMutation } from '../../store'

export const ImportTagsUpload = () => {
  const [importAtoms] = useImportTagsMutation()

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
