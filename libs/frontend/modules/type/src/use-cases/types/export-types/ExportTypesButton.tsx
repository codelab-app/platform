import { DownloadOutlined } from '@ant-design/icons'
import { useLoadingState } from '@codelab/frontend/shared/utils'
import { Button, Tooltip } from 'antd'
import fileDownload from 'js-file-download'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { WithTypeImportService, WithTypeService } from '../../../store'

export const ExportTypesButton = observer<
  WithTypeImportService & WithTypeService
>(({ typeImportService, typeService }) => {
  const [onClick, { isLoading }] = useLoadingState(async () => {
    if (typeService.selectedIds.size === 0) {
      return
    }

    const content = await typeImportService.exportTypes([
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
