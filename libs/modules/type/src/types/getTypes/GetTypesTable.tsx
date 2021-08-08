import { useGetTypesQuery } from '@codelab/codegen/graphql'
import { EntityType, useCrudModalForm } from '@codelab/frontend/shared'
import Search from 'antd/lib/input/Search'
import debounce from 'lodash/debounce'
import React, { ChangeEventHandler, useState } from 'react'
import tw from 'twin.macro'
import { TypesTable } from './TypesTable'

export const GetTypesTable = () => {
  const [searchValue, setSearchValue] = useState<string | undefined>()
  const { openDeleteModal, openUpdateModal } = useCrudModalForm(EntityType.Type)

  const { data, loading } = useGetTypesQuery({
    variables: {
      input: searchValue ? { byName: { name: searchValue } } : undefined,
    },
  })

  const types = data?.getTypes ?? []

  return (
    <>
      <div css={tw`my-2`}>
        <Search
          loading={loading}
          placeholder="Search"
          onSearch={(v) => setSearchValue(v)}
          onChange={debounce<ChangeEventHandler>(
            (event) => setSearchValue((event.target as any).value),
            500,
          )}
        />
      </div>
      <TypesTable
        tableProps={{ loading }}
        types={types}
        onDeleteClick={(type) => openDeleteModal([type.id], type)}
        onEditClick={(type) => openUpdateModal(type.id, type)}
      />
    </>
  )
}
