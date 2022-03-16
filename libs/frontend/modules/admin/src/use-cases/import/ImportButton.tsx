import {
  ATOMS_CACHE_TAG,
  TAG_CACHE_TAG,
  TYPE_CACHE_TAG,
} from '@codelab/frontend/model/infra/redux'
import { useNotify } from '@codelab/frontend/shared/utils'
import { ImportUpload } from '@codelab/frontend/view/components'
import React from 'react'
import { useDispatch } from 'react-redux'
import {
  api,
  useImportAdminDataMutation,
} from '../../graphql/Admin.endpoints.v2.graphql.gen'

export const ImportButton = () => {
  const [importAdminData] = useImportAdminDataMutation()
  const dispatch = useDispatch()

  const { onSuccess, onError } = useNotify(
    { title: 'Admin data successfully imported' },
    { title: 'Error while importing admin data' },
  )

  const onRequestSuccess = () => {
    onSuccess()
    // set time out to wait for last OGM resolvers are executed
    setTimeout(() => {
      dispatch(
        api.util.invalidateTags([
          ATOMS_CACHE_TAG,
          TAG_CACHE_TAG,
          TYPE_CACHE_TAG,
        ]),
      )
    }, 3000)
  }

  const fetchFn = (data: any) => {
    return importAdminData({
      variables: {
        input: {
          payload: data,
        },
      },
    })
      .unwrap()
      .then(onRequestSuccess)
      .catch(onError)
  }

  return <ImportUpload fetchFn={fetchFn} />
}
