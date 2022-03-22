import { useNotify } from '@codelab/frontend/shared/utils'
import { ImportUpload } from '@codelab/frontend/view/components'
import React from 'react'
import { useImportAdminDataMutation } from '../../graphql/Admin.endpoints.v2.graphql.gen'

export const ImportButton = () => {
  const [importAdminData] = useImportAdminDataMutation()

  const { onSuccess, onError } = useNotify(
    { title: 'Admin data successfully imported' },
    { title: 'Error while importing admin data' },
  )

  const fetchFn = (data: any) => {
    return importAdminData({
      variables: {
        input: {
          payload: data,
        },
      },
    })
      .unwrap()
      .then(onSuccess)
      .catch(onError)
  }

  return <ImportUpload fetchFn={fetchFn} />
}
