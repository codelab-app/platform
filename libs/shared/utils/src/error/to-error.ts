export const toError = (error: unknown): string | Error => {
  if (typeof error === 'string') {
    return error
  }

  if (error instanceof Error) {
    return { message: error.message, name: error.name, stack: error.stack }
  }

  return String(error)
}
