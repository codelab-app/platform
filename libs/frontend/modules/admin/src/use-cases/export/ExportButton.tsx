import { Button } from 'antd'
import fileDownload from 'js-file-download'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import sanitizeFilename from 'sanitize-filename'
import { WithAdminService } from '../../store'

export const ExportButton = observer<WithAdminService>(({ adminService }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onClickExport = () => {
    setIsLoading(true)
    adminService
      .exportData()
      .then((exportedResources) => {
        fileDownload(exportedResources, sanitizeFilename(`data.codelab.json`))
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <Button disabled={isLoading} onClick={onClickExport}>
      Export
    </Button>
  )
})
