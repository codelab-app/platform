import { useGetAtomsQuery } from '@codelab/frontend/modules/atom'
import { useGetTagGraphsQuery } from '@codelab/frontend/modules/tag'
import { Button } from 'antd'
import fileDownload from 'js-file-download'
import React from 'react'
import sanitizeFilename from 'sanitize-filename'
import { useExportAllTypesGraphQuery } from '../../graphql/Admin.endpoints.v2.graphql.gen'

export const ExportButton = () => {
  // Tags data
  const { data: tagsData } = useGetTagGraphsQuery()
  const tags = tagsData?.tagGraphs ?? { vertices: [], edges: [] }
  // // All Types Data
  const { data, isLoading } = useExportAllTypesGraphQuery()
  const typesGraph = data?.exportAllTypesGraph
  // // Atoms Data
  const { data: atomsData } = useGetAtomsQuery()
  const atoms = atomsData?.atoms ?? []

  const onClickExport = () => {
    const exportData: any = {
      tags,
      typesGraph,
      atoms,
    }

    fileDownload(
      JSON.stringify(exportData),
      sanitizeFilename(`data.codelab.json`),
    )
  }

  return (
    <Button disabled={isLoading} onClick={onClickExport}>
      Export
    </Button>
  )
}
