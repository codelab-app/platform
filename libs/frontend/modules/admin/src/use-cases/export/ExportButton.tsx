import { useGetAtomsQuery } from '@codelab/frontend/modules/atom'
import { useGetTagGraphsQuery, useTagTree } from '@codelab/frontend/modules/tag'
import { useGetAllTypesQuery } from '@codelab/frontend/modules/type'
import { Button } from 'antd'
import fileDownload from 'js-file-download'
import React from 'react'
import sanitizeFilename from 'sanitize-filename'

export const ExportButton = () => {
  // Tags data
  const { data: tagsData } = useGetTagGraphsQuery()
  const tagTree = useTagTree(tagsData?.tagGraphs)

  const tags = tagTree.getAllVertices().map((vertex) => {
    return {
      id: vertex.id,
      isRoot: vertex.isRoot,
      parent: tagTree.getParentOf(vertex.id),
    }
  })

  // All Types Data
  const { data: typesData } = useGetAllTypesQuery()
  console.log('render all data types', typesData)

  const types = typesData?.types ?? []
  // Atoms Data
  const { data: atomsData } = useGetAtomsQuery()
  const atoms = atomsData?.atoms ?? []

  const exportData: any = {
    tags,
    types,
    atoms,
  }

  const onClickExport = () => {
    fileDownload(
      JSON.stringify(exportData),
      sanitizeFilename(`data.codelab.json`),
    )
  }

  return <Button onClick={onClickExport}>Export</Button>
}
