import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import Style from './CuiSearchBar.module.css'

interface CuiSearchBarProps {
  searchKeyword?: string
  onKeywordChange(value: string): void
}

export const CuiSearchBar = ({
  onKeywordChange,
  searchKeyword = '',
}: CuiSearchBarProps) => {
  const [currentSearchKeyword, setCurrentSearchKeyword] =
    useState(searchKeyword)

  useEffect(() => {
    setCurrentSearchKeyword(searchKeyword)
  }, [searchKeyword])

  const handleChange = (value: string) => {
    setCurrentSearchKeyword(value)
    onKeywordChange(value)
  }

  return (
    <div
      className={classNames(
        Style.cuiSearchBar,
        `w-full border-0 border-b border-solid border-gray-300`,
      )}
    >
      <Input
        className="border"
        onChange={(event) => handleChange(event.target.value)}
        placeholder="Search"
        prefix={<SearchOutlined />}
        size="small"
        value={currentSearchKeyword}
      />
    </div>
  )
}
