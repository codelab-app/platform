export const extractFirstGraphQlErrorCode = (error: any) =>
  error.response.errors[0].extensions.code
