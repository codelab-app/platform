'use client'

import type {
  IRuntimeComponentModel,
  IRuntimeElementModel,
} from '@codelab/frontend/abstract/application'

import { isRuntimeComponent } from '@codelab/frontend/abstract/application'
import { propSafeStringify } from '@codelab/frontend-domain-prop/utils'
import { CodeMirrorEditor } from '@codelab/frontend-presentation-components-codemirror'
import { ICodeMirrorLanguage } from '@codelab/shared/abstract/core'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'

import { usePropsInspector } from '../../hooks'

const PropsInspectorTab = observer<{
  runtimeNode: IRuntimeComponentModel | IRuntimeElementModel
}>(({ runtimeNode }) => {
  const { isLoading, lastRenderedProp, nodeLabel, save } =
    usePropsInspector(runtimeNode)

  const node = isRuntimeComponent(runtimeNode)
    ? runtimeNode.component.current
    : runtimeNode.element.current

  const initialProps = node.props.jsonString
  const [editedProp, setEditedProp] = useState(initialProps)
  const isSaved = editedProp === initialProps

  return (
    <div className="w-full">
      <h3 className="text-gray-700">Current props</h3>
      <CodeMirrorEditor
        height="150px"
        language={ICodeMirrorLanguage.Json}
        onChange={() => undefined}
        readOnly
        title="Current props"
        value={propSafeStringify(lastRenderedProp)}
      />

      <h3 className="text-gray-700">{nodeLabel} props</h3>
      <CodeMirrorEditor
        height="150px"
        language={ICodeMirrorLanguage.Json}
        onChange={(value) => {
          setEditedProp(value)
        }}
        onSave={(value) => save(value)}
        title={`${nodeLabel} props`}
        value={editedProp}
      />
      <Button
        disabled={isSaved}
        loading={isLoading}
        onClick={() => save(editedProp)}
      >
        Save
      </Button>
    </div>
  )
})

export { PropsInspectorTab }
