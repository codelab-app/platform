import { ImportUpload } from '@codelab/frontend/view/components'
import { useImportTagsMutation } from './ImportTags.web.graphql.gen'

export const ImportTagsUpload = () => {
  const [importAtoms, { loading }] = useImportTagsMutation()

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
