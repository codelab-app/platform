import { InfoCircleOutlined } from '@ant-design/icons'
import { Checkbox, Tooltip } from 'antd'
import React from 'react'

export const CodelabCheckboxWidget = (props: any) => {
  console.log(`Checkbox props ${props}`)
  const {
    schema,
    id,
    value,
    disabled,
    readonly,
    formContext,
    label,
    autofocus,
    onBlur,
    onFocus,
    onChange,
    DescriptionField,
  } = props

  const { readonlyAsDisabled = true } = formContext

  const handleChange = ({ target }: any) => onChange(target.checked)

  return (
    <div>
      <Checkbox
        autoFocus={autofocus}
        disabled={disabled || (readonlyAsDisabled && readonly)}
        checked={typeof value === 'undefined' ? false : value}
        onChange={!readonly ? handleChange : undefined}
      >
        {label}
      </Checkbox>
      {schema.description ? (
        <Tooltip placement="rightTop" title={schema.description}>
          <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
        </Tooltip>
      ) : (
        ''
      )}
    </div>
  )
}
