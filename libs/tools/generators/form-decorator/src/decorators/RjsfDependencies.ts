import { Type } from '@tsed/core'
import { CustomKey } from '@tsed/schema'
import { getJsonSchemaCustom } from '../processors/custom-tsed/getJsonSchemaCustom'

export const RjsfDependencies = (types: Array<Type<any>>, keyName: string) => {
  const obj: any = {}

  obj[keyName] = {
    oneOf: types.map((type) => getJsonSchemaCustom(type)),
  }

  return CustomKey('dependencies', obj)
}
