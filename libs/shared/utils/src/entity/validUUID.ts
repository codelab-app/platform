import type { Key } from 'react'

/* Check if string is valid UUID */
export const checkIfValidUUID = (str: Key | undefined) => {
  if (!str) {
    return false
  }

  // Regular expression to check if string is a valid UUID
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi

  return regexExp.test(str.toString())
}
