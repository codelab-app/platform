import { useGetAtomsQuery } from '@codelab/frontend/modules/atom'
import { useGetTagGraphsQuery } from '@codelab/frontend/modules/tag'
import {useGetAllTypesQuery} from '@codelab/frontend/modules/type'
import { Button } from 'antd'
import fileDownload from 'js-file-download'
import { useGetInterfaceTypesWithFieldsQuery } from 'libs/frontend/modules/type/src/graphql/get-type.endpoints.v2.graphql.gen'
import React from 'react'
import sanitizeFilename from 'sanitize-filename'

export const ExportButton = () => {
  // Tags data
  const { data: tagsData } = useGetTagGraphsQuery()
  const tags = tagsData?.tagGraphs ?? { vertices: [], edges: [] }

  // All Types Data
  const {data: allData}= useGetAllTypesQuery()
  const allTypes = allData?.types ?? []
  // InterfaceTypesWithFields....
  const { data: typesData } = useGetInterfaceTypesWithFieldsQuery()
  const interfaceTypes = typesData?.types ?? []

  // Atoms Data
  const { data: atomsData } = useGetAtomsQuery()
  const atoms = atomsData?.atoms ?? []

  const exportData: any = {
    tags,
    allTypes,
    interfaceTypes,
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
