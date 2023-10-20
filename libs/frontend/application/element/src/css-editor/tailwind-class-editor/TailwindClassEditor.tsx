import { CloseOutlined } from '@ant-design/icons'
import type { IElementModel } from '@codelab/frontend/abstract/domain'
import { Select, Space } from 'antd'
import type { CustomTagProps } from 'rc-select/lib/BaseSelect'
import React, { useState } from 'react'
import * as Styled from './styles'
import {
  extractVariant,
  getOnlyColorValue,
  getValidTailwindClasses,
  isColorClass,
} from './tailwind-utils'

const getInitialTailwindClasses = () => {
  return getValidTailwindClasses('').map((className) => ({
    label: className,
    value: className,
  }))
}

export const TailwindClassEditor = ({
  element,
}: {
  element: IElementModel
}) => {
  const [options, setOptions] = useState<
    Array<{ value: string; label: string }>
  >(getInitialTailwindClasses())

  const [selectedOptions, setSelectedOptions] = useState<Array<string>>(
    element.tailwindClassNames ?? [],
  )

  const handleChange = (values: Array<string>) => {
    element.setTailwindClassNames(values)
    setSelectedOptions(values)
  }

  const appendClassName = (value: string) => {
    if (!selectedOptions.includes(value)) {
      element.setTailwindClassNames([...selectedOptions, value])
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
    <div className="mb-4">
      <Styled.Label>Tailwind Classes :</Styled.Label>
      <Select
        allowClear
        defaultValue={element.tailwindClassNames ?? []}
        mode="multiple"
        onChange={handleChange}
        onDropdownVisibleChange={() => {
          element.setTailwindClassNames(selectedOptions)
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
            <Select.Option
              key={option.value}
              label={option.label}
              value={option.value}
            >
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
    </div>
  )
}

const TagRender = (props: CustomTagProps) => {
  const { onClose, value } = props

  return (
    <Styled.CustomOption>
      <ColorBox color={value} withPlaceholder={false} />
      {value}
      <CloseOutlined onClick={onClose} />
    </Styled.CustomOption>
  )
}

const ColorBox = ({
  color,
  withPlaceholder = true,
}: {
  color: string
  withPlaceholder?: boolean
}) => {
  if (!isColorClass(color)) {
    return withPlaceholder ? <Styled.BlankColorBox /> : null
  }

  const backgroundClassName = `bg-${getOnlyColorValue(color)}`

  return <Styled.ColorBox className={backgroundClassName} />
}
