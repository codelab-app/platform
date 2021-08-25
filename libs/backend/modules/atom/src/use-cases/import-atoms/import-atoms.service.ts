import { UseCasePort } from '@codelab/backend/abstract/core'
import { ImportAtomsInput } from './import-atoms.input'

/**
 * This is the entry point to importing all atom related data. This function will call a basic seeder to seed all default data that belongs to the platform.
 *
 * The calls are idempotent
 */
export class ImportAtomsService implements UseCasePort<ImportAtomsInput, void> {
  execute(request: ImportAtomsInput): Promise<any> {
    const { payload } = request
    const data = JSON.parse(payload)

    console.log(data)

    return Promise.resolve(undefined)
  }
}
