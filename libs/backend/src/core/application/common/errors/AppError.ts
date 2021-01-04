export class AppError extends Error {
  /**
   * Used to bypass structural typing
   */
  public readonly _tag = 'APP_ERROR'

  constructor(message?: string) {
    super(message)
    Object.setPrototypeOf(this, AppError.prototype)
  }
}

// export namespace AppError {
//   export class UnexpectedError extends Result<UseCaseError> {
//     public constructor(err: any) {
//       super(false, {
//         message: `An unexpected error occurred.`,
//         error: err,
//       } as UseCaseError)
//       console.log(`[AppError]: An unexpected error occurred`)
//       console.error(err)
//     }

//     public static create(err: any): UnexpectedError {
//       return new UnexpectedError(err)
//     }
//   }
// }
