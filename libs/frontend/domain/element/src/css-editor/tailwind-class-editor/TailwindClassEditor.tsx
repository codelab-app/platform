import { CloseOutlined } from '@ant-design/icons'
import type { IElement } from '@codelab/frontend/abstract/core'
import { Select, Space } from 'antd'
import type { CustomTagProps } from 'rc-select/lib/BaseSelect'
import React, { useState } from 'react'
import styled from 'styled-components'
import {
  getOnlyColorValue,
  getValidTailwindClasses,
  isColorClass,
} from './tailwind-utils'

const Label = styled.span`
  display: inline-flex;
  align-items: center;
  height: 32px;
`

const getInitialTailwindClasses = () => {
  return getValidTailwindClasses('').map((className) => ({
    label: className,
    value: className,
  }))
}

export const TailwindClassEditor = ({ element }: { element: IElement }) => {
  const [options, setOptions] = useState<
    Array<{ value: string; label: string }>
  >(getInitialTailwindClasses())

  const [selectedOptions, setSelectedOptions] = useState<Array<string>>([])

  const handleChange = (values: Array<string>) => {
    element.setClassNames(values)
    setSelectedOptions(values)
  }

  const appendClassName = (value: string) => {
    if (!selectedOptions.includes(value)) {
      element.setClassNames([...selectedOptions, value])
    }
  }

  const previewClassName = () => {
    const activeOption = document.getElementsByClassName(
      'ant-select-item-option-active',
    )[0]

    if (activeOption) {
      const label = activeOption.getAttribute('label') ?? ''
      appendClassName(label)
    }
  }

  const handleSearch = (query: string) => {
    const extractedVariant = extractVariant(query)

    const foundClassNames = getValidTailwindClasses(
      extractedVariant.className,
    ).map((className) => {
      return {
        label: `${extractedVariant.variant}${className}`,
        value: `${extractedVariant.variant}${className}`,
      }
    })

    setOptions(foundClassNames)
  }

  return (
    <>
      <Label>Tailwind Classes :</Label>
      <Select
        allowClear
        defaultValue={element.classNames ?? []}
        mode="multiple"
        onChange={handleChange}
        onDropdownVisibleChange={() => {
          element.setClassNames(selectedOptions)
        }}
        onKeyUp={(event: React.KeyboardEvent<HTMLDivElement>) => {
          if (event.key !== 'Enter' && event.key !== 'Escape') {
            previewClassName()
          }
        }}
        onSearch={handleSearch}
        placeholder="Please select"
        style={{ width: '100%' }}
        tagRender={TagRender}
      >
        {options.map((option) => {
          return (
            <Select.Option label={option.label} value={option.value}>
              <Space onMouseMove={previewClassName}>
                <span aria-label={option.label} role="img">
                  <ColorBox color={option.value} />
                </span>
                {option.label}
              </Space>
            </Select.Option>
          )
        })}
      </Select>
    </>
  )
}

const CustomOption = styled.div`
  padding: 0px 6px;
  background-color: #edebeb;
  border: 1px solid #d9d8d8;
  border-radius: 12px;
  margin: 2px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2px;

  span {
    font-size: 12px;
  }
`

const TagRender = (props: CustomTagProps) => {
  const { onClose, value } = props

  return (
    <CustomOption>
      <ColorBox color={value} withPlaceholder={false} />
      {value}
      <CloseOutlined onClick={onClose} />
    </CustomOption>
  )
}

const StyledColorBox = styled.div`
  width: 10px;
  height: 10px;
  border: 0.3px solid lightgray;
`

const StyledBlankColorBox = styled.div`
  width: 10px;
  height: 10px;
  background-color: transparent;
`

const ColorBox = ({
  color,
  withPlaceholder = true,
}: {
  color: string
  withPlaceholder?: boolean
}) => {
  if (!isColorClass(color)) {
    return withPlaceholder ? <StyledBlankColorBox /> : null
  }

  const backgroundClassName = `bg-${getOnlyColorValue(color)}`

  return <StyledColorBox className={backgroundClassName} />
}

interface VariantResult {
  className: string
  variant: string
}

const extractVariant = (input: string): VariantResult => {
  // Trim the input string
  const trimmedInput = input.trim()
  // Match the pattern and extract the required portion
  // Modified regex to capture up to the last colon
  const match = trimmedInput.match(/^(.*?):(?=[^:]+$)/)

  if (match) {
    return {
      className: trimmedInput.slice(match[0].length),
      variant: match[1] + ':',
    }
  }

  return {
    className: trimmedInput,
    variant: '',
  }
}
