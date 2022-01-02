import { SearchOutlined } from '@ant-design/icons'
import { Maybe } from '@codelab/shared/abstract/types'
import { Button, Input, Space, TableColumnProps } from 'antd'
import React, { useRef, useState } from 'react'

export const useColumnSearchProps = (dataIndex: string) => {
  const [state, setState] = useState({
    searchText: '',
    searchedColumn: '',
  })

  const searchInputRef = useRef<null | Input>(null)

  const handleSearch = (
    selectedKeys: Array<React.Key>,
    confirm: (params?: any) => void,
  ) => {
    confirm({ closeDropdown: false })
    setState({
      searchText: selectedKeys[0] as string,
      searchedColumn: dataIndex,
    })
  }

  const handleReset = (clearFilters: Maybe<() => void>) => {
    if (clearFilters !== undefined) {
      clearFilters()
    }

    setState({ searchText: '', searchedColumn: '' })
  }

  return {
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInputRef.current = node
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : [])
            handleSearch(selectedKeys, confirm)
          }}
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          {/* <Button*/}
          {/*  type="primary"*/}
          {/*  onClick={() => handleSearch(selectedKeys, confirm)}*/}
          {/*  icon={<SearchOutlined />}*/}
          {/*  size="small"*/}
          {/*  style={{ width: 90 }}*/}
          {/* >*/}
          {/*  Search*/}
          {/* </Button>*/}
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          {/* <Button*/}
          {/*  type="link"*/}
          {/*  size="small"*/}
          {/*  onClick={() => {*/}
          {/*    confirm({ closeDropdown: false })*/}
          {/*    setState({*/}
          {/*      searchText: selectedKeys[0] as string,*/}
          {/*      searchedColumn: dataIndex,*/}
          {/*    })*/}
          {/*  }}*/}
          {/* >*/}
          {/*  Filter*/}
          {/* </Button>*/}
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase())
        : '',
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInputRef?.current?.select(), 100)
      }
    },
  } as TableColumnProps<any>
}
