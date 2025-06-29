/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ObjectLike } from '@codelab/shared-abstract-types'

export const LogClassMethod =
  () =>
  <T extends (...args: Array<any>) => Promise<any>>(
    // target is the class prototype, propertyKey is the method name,
    // descriptor is the method itself
    target: ObjectLike,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<T>,
  ) => {
    // Preserve original method
    const originalMethod = descriptor.value

    // Replace original method with wrapper
    descriptor.value = async function (
      this: {
        logger?: {
          debugWithTiming<R>(
            message: string,
            fn: () => Promise<R>,
            options?: ObjectLike,
          ): Promise<R>
          debug(message: string, options?: ObjectLike): void
        }
      },
      ...args: Parameters<T>
    ) {
      // "this" refers to the class instance
      const className = target.constructor.name

      // Require logger to be present
      if (!this.logger) {
        throw new Error(
          `Logger is required for @LogCall in ${className}.${propertyKey}`,
        )
      }

      // Call the original method
      if (!originalMethod) {
        throw new Error(`Method ${propertyKey} not found`)
      }

      // If logger has debugWithTiming, use it for automatic timing
      return this.logger.debugWithTiming(`${className}.${propertyKey}()`, () =>
        originalMethod.apply(this, args),
      )
    } as T

    return descriptor
  }
