import { isRuntimeElement } from '@codelab/frontend/abstract/application'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { useEffect, useState } from 'react'

import type { CssProperty } from './css'

import { DefaultCssProperties } from './css'

export const useStyle = () => {
  const { builderService } = useApplicationStore()
  const selectedNode = builderService.selectedNode?.current
  const { runtimeElementService } = useApplicationStore()

  const [currentStyles, setCurrentStyles] = useState<{
    [key: string]: string
  }>()

  const currentStylePseudoClass = runtimeElementService.currentStylePseudoClass

  useEffect(() => {
    loadCurrentStyles()
  }, [runtimeElementService.currentStylePseudoClass])

  const loadCurrentStyles = () => {
    if (selectedNode && isRuntimeElement(selectedNode)) {
      const newStyles = JSON.parse(
        selectedNode.style.guiCss(currentStylePseudoClass) || '{}',
      )

      setCurrentStyles(newStyles)

      return newStyles
    }
  }

  const getCurrentStyle = (property: CssProperty) => {
    let styles = currentStyles

    if (styles === undefined) {
      styles = loadCurrentStyles()
    }

    return styles?.[property] ?? DefaultCssProperties[property].defaultValue
  }

  // Set a new style value and update memoized styles
  const setStyle = (key: CssProperty, value: string) => {
    if (!selectedNode || !isRuntimeElement(selectedNode)) {
      return
    }

    setCurrentStyles((oldStyles) => ({ ...oldStyles, [key]: value }))

    selectedNode.style.appendToGuiCss(currentStylePseudoClass, {
      [key]: value,
    })

    console.log(selectedNode.style.styleParsed)
  }

  const resetStyle = (property: CssProperty) => {
    // const { defaultValue } = DefaultCssProperties[property]

    removeStyles([property])
  }

  const canReset = (property: CssProperty) => {
    const { defaultValue } = DefaultCssProperties[property]

    return (
      currentStyles?.[property] !== undefined &&
      currentStyles[property] !== defaultValue
    )
  }

  const removeStyles = (properties: Array<CssProperty>) => {
    if (!selectedNode || !isRuntimeElement(selectedNode)) {
      return
    }

    selectedNode.style.deleteFromGuiCss(currentStylePseudoClass, properties)

    loadCurrentStyles()
  }

  return {
    canReset,
    getCurrentStyle,
    removeStyles,
    resetStyle,
    setStyle,
  }
}
