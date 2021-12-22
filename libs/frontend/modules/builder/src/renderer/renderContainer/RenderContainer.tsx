import { RenderContainerWithKey } from './RenderContainerWithKey'
import { RenderContainerProps } from './types'

export const RenderContainer = ({
  appendToKey,
  element,
  context,
  props,
  isRoot = false,
}: RenderContainerProps) => {
  const baseKey = `${element.id}-${element.hooks.length}`
  const key = appendToKey ? `${baseKey}-${appendToKey}` : baseKey

  return (
    <RenderContainerWithKey
      element={element}
      context={context}
      props={props}
      key={key}
    />
  )
}
