import { IFieldService, ITypeService } from '@codelab/frontend/abstract/core'
import { Spin } from 'antd'
import React from 'react'
import { useAsync } from 'react-use'
import { FieldsTable } from '../../fields'
import { UnionMembersTable } from '../../union-members/get-union-members/UnionMembersTable'

interface NestedTypeTableProps {
  typeId: string
  typeService: ITypeService
  fieldService: IFieldService
}

export const NestedTypeTable = ({
  typeId,
  fieldService,
  typeService,
}: NestedTypeTableProps) => {
  const {
    loading,
    error,
    value: type,
  } = useAsync(() => typeService.getOne(typeId))

  if (loading) {
    return <Spin />
  }

  if (error) {
    return <div>Error</div>
  }

  return type?.kind === 'InterfaceType' ? (
    <FieldsTable
      fieldService={fieldService}
      interfaceType={type}
      isLoading={loading}
      typeService={typeService}
    />
  ) : type?.kind === 'UnionType' ? (
    <UnionMembersTable
      fieldService={fieldService}
      isLoading={loading}
      typeService={typeService}
      unionType={type}
    />
  ) : (
    <div>No data</div>
  )
}
