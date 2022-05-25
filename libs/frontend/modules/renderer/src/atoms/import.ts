import dynamic from 'next/dynamic'
import { ModuleMapperFn } from './types'

/**
 * @param loader - import('@codelab/component')
 * @param moduleMapper - In the first function block, we allow static mappers to be specified, if we specify the first mapper, then the second mapper doesn't work
 */
export const dynamicImport = <T extends () => Promise<any>>(
  loader: T,
  moduleMapper?: ModuleMapperFn<Awaited<ReturnType<T>>>,
) => {
  if (moduleMapper) {
    return dynamic(loader().then(moduleMapper))
  }

  return dynamic(loader())
}
