import type {
  IComponentModel,
  IPageNode,
} from '@codelab/frontend/abstract/domain'
import type { IPropData } from '@codelab/shared/abstract/core'

/**
 * Clones component by generating a unique key from props
 * @param component the component where prop.value == component.id
 * @param node the node that has RenderProp/ReactNode as prop
 * @param props
 * @returns
 */
// FIXME: should add runtime component
export const cloneComponent = (
  component: IComponentModel,
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
    // TODO: Renderer
    // const componentClone = component.clone(`${node.id}-${component.id}-${key}`)

    // return componentClone
    return
  } catch (error) {
    console.error(error)

    return
  }
}
