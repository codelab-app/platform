import { DownloadOutlined } from '@ant-design/icons'
import {
  IMPORT_TYPE_SERVICE,
  TYPE_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import { useLoadingState } from '@codelab/frontend/shared/utils'
import { Button, Tooltip } from 'antd'
import fileDownload from 'js-file-download'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const ExportTypesButton = observer<
  WithServices<TYPE_SERVICE | IMPORT_TYPE_SERVICE>
>(({ importTypeService, typeService }) => {
  const [onClick, { isLoading }] = useLoadingState(async () => {
    if (typeService.selectedIds.size === 0) {
      return
    }

    const content = await importTypeService.exportTypes([
      ...typeService.selectedIds.values(),
    ])

    fileDownload(content, 'types.json')
  })

  return (
    <Tooltip arrowPointAtCenter title="Export types">
      <Button
        disabled={typeService.selectedIds.size === 0}
        icon={<DownloadOutlined />}
        loading={isLoading}
        onClick={onClick}
      >
        Export
      </Button>
    </Tooltip>
  )
})
