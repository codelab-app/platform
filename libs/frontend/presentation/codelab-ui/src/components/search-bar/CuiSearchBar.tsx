'use client'

import SearchOutlined from '@ant-design/icons/SearchOutlined'
import { Input } from 'antd'
import classNames from 'classnames'
import { useRef, useState } from 'react'
import { debounce } from 'remeda'

import Style from './CuiSearchBar.module.css'

interface CuiSearchBarProps {
  debounceTime?: number
  searchKeyword?: string
  onKeywordChange(value: string): void
}

export const CuiSearchBar = ({
  debounceTime = 0,
  onKeywordChange,
  searchKeyword = '',
}: CuiSearchBarProps) => {
  const [currentSearchKeyword, setCurrentSearchKeyword] =
    useState(searchKeyword)

  // Create a debounced version of onKeywordChange using Remeda
  const debouncedSearch = useRef(
    debounce(
      (nextValue: string) => {
        onKeywordChange(nextValue)
      },
      { waitMs: debounceTime },
    ),
  ).current

  const handleChange = (value: string) => {
    setCurrentSearchKeyword(value)

    // Call the debounced function using call method
    debouncedSearch.call(value)
  }

  return (
    <div
      className={classNames(
        Style['cuiSearchBar'],
        'w-full border-0 border-b border-solid border-gray-300',
      )}
    >
      <Input
        className="border"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(event.target.value)
        }}
        placeholder="Search"
        prefix={<SearchOutlined />}
        size="small"
        value={currentSearchKeyword}
      />
    </div>
  )
}
