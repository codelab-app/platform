import type { IPageCreateFormData } from '@codelab/shared/abstract/core'
import type { TextFieldProps } from 'uniforms-antd'

import { slugify } from '@codelab/shared/utils'
import { Switch, Tooltip } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { useField, useForm } from 'uniforms'
import { TextField } from 'uniforms-antd'

const getStoredAutoGenerate = (pageId: string) =>
  JSON.parse(localStorage.getItem(pageId) || 'true')

const setStoredAutoGenerate = (pageId: string, autoGenerate: boolean) =>
  localStorage.setItem(pageId, JSON.stringify(autoGenerate))

export const UrlPatternField = (props: TextFieldProps) => {
  const { model } = useForm<IPageCreateFormData>()
  const [nameField] = useField<{ value?: string }>('name', {})
  const [field] = useField(props.name, props)

  const [autoGenerate, setAutoGenerate] = useState<boolean>(
    getStoredAutoGenerate(model.id),
  )

  const setUrlFromName = useCallback(() => {
    field.onChange(nameField.value ? `/${slugify(nameField.value)}` : undefined)
  }, [field, nameField.value])

  useEffect(() => {
    if (!autoGenerate) {
      return
    }

    setUrlFromName()
  }, [nameField.value, autoGenerate])

  const onAutoGenerateChange = useCallback((value: boolean) => {
    setAutoGenerate(value)
    setStoredAutoGenerate(model.id, value)
  }, [])

  return (
    <TextField
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      addonAfter={
        <Tooltip title="Auto generate page url">
          <Switch checked={autoGenerate} onChange={onAutoGenerateChange} />
        </Tooltip>
      }
      disabled={autoGenerate}
    />
  )
}
