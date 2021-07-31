import * as t from 'io-ts'

export const EnumTypeValueC = t.type({
  name: t.string,
  value: t.string,
})

export const EnumTypeC = t.type({
  name: t.string,
  allowedValues: t.array(EnumTypeValueC),
})
