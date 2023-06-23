import { Input } from 'antd'
import type { InputProps } from 'antd/lib/input'
import React from 'react'
import tw from 'twin.macro'
import { numberRegex } from '../../util'

export interface CuiInputProps {
  defaultValue?: InputProps['defaultValue']
  disabled?: InputProps['disabled']
  id?: InputProps['id']
  maxLength?: InputProps['maxLength']
  onPressEnter?: InputProps['onPressEnter']
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
  type = 'text',
  value,
}: CuiInputProps) => {
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

  return (
    <Input
      bordered={false}
      css={tw`
      w-6
      h-5
      p-0
      m-0
      box-border
      border-0
      border-dotted
      border-b
      rounded-none
    border-black
      text-sm
      text-center
      bg-none
      focus:outline-none
    `}
      defaultValue={defaultValue}
      disabled={disabled}
      id={id}
      maxLength={maxLength}
      onChange={handleChange}
      onPressEnter={onPressEnter}
      value={value}
    />
  )
}
