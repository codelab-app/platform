import { TreeSelect, TreeSelectProps } from 'antd'
import { useState } from 'react'
import { connectField, FieldProps } from 'uniforms'

export type CustomTreeSelectProps = FieldProps<Array<string>, TreeSelectProps>

const { SHOW_PARENT } = TreeSelect

const TreeSelectComponent = function ({
  label,
  treeData,
  value = [],
}: CustomTreeSelectProps) {
  const [tags, setTags] = useState(value)

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
          setTags(v)
        }}
        placeholder="Please select"
        showCheckedStrategy={SHOW_PARENT}
        style={{
          width: '100%',
        }}
        treeCheckable={true}
        treeData={treeData}
        value={tags}
      />
    </div>
  )
}

const TreeSelectField = connectField(TreeSelectComponent)

export default TreeSelectField
