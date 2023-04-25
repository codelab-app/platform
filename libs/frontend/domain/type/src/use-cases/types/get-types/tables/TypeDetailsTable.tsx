import { useStore } from '@codelab/frontend/presentation/container'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { useAsync, useMountEffect } from '@react-hookz/web'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { EnumTypeTable } from './EnumTypeTable'
import { FieldsTable } from './FieldsTable'
import { UnionTypeTable } from './UnionTypeTable'

interface TypeDetailsTableProps {
  typeId: string
}

export const TypeDetailsTable = observer(
  ({ typeId }: TypeDetailsTableProps) => {
    const { fieldService, typeService } = useStore()

    const [{ error, result: type, status }, getOne] = useAsync(() =>
      typeService.getOne(typeId),
    )

    useMountEffect(getOne.execute)

    if (error) {
      return <div>Error</div>
    }

    return type?.kind === ITypeKind.InterfaceType ? (
      <FieldsTable
        fieldService={fieldService}
        interfaceType={type}
        isLoading={status === 'loading'}
        typeService={typeService}
      />
    ) : type?.kind === ITypeKind.UnionType ? (
      <UnionTypeTable
        fieldService={fieldService}
        isLoading={status === 'loading'}
        typeService={typeService}
        unionType={type}
      />
    ) : type?.kind === ITypeKind.EnumType ? (
      <EnumTypeTable enumType={type} />
    ) : (
      <div>No data</div>
    )
  },
)
