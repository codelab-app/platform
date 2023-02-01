import type { InputProps } from 'antd'
import React, { useEffect, useState } from 'react'
import type { FieldProps } from 'uniforms'
import { connectField } from 'uniforms'
import { TextField } from 'uniforms-antd'
import slugify from 'voca/slugify'

type SlugFieldBaseProps = FieldProps<string, Omit<InputProps, 'onReset'>> & {
  // The string from which the slug will be calculated
  srcString: string
  value?: string
  onChange: (value: string) => void
}

const SlugFieldBase = (props: SlugFieldBaseProps) => {
  const { name, value, onChange, srcString } = props
  const [curValue, setCurValue] = useState(value || '')

  useEffect(() => {
    // Sets the current value to the value prop when it changes
    setCurValue(slugify(srcString))
  }, [srcString])

  useEffect(() => {
    // Calls the params.onChange when the current value changes either
    // by user input or when the selected atom or component change
    onChange(curValue)
  }, [curValue, onChange])

  return (
    <TextField
      disabled={props.disabled}
      name={name}
      onChange={(newValue) => setCurValue(newValue)}
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      type={props.type ?? 'text'}
      value={curValue}
    />
  )
}

export const SlugField = connectField(SlugFieldBase, {
  kind: 'leaf',
})
