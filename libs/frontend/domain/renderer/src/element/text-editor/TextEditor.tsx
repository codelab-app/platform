// ./components/Editor
import type { IElement } from '@codelab/frontend/abstract/core'
import { isAtomInstance, isElementRef } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presentation/container'
import { getDefaultFieldProps } from '@codelab/shared/utils'
import type { OutputData } from '@editorjs/editorjs'
import EditorJS from '@editorjs/editorjs'
import React, { memo, useEffect, useRef } from 'react'
import { EDITOR_TOOLS } from './editor.tools'

// props
interface Props {
  data?: OutputData
  holder: string
  onChange(val: OutputData): void
}

const TextEditor = ({ data, holder, onChange }: Props) => {
  const ref = useRef<EditorJS>()
  const { builderService, elementService, propService } = useStore()

  const onSubmit = (value: string) => {
    const element = elementService.element(holder)
    const props = element.props.current

    return propService.updateWithDefaultValuesApplied({
      data: { ...props.data.data, customText: value },
      defaultValues: getDefaultFieldProps(element.renderType?.current),
      id: props.id,
    })
  }

  const renderEditor = () => {
    const node = builderService.selectedNode

    if (!isElementRef(node)) {
      return false
    }

    const element = node.current as IElement

    return (
      isAtomInstance(element.renderType) &&
      element.renderType.current.allowCustomTextInjection
    )
  }

  useEffect(() => {
    if (!ref.current) {
      const editor = new EditorJS({
        data,
        holder: holder + 'editor',
        onChange: async (api, event) => {
          const outputData = await api.saver.save()
          // onChange(outputData)
          await onSubmit(JSON.stringify(outputData))
        },
        readOnly: renderEditor(),
        tools: EDITOR_TOOLS,
      })

      ref.current = editor
    }

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (ref.current && ref.current.destroy) {
        ref.current.destroy()
      }
    }
  }, [])

  return <div id={holder + 'editor'} />
}

export default memo(TextEditor)
