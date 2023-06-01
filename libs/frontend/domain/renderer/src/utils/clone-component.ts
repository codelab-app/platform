import type {
  IComponent,
  IPageNode,
  IPropData,
} from '@codelab/frontend/abstract/core'

/**
 * Clones component by generating a unique key from props
 * @param component the component where prop.value == component.id
 * @param node the node that has RenderProp/ReactNode as prop
 * @param props
 * @returns
 */

export const cloneComponent = (
  component: IComponent,
  node: IPageNode,
  props: IPropData,
) => {
  if (!component.keyGenerator) {
    console.error('Component must have a key keyGenerator')

    return
  }

  try {
    // eslint-disable-next-line no-eval
    const keyGenerator = eval(`(${component.keyGenerator})`)
    const key = keyGenerator(props)
    const componentClone = component.clone(`${node.id}-${component.id}-${key}`)

    return componentClone
  } catch (error) {
    console.error(error)

    return
  }
}
