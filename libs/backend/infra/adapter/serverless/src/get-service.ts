import type { Nullish } from '@codelab/shared/abstract/types'
import type { INestApplicationContext, Type } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

const context: Record<string, Nullish<INestApplicationContext>> = {}

export const getService = async <Module, Service>(
  module: Type<Module>,
  service: Type<Service>,
): Promise<Service> => {
  if (!context[module.name]) {
    context[module.name] = await NestFactory.createApplicationContext(module)
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return context[module.name]!.get(service)
}
