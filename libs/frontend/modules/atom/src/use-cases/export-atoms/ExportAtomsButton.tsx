import { DownloadOutlined } from '@ant-design/icons'
import { useLoadingState } from '@codelab/frontend/shared/utils'
import { Button, Tooltip } from 'antd'
import fileDownload from 'js-file-download'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { WithAtomService } from '../../store'
import { WithAtomImportService } from '../../store/atom-import.service'

export const ExportAtomsButton = observer<
  WithAtomImportService & WithAtomService
>(({ atomImportService, atomService }) => {
  const [onClick, { isLoading }] = useLoadingState(async () => {
    if (atomService.selectedIds.size === 0) {
      return
    }

    const content = await atomImportService.exportAtoms([
      ...atomService.selectedIds.values(),
    ])

    fileDownload(content, 'atoms.json')
  })

  return (
    <Tooltip arrowPointAtCenter title="Export atoms">
      <Button
        disabled={atomService.selectedIds.size === 0}
        icon={<DownloadOutlined />}
        loading={isLoading}
        onClick={onClick}
      >
        Export
      </Button>
    </Tooltip>
  )
})
