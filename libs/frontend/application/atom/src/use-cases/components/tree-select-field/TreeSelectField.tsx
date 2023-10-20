import type { TreeSelectProps } from 'antd'
import { TreeSelect } from 'antd'
import React, { useState } from 'react'
import type { FieldProps } from 'uniforms'
import { connectField } from 'uniforms'

export type CustomTreeSelectProps = FieldProps<Array<string>, TreeSelectProps>

const { SHOW_PARENT } = TreeSelect

const TreeSelectComponent = ({
  label,
  onChange,
  treeData,
  value = [],
}: CustomTreeSelectProps) => {
  const [tagIds, setTagIds] = useState(value)

  const onValueChange = (ids: Array<string>) => {
    setTagIds(ids)
    onChange(ids)
  }

  return (
    <div className="TreeSelectField">
      <label>
        <div>{label}</div>
      </label>
      <TreeSelect
        fieldNames={{
          children: 'children',
          label: 'title',
          value: 'id',
        }}
        onChange={(_value) => {
          onValueChange(_value)
        }}
        placeholder="Please select"
        showCheckedStrategy={SHOW_PARENT}
        style={{
          width: '100%',
        }}
        treeCheckable={true}
        treeData={treeData}
        value={tagIds}
      />
    </div>
  )
}

export const TreeSelectField = connectField(TreeSelectComponent)
