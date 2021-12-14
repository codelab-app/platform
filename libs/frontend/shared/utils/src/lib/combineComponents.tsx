import React, { ComponentProps, ComponentType, PropsWithChildren } from 'react'

export type ComponentTypeWithProps<TProps> = [ComponentType<TProps>, TProps]

export type ComponentTypeLike =
  | ComponentType
  | ComponentTypeWithProps<any>
  | undefined
  | null

export type ComponentTypeLikeArray = Array<ComponentTypeLike>

const ChildrenRender = ({ children }: PropsWithChildren<any>): JSX.Element => (
  <>{children}</>
)

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
