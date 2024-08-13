import type { IRef } from '@codelab/shared/abstract/core'
import { SchemaKinds, SchemaKindsMap } from '@codelab/shared/abstract/core'
import { Typebox } from '@codelab/shared/abstract/typebox'
import { Value } from '@sinclair/typebox/value'
import Ajv from 'ajv'

/**
 * These are used for testing only, to give examples on how the npm lib works
 */
export const ajv = new Ajv({})

type AssertIsRef = (value: unknown) => asserts value is IRef

export const assertIsRef: AssertIsRef = (val) => Value.Decode(RefKind, val)

export const isIRef = (value: unknown): value is IRef => {
  const validate = ajv.compile(Typebox.Ref)

  return validate(value)
}

const RefKind = SchemaKindsMap[SchemaKinds.Ref]
