import { z } from 'zod'
import { AtomSchema } from '../atom'
import { HookSchema } from '../hook'
import { PropSchema } from '../prop'
import { TagSchema } from '../tag'

export const PropMapBindingSchema = z.object({
  id: z.string().default(''),
  targetElementId: z.string().nullish(),
  sourceKey: z.string(), // Set to '*' to bind all incoming props
  targetKey: z.string(), // Set to '*' to spread the incoming props to the outgoing ones
})

export type IPropMapBinding = z.infer<typeof PropMapBindingSchema>

export const ElementSchema = z.object({
  id: z.string().default(''),
  fixedId: z.string().nullish(),
  name: z.string().nullish(),
  css: z.string().nullish(),
  propTransformationJs: z.string().nullish(),
  renderForEachPropKey: z.string().nullish(),
  renderIfPropKey: z.string().nullish(),
  parentElement: z
    .object({ id: z.string(), order: z.number().nullish() })
    .nullish(),
  owner: z.object({ id: z.string() }).nullish(),
  instanceOfComponent: z.object({ id: z.string() }).nullish(), // Marks the element as an instance of a specific component
  componentTag: TagSchema.nullish(), // Marks this element as a component
  atom: z.optional(AtomSchema).nullish(),
  props: PropSchema,
  hooks: z.array(HookSchema).default([]),
  propMapBindings: z.array(PropMapBindingSchema).default([]),
})

export type IElement = z.infer<typeof ElementSchema>

export const ElementsSchema = z.array(ElementSchema)
