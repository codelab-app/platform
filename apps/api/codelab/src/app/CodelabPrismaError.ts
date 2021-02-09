export interface IPrismaError {
  name?: string
  code: string
  clientVersion: string
  meta: { details: string }
  stack: string
  message: string
}

export class CodelabPrismaError extends Error {
  declare prismaError: IPrismaError

  constructor(msg: string, prismaError: IPrismaError) {
    super(msg)
    this.prismaError = prismaError
    Object.setPrototypeOf(this, CodelabPrismaError.prototype)
  }

  toString() {
    const { code, stack, message, meta, name } = this.prismaError
    const prismaErrorName = name ? `Prisma error - ${name} was thrown` : ``
    const prismaStack = stack ? `Stack - ${stack}` : `Stack - ${this.stack}`
    const prismaErrorCode = code ? `with error code ${code}` : ``
    const prismaDetails = meta?.details ? `Details - ${meta?.details}` : ``
    const prismaMsg = message ? `Message -  ${message}` : ``

    return `${prismaErrorName} ${prismaErrorCode} 
    ${prismaStack} \n ${prismaDetails} \n ${prismaMsg}`
  }
}
