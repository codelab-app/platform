import type {
  IComponent,
  IElement,
  IPropData,
} from '@codelab/frontend/abstract/core'

/**
 * Clones component by generating a unique key from props
 * @param component
 * @param element
 * @param props
 * @returns
 */

export const cloneComponent = (
  component: IComponent,
  element: IElement,
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

    const componentClone = component.clone(
      `${element.id}-${component.id}-${key}`,
    )

    return componentClone
  } catch (error) {
    console.error(error)

    return
  }
}
