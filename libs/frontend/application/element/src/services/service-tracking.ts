import { setCookie, deleteCookie } from 'cookies-next'
import { v4 as uuidv4 } from 'uuid'

export interface ServiceTrackingOptions {
  serviceName: string
  methodName?: string
}

/**
 * Sets tracking cookies for a service operation
 * @returns cleanup function to delete the cookies
 */
export function setServiceTracking(options: ServiceTrackingOptions): () => void {
  const requestId = uuidv4()
  const serviceId = options.methodName 
    ? `${options.serviceName}#${options.methodName}`
    : options.serviceName

  // Set cookies with short expiration
  setCookie('x-service-id', serviceId, { 
    maxAge: 60, // 60 seconds
    sameSite: 'strict'
  })
  
  setCookie('x-request-id', requestId, { 
    maxAge: 60,
    sameSite: 'strict'
  })

  // Return cleanup function
  return () => {
    deleteCookie('x-service-id')
    deleteCookie('x-request-id')
  }
}

/**
 * Decorator to automatically set service tracking for a method
 */
export function trackService(serviceName: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value

    descriptor.value = async function (...args: any[]) {
      const cleanup = setServiceTracking({
        serviceName,
        methodName: propertyKey
      })

      try {
        return await originalMethod.apply(this, args)
      } finally {
        cleanup()
      }
    }

    return descriptor
  }
}

/**
 * Wrapper function to track a service operation
 */
export async function withServiceTracking<T>(
  options: ServiceTrackingOptions,
  fn: () => Promise<T>
): Promise<T> {
  const cleanup = setServiceTracking(options)
  
  try {
    return await fn()
  } finally {
    cleanup()
  }
}