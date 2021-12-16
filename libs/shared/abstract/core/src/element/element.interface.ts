import { z } from 'zod'
import { AtomSchema } from '../atom'
import { HookSchema } from '../hook'
import { PropSchema } from '../prop'
import { TagSchema } from '../tag'

export const PropMapBindingSchema = z.object({
  id: z.string().nullish(),
  targetElementId: z.string().nullish(),
  sourceKey: z.string(),
  targetKey: z.string(),
})

export type IPropMapBinding = z.infer<typeof PropMapBindingSchema>

export const ElementSchema = z.object({
  id: z.string().nullish(),
  name: z.string().nullish(),
  css: z.string().nullish(),
  props: PropSchema,
  instanceOfComponent: z.object({ id: z.string() }).nullish(), // Marks the element as an instance of a specific component
  atom: z.optional(AtomSchema).nullable(),
  componentTag: TagSchema.nullish(), // Marks this element as a component
  componentFixedId: z.string().nullish(),
  hooks: z.array(HookSchema).default([]),
  renderForEachPropKey: z.string().nullish(),
  renderIfPropKey: z.string().nullish(),
  propMapBindings: z.array(PropMapBindingSchema).default([]),
  propTransformationJs: z.string().nullish(),
  parentElementId: z.string().nullish(),
  order: z.number().nullish(),
  ownerId: z.string().nullish(),
})

export type IElement = z.infer<typeof ElementSchema>

export const ElementsSchema = z.array(ElementSchema)
