import { UseResizable } from '@codelab/frontend/view/components'
import React, { HTMLProps, useEffect, useState } from 'react'
import Button from 'antd/lib/button'
import { editorPaneHeight } from '../../templates/Dashboard/constants'

type EditorPaneTogglerProps = {
  resizable: UseResizable
  className?: string
}

export const EditorPaneToggler = ({
  resizable,
  className,
}: EditorPaneTogglerProps) => {
  const [isPaneCollapsable, makePaneCollapsable] = useState(false)

  useEffect(() => {
    const onHeightChange = () => {
      const currentHeight = resizable.height.get()

      if (currentHeight === editorPaneHeight.collapsed) {
        makePaneCollapsable(true)
        return
      }

      makePaneCollapsable(false)
    }

    const unsubscribe = resizable.height.onChange(onHeightChange)
    return unsubscribe
  }, [])

  const onPaneToggle = () => {
    if (isPaneCollapsable) {
      resizable.height.set(editorPaneHeight.expanded)
      return
    }

    resizable.height.set(editorPaneHeight.collapsed)
  }

  return (
    <Button className={className} onClick={onPaneToggle}>
      {isPaneCollapsable ? 'Expand Pane' : 'Collapse Pane'}
    </Button>
  )
}
