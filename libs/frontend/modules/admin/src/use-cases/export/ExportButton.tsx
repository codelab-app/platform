import { Button } from 'antd'
import React, { useState } from 'react'
import fileDownload from 'js-file-download'
import sanitizeFilename from 'sanitize-filename'
import { useGetTagGraphsQuery, useTagTree } from '@codelab/frontend/modules/tag'
import { useGetAllTypesQuery } from '@codelab/frontend/modules/type'
import { useGetAtomsQuery } from '@codelab/frontend/modules/atom'
import { ATOMS_CACHE_TAG } from '@codelab/frontend/model/infra/redux'

export const ExportButton = () => {
  // Tags data
  const { data: tagsData }  = useGetTagGraphsQuery()
  const tagTree = useTagTree(tagsData?.tagGraphs)
  const tags = tagTree.getAllVertices()
  
  //All Types Data
  const { data: typesData } = useGetAllTypesQuery()
  console.log('render all data types', typesData)
  const types = typesData?.types ?? []
  // Atoms Data
  const {data: atomsData} = useGetAtomsQuery()
  const atoms = atomsData?.atoms ?? []

  const exportData: any = {
    tags,
    types,
    atoms
  }

  const onClickExport = () => {
    fileDownload(
      JSON.stringify(exportData),
      sanitizeFilename(`data.codelab.json`),
    )
  }

  return <Button onClick={onClickExport}>Export</Button>
}
