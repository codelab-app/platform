import { type IPageNodeRef, isElement } from '@codelab/frontend/abstract/domain'
import { useStore } from '@codelab/frontend/application/shared/store'
import { propSafeStringify } from '@codelab/frontend/domain/prop'
import { CodeMirrorEditor } from '@codelab/frontend/presentation/view'
import { ICodeMirrorLanguage } from '@codelab/shared/abstract/core'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { usePropsInspector } from '../../hooks'

const PropsInspectorTab = observer<{ node: IPageNodeRef }>(({ node }) => {
  const { rendererService } = useStore()
  const { isLoading, nodeLabel, save } = usePropsInspector(node)
  const initialProps = node.current.props.jsonString
  const [editedProp, setEditedProp] = useState(initialProps)
  const isSaved = editedProp === initialProps

  const runtimeModel = isElement(node.current)
    ? rendererService.getRuntimeElement(node.current)
    : rendererService.getRuntimeContainerNode(node.current)

  const lastRenderedProp = runtimeModel?.runtimeProps?.evaluatedProps || {}

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
        onChange={(value) => setEditedProp(value)}
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
