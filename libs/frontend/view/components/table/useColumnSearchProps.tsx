import { SearchOutlined } from '@ant-design/icons'
import { Maybe } from '@codelab/shared/abstract/types'
import { Button, Input, InputRef, Space, TableColumnProps } from 'antd'
import React, { useCallback, useEffect, useRef, useState } from 'react'

export const useColumnSearchProps = <RecordType extends object>(
  dataIndex: keyof RecordType,
  onSearchTextChange?: (value: string) => void,
) => {
  const searchInputRef = useRef<null | InputRef>(null)
  const [searchText, setSearchText] = useState('')

  const handleSearch = useCallback(() => {
    onSearchTextChange?.(searchText)
  }, [searchText, onSearchTextChange])

  const handleReset = (clearFilters: Maybe<() => void>) => {
    if (clearFilters !== undefined) {
      clearFilters()
    }

    setSearchText('')
  }

  useEffect(() => {
    handleSearch()
  }, [searchText, onSearchTextChange, handleSearch])

  return {
    filterDropdown: ({ setSelectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : [])
            confirm({ closeDropdown: false })
            setSearchText(e.target.value)
          }}
          onPressEnter={() => {
            confirm({ closeDropdown: false })
            handleSearch()
          }}
          placeholder={`Search ${dataIndex.toString()}`}
          ref={(node) => {
            searchInputRef.current = node
          }}
          style={{ marginBottom: 8, display: 'block' }}
          value={searchText}
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
