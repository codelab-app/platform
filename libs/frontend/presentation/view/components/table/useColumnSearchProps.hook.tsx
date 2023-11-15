import SearchOutlined from '@ant-design/icons/SearchOutlined'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { InputRef } from 'antd'
import { Button, Input, Space } from 'antd'
import type { ColumnType } from 'antd/lib/table'
import type { FilterDropdownProps } from 'antd/lib/table/interface'
import React, { useEffect, useRef, useState } from 'react'

interface ColumnSearchProps<RecordType extends object>
  extends Omit<ColumnType<RecordType>, 'dataIndex'> {
  dataIndex: keyof RecordType
  text?: string
  onSearch?(searchText: string): void
}

export const useColumnSearchProps = <RecordType extends object>({
  dataIndex,
  onSearch,
  text = '',
}: ColumnSearchProps<RecordType>) => {
  const searchInputRef = useRef<InputRef | null>(null)
  const [searchText, setSearchText] = useState(text)

  const handleReset = (clearFilters: Maybe<() => void>) => {
    clearFilters?.()
    setSearchText('')
  }

  useEffect(() => {
    onSearch?.(searchText)
  }, [searchText])

  return {
    filterDropdown: ({
      clearFilters,
      confirm,
      setSelectedKeys,
    }: FilterDropdownProps) => (
      <div style={{ padding: 8 }}>
        <Input
          onChange={(error) => {
            setSelectedKeys(error.target.value ? [error.target.value] : [])
            confirm({ closeDropdown: false })
            setSearchText(error.target.value)
          }}
          onPressEnter={() => {
            confirm({ closeDropdown: false })
            onSearch?.(searchText)
          }}
          placeholder={`Search ${dataIndex.toString()}`}
          ref={(node) => {
            searchInputRef.current = node
          }}
          style={{ display: 'block', marginBottom: 8 }}
          value={searchText}
        />
        <Space>
          <Button
            onClick={() => {
              handleReset(clearFilters)
              confirm({ closeDropdown: true })
            }}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilterDropdownVisibleChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => searchInputRef.current?.select(), 100)
      }
    },
  }
}
