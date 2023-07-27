import type { InputRef } from 'antd'
import { Input } from 'antd'
import type { InputProps } from 'antd/lib/input'
import React, { useRef } from 'react'
import { numberRegex } from '../../util'

export interface CuiInputProps {
  defaultValue?: InputProps['defaultValue']
  disabled?: InputProps['disabled']
  id?: InputProps['id']
  maxLength?: InputProps['maxLength']
  onPressEnter?: InputProps['onPressEnter']
  selectAllOnClick?: boolean
  type?: 'number' | 'text'
  value?: InputProps['value']
  onChange?(value: number | string): void
}

export const CuiInput = ({
  defaultValue,
  disabled,
  id,
  maxLength,
  onChange,
  onPressEnter,
  selectAllOnClick = false,
  type = 'text',
  value,
}: CuiInputProps) => {
  const inputRef = useRef<InputRef>(null)

  const handleChange = ({
    target: { value: inputValue },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'text') {
      onChange?.(inputValue)

      return
    }

    if (
      numberRegex.test(inputValue) ||
      inputValue === '' ||
      inputValue === '-'
    ) {
      onChange?.(Number(inputValue))
    }
  }

  const handleClick = () => {
    if (selectAllOnClick) {
      inputRef.current?.focus({
        cursor: 'all',
      })
    }
  }

  return (
    <Input
      bordered={false}
      className={`
      m-0
      box-border
      h-5
      w-6
      rounded-none
      border-0
      border-b
      border-dotted
      border-black
    bg-none
      p-0
      text-center
      text-sm
      focus:outline-none
    `}
      defaultValue={defaultValue}
      disabled={disabled}
      id={id}
      maxLength={maxLength}
      onChange={handleChange}
      onClick={handleClick}
      onPressEnter={onPressEnter}
      ref={inputRef}
      value={value}
    />
  )
}
