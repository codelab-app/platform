import { TreeSelect, TreeSelectProps } from 'antd'
import { useState } from 'react'
import { connectField, FieldProps } from 'uniforms'

export type CustomTreeSelectProps = FieldProps<Array<string>, TreeSelectProps>

const { SHOW_PARENT } = TreeSelect

const TreeSelectComponent = function ({
  label,
  treeData,
  onChange,
  value = [],
}: CustomTreeSelectProps) {
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
          label: 'title',
          value: 'id',
          children: 'children',
        }}
        onChange={(v) => {
          onValueChange(v)
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
