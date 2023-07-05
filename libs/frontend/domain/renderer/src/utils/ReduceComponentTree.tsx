// import type { IPropData } from '@codelab/frontend/abstract/core'
// import type { ComponentProps, ComponentType, PropsWithChildren } from 'react'
// import React from 'react'

// const ChildrenRender = ({ children }: PropsWithChildren): JSX.Element => (
//   <>{children}</>
// )

// /**
//  * Takes an array of components and reduce to a single nested component, with components at the front of the list being closer to the root.
//  */
// export const reduceComponentTree = (
//   components: Array<[ComponentType, IPropData]>,
// ) => {
//   return components.reduce((ParentComponent, [ChildComponent, childProps]) => {
//     return ({
//       children,
//     }: PropsWithChildren<ComponentProps<ComponentType>>): JSX.Element => (
//       <ParentComponent>
//         {jsx(ChildComponent, childProps, children)}
//       </ParentComponent>
//     )
//   }, ChildrenRender)
// }
