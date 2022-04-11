import { IHook } from '../hook'
import { IProp } from '../prop'
// import { AtomSchema } from '../atom'
// import { HookSchema } from '../hook'
// import { PropSchema } from '../prop'

// export const PropMapBindingSchema = z.object({
//   id: z.string().default(''),
//   element: z.object({
//     id: z.string().default(''),
//     name: z.string().nullish(),
//   }),
//   targetElement: z
//     .object({
//       id: z.string().default(''),
//       name: z.string().nullish(),
//     })
//     .nullish(),
//   sourceKey: z.string(), // Set to '*' to bind all incoming props
//   targetKey: z.string(), // Set to '*' to spread the incoming props to the outgoing ones
// })

// export type IPropMapBinding = z.infer<typeof PropMapBindingSchema>

// export const ElementSchema = z.object({
//   id: z.string().default(''),
//   //  fixedId: z.string().nullish(),
//   name: z.string().nullish(),
//   css: z.string().nullish(),
//   propTransformationJs: z.string().nullish(),
//   renderForEachPropKey: z.string().nullish(),
//   renderIfPropKey: z.string().nullish(),
//   parentElement: z
//     .object({ id: z.string(), name: z.string().nullish() })
//     .nullish(),
//   owner: z.object({ id: z.string() }).nullish(),
//   component: z.object({ id: z.string(), name: z.string() }).nullish(), // component which has this element as rootElement
//   instanceOfComponent: z.object({ id: z.string(), name: z.string() }).nullish(), // Marks the element as an instance of a specific component
//   atom: z.optional(AtomSchema).nullish(),
//   props: PropSchema.nullish(),
//   hooks: z.array(HookSchema).nullish(),
//   propMapBindings: z.array(PropMapBindingSchema).nullish(),
// })

// export type IElement = z.infer<typeof ElementSchema>

// export const ElementsSchema = z.array(ElementSchema)

export interface IElement {
  id: string
  props: IProp
  hooks: Array<IHook>
}
