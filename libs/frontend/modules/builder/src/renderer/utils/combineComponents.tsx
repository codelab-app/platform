import React, {
  ComponentProps,
  ComponentType,
  FC,
  PropsWithChildren,
} from 'react'

export type ComponentTypeWithProps<TProps> = [ComponentType<TProps>, TProps]

export type ComponentTypeLike<P = any> =
  | ComponentType
  | ComponentTypeWithProps<P>
  | undefined
  | null

export type ComponentTypeLikeArray = ReadonlyArray<ComponentTypeLike>

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
    return [comp ?? ChildrenRender, {}]
  }

  return [ChildrenRender, {}]
}

export const combineComponents = (
  ...components: ComponentTypeLikeArray
): // eslint-disable-next-line @typescript-eslint/ban-types
FC => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return components.reduce<FC>((AccumulatedComponents, CurrentComponent) => {
    const [Inner, innerProps] = componentLikeDestructure(CurrentComponent)

    return ({
      children,
    }: PropsWithChildren<ComponentProps<ComponentType>>): JSX.Element => (
      <AccumulatedComponents>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Inner {...innerProps}>{children}</Inner>
      </AccumulatedComponents>
    )
  }, ChildrenRender)
}
