import { useUser } from '@auth0/nextjs-auth0'
import {
  IMPORT_TYPE_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import { useNotify } from '@codelab/frontend/shared/utils'
import { ImportUpload } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'

export const ImportTypesUpload = observer<WithServices<IMPORT_TYPE_SERVICE>>(
  ({ importTypeService }) => {
    const { onSuccess, onError } = useNotify(
      { title: 'Types successfully imported' },
      { title: 'Error while importing types' },
    )

    const { user } = useUser()

    const fetchFn = async (data: any) => {
      if (!user?.sub) {
        console.error('User not found')

        return
      }

      await importTypeService
        .importTypes(data, user.sub)
        .then(onSuccess)
        .catch(onError)
    }

    return <ImportUpload fetchFn={fetchFn} />
  },
)
