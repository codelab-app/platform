import type {
  IFieldService,
  ITypeService,
} from '@codelab/frontend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { Spin } from 'antd'
import React from 'react'
import { useAsync } from 'react-use'
import { EnumTypeTable } from './EnumTypeTable'
import { FieldsTable } from './FieldsTable'
import { UnionTypeTable } from './UnionTypeTable'

interface TypeDetailsTableProps {
  typeId: string
  typeService: ITypeService
  fieldService: IFieldService
}

export const TypeDetailsTable = ({
  typeId,
  fieldService,
  typeService,
}: TypeDetailsTableProps) => {
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

  return type?.kind === ITypeKind.InterfaceType ? (
    <FieldsTable
      fieldService={fieldService}
      interfaceType={type}
      isLoading={loading}
      typeService={typeService}
    />
  ) : type?.kind === ITypeKind.UnionType ? (
    <UnionTypeTable
      fieldService={fieldService}
      isLoading={loading}
      typeService={typeService}
      unionType={type}
    />
  ) : type?.kind === ITypeKind.EnumType ? (
    <EnumTypeTable enumType={type} />
  ) : (
    <div>No data</div>
  )
}
