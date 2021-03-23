export class CodelabError extends Error {
  constructor(msg: string) {
    super(msg)
    Object.setPrototypeOf(this, CodelabError.prototype)
  }

  toString() {
    const errorName = this.name ? `Error name - ${this.name}` : ''
    const errorMessage = this.message ? `Message - ${this.message}` : ''
    const errorStack = this.stack ? `Stack - ${this.stack}` : ''

    return `${errorMessage}\n${errorMessage}\n${errorStack}`
  }
}
