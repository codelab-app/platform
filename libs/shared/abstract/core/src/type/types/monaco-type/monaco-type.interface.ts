import { z } from 'zod'
import { BaseTypeSchema } from '../base-type/base-type.interface'
import { TypeKind } from '../base-type/type-kind.enum'
import { MonacoLanguage } from './monaco-language.enum'

export const MonacoTypeSchema = BaseTypeSchema.extend({
  typeKind: z.literal(TypeKind.MonacoType).default(TypeKind.MonacoType),
  language: z.nativeEnum(MonacoLanguage),
})

export type IMonacoType = z.infer<typeof MonacoTypeSchema>
