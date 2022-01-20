import { Nullish } from '@codelab/shared/abstract/types'
import React, { ComponentProps, ComponentType, PropsWithChildren } from 'react'

export type ComponentTypeWithProps<TProps> = [ComponentType<TProps>, TProps]

export type ComponentTypeLike = Nullish<
  ComponentType | ComponentTypeWithProps<any>
>

export type ComponentTypeLikeArray = Array<ComponentTypeLike>

const ChildrenRender = ({
  children,
}: PropsWithChildren<unknown>): JSX.Element => <>{children}</>

export const componentLikeDestructure = (
  comp: ComponentTypeLike,
): ComponentTypeWithProps<any> => {
  if (Array.isArray(comp)) {
    return comp
  }

  if (comp) {
    return [comp, {}]
  }

  return [ChildrenRender, {}]
}

/**
 * A functional way to compose components and their props.
 *
 * combineComponents(
 *  [...providers],
 *  [Outer, outerProps],
 *  [Inner, innerProps],
 * )
 */
export const combineComponents = (
  ...components: ComponentTypeLikeArray
): ComponentType => {
  return components.reduce<ComponentType>(
    (AccumulatedComponents, CurrentComponent) => {
      const [Inner, innerProps] = componentLikeDestructure(CurrentComponent)

      // eslint-disable-next-line react/display-name
      return function ({
        children,
      }: PropsWithChildren<ComponentProps<ComponentType>>): JSX.Element {
        return (
          <AccumulatedComponents>
            <Inner {...innerProps}>{children}</Inner>
          </AccumulatedComponents>
        )
      }
    },
    ChildrenRender,
  )
}
