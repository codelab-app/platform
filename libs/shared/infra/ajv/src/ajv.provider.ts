import type { ValidateFunction } from 'ajv'
import Ajv from 'ajv'
import ajvMergePatch from 'ajv-merge-patch'

class AjvProvider {
  static getInstance(): AjvProvider {
    if (!AjvProvider.instance) {
      AjvProvider.instance = new AjvProvider()
    }

    return AjvProvider.instance
  }

  addSchema(schema: object, key?: string): void {
    this.ajv.addSchema(schema, key)
  }

  getSchema(key: string): ValidateFunction | undefined {
    return this.ajv.getSchema(key)
  }

  validate(schemaKey: string, data: unknown): boolean {
    const validate = this.ajv.getSchema(schemaKey)

    if (validate) {
      const valid = validate(data)

      if (!valid) {
        console.error(validate.errors)
      }

      return valid as boolean
    }

    throw new Error(`Schema with key ${schemaKey} not found`)
  }

  private static instance?: AjvProvider

  private ajv: Ajv

  private constructor() {
    this.ajv = new Ajv()
    ajvMergePatch(this.ajv)
  }
}

export const ajvProvider = AjvProvider.getInstance()
