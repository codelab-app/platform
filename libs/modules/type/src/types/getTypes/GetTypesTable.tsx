import { useGetTypesQuery } from '@codelab/codegen/graphql'
import { EntityType, useCRUDModalForm } from '@codelab/frontend/shared'
import { Spin } from 'antd'
import React from 'react'
import { TypesTable } from './TypesTable'

export const GetTypesTable = () => {
  const { openDeleteModal, openUpdateModal } = useCRUDModalForm(EntityType.Type)
  const { data, loading } = useGetTypesQuery()

  if (loading) {
    return <Spin />
  }

  const types = data?.getTypes ?? []

  return (
    <TypesTable
      types={types}
      onDeleteClick={(type) => openDeleteModal([type.id], type)}
      onEditClick={(type) => openUpdateModal(type.id, type)}
    />
  )
}
