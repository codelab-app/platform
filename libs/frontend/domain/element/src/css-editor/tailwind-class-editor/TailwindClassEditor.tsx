import type { IElement } from '@codelab/frontend/abstract/core'
import type { SelectProps } from 'antd'
import { Select, Space } from 'antd'
import { getPossibleTailwindClasses } from 'libs/frontend/domain/renderer/src/element/wrapper.utils'
import React, { useState } from 'react'
import styled from 'styled-components'

const Label = styled.span`
  display: inline-flex;
  align-items: center;
  height: 32px;
`

const getOptions = (value: string) => {
  console.log(getPossibleTailwindClasses(value))

  const allOptions = [
    {
      label: 'bg-red-100',
      value: 'bg-red-100',
    },
    {
      label: 'bg-red-200',
      value: 'bg-red-200',
    },
    {
      label: 'bg-red-300',
      value: 'bg-red-300',
    },
    {
      label: 'bg-red-400',
      value: 'bg-red-400',
    },
    {
      label: 'bg-red-500',
      value: 'bg-red-500',
    },
    {
      label: 'bg-red-600',
      value: 'bg-red-600',
    },
  ]

  return allOptions.filter((option) => option.label.startsWith(value))
}

export const TailwindClassEditor = ({ element }: { element: IElement }) => {
  const [options, setOptions] = useState<
    Array<{ value: string; label: string }>
  >([])

  const handleChange = (values: Array<string>) => {
    element.setClassNames(values)
  }

  const handleSearch = (query: string) => {
    setOptions(getOptions(query))
  }

  return (
    <>
      <Label>Tailwind Classes :</Label>
      <Select
        allowClear
        defaultValue={element.classNames ?? []}
        mode="multiple"
        onChange={handleChange}
        onSearch={handleSearch}
        options={options}
        placeholder="Please select"
        style={{ width: '100%' }}
      />
    </>
  )
}
