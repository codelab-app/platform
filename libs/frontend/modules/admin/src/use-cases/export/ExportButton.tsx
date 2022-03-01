import { useGetAtomsQuery } from '@codelab/frontend/modules/atom'
import { useGetTagGraphsQuery, useTagTree } from '@codelab/frontend/modules/tag'
import {useGetAllTypesQuery} from '@codelab/frontend/modules/type'
import { Button } from 'antd'
import fileDownload from 'js-file-download'
import { useGetInterfaceTypesWithFieldsQuery } from 'libs/frontend/modules/type/src/graphql/get-type.endpoints.v2.graphql.gen'
import React from 'react'
import sanitizeFilename from 'sanitize-filename'

export const ExportButton = () => {
  // Tags data
  const { data: tagsData } = useGetTagGraphsQuery()
  const tagTree = useTagTree(tagsData?.tagGraphs)
  const rootTagId = tagTree.getRootVertex()?.id
  console.log('root tag id', rootTagId)
  let tags: any[] = []
  if(rootTagId) {
    tagTree.bfsVisit((v)=> {
      const parent = v.parent(v.data().id)[0]
      tags.push({
        id: v.data().id,
        name: v.data().name,
        isRoot: v.data().isRoot,
        parent: parent ? {id: parent.data().id, name: parent.data().name, isRoot: parent.data().isRoot} : undefined
      })
    }, rootTagId)
  }
  
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
