import { Button } from 'antd'
import fileDownload from 'js-file-download'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import sanitizeFilename from 'sanitize-filename'
import { WithAdminService } from '../../store'

export const ExportButton = observer<WithAdminService>(({ adminService }) => {
  // All Types Data
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const downloadFile = (data: Record<string, any>) => {
    fileDownload(JSON.stringify(data), sanitizeFilename(`data.codelab.json`))
  }

  const onClickExport = () => {
    setIsLoading(true)
    adminService
      .exportData()
      .then((response) => {
        const exportedResources = response
        downloadFile(exportedResources)
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <Button disabled={isLoading} onClick={onClickExport}>
      Export
    </Button>
  )
})
