import { useNotify } from '@codelab/frontend/shared/utils'
import { ImportUpload } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import { WithAdminService } from '../../store'

export const ImportButton = observer<WithAdminService>(({ adminService }) => {
  const { onSuccess, onError } = useNotify(
    { title: 'Admin data successfully imported' },
    { title: 'Error while importing admin data' },
  )

  const fetchFn = (data: any) => {
    console.log(' >> Here <<')

    return adminService
      .importData({ payload: data })
      .then(onSuccess)
      .catch(onError)
  }

  return <ImportUpload fetchFn={fetchFn} />
})
