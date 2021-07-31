import { registerEnumType } from '@nestjs/graphql'
import { z } from 'zod'

/** The base primitive types that other types build on */
export enum PrimitiveKind {
  String = 'String',
  Integer = 'Integer',
  Float = 'Float',
  Boolean = 'Boolean',
}

/** Zod schema for the {@link PrimitiveKind} enum */
export const primitiveKindSchema = z.nativeEnum(PrimitiveKind)

registerEnumType(PrimitiveKind, {
  name: 'PrimitiveKind',
})
