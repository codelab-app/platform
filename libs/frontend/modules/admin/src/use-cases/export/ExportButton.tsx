import { Button } from 'antd'
import fileDownload from 'js-file-download'
import React from 'react'
import sanitizeFilename from 'sanitize-filename'
import { useExportAdminDataQuery } from '../../graphql/Admin.endpoints.v2.graphql.gen'

export const ExportButton = () => {
  // All Types Data
  const { data, isLoading } = useExportAdminDataQuery()
  const exportedResources = data?.exportAdminData.result

  console.log(exportedResources)

  const onClickExport = () => {
    fileDownload(
      JSON.stringify(exportedResources),
      sanitizeFilename(`data.codelab.json`),
    )
  }

  return (
    <Button disabled={isLoading} onClick={onClickExport}>
      Export
    </Button>
  )
}
