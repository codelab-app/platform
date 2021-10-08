import { z } from 'zod'
import { AtomSchema } from '../atom'
import { HookSchema } from '../hook'
import { TagSchema } from '../tag'

export const PropMapBindingSchema = z.object({
  id: z.string(),
  targetElementId: z.string().optional().nullable(),
  sourceKey: z.string(),
  targetKey: z.string(),
})

export type IPropMapBinding = z.infer<typeof PropMapBindingSchema>

export type ElementId = string

export const ElementSchema = z.object({
  id: z.string(),
  name: z.string(),
  css: z.string().nullish(),
  props: z.string().default('{}'),
  atom: z.optional(AtomSchema).nullable(),
  componentTag: TagSchema.nullish(),
  hooks: z.array(HookSchema).default([]),
  renderForEachPropKey: z.string().nullish(),
  renderIfPropKey: z.string().nullish(),
  propMapBindings: z.array(PropMapBindingSchema).default([]),
  propTransformationJs: z.string().nullish(),
})

export type IElement = z.infer<typeof ElementSchema>

export const ElementsSchema = z.array(ElementSchema)
