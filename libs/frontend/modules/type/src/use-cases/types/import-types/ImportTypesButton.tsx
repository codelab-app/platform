import { useNotify } from '@codelab/frontend/shared/utils'
import { ImportUpload } from '@codelab/frontend/view/components'
import { useImportTypesMutation } from '../../../store'

export const ImportTypesUpload = () => {
  const [importAtoms] = useImportTypesMutation()

  const { onSuccess, onError } = useNotify(
    { title: 'Types successfully imported' },
    { title: 'Error while importing types' },
  )

  const fetchFn = (data: any) =>
    importAtoms({
      variables: {
        input: {
          payload: data,
        },
      },
    })
      .unwrap()
      .then(onSuccess)
      .catch(onError)

  return <ImportUpload fetchFn={fetchFn} />
}
