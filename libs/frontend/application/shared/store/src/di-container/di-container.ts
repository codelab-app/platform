export class DIContainer {
  static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer()
    }

    return DIContainer.instance
  }

  register<T>(key: string, instance: T): void {
    this.services.set(key, instance)
  }

  resolve<T>(key: string): T {
    const service = this.services.get(key)

    if (!service) {
      throw new Error(`Service not found: ${key}`)
    }

    return service as T
  }

  private static instance?: DIContainer

  private services: Map<string, unknown> = new Map()

  private constructor() {
    //
  }
}

export const diContainer = DIContainer.getInstance()
