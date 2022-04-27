import { useUser } from '@auth0/nextjs-auth0'
import { ADMIN_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { useNotify } from '@codelab/frontend/shared/utils'
import { ImportUpload } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'

export const ImportButton = observer<WithServices<ADMIN_SERVICE>>(
  ({ adminService }) => {
    const { onSuccess, onError } = useNotify(
      { title: 'Admin data successfully imported' },
      { title: 'Error while importing admin data' },
    )

    const { user } = useUser()

    const fetchFn = async (data: any) => {
      if (!user?.sub) {
        console.warn('User not logged in')

        return
      }

      return adminService
        .importData(data, user.sub)
        .then(onSuccess)
        .catch(onError)
    }

    return <ImportUpload fetchFn={fetchFn} />
  },
)
