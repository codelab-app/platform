import { SearchOutlined } from '@ant-design/icons'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { InputRef, TableColumnProps } from 'antd'
import { Button, Input, Space } from 'antd'
import React, { useCallback, useEffect, useRef, useState } from 'react'

interface ColumnSearchProps<RecordType extends object> {
  dataIndex: keyof RecordType
  text?: string | null
  onSearch?(searchText: string): void
}

export const useColumnSearchProps = <RecordType extends object>({
  dataIndex,
  onSearch,
  text = null,
}: ColumnSearchProps<RecordType>) => {
  const searchInputRef = useRef<InputRef | null>(null)
  const [searchText, setSearchText] = useState<string | null>(text)

  const handleSearch = useCallback(() => {
    if (searchText) {
      onSearch?.(searchText)
    }
  }, [searchText, onSearch])

  const handleReset = (clearFilters: Maybe<() => void>) => {
    if (clearFilters !== undefined) {
      clearFilters()
    }

    setSearchText(null)
  }

  useEffect(() => {
    handleSearch()
  }, [searchText])

  useEffect(() => {
    // Only set if not set
    if (!searchText) {
      setSearchText(text)
    }
  }, [text])

  console.log(text, searchText)

  return {
    filterDropdown: ({ clearFilters, confirm, setSelectedKeys }) => (
      <div style={{ padding: 8 }}>
        <Input
          onChange={(error) => {
            setSelectedKeys(error.target.value ? [error.target.value] : [])
            confirm({ closeDropdown: false })
            setSearchText(error.target.value)
          }}
          onPressEnter={() => {
            confirm({ closeDropdown: false })
            handleSearch()
          }}
          placeholder={`Search ${dataIndex.toString()}`}
          ref={(node) => {
            searchInputRef.current = node
          }}
          style={{ display: 'block', marginBottom: 8 }}
          value={searchText ?? ''}
        />
        <Space>
          {/* <Button */}
          {/*  type="primary" */}
          {/*  onClick={() => handleSearch(selectedKeys, confirm)} */}
          {/*  icon={<SearchOutlined />} */}
          {/*  size="small" */}
          {/*  style={{ width: 90 }} */}
          {/* > */}
          {/*  Search */}
          {/* </Button> */}
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
          {/* <Button */}
          {/*  type="link" */}
          {/*  size="small" */}
          {/*  onClick={() => { */}
          {/*    confirm({ closeDropdown: false }) */}
          {/*    setState({ */}
          {/*      searchText: selectedKeys[0] as string, */}
          {/*      searchedColumn: dataIndex, */}
          {/*    }) */}
          {/*  }} */}
          {/* > */}
          {/*  Filter */}
          {/* </Button> */}
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      `${record[dataIndex]}`
        .toLowerCase()
        .includes((value as string).toLowerCase()) || '',
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInputRef.current?.select(), 100)
      }
    },
  } as TableColumnProps<RecordType>
}
