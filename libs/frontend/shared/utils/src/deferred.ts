export class Deferred {
  promise: Promise<unknown>

  resolve!: (value?: unknown) => void

  reject!: (reason?: unknown) => void

  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
  }
}
