import { observer } from 'mobx-react-lite'
import { AtomStore } from '../../store'

export interface ImportAtomsUploadProps {
  atomStore: AtomStore
}

// TODO atom import export
export const ImportAtomsUpload = observer<ImportAtomsUploadProps>(
  ({ atomStore }) => {
    // const [importAtoms] = useImportAtomsMutation()
    // const dispatch = useDispatch()
    //
    // const { onSuccess, onError } = useNotify(
    //   { title: 'Atoms successfully imported' },
    //   { title: 'Error while importing atoms' },
    // )
    //
    // const onRequestSuccess = () => {
    //   onSuccess()
    //   dispatch(api.util.invalidateTags([ATOMS_CACHE_TAG]))
    // }
    //
    // const fetchFn = (data: any) => {
    //   return importAtoms({
    //     variables: {
    //       input: {
    //         payload: data,
    //       },
    //     },
    //   })
    //     .unwrap()
    //     .then(onRequestSuccess)
    //     .catch(onError)
    // }
    //
    // return <ImportUpload fetchFn={fetchFn} />
    return null
  },
)
