import { useNotify } from '@codelab/frontend/shared/utils'
import { ImportUpload } from '@codelab/frontend/view/components'
import React from 'react'
import {useDispatch} from 'react-redux'
import { api } from '@codelab/frontend/modules/atom'
import { useUser } from '@auth0/nextjs-auth0'
import { ATOMS_CACHE_TAG, TAG_CACHE_TAG, TYPE_CACHE_TAG } from '@codelab/frontend/model/infra/redux'
import { useImportAdminDataMutation } from '../../graphql/Admin.endpoints.v2.graphql.gen'

export const ImportButton = () => {
  const [importAdminData] = useImportAdminDataMutation()
  const dispatch = useDispatch()
  const { user } = useUser()
  const { onSuccess, onError } = useNotify(
    { title: 'Admin data successfully imported' },
    { title: 'Error while importing admin data' },
    )

  const onRequestSuccess = () => {
    onSuccess()
    dispatch(api.util.invalidateTags([ATOMS_CACHE_TAG, TAG_CACHE_TAG, TYPE_CACHE_TAG]))
  }

  const fetchFn = (data: any) => {
    return importAdminData({
      variables: {
        input: {
          payload: data
        },
      },
    })
      .unwrap()
      .then(onRequestSuccess)
      .catch(onError)
  }

  return <ImportUpload fetchFn={fetchFn} />
}