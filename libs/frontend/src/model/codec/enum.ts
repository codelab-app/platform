import * as t from 'io-ts'

// this utility function can be used to turn a TypeScript enum into a io-ts codec.
export const fromEnum = <EnumType>(
  enumName: string,
  theEnum: Record<string, string | number>,
) => {
  const isEnumValue = (input: unknown): input is EnumType =>
    Object.values<unknown>(theEnum).includes(input)

  return new t.Type<EnumType>(
    enumName,
    isEnumValue,
    (input, context) =>
      isEnumValue(input) ? t.success(input) : t.failure(input, context),
    t.identity,
  )
}
