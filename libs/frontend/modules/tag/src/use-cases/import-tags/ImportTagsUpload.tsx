import { ImportUpload } from '@codelab/frontend/view/components'
import { useImportTagsMutation } from '../tag.endpoints'

export const ImportTagsUpload = () => {
  const [importAtoms, { isLoading }] = useImportTagsMutation()

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
